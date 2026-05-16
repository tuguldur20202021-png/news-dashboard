import { useState } from 'react';
import { useWeeklyNews } from '../hooks/useWeeklyNews';

const SOURCE_CATEGORIES = {
  Reuters: 'World',
  'BBC News': 'World',
  'BBC.com': 'World',
  'Associated Press': 'World',
  'AP News': 'World',
  CNN: 'World',
  'Al Jazeera English': 'World',
  'Al Jazeera': 'World',
  NPR: 'World',
  'The New York Times': 'World',
  Bloomberg: 'Business',
  'Bloomberg.com': 'Business',
  CNBC: 'Business',
  'The Wall Street Journal': 'Business',
  Fortune: 'Business',
  TechCrunch: 'Tech',
  'The Verge': 'Tech',
  Wired: 'Tech',
  Engadget: 'Tech',
  'Live Science': 'Science',
  Nature: 'Science',
  'Nature.com': 'Science',
  ScienceDaily: 'Science',
};

const CATEGORY_META = {
  World:    { label: '🌍 World',    color: '#58a6ff' },
  Business: { label: '💼 Business', color: '#3fb950' },
  Tech:     { label: '💻 Tech',     color: '#b388ff' },
  Science:  { label: '🔬 Science',  color: '#f0883e' },
};

function getCategory(sourceName) {
  if (!sourceName) return null;
  for (const [key, value] of Object.entries(SOURCE_CATEGORIES)) {
    if (sourceName.toLowerCase().includes(key.toLowerCase())) return value;
  }
  return null;
}

function getWeekRangeLabel() {
  const today = new Date();
  const from = new Date();
  from.setDate(today.getDate() - 7);
  const opts = { month: 'short', day: 'numeric' };
  const fromStr = from.toLocaleDateString('en-US', opts);
  const toStr = today.toLocaleDateString('en-US', { ...opts, year: 'numeric' });
  return `${fromStr} – ${toStr}`;
}

function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function CategoryBadge({ sourceName }) {
  const cat = getCategory(sourceName);
  if (!cat) return null;
  const { label, color } = CATEGORY_META[cat];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold whitespace-nowrap"
      style={{ color, backgroundColor: `${color}22`, border: `1px solid ${color}44` }}
    >
      {label}
    </span>
  );
}

function HeroCard({ article, index }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const hasImage = article.urlToImage && !imgError;

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative rounded-2xl overflow-hidden border border-[#21262d] bg-[#161b22] flex flex-col hover:border-[#7c4dff]/50 transition-all duration-300 hover:-translate-y-0.5`}
    >
      <div className="relative w-full h-[220px] sm:h-[280px] overflow-hidden bg-[#0d1117]">
        {hasImage ? (
          <>
            {!imgLoaded && <div className="absolute inset-0 skeleton" />}
            <img
              src={article.urlToImage}
              alt={article.title}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </>
        ) : (
          <div className={`w-full h-full gradient-placeholder-${index % 13} flex items-center justify-center`}>
            <span className="text-5xl opacity-30">📰</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-[#161b22]/10 to-transparent" />

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            {article.source?.name && (
              <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-xs font-medium text-white">
                {article.source.name}
              </span>
            )}
            <CategoryBadge sourceName={article.source?.name} />
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-base sm:text-lg font-bold text-white leading-snug line-clamp-2 group-hover:text-[#b388ff] transition-colors duration-200">
          {article.title}
        </h3>
        {article.description && (
          <p className="text-sm text-[#8b949e] leading-relaxed line-clamp-3">
            {article.description}
          </p>
        )}
        {article.publishedAt && (
          <p className="text-xs text-[#8b949e] mt-1 flex items-center gap-1.5">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {timeAgo(article.publishedAt)}
          </p>
        )}
      </div>
    </a>
  );
}

function RegularCard({ article, index }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const hasImage = article.urlToImage && !imgError;

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-2xl overflow-hidden border border-[#21262d] bg-[#161b22] flex flex-col hover:border-[#7c4dff]/50 transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="relative w-full h-[140px] overflow-hidden bg-[#0d1117]">
        {hasImage ? (
          <>
            {!imgLoaded && <div className="absolute inset-0 skeleton" />}
            <img
              src={article.urlToImage}
              alt={article.title}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </>
        ) : (
          <div className={`w-full h-full gradient-placeholder-${index % 13} flex items-center justify-center`}>
            <span className="text-3xl opacity-30">📰</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161b22]/50 to-transparent" />
        <div className="absolute top-2 right-2">
          <CategoryBadge sourceName={article.source?.name} />
        </div>
      </div>

      <div className="p-3 flex flex-col gap-1.5 flex-1">
        {article.source?.name && (
          <span className="text-[10px] font-semibold text-[#7c4dff] uppercase tracking-wide truncate">
            {article.source.name}
          </span>
        )}
        <h3 className="text-[13px] font-semibold text-white leading-snug line-clamp-2 group-hover:text-[#b388ff] transition-colors duration-200">
          {article.title}
        </h3>
        {article.description && (
          <p className="text-xs text-[#8b949e] leading-relaxed line-clamp-2 flex-1">
            {article.description}
          </p>
        )}
        {article.publishedAt && (
          <p className="text-[11px] text-[#8b949e] mt-auto pt-1">{timeAgo(article.publishedAt)}</p>
        )}
      </div>
    </a>
  );
}

function SkeletonHero() {
  return (
    <div className="rounded-2xl overflow-hidden border border-[#21262d] bg-[#161b22]">
      <div className="w-full h-[220px] sm:h-[280px] skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 rounded skeleton" />
        <div className="h-4 w-full rounded skeleton" />
        <div className="h-4 w-5/6 rounded skeleton" />
        <div className="h-3 w-24 rounded skeleton mt-1" />
      </div>
    </div>
  );
}

function SkeletonRegular() {
  return (
    <div className="rounded-2xl overflow-hidden border border-[#21262d] bg-[#161b22]">
      <div className="w-full h-[140px] skeleton" />
      <div className="p-3 space-y-2">
        <div className="h-3 w-20 rounded skeleton" />
        <div className="h-4 w-full rounded skeleton" />
        <div className="h-3 w-4/5 rounded skeleton" />
        <div className="h-3 w-full rounded skeleton" />
        <div className="h-3 w-2/3 rounded skeleton" />
      </div>
    </div>
  );
}

const INITIAL_VISIBLE = 6;

export default function WeeklyTopNews() {
  const { articles, loading, error, refresh } = useWeeklyNews();
  const [expanded, setExpanded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (error || (!loading && articles.length === 0)) return null;

  const visibleArticles = expanded ? articles : articles.slice(0, INITIAL_VISIBLE);
  const heroArticle = visibleArticles[0];
  const gridArticles = visibleArticles.slice(1);
  const hiddenCount = articles.length - INITIAL_VISIBLE;

  function handleRefresh() {
    setIsRefreshing(true);
    refresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  }

  return (
    <section className="px-4 max-w-7xl mx-auto pt-6 pb-2">
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="text-xl">📰</span>
            <h2 className="text-base font-bold text-white">This Week's Top News</h2>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-[#7c4dff]/15 border border-[#7c4dff]/30 text-[11px] font-medium text-[#b388ff]">
              Trusted Sources
            </span>
          </div>
          <p className="text-xs text-[#8b949e] pl-8">{getWeekRangeLabel()}</p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161b22] border border-[#21262d] text-xs text-[#8b949e] hover:text-white hover:border-[#7c4dff]/50 transition-all duration-200 cursor-pointer disabled:opacity-50"
        >
          <svg
            className={`w-3.5 h-3.5 ${isRefreshing ? 'spin' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Cards */}
      {loading ? (
        <div className="space-y-3">
          <SkeletonHero />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonRegular key={i} />)}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {heroArticle && <HeroCard article={heroArticle} index={0} />}

          {gridArticles.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {gridArticles.map((article, i) => (
                <RegularCard key={article.url} article={article} index={i + 1} />
              ))}
            </div>
          )}

          {hiddenCount > 0 && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="w-full py-2.5 rounded-xl border border-[#21262d] bg-[#161b22] text-sm text-[#8b949e] hover:text-white hover:border-[#7c4dff]/50 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              {expanded ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  Show less
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Show {hiddenCount} more article{hiddenCount !== 1 ? 's' : ''}
                </>
              )}
            </button>
          )}
        </div>
      )}

      <div className="mt-6 border-t border-[#21262d]" />
    </section>
  );
}
