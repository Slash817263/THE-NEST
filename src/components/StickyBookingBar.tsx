import React from 'react';
import { Phone, MessageCircle, ExternalLink } from 'lucide-react';
import { HOTEL_INFO, Language, getWhatsAppReservationUrl } from '../data/hotelData';
import { BookingLogo } from './BrandLogos';

interface StickyBookingBarProps {
  lang: Language;
  onOpenBookingModal: () => void;
}

export const StickyBookingBar: React.FC<StickyBookingBarProps> = ({ lang, onOpenBookingModal }) => {
  const t = {
    call: lang === 'ro' ? 'Sună' : 'Call',
    booking: 'Booking.com',
    whatsapp: 'WhatsApp',
  };

  return (
    <aside 
      aria-label="Direct booking console"
      className="fixed bottom-0 inset-x-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-2xl border-t border-[#1F1A17]/10 py-3 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(31,26,23,0.08)] sm:hidden"
    >
      <div className="flex items-center justify-between gap-2.5 max-w-md mx-auto">
        
        {/* Rating seal & brand mark */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8.5 h-8.5 rounded-full bg-[#1F1A17] text-[#FFDE99] flex items-center justify-center font-serif font-medium text-xs border border-white/20 shadow-xs">
            <span>10</span>
          </div>
          <div className="flex flex-col text-[10px] leading-tight">
            <span className="font-serif font-medium text-[#1F1A17]">The NEST</span>
            <span className="text-[#8E7044] font-semibold tracking-wide">10/10 Superb</span>
          </div>
        </div>

        {/* Action Buttons (Jewelry / Minimalist Boutique Style) */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <a
            href={HOTEL_INFO.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 px-3 text-[11px] font-semibold text-white bg-[#1F1A17] active:bg-[#2C2420] border border-[#1F1A17] rounded-full shadow-2xs whitespace-nowrap"
            title="Verifică pe Booking.com"
          >
            <BookingLogo className="h-3 w-auto shrink-0" variant="icon" />
            <span>{t.booking}</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>

          <a
            href={getWhatsAppReservationUrl(undefined, lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 px-3 text-[11px] font-semibold text-[#1F1A17] bg-[#FFDE99] active:bg-[#FFE8B8] border border-[#C5A059]/40 rounded-full shadow-2xs whitespace-nowrap"
            title="Chat direct pe WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#1F1A17]" />
            <span>{t.whatsapp}</span>
          </a>

          <a
            href={`tel:${HOTEL_INFO.phoneRaw}`}
            className="flex items-center justify-center p-2 text-xs font-semibold text-[#1F1A17] bg-white border border-[#C5A059]/45 rounded-full shadow-2xs active:bg-[#FAF7F2]"
            title="Apelează recepția"
          >
            <Phone className="w-3.5 h-3.5 text-[#8E7044]" />
          </a>
        </div>

      </div>
    </aside>
  );
};
