import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Globe, Menu, X, Camera } from 'lucide-react';
import { HOTEL_INFO, Language } from '../data/hotelData';
import { useHotelImages } from '../context/ImageContext';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBookingModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  onOpenBookingModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setUploaderOpen } = useHotelImages();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = {
    rooms: lang === 'ro' ? 'Camere' : 'Rooms',
    amenities: lang === 'ro' ? 'Facilități' : 'Amenities',
    gallery: lang === 'ro' ? 'Galerie' : 'Gallery',
    reviews: lang === 'ro' ? 'Recenzii (10,0)' : 'Reviews (10.0)',
    location: lang === 'ro' ? 'Locație & Politici' : 'Location & Policies',
    bookDirect: lang === 'ro' ? 'Rezervă un Sejur' : 'Book a Stay',
    callNow: lang === 'ro' ? 'Sună Recepția' : 'Call Reception',
    uploadPhotos: lang === 'ro' ? 'Încarcă Foto' : 'Upload Photos'
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-500 ${
      isScrolled
        ? 'bg-[#FAF7F2]/90 backdrop-blur-2xl border-b border-[#1F1A17]/8 shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
        : 'bg-[#FAF7F2]/80 backdrop-blur-xl border-b border-[#1F1A17]/6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between gap-8 transition-all duration-500 ${
          isScrolled ? 'h-16 sm:h-17' : 'h-20 sm:h-22'
        }`}>
          
          {/* Zone 1: Brand Wordmark (Editorial Boutique Typography) */}
          <a href="#" className="flex flex-col group whitespace-nowrap shrink-0 transition-transform">
            <span className={`font-serif font-normal tracking-tight text-[#1F1A17] group-hover:text-[#8E7044] transition-all duration-300 ${
              isScrolled ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'
            }`}>
              The NEST
            </span>
            <span className="text-[9.5px] sm:text-[10px] font-sans tracking-[0.3em] text-[#8E7044] uppercase -mt-0.5">
              Boutique Hotel · Botoșani
            </span>
          </a>

          {/* Zone 2: Navigation Links (Hairline Spacing & Editorial Polish) */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-wide text-[#554639]">
            <a href="#camere" className="hover:text-[#1F1A17] hover:underline underline-offset-8 decoration-[#8E7044]/60 transition-colors whitespace-nowrap shrink-0">
              {t.rooms}
            </a>
            <a href="#facilitati" className="hover:text-[#1F1A17] hover:underline underline-offset-8 decoration-[#8E7044]/60 transition-colors whitespace-nowrap shrink-0">
              {t.amenities}
            </a>
            <a href="#galerie" className="hover:text-[#1F1A17] hover:underline underline-offset-8 decoration-[#8E7044]/60 transition-colors whitespace-nowrap shrink-0">
              {t.gallery}
            </a>
            <a href="#recenzii" className="hover:text-[#1F1A17] hover:underline underline-offset-8 decoration-[#8E7044]/60 transition-colors whitespace-nowrap shrink-0">
              {t.reviews}
            </a>
            <a href="#locatie" className="hover:text-[#1F1A17] hover:underline underline-offset-8 decoration-[#8E7044]/60 transition-colors whitespace-nowrap shrink-0">
              {t.location}
            </a>
          </nav>

          {/* Zone 3: Actions (Jewelry-Inspired Buttons with Brushed Brass Accents) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Language Switch: Fine Jewel Pill */}
            <button
              onClick={() => onLanguageChange(lang === 'ro' ? 'en' : 'ro')}
              className="group relative flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold tracking-wider text-[#6E5D4F] hover:text-[#1F1A17] rounded-full border border-[#C5A059]/40 bg-white/70 hover:bg-white hover:border-[#8E7044] hover:shadow-[0_2px_8px_rgba(197,160,89,0.15)] transition-all duration-300"
              title={lang === 'ro' ? 'Switch to English' : 'Comută în Română'}
            >
              <Globe className="w-3.5 h-3.5 text-[#8E7044] group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-sans">{lang.toUpperCase()}</span>
            </button>

            {/* Direct Phone Dial: Concierge Jewel Badge */}
            <a
              href={`tel:${HOTEL_INFO.phoneRaw}`}
              className="group relative flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-[#1F1A17] rounded-full border border-[#C5A059]/45 bg-white/80 hover:bg-white hover:border-[#8E7044] hover:shadow-[0_2px_12px_rgba(197,160,89,0.18)] transition-all duration-300 whitespace-nowrap shrink-0"
              title="Apelează direct recepția"
            >
              <div className="w-4 h-4 rounded-full bg-[#FAF5ED] flex items-center justify-center border border-[#C5A059]/40 group-hover:scale-105 transition-transform">
                <Phone className="w-2.5 h-2.5 text-[#8E7044]" />
              </div>
              <span className="tabular-nums font-semibold text-[11.5px] text-[#1F1A17] group-hover:text-[#8E7044] transition-colors">{HOTEL_INFO.phone}</span>
            </a>

            {/* Primary Action Button: Charcoal & Brass Pip */}
            <button
              onClick={onOpenBookingModal}
              className="group relative flex items-center gap-2 px-4.5 py-2 text-xs font-semibold tracking-wide text-white bg-[#1F1A17] hover:bg-[#2C2420] rounded-full shadow-[0_2px_10px_rgba(31,26,23,0.12)] hover:shadow-[0_4px_16px_rgba(31,26,23,0.2)] border border-[#1F1A17] transition-all duration-300 whitespace-nowrap shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] group-hover:scale-125 transition-transform" />
              <span>{t.bookDirect}</span>
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onLanguageChange(lang === 'ro' ? 'en' : 'ro')}
              className="px-2.5 py-1 text-xs font-semibold text-[#554639] border border-[#C5A059]/40 rounded-full bg-white/80"
            >
              {lang.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1F1A17] rounded-lg hover:bg-black/5 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#1F1A17]" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer (Frosted Glass & Hairline Dividers) */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#1F1A17]/8 bg-[#FAF7F2]/95 backdrop-blur-2xl px-5 pt-4 pb-6 space-y-4">
          <nav className="flex flex-col space-y-2">
            <a
              href="#camere"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-[#1F1A17] rounded-lg hover:bg-black/5 transition-colors"
            >
              {t.rooms}
            </a>
            <a
              href="#facilitati"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-[#1F1A17] rounded-lg hover:bg-black/5 transition-colors"
            >
              {t.amenities}
            </a>
            <a
              href="#galerie"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-[#1F1A17] rounded-lg hover:bg-black/5 transition-colors"
            >
              {t.gallery}
            </a>
            <a
              href="#recenzii"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-[#1F1A17] rounded-lg hover:bg-black/5 transition-colors"
            >
              {t.reviews}
            </a>
            <a
              href="#locatie"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-[#1F1A17] rounded-lg hover:bg-black/5 transition-colors"
            >
              {t.location}
            </a>
          </nav>

          <div className="pt-3 border-t border-[#1F1A17]/8 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setUploaderOpen(true);
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-[#554639] bg-white border border-[#C5A059]/50 rounded-xl"
            >
              <Camera className="w-4 h-4 text-[#8E7044]" />
              <span>Încarcă Fotografiile Tale Originale</span>
            </button>

            <a
              href={`tel:${HOTEL_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-[#1F1A17] border border-[#C5A059]/40 rounded-xl bg-white shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#8E7044]" />
              <span>{t.callNow}: <strong className="tabular-nums">{HOTEL_INFO.phone}</strong></span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
