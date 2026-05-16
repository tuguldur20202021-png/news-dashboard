import { useState, useEffect, useCallback, useRef } from 'react';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
const AUTO_REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes

function getCacheKey(category) {
  return `news_cache_${category.id}`;
}

function getCachedData(category) {
  try {
    const raw = sessionStorage.getItem(getCacheKey(category));
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (Date.now() - cached.timestamp > CACHE_DURATION) {
      sessionStorage.removeItem(getCacheKey(category));
      return null;
    }
    return cached.data;
  } catch {
    return null;
  }
}

function setCachedData(category, data) {
  try {
    sessionStorage.setItem(
      getCacheKey(category),
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch {
    // sessionStorage might be full
  }
}

export function useNews(category) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  const fetchNews = useCallback(async (forceRefresh = false) => {
    if (category.type === 'videos') {
      setArticles([]);
      setLoading(false);
      return;
    }

    const isProd = import.meta.env.PROD;

    if (!isProd && !API_KEY) {
      setError('Missing API key. Add VITE_NEWS_API_KEY to your .env file.');
      setLoading(false);
      return;
    }

    // Check cache first
    if (!forceRefresh) {
      const cached = getCachedData(category);
      if (cached) {
        setArticles(cached);
        setLoading(false);
        setError(null);
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      const endpoint = category.type === 'top-headlines' ? 'top-headlines' : 'everything';
      let url;

      if (isProd) {
        // Route through our Vercel serverless function in production to bypass CORS
        const params = new URLSearchParams({
          ...category.params,
          endpoint,
          pageSize: '30',
        });
        url = `/api/news?${params}`;
      } else {
        // Direct to NewsAPI in local dev
        const params = new URLSearchParams({
          ...category.params,
          apiKey: API_KEY,
          pageSize: '30',
        });
        url = `${BASE_URL}/${endpoint}?${params}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API error: ${response.status}`);
      }

      const data = await response.json();

      // Filter out articles with [Removed] title
      const filtered = (data.articles || []).filter(
        (a) => a.title && a.title !== '[Removed]' && a.source?.name !== '[Removed]'
      );

      setArticles(filtered);
      setCachedData(category, filtered);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch news');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchNews();

    // Auto-refresh
    intervalRef.current = setInterval(() => {
      fetchNews(true);
    }, AUTO_REFRESH_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchNews]);

  const refresh = useCallback(() => {
    fetchNews(true);
  }, [fetchNews]);

  return { articles, loading, error, refresh };
}
