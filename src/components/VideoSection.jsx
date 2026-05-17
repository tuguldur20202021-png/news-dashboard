import { VIDEO_FEEDS } from '../constants/categories';

export default function VideoSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto pb-12">
      {VIDEO_FEEDS.map((video, index) => (
        <div
          key={video.playlistId}
          className="card-3d fade-in-up"
          style={{ animationDelay: `${index * 0.1}s` }}
          id={`video-card-${index}`}
        >
          <div className="card-3d-inner glass-card glow-border rounded-2xl overflow-hidden">
            {/* Video embed */}
            <div className="video-container">
              <iframe
                src={`https://www.youtube.com/embed?listType=playlist&list=${video.playlistId}`}
                title={video.label}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Label */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                {video.label}
              </h3>
              <p className="text-xs text-[#8b949e] mt-1">
                Latest channel uploads
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
