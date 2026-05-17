import { useState } from 'react';

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
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function NewsCard({ article, index, categoryEmoji }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const gradientClass = `gradient-placeholder-${index % 13}`;
  const hasImage = article.urlToImage && !imgError;

  const animationDelay = `${Math.min(index * 0.06, 0.6)}s`;

  return (
    <article
      className="card-3d fade-in-up"
      style={{ animationDelay }}
      id={`news-card-${index}`}
    >
      <div className="card-3d-inner glass-card glow-border rounded-2xl overflow-hidden flex flex-col h-full">
        {/* Image Section */}
        <div className="relative w-full h-[200px] overflow-hidden">
          {hasImage ? (
            <>
              {!imgLoaded && (
                <div className="absolute inset-0 skeleton" />
              )}
              <img
                src={article.urlToImage}
                alt={article.title}
                loading="lazy"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                className={`card-img w-full h-full object-cover transition-opacity duration-500 ${
                  imgLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
            </>
          ) : (
            <div className={`w-full h-full ${gradientClass} flex items-center justify-center`}>
              <span className="text-5xl opacity-40 select-none">{categoryEmoji}</span>
            </div>
          )}
          {/* Source badge */}
          {article.source?.name && (
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md text-xs font-medium text-white border border-white/10">
              {article.source.name}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-1 gap-2">
          {/* Meta */}
          <div className="flex items-center gap-2 text-xs text-[#8b949e]">
            {article.publishedAt && (
              <time dateTime={article.publishedAt} className="flex items-center gap-1">
                <svg className="w-3 h-3 text-[#7c4dff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {timeAgo(article.publishedAt)}
              </time>
            )}
            {article.author && (
              <>
                <span className="text-[#334155]">·</span>
                <span className="truncate max-w-[150px]">{article.author}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h2 className="text-[15px] font-semibold text-white leading-snug line-clamp-2">
            {article.title}
          </h2>

          {/* Description */}
          {article.description && (
            <p className="text-sm text-[#8b949e] leading-relaxed line-clamp-2 flex-1">
              {article.description}
            </p>
          )}

          {/* Read More */}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-1.5 mt-auto pt-3
              text-sm font-medium text-[#7c4dff] hover:text-[#22d3ee]
              transition-colors duration-300 group
            "
            id={`read-more-${index}`}
          >
            Read more
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
