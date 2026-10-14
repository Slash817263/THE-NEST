import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Maximize2, MessageCircle, 
  Sparkles, Camera
} from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem, Language, getWhatsAppReservationUrl } from '../data/hotelData';
import { VisualAsset } from './VisualAssets';

interface GallerySectionProps {
  lang: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const [activeModalItemIndex, setActiveModalItemIndex] = useState<number | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Construct an infinite loop track of all hotel gallery items so it wraps seamlessly
  const displayItems = useMemo(() => {
    let base = [...GALLERY_ITEMS];
    while (base.length < 8) {
      base = [...base, ...GALLERY_ITEMS];
    }
    // Duplicate once more for smooth infinite scroll reset
    return [...base, ...base];
  }, []);

  const activeItem: GalleryItem | null = activeModalItemIndex !== null
    ? GALLERY_ITEMS[activeModalItemIndex] || null
    : null;

  // Constant auto-scroll animation engine at exactly 70px/s regardless of screen scroll or mouse hover
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let animId: number;
    let lastTime: number | null = null;
    const pixelsPerSecond = 70; // Constant speed requested: 70 px/s

    const scrollLoop = (time: number) => {
      if (lastTime === null) lastTime = time;
      const rawDelta = (time - lastTime) / 1000;
      const deltaTime = Math.min(rawDelta, 0.05); // Shield against scroll/tab hitch spikes
      lastTime = time;

      if (el) {
        el.scrollLeft += deltaTime * pixelsPerSecond;
        const halfWidth = el.scrollWidth / 2;
        if (halfWidth > 0 && el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }
      animId = requestAnimationFrame(scrollLoop);
    };

    animId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animId);
  }, [displayItems]);

  // Lightbox navigation
  const handleNextModal = () => {
    setActiveModalItemIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null));
  };

  const handlePrevModal = () => {
    setActiveModalItemIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModalItemIndex === null) return;
      if (e.key === 'Escape') {
        setActiveModalItemIndex(null);
      } else if (e.key === 'ArrowRight') {
        handleNextModal();
      } else if (e.key === 'ArrowLeft') {
        handlePrevModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalItemIndex]);

  const t = {
    kicker: lang === 'ro' ? 'Galeria Foto Oficială' : 'Official Photo Gallery',
    title: lang === 'ro' ? 'Descoperiți The NEST în Imagini' : 'Explore The NEST in Photos',
    subtitle: lang === 'ro'
      ? 'Fiecare cadru reflectă atmosfera reală a hotelului: baldachine romantice, grinzi aparente din lemn masiv, băi luxoase din marmură și atenție desăvârșită la detalii.'
      : 'Every view reflects the authentic hotel ambiance: romantic canopies, solid timber beams, luxury marble bathrooms, and dedicated attention to detail.',
    clickToEnlarge: lang === 'ro' ? 'Apasă pentru ecran complet' : 'Click to enlarge view',
    bookThisSpace: lang === 'ro' ? 'Rezervă pe WhatsApp' : 'Reserve on WhatsApp',
    close: lang === 'ro' ? 'Închide' : 'Close',
    curatedDetails: lang === 'ro' ? 'Colecție Privată · The NEST' : 'Private Collection · The NEST'
  };

  return (
    <section id="galerie" className="relative py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#1F1A17]/8 overflow-hidden">
      
      {/* Decorative subtle hairline separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        
        {/* Section Header (Editorial Architecture Layout - C6.1) */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white border border-[#C5A059]/30 shadow-2xs">
            <Camera className="w-3.5 h-3.5 text-[#8E7044]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#8E7044] font-semibold">
              {t.kicker}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1F1A17] font-normal tracking-[-0.015em]">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#6E5D4F] leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

      </div>

      {/* Full-width Seamless Continuous Carousel Track:
          - Constant 70px/s speed maintained
          - Zero intrusive buttons on images when idle
          - Editorial hover zoom and info overlay
          - Hairline brushed brass top/bottom accents (C6.1)
      */}
      <div className="w-full relative group/track">
        {/* Top & Bottom gold hairline accent borders */}
        <div className="absolute top-0 inset-x-0 h-px bg-[#C5A059]/25 z-10 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-[#C5A059]/25 z-10 pointer-events-none" />

        <div 
          ref={trackRef}
          className="flex items-stretch gap-0 overflow-x-auto cursor-pointer select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden bg-[#14100E]"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {displayItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => {
                const realIndex = GALLERY_ITEMS.findIndex(fi => fi.id === item.id);
                setActiveModalItemIndex(realIndex >= 0 ? realIndex : 0);
              }}
              className="group relative shrink-0 w-[280px] sm:w-[360px] md:w-[420px] lg:w-[460px] h-[380px] sm:h-[460px] md:h-[500px] rounded-none overflow-hidden bg-[#14100E] cursor-pointer select-none border-r border-[#C5A059]/20 last:border-r-0"
            >
              {/* Image Asset - Clean view with zero text or buttons by default */}
              <div className="absolute inset-0">
                <VisualAsset
                  type={item.imageType}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out will-change-transform"
                  title={item.title[lang]}
                />
              </div>

              {/* Hover Scrim - Hidden by default, smooth fadeIn on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B09]/95 via-[#0E0B09]/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

              {/* Hover Editorial Content (C6.1) - Revealed exclusively on hover */}
              <div className="absolute inset-0 p-6 sm:p-7 text-white flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
                
                {/* Top Badge: Category & Enlarge Icon */}
                <div className="flex items-center justify-between translate-y-[-4px] group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] uppercase font-semibold tracking-widest px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#FFDE99] border border-[#C5A059]/40 shadow-xs">
                    {item.categoryLabel[lang]}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-[#C5A059]/40 flex items-center justify-center text-white shadow-xs">
                    <Maximize2 className="w-3.5 h-3.5 text-[#FFDE99]" />
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="space-y-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-white leading-snug drop-shadow-sm">
                    {item.title[lang]}
                  </h3>

                  {/* Atmospheric description */}
                  <p className="text-xs sm:text-sm text-[#D8CEBE] line-clamp-3 leading-relaxed">
                    {item.description[lang]}
                  </p>

                  <div className="pt-2 flex items-center gap-1.5 text-[11px] text-[#FFDE99] font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFDE99]" />
                    <span>{t.clickToEnlarge}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bespoke Luxury Gallery Lightbox (C6.2) */}
      {activeItem && activeModalItemIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-[#0A0807]/96 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-fadeIn"
          onClick={() => setActiveModalItemIndex(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-[#14100E] rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.85)] border border-[#C5A059]/30 flex flex-col max-h-[94vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#C5A059]/20 bg-[#1A1412]/95 backdrop-blur-md">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-semibold">
                    {activeItem.categoryLabel[lang]}
                  </span>
                  <span className="text-stone-500 text-xs">·</span>
                  <span className="font-sans text-xs tracking-wider text-[#FFDE99] tabular-nums font-medium">
                    {String(activeModalItemIndex + 1).padStart(2, '0')} / {String(GALLERY_ITEMS.length).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-normal text-white">
                  {activeItem.title[lang]}
                </h3>
              </div>

              {/* Close Button: Jewel circular button */}
              <button
                onClick={() => setActiveModalItemIndex(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C5A059] border border-white/15 hover:border-[#C5A059] text-stone-300 hover:text-white flex items-center justify-center transition-all duration-300"
                aria-label={t.close}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Display Viewport with Touch Swipe */}
            <div 
              className="relative flex-1 min-h-[340px] sm:min-h-[460px] md:min-h-[520px] bg-[#0E0C0B] overflow-hidden flex items-center justify-center select-none touch-pan-y"
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                if (touchStartX.current === null) return;
                const diff = touchStartX.current - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 40) {
                  if (diff > 0) handleNextModal();
                  else handlePrevModal();
                }
                touchStartX.current = null;
              }}
            >
              <VisualAsset
                key={activeItem.id}
                type={activeItem.imageType}
                className="w-full h-full object-contain max-h-[580px] p-2"
                title={activeItem.title[lang]}
              />

              {/* Prev Navigation Jewel Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevModal();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#14100E]/80 hover:bg-[#C5A059] border border-[#C5A059]/40 hover:border-[#C5A059] text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Navigation Jewel Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextModal();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#14100E]/80 hover:bg-[#C5A059] border border-[#C5A059]/40 hover:border-[#C5A059] text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="px-5 py-3 bg-[#181311] overflow-x-auto border-t border-[#C5A059]/20 flex items-center gap-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {GALLERY_ITEMS.map((thumbItem, idx) => (
                <button
                  key={thumbItem.id}
                  onClick={() => setActiveModalItemIndex(idx)}
                  className={`relative shrink-0 w-16 h-12 rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                    idx === activeModalItemIndex 
                      ? 'border-[#C5A059] scale-105 shadow-[0_0_12px_rgba(197,160,89,0.4)] opacity-100 ring-2 ring-[#C5A059]/40' 
                      : 'border-transparent opacity-50 hover:opacity-85'
                  }`}
                  aria-label={thumbItem.title[lang]}
                >
                  <VisualAsset
                    type={thumbItem.imageType}
                    className="w-full h-full object-cover"
                    title={thumbItem.title[lang]}
                  />
                </button>
              ))}
            </div>

            {/* Bottom Caption Bar with Direct WhatsApp Action */}
            <div className="px-6 py-5 bg-[#14100E] border-t border-[#C5A059]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium">
                  {t.curatedDetails}
                </span>
                <p className="text-xs sm:text-sm text-[#D8CEBE] leading-relaxed">
                  {activeItem.description[lang]}
                </p>
              </div>

              {/* Direct Booking Action via WhatsApp */}
              <a
                href={getWhatsAppReservationUrl(activeItem.title[lang], lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#1F1A17] hover:bg-[#2A231F] text-white text-xs font-semibold border border-[#C5A059]/60 hover:border-[#C5A059] shadow-[0_2px_12px_rgba(197,160,89,0.22)] transition-all duration-300 whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
                <span className="text-[#FFDE99] group-hover:text-white transition-colors">{t.bookThisSpace}</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
