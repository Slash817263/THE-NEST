import React from 'react';
import { ExternalLink, Star, MapPin, Coffee, ShieldCheck, BedDouble, Car } from 'lucide-react';
import { HOTEL_INFO, Language } from '../data/hotelData';
import { VisualAsset } from './VisualAssets';

interface HeroProps {
  lang: Language;
  onOpenBookingModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = {
    kicker: lang === 'ro' ? 'Boutique Hotel · Botoșani' : 'Boutique Hotel · Botoșani, Romania',
    address: 'Bulevardul Mihai Eminescu / Str. Ana Ipătescu nr. 2, Botoșani',
    subtitle: lang === 'ro'
      ? 'Un sanctuar intim de rafinament și liniște în inima Botoșaniului. Camere concepute cu baldachine diafane, grinzi aparente din lemn masiv și băi private de lux, create pentru oaspeți care apreciază detaliile impecabile.'
      : 'An intimate sanctuary of refinement and calm in the heart of Botoșani. Crafted with romantic canopies, solid timber beams, and en-suite luxury bathrooms, tailored for travelers who appreciate impeccable detail.',
    ratingScore: HOTEL_INFO.ratingScore,
    ratingLabel: lang === 'ro' ? 'Scor 10,0 · Superb pe Booking.com' : '10.0 Superb Rating on Booking.com',
    chips: [
      {
        icon: Coffee,
        label: lang === 'ro' ? 'Mic dejun disponibil' : 'Breakfast available'
      },
      {
        icon: Car,
        label: lang === 'ro' ? 'Parcare privată gratuită' : 'Free private parking'
      },
      {
        icon: BedDouble,
        label: lang === 'ro' ? 'Paturi extra lungi (>2m)' : 'Extra-long beds (>2m)'
      },
      {
        icon: ShieldCheck,
        label: lang === 'ro' ? 'Proprietate fără fumători & alergeni' : 'Non-smoking & hypoallergenic'
      }
    ]
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] pt-6 pb-16 lg:pt-10 lg:pb-24 border-b border-[#1F1A17]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Strip: Centered Address & Official 10.0 Superb Score Seal */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pb-6 border-b border-[#1F1A17]/8 mb-10 text-xs text-center">
          <div className="flex items-center justify-center gap-2 text-[#6E5D4F]">
            <MapPin className="w-3.5 h-3.5 text-[#8E7044] shrink-0" />
            <span className="font-medium text-[#1F1A17]">{t.address}</span>
          </div>

          <span className="hidden sm:inline text-stone-300">|</span>

          {/* Official 10.0 Boutique Quality Seal (Quiet Luxury Harmony) */}
          <a
            href={HOTEL_INFO.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#C5A059]/40 hover:border-[#8E7044] shadow-[0_2px_10px_rgba(197,160,89,0.12)] transition-all"
            title="Verifică recenziile oficiale pe Booking.com"
          >
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1F1A17] text-white font-bold tabular-nums">
              <span className="text-xs font-serif text-[#FFDE99]">10,0</span>
              <span className="text-[9px] tracking-wider uppercase font-sans text-[#E5D7BF]">/ 10</span>
            </div>
            <div className="flex items-center gap-1 text-[#C5A059]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059]" />
              ))}
            </div>
            <span className="font-medium text-[#1F1A17] text-xs group-hover:text-[#8E7044] transition-colors">
              {t.ratingLabel}
            </span>
            <ExternalLink className="w-3 h-3 text-[#8E7044] opacity-70 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        {/* Centered Editorial Header (Playfair Display & Arch Digest Typography) */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-10">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-[#8E7044] font-semibold block">
            {t.kicker}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.015em] text-[#1F1A17] leading-[1.14]">
            {HOTEL_INFO.name}
          </h1>
          <p className="text-sm sm:text-base text-[#6E5D4F] leading-relaxed max-w-2xl mx-auto font-normal">
            {t.subtitle}
          </p>

          {/* Centered Signature Chips (Hairline Borders & Pure Aesthetic) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 max-w-3xl mx-auto">
            {t.chips.map((chip, idx) => {
              const Icon = chip.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-white/90 border border-[#1F1A17]/8 shadow-[0_1px_4px_rgba(0,0,0,0.02)] text-xs text-[#2C2420]"
                >
                  <Icon className="w-3.5 h-3.5 text-[#8E7044]" />
                  <span className="font-medium">{chip.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Centered Architectural Visual Showcase Frame */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(31,26,23,0.1)] border border-[#1F1A17]/10 bg-[#1F1A17] group">
            <VisualAsset
              type="hero"
              priority={true}
              className="w-full h-[400px] sm:h-[520px] object-cover transition-transform duration-700 group-hover:scale-102"
              title={`${HOTEL_INFO.name} - Boutique Hotel Botoșani`}
            />

            {/* Subtle Gradient Scrim for luxury depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
          </div>
        </div>

      </div>
    </section>
  );
};
