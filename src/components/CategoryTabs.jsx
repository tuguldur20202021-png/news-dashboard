import { useRef, useEffect } from 'react';
import { CATEGORIES } from '../constants/categories';

export default function CategoryTabs({ activeCategory, onSelect }) {
  const scrollRef = useRef(null);
  const activeRef = useRef(null);

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const tab = activeRef.current;
      const containerRect = container.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();

      if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
        tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-[72px] z-40 bg-[#0d1117]/95 backdrop-blur-md border-b border-[#21262d]">
      <div
        ref={scrollRef}
        className="tab-scroll flex gap-2 overflow-x-auto px-4 py-3 max-w-7xl mx-auto"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              ref={isActive ? activeRef : null}
              onClick={() => onSelect(cat.id)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-200 cursor-pointer whitespace-nowrap
                ${isActive
                  ? 'bg-[#7c4dff] text-white shadow-lg shadow-[#7c4dff]/25 tab-active'
                  : 'bg-[#161b22] text-[#8b949e] hover:bg-[#21262d] hover:text-white border border-[#30363d]'
                }
              `}
              id={`tab-${cat.id}`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
