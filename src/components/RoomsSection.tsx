import React, { useState } from 'react';
import { Phone, MessageCircle, ExternalLink, BedDouble, Sparkles, CheckCircle2 } from 'lucide-react';
import { ROOMS, HOTEL_INFO, Room, Language } from '../data/hotelData';
import { VisualAsset } from './VisualAssets';
import { BookingLogo } from './BrandLogos';

interface RoomsSectionProps {
  lang: Language;
  onSelectRoom: (room: Room) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ lang, onSelectRoom }) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>('all');

  const displayedRooms = selectedRoomId === 'all'
    ? ROOMS
    : ROOMS.filter(r => r.id === selectedRoomId);

  const t = {
    sectionKicker: lang === 'ro' ? 'Suite & Camere de Lux' : 'Luxury Suites & Rooms',
    title: lang === 'ro' ? 'Sanctuare de Odihnă & Intimitate' : 'Sanctuaries of Rest & Privacy',
    subtitle: lang === 'ro'
      ? 'Fiecare cameră este o compoziție arhitecturală unică, sculptată în materiale naturale, paturi mari extra-lungi (>2m), baldachine diafane și băi private en-suite. Rezervați direct fără comisioane adiționale sau verificați profilul oficial Booking.com.'
      : 'Each room is an architectural composition of natural timber, romantic sheer canopies, extra-long beds (>2m), and private en-suite bathrooms. Book direct without intermediary fees or inspect our official Booking.com profile.',
    allTab: lang === 'ro' ? 'Toate Suitele' : 'All Suites',
    seeRateOnBooking: lang === 'ro' ? 'Verifică pe Booking.com' : 'Check on Booking.com',
    bookDirect: lang === 'ro' ? 'Rezervă Direct (WhatsApp)' : 'Book Direct (WhatsApp)',
    directHostNotice: lang === 'ro' ? 'Linie directă recepție:' : 'Direct concierge line:',
    guaranteedRate: lang === 'ro' ? 'Tarif direct garantat de gazdă' : 'Direct rate guaranteed by host',
    roomSubtitles: {
      'queen-superioara': lang === 'ro' ? 'Suită cu Baldachin Diafan & Leagăn Macrame' : 'Canopy Bed & Macrame Swing Chair Suite',
      'dubla-deluxe': lang === 'ro' ? 'Cameră cu Grinzi Masive & Balansoar Artizanal' : 'Exposed Solid Timber Beams & Rocking Chair'
    },
    curatedHighlights: {
      'queen-superioara': [
        lang === 'ro' ? 'Baldachin diafan din voal alb & leagăn suspendat macrame' : 'Romantic sheer canopy drapery & handcrafted macrame swing chair',
        lang === 'ro' ? 'Pat Queen-size extra lung (>2m) cu saltea ortopedică de lux' : 'Extra-long Queen bed (>2m) with orthopedic luxury mattress',
        lang === 'ro' ? 'Baie privată spa cu cadă relaxantă, papuci și cosmetice premium' : 'En-suite spa bathroom with bathtub, slippers & premium toiletries'
      ],
      'dubla-deluxe': [
        lang === 'ro' ? 'Tavan înalt spectaculos cu grinzi aparente din lemn masiv' : 'Dramatic high ceiling with majestic exposed solid timber beams',
        lang === 'ro' ? 'Fotoliu balansoar din lemn alb & consolă artizanală suspendată' : 'White wooden rocking chair & artisan rope-suspended console',
        lang === 'ro' ? 'Baie privată elegantă complet utilată cu finisaje nobile' : 'Fully equipped luxury en-suite bathroom with noble stone finishes'
      ]
    }
  };

  return (
    <section id="camere" className="py-18 sm:py-28 bg-[#F4EFEA] border-b border-[#1F1A17]/8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Editorial Architecture Style */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-px bg-[#8E7044]/40" />
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#8E7044] font-semibold">
              {t.sectionKicker}
            </p>
            <span className="w-6 h-px bg-[#8E7044]/40" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#1F1A17] font-normal tracking-[-0.015em] leading-tight">
            {t.title}
          </h2>

          <p className="text-sm sm:text-base text-[#6E5D4F] leading-relaxed max-w-2xl mx-auto font-light">
            {t.subtitle}
          </p>

          {/* Room Selector Filter Tabs (Jewelry Pill Style) */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setSelectedRoomId('all')}
              className={`px-4.5 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
                selectedRoomId === 'all'
                  ? 'bg-[#1F1A17] text-[#FAF7F2] shadow-[0_2px_12px_rgba(31,26,23,0.15)] ring-1 ring-[#1F1A17]'
                  : 'bg-white/80 text-[#6E5D4F] hover:bg-white hover:text-[#1F1A17] border border-[#1F1A17]/10'
              }`}
            >
              {t.allTab}
            </button>
            {ROOMS.map(r => (
              <button
                key={r.id}
                onClick={() => setSelectedRoomId(r.id)}
                className={`px-4.5 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
                  selectedRoomId === r.id
                    ? 'bg-[#1F1A17] text-[#FAF7F2] shadow-[0_2px_12px_rgba(31,26,23,0.15)] ring-1 ring-[#1F1A17]'
                    : 'bg-white/80 text-[#6E5D4F] hover:bg-white hover:text-[#1F1A17] border border-[#1F1A17]/10'
                }`}
              >
                {r.name[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Room Cards Grid (Editorial Suite Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12">
          {displayedRooms.map((room) => {
            const highlights = t.curatedHighlights[room.id as 'queen-superioara' | 'dubla-deluxe'] || [];
            const subLabel = t.roomSubtitles[room.id as 'queen-superioara' | 'dubla-deluxe'] || '';

            return (
              <article
                key={room.id}
                className="group relative flex flex-col rounded-3xl bg-white border border-[#1F1A17]/8 overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(31,26,23,0.08)] transition-all duration-700"
              >
                {/* Visual Asset Canvas */}
                <div className="relative h-80 sm:h-96 md:h-[420px] overflow-hidden bg-[#1F1A17]">
                  <VisualAsset
                    type={room.imageType}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                    title={room.name[lang]}
                  />

                  {/* Editorial Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

                  {/* Official Booking Live Badge - Discreet Luxury Seal */}
                  <div className="absolute top-4 right-4 bg-[#1F1A17]/85 backdrop-blur-md text-[#FFDE99] text-[10.5px] font-medium tracking-wider px-3.5 py-1.5 rounded-full border border-white/20 shadow-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFDE99] animate-pulse" />
                    <span>Booking.com · 10/10 Superb</span>
                  </div>

                  {/* Room Name & Category Overlay */}
                  <div className="absolute bottom-5 inset-x-6 sm:inset-x-8 text-white space-y-1">
                    <div className="inline-flex items-center gap-2">
                      <span className="w-4 h-px bg-[#FFDE99]/60" />
                      <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#FFDE99]">
                        {subLabel}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight leading-snug">
                      {room.name[lang]}
                    </h3>
                  </div>
                </div>

                {/* Content & Specs Area */}
                <div className="p-7 sm:p-9 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4.5">
                    <p className="text-xs sm:text-[13px] font-serif italic text-[#8E7044] leading-relaxed">
                      „{room.tagline[lang]}”
                    </p>

                    <p className="text-xs sm:text-sm text-[#554639] leading-relaxed font-light">
                      {room.description[lang]}
                    </p>

                    {/* Room Bed Spec Pill */}
                    {room.bed[lang] ? (
                      <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#1F1A17]/6 text-xs text-[#6E5D4F] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <BedDouble className="w-4 h-4 text-[#8E7044] shrink-0" />
                          <span className="font-semibold text-[#1F1A17]">{room.bed[lang]}</span>
                        </div>
                        <span className="text-[10.5px] uppercase tracking-wider text-[#8E7044] font-medium hidden sm:inline">
                          {t.guaranteedRate}
                        </span>
                      </div>
                    ) : null}

                    {/* 3 Curated Signature Luxury Highlights */}
                    <div className="space-y-2.5 pt-1.5">
                      {highlights.map((hl, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-[#2C2420]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8E7044] shrink-0 mt-1" />
                          <span className="leading-relaxed font-normal">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Area: 2 Distinguishable High-End Actions */}
                  <div className="pt-6 border-t border-[#1F1A17]/8 space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      
                      {/* Action 1: Official Booking Live Verification */}
                      <a
                        href={HOTEL_INFO.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn flex items-center justify-center gap-2 py-3.5 px-4 text-xs sm:text-sm font-semibold text-white bg-[#1F1A17] hover:bg-[#2C2420] border border-[#1F1A17] rounded-2xl transition-all duration-300 shadow-xs hover:shadow-md"
                        title={t.seeRateOnBooking}
                      >
                        <BookingLogo className="h-3.5 w-auto shrink-0" variant="icon" />
                        <span>{t.seeRateOnBooking}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>

                      {/* Action 2: Direct Reservation Modal */}
                      <button
                        onClick={() => onSelectRoom(room)}
                        className="flex items-center justify-center gap-2 py-3.5 px-4 text-xs sm:text-sm font-semibold text-[#1F1A17] bg-[#FAF7F2] hover:bg-white border border-[#C5A059]/40 hover:border-[#8E7044] rounded-2xl transition-all duration-300 shadow-2xs hover:shadow-xs"
                        title={t.bookDirect}
                      >
                        <MessageCircle className="w-4 h-4 text-[#8E7044]" />
                        <span>{t.bookDirect}</span>
                      </button>

                    </div>

                    {/* Subtle Direct Concierge Line */}
                    <div className="flex items-center justify-between text-[11px] text-[#7A6958] px-1 pt-1">
                      <span>{t.directHostNotice}</span>
                      <a 
                        href={`tel:${HOTEL_INFO.phoneRaw}`} 
                        className="font-semibold text-[#1F1A17] hover:text-[#8E7044] flex items-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3 h-3 text-[#8E7044]" />
                        <span>{HOTEL_INFO.phone}</span>
                      </a>
                    </div>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
