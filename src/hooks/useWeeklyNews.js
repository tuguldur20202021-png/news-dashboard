import { useState, useEffect, useCallback } from 'react';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';
const CACHE_KEY = 'weekly_news_cache_v2';
const CACHE_DURATION = 30 * 60 * 1000;

// NewsAPI source IDs for trusted outlets (used with top-headlines endpoint)
const TRUSTED_SOURCES = [
  'reuters', 'bbc-news', 'associated-press', 'cnn', 'al-jazeera-english',
  'bloomberg', 'cnbc', 'the-wall-street-journal', 'fortune',
  'techcrunch', 'the-verge', 'wired', 'engadget',
].join(',');

function getCached() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (Date.now() - cached.timestamp > CACHE_DURATION) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
    return cached.data;
  } catch {
    return null;
  }
}

function setCached(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {}
}

export function useWeeklyNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = useCallback(async (forceRefresh = false) => {
    const isProd = import.meta.env.PROD;

    if (!isProd && !API_KEY) {
      setError('Missing API key.');
      setLoading(false);
      return;
    }

    if (!forceRefresh) {
      const cached = getCached();
      if (cached && cached.length > 0) {
        setArticles(cached);
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      const baseParams = {
        sources: TRUSTED_SOURCES,
        pageSize: '20',
      };

      let url;
      if (isProd) {
        url = `/api/news?${new URLSearchParams({ ...baseParams, endpoint: 'top-headlines' })}`;
      } else {
        url = `${BASE_URL}/top-headlines?${new URLSearchParams({ ...baseParams, apiKey: API_KEY })}`;
      }

      const response = await window.fetch(url);
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const filtered = (data.articles || []).filter(
        (a) => a.title && a.title !== '[Removed]' && a.source?.name !== '[Removed]'
      );

      setArticles(filtered);
      if (filtered.length > 0) {
        setCached(filtered);
      }
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const refresh = useCallback(() => fetchArticles(true), [fetchArticles]);

  return { articles, loading, error, refresh };
}
