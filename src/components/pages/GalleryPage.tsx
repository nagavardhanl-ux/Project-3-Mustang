import React, { useState, useEffect, useRef } from 'react';
import { GALLERY_PHOTOS } from '../../data/galleryData';
import { GalleryPhoto } from '../../types/mustang';
import { X, ChevronLeft, ChevronRight, Camera, Maximize2, Layers } from 'lucide-react';

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const activeThumbnailRef = useRef<HTMLButtonElement | null>(null);

  const categories = [
    { id: 'all', label: 'All Exhibits' },
    { id: 'classic', label: 'Classic Mustangs' },
    { id: 'modern', label: 'Modern Era' },
    { id: 'racing', label: 'Racing & Track' },
    { id: 'engines', label: 'Engines & Mechanics' },
    { id: 'interiors', label: 'Cockpits & Interiors' },
    { id: 'concepts', label: 'Prototypes & Concepts' },
    { id: 'historical', label: 'Historical Moments' },
    { id: 'details', label: 'Design Details' },
  ];

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) => {
    if (activeCategory === 'all') return true;
    return photo.category === activeCategory;
  });

  // Calculate current active index
  const currentIndex = selectedPhoto
    ? filteredPhotos.findIndex((p) => p.id === selectedPhoto.id)
    : -1;

  const handlePrev = () => {
    if (!selectedPhoto || filteredPhotos.length === 0) return;
    const prevIndex = currentIndex <= 0 ? filteredPhotos.length - 1 : currentIndex - 1;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedPhoto || filteredPhotos.length === 0) return;
    const nextIndex = currentIndex >= filteredPhotos.length - 1 ? 0 : currentIndex + 1;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!selectedPhoto) return;

    // Lock background page scroll while lightbox is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedPhoto(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedPhoto, currentIndex, filteredPhotos]);

  // Auto-scroll the active thumbnail into the center of the thumbnail bar
  useEffect(() => {
    if (activeThumbnailRef.current) {
      activeThumbnailRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [selectedPhoto?.id]);

  // Scroll thumbnail reel left/right via control buttons
  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (thumbnailStripRef.current) {
      const scrollDistance = 320;
      thumbnailStripRef.current.scrollBy({
        left: direction === 'left' ? -scrollDistance : scrollDistance,
        behavior: 'smooth',
      });
    }
  };

  // Enable mouse wheel horizontal scrolling on thumbnail strip
  const handleThumbnailWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (thumbnailStripRef.current) {
      thumbnailStripRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="bg-[#080808] text-white pt-24 pb-32 min-h-screen">
      {/* Header Section */}
      <section className="relative py-16 border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-amber-400 tracking-widest uppercase mb-3">
            <Camera size={14} />
            <span>Digital Photographic Archive</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-editorial font-bold text-white tracking-wide uppercase">
            Visual Archive
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 font-sans max-w-xl mx-auto leading-relaxed">
            High-resolution photography, archival film scans, styling concepts, and mechanical close-ups across six decades of Mustang history.
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#c02424] text-white font-semibold shadow-lg shadow-red-900/30'
                    : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-white/10 hover:bg-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry / Dynamic Photographic Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-xs font-mono text-neutral-400 mb-6 flex items-center justify-between">
          <span>Showing {filteredPhotos.length} curated archival images</span>
          <span className="text-amber-400">Click any image to enlarge</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-amber-400/60 bg-neutral-900/50 cursor-pointer transition-all shadow-lg hover:shadow-2xl"
            >
              <div className="h-72 w-full overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-semibold">
                  {photo.category} • {photo.year}
                </div>
                <h3 className="text-lg font-editorial font-bold text-white mt-1">
                  {photo.title}
                </h3>
                <p className="text-xs text-neutral-300 font-sans line-clamp-2 mt-1">
                  {photo.caption}
                </p>
                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span>Source: {photo.credit}</span>
                  <Maximize2 size={12} className="text-white" />
                </div>
              </div>

              {/* Static Badge on Card */}
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono text-neutral-300 border border-white/10 uppercase">
                {photo.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal with Side-by-Side Photo, Details, and Thumbnail Reel */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-xl animate-fadeIn flex flex-col"
          onClick={(e) => {
            // Close when clicking directly on the backdrop background
            if (e.target === e.currentTarget) {
              setSelectedPhoto(null);
            }
          }}
        >
          {/* Top Bar with Navigation Info & Controls */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-gradient-to-b from-black/95 via-black/80 to-transparent backdrop-blur-md border-b border-white/10">
            <div className="flex items-center space-x-3 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-[#c02424] text-white font-bold uppercase tracking-wider text-[10px]">
                {selectedPhoto.category}
              </span>
              <span className="text-amber-400 font-bold">
                {currentIndex >= 0 ? `EXHIBIT ${currentIndex + 1} OF ${filteredPhotos.length}` : ''}
              </span>
              <span className="hidden md:inline text-neutral-400">
                • Use ← → arrow keys to flip, ESC to close
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {/* Quick prev/next in top header */}
              <button
                onClick={handlePrev}
                title="Previous Image (Left Arrow)"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                title="Next Image (Right Arrow)"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105"
              >
                <ChevronRight size={18} />
              </button>
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                title="Close Lightbox (ESC)"
                className="p-2 rounded-full bg-white/10 hover:bg-[#c02424] text-white transition-all hover:scale-105 ml-2"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Modal Main Content: Side-by-Side Layout (Image on Left, Details + Thumbnails on Right) */}
          <div className="max-w-[1700px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 flex-1 flex flex-col lg:flex-row gap-5 items-stretch min-h-0">
            {/* LEFT / MAIN STAGE: Enlarged Image with Floating Prev/Next Buttons */}
            <div className="flex-1 min-w-0 min-h-[45vh] lg:min-h-[78vh] lg:h-[78vh] relative rounded-2xl overflow-hidden border border-white/15 bg-neutral-950/90 flex items-center justify-center shadow-2xl">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-h-[74vh] w-auto max-w-full object-contain select-none transition-all duration-300"
              />

              {/* Floating Previous Button */}
              <button
                onClick={handlePrev}
                aria-label="Previous Image"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-black/75 hover:bg-[#c02424] text-white border border-white/20 hover:border-transparent transition-all shadow-2xl hover:scale-110"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Floating Next Button */}
              <button
                onClick={handleNext}
                aria-label="Next Image"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-black/75 hover:bg-[#c02424] text-white border border-white/20 hover:border-transparent transition-all shadow-2xl hover:scale-110"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* RIGHT SIDEBAR: Vehicle Details (Top) + Side Thumbnail Reel (Bottom) */}
            <div className="w-full lg:w-[380px] xl:w-[440px] shrink-0 flex flex-col gap-4 lg:h-[78vh]">
              {/* Exhibit Description & Metadata Card */}
              <div className="p-5 rounded-2xl bg-neutral-900/90 border border-white/10 shadow-xl flex flex-col shrink-0 max-h-[46%] overflow-y-auto scrollbar-thin">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-[#c02424] text-white font-mono font-bold uppercase tracking-wider text-[10px]">
                      {selectedPhoto.category}
                    </span>
                    <span className="text-amber-400 font-mono text-xs font-bold">
                      ({selectedPhoto.year})
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-neutral-400">
                    Exhibit {currentIndex + 1} / {filteredPhotos.length}
                  </div>
                </div>

                <h2 className="text-white font-editorial text-lg sm:text-xl font-bold leading-tight mb-2">
                  {selectedPhoto.title}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed mb-3">
                  {selectedPhoto.caption}
                </p>

                <div className="text-[11px] font-mono text-neutral-400 pt-2 border-t border-white/10">
                  Archival Credit: <span className="text-neutral-200">{selectedPhoto.credit}</span>
                </div>
              </div>

              {/* Side Thumbnail Reel — Click any to inspect or scroll through */}
              <div className="flex-1 min-h-[240px] rounded-2xl bg-neutral-950/80 border border-white/10 p-3.5 shadow-xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2.5 shrink-0">
                  <div className="flex items-center space-x-2">
                    <Layers size={14} className="text-amber-400" />
                    <span className="text-white font-semibold uppercase tracking-wider">
                      All Exhibits
                    </span>
                    <span className="text-amber-400 font-mono">
                      ({filteredPhotos.length})
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-500">
                    Click to select
                  </span>
                </div>

                {/* 2-Column Vertical Scrollable Grid of Thumbnails */}
                <div
                  ref={thumbnailStripRef}
                  className="flex-1 overflow-y-auto pr-1 grid grid-cols-2 gap-2 scrollbar-thin"
                >
                  {filteredPhotos.map((photo, idx) => {
                    const isActive = photo.id === selectedPhoto.id;
                    return (
                      <button
                        key={photo.id}
                        ref={isActive ? activeThumbnailRef : null}
                        onClick={() => setSelectedPhoto(photo)}
                        title={`${photo.title} (${photo.year})`}
                        className={`relative h-20 sm:h-22 rounded-lg overflow-hidden transition-all duration-200 group focus:outline-none text-left ${
                          isActive
                            ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-black scale-[1.02] shadow-xl shadow-amber-500/25'
                            : 'opacity-55 hover:opacity-100 hover:scale-[1.01] border border-white/10'
                        }`}
                      >
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-1 left-1.5 right-1.5 text-[9px] font-mono text-neutral-200 truncate">
                          {photo.title}
                        </div>
                        <span className="absolute top-1 left-1.5 bg-black/80 px-1 py-0.2 rounded text-[8px] font-mono text-amber-400 font-semibold">
                          #{idx + 1}
                        </span>
                        {isActive && (
                          <div className="absolute top-0 inset-x-0 h-1 bg-amber-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
