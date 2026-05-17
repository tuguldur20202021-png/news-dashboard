export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1 max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="w-4 h-4 text-[#7c4dff]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        id="search-bar"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search articles..."
        className="
          w-full pl-10 pr-4 py-2.5 rounded-xl
          bg-[#111827]/60 backdrop-blur-md
          border border-[#7c4dff]/10
          text-white placeholder-[#8b949e]
          text-sm focus:outline-none search-glow
          transition-all duration-300
          focus:border-[#7c4dff]/40
          hover:border-[#7c4dff]/20
        "
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#8b949e] hover:text-[#7c4dff] cursor-pointer transition-colors duration-200"
          aria-label="Clear search"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
