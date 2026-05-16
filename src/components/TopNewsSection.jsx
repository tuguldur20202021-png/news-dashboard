import { useState } from 'react';
import { useTopNews, getSourceCategory, getDateRange } from '../hooks/useTopNews';

const CATEGORY_STYLES = {
  World: { bg: 'bg-[#da3633]/20', border: 'border-[#da3633]/40', text: 'text-[#ff7b72]', dot: 'bg-[#da3633]' },
  Business: { bg: 'bg-[#1f6feb]/20', border: 'border-[#1f6feb]/40', text: 'text-[#58a6ff]', dot: 'bg-[#1f6feb]' },
  Tech: { bg: 'bg-[#8b5cf6]/20', border: 'border-[#8b5cf6]/40', text: 'text-[#c4b5fd]', dot: 'bg-[#8b5cf6]' },
  Science: { bg: 'bg-[#2ea043]/20', border: 'border-[#2ea043]/40', text: 'text-[#56d364]', dot: 'bg-[#2ea043]' },
};

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
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

function CategoryBadge({ sourceName }) {
  const cat = getSourceCategory(sourceName);
  const style = CATEGORY_STYLES[cat] || CATEGORY_STYLES.World;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${style.bg} ${style.border} ${style.text} border`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {cat}
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
      className="group relative rounded-2xl overflow-hidden border border-[#21262d] bg-[#161b22] flex flex-col hover:border-[#7c4dff]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#7c4dff]/10"
    >
      {/* Image */}
      <div className="relative w-full h-[220px] overflow-hidden bg-[#0d1117]">
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
            <span className="text-5xl opacity-40">🌍</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-[#161b22]/30 to-transparent" />

        {/* Rank */}
        <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-[#7c4dff] flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-[#7c4dff]/30">
          {index + 1}
        </div>

        {/* Source */}
        {article.source?.name && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-[11px] font-medium text-white">
            {article.source.name}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2">
          <CategoryBadge sourceName={article.source?.name} />
          {article.publishedAt && (
            <span className="text-[11px] text-[#8b949e]">{timeAgo(article.publishedAt)}</span>
          )}
        </div>
        <h3 className="text-[15px] font-bold text-white leading-snug line-clamp-2 group-hover:text-[#b388ff] transition-colors duration-200">
          {article.title}
        </h3>
        {article.description && (
          <p className="text-[13px] text-[#8b949e] leading-relaxed line-clamp-3 flex-1">
            {article.description}
          </p>
        )}
        <div className="flex items-center gap-1 mt-auto pt-1 text-[12px] font-medium text-[#7c4dff] group-hover:text-[#b388ff] transition-colors">
          Read full story
          <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </a>
  );
}

function SmallCard({ article, index }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const hasImage = article.urlToImage && !imgError;

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-3 p-3 rounded-xl border border-[#21262d] bg-[#161b22] hover:border-[#7c4dff]/50 transition-all duration-200 hover:bg-[#1c2333]"
    >
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-[100px] h-[80px] rounded-lg overflow-hidden bg-[#0d1117]">
        {hasImage ? (
          <>
            {!imgLoaded && <div className="absolute inset-0 skeleton" />}
            <img
              src={article.urlToImage}
              alt={article.title}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </>
        ) : (
          <div className={`w-full h-full gradient-placeholder-${(index + 5) % 13} flex items-center justify-center`}>
            <span className="text-2xl opacity-40">📰</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <CategoryBadge sourceName={article.source?.name} />
          {article.publishedAt && (
            <span className="text-[10px] text-[#8b949e]">{timeAgo(article.publishedAt)}</span>
          )}
        </div>
        <h4 className="text-[13px] font-semibold text-white leading-snug line-clamp-2 group-hover:text-[#b388ff] transition-colors duration-200">
          {article.title}
        </h4>
        {article.description && (
          <p className="text-[11px] text-[#8b949e] leading-relaxed line-clamp-2">
            {article.description}
          </p>
        )}
      </div>
    </a>
  );
}

function HeroSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-[#21262d] bg-[#161b22]">
      <div className="w-full h-[220px] skeleton" />
      <div className="p-4 space-y-2">
        <div className="h-3 w-20 rounded skeleton" />
        <div className="h-4 w-full rounded skeleton" />
        <div className="h-4 w-3/4 rounded skeleton" />
        <div className="h-3 w-full rounded skeleton" />
        <div className="h-3 w-2/3 rounded skeleton" />
      </div>
    </div>
  );
}

function SmallSkeleton() {
  return (
    <div className="flex gap-3 p-3 rounded-xl border border-[#21262d] bg-[#161b22]">
      <div className="flex-shrink-0 w-[100px] h-[80px] rounded-lg skeleton" />
      <div className="flex-1 space-y-2 py-1">
        <div className="h-3 w-16 rounded skeleton" />
        <div className="h-3.5 w-full rounded skeleton" />
        <div className="h-3.5 w-3/4 rounded skeleton" />
      </div>
    </div>
  );
}

export default function TopNewsSection() {
  const { articles, loading, error } = useTopNews();
  const [expanded, setExpanded] = useState(false);

  if (error || (!loading && articles.length === 0)) return null;

  const heroArticles = articles.slice(0, 2);
  const remainingArticles = expanded ? articles.slice(2) : articles.slice(2, 8);
  const hasMore = articles.length > 8;

  return (
    <section className="px-4 max-w-7xl mx-auto pt-6 pb-2">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🌍</span>
            <h2 className="text-lg font-bold text-white">This Week in World News</h2>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#7c4dff]/15 border border-[#7c4dff]/30 text-[11px] font-medium text-[#b388ff]">
              Top Stories
            </span>
          </div>
          <p className="text-[12px] text-[#8b949e] ml-10">
            {getDateRange()} · From Reuters, BBC, CNN, Bloomberg & more
          </p>
        </div>
      </div>

      {loading ? (
        <>
          {/* Skeleton Hero */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <HeroSkeleton />
            <HeroSkeleton />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => <SmallSkeleton key={i} />)}
          </div>
        </>
      ) : (
        <>
          {/* Hero Cards - Top 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {heroArticles.map((article, i) => (
              <div key={article.url} className="fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <HeroCard article={article} index={i} />
              </div>
            ))}
          </div>

          {/* Remaining Cards */}
          {remainingArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {remainingArticles.map((article, i) => (
                <div key={article.url} className="fade-in-up" style={{ animationDelay: `${(i + 2) * 0.05}s` }}>
                  <SmallCard article={article} index={i + 2} />
                </div>
              ))}
            </div>
          )}

          {/* Show More / Less */}
          {hasMore && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#161b22] border border-[#30363d] text-sm font-medium text-[#8b949e] hover:text-white hover:border-[#7c4dff]/50 transition-all duration-200 cursor-pointer"
              >
                {expanded ? (
                  <>
                    Show less
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    Show {articles.length - 8} more stories
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}

      {/* Divider */}
      <div className="mt-6 border-t border-[#21262d]" />
    </section>
  );
}
