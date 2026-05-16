import { useState, useMemo, useCallback } from 'react';
import { CATEGORIES } from './constants/categories';
import { useNews } from './hooks/useNews';
import CategoryTabs from './components/CategoryTabs';
import SearchBar from './components/SearchBar';
import NewsCard from './components/NewsCard';
import VideoSection from './components/VideoSection';

function SkeletonCard() {
  return (
    <div className="bg-[#161b22] rounded-2xl overflow-hidden border border-[#21262d]">
      <div className="w-full h-[200px] skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-24 rounded skeleton" />
        <div className="h-4 w-full rounded skeleton" />
        <div className="h-4 w-3/4 rounded skeleton" />
        <div className="h-3 w-full rounded skeleton" />
        <div className="h-3 w-2/3 rounded skeleton" />
        <div className="h-4 w-20 rounded skeleton mt-2" />
      </div>
    </div>
  );
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto pb-12">
      {Array.from({ length: 9 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4">
      <div className="w-20 h-20 rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-[#f85149]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">Something went wrong</h3>
      <p className="text-sm text-[#8b949e] text-center max-w-md mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2.5 bg-[#7c4dff] text-white rounded-xl text-sm font-medium hover:bg-[#651fff] transition-colors duration-200 cursor-pointer"
        id="retry-button"
      >
        Try Again
      </button>
    </div>
  );
}

function EmptyState({ searchQuery }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4">
      <div className="w-20 h-20 rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-[#8b949e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">No articles found</h3>
      <p className="text-sm text-[#8b949e] text-center max-w-md">
        {searchQuery
          ? `No results for "${searchQuery}". Try a different search term.`
          : 'No articles available at the moment. Try refreshing.'}
      </p>
    </div>
  );
}

export default function App() {
  const [activeCategoryId, setActiveCategoryId] = useState('top-stories');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const activeCategory = useMemo(
    () => CATEGORIES.find((c) => c.id === activeCategoryId) || CATEGORIES[0],
    [activeCategoryId]
  );

  const { articles, loading, error, refresh } = useNews(activeCategory);

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    const query = searchQuery.toLowerCase();
    return articles.filter(
      (a) =>
        a.title?.toLowerCase().includes(query) ||
        a.description?.toLowerCase().includes(query)
    );
  }, [articles, searchQuery]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    refresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  }, [refresh]);

  const handleTabChange = useCallback((id) => {
    setActiveCategoryId(id);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const isVideoTab = activeCategoryId === 'videos';

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0d1117]/80 backdrop-blur-xl border-b border-[#21262d]" id="main-header">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          {/* Logo / App Name */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <h1 className="text-xl font-bold text-white whitespace-nowrap">
              🌍 Tuugii's News Hub
            </h1>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1a7f37]/20 border border-[#1a7f37]/30">
              <div className="w-2 h-2 rounded-full bg-[#3fb950] pulse-dot" />
              <span className="text-xs font-medium text-[#3fb950]">Live</span>
            </div>
          </div>

          {/* Search */}
          <SearchBar value={searchQuery} onChange={setSearchQuery} />

          {/* Refresh button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex-shrink-0 p-2.5 rounded-xl bg-[#161b22] border border-[#30363d] text-[#8b949e] hover:text-white hover:border-[#7c4dff] transition-all duration-200 cursor-pointer disabled:opacity-50"
            title="Refresh news"
            id="refresh-button"
          >
            <svg
              className={`w-5 h-5 ${isRefreshing ? 'spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Category Tabs */}
      <CategoryTabs activeCategory={activeCategoryId} onSelect={handleTabChange} />

      {/* Main Content */}
      <main className="pt-6">
        {isVideoTab ? (
          <VideoSection />
        ) : loading ? (
          <LoadingGrid />
        ) : error ? (
          <ErrorState message={error} onRetry={handleRefresh} />
        ) : filteredArticles.length === 0 ? (
          <EmptyState searchQuery={searchQuery} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto pb-12">
            {filteredArticles.map((article, index) => (
              <NewsCard
                key={`${article.url}-${index}`}
                article={article}
                index={index}
                categoryEmoji={activeCategory.emoji}
              />
            ))}
          </div>
        )}

        {/* Article count */}
        {!isVideoTab && !loading && !error && filteredArticles.length > 0 && (
          <div className="text-center pb-8">
            <p className="text-xs text-[#8b949e]">
              Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#21262d] py-6 text-center">
        <p className="text-xs text-[#8b949e]">
          Powered by <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="text-[#7c4dff] hover:text-[#b388ff] transition-colors">NewsAPI</a>
          {' · '}Built with ❤️ by Tuugii
        </p>
      </footer>
    </div>
  );
}
