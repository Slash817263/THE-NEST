import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, MessageCircle, Sparkles } from 'lucide-react';
import { HOTEL_INFO, Language, getWhatsAppReservationUrl } from '../data/hotelData';
import { BookingLogo, FacebookLogo } from './BrandLogos';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const currentYear = new Date().getFullYear();

  const t = {
    quote: HOTEL_INFO.quote[lang],
    hashtags: HOTEL_INFO.hashtags,
    quickLinks: lang === 'ro' ? 'Navigare & Suite' : 'Navigation & Suites',
    rooms: lang === 'ro' ? 'Suite & Camere' : 'Suites & Rooms',
    amenities: lang === 'ro' ? 'Facilități Hotel' : 'Hotel Amenities',
    gallery: lang === 'ro' ? 'Galerie Foto' : 'Photo Gallery',
    reviews: lang === 'ro' ? 'Recenzii Oaspeți (10,0)' : 'Guest Reviews (10.0)',
    location: lang === 'ro' ? 'Locație & Împrejurimi' : 'Location & Surroundings',
    contactTitle: lang === 'ro' ? 'Contact & Concierge Direct' : 'Contact & Direct Concierge',
    receptionHours: lang === 'ro' ? 'Asistență & Rezervări telefonice / WhatsApp: Zilnic' : 'Front Desk & WhatsApp Support: Daily',
    bookingNotice: lang === 'ro'
      ? 'Fără plăți online pe site. Rezervările se confirmă direct telefonic sau pe WhatsApp.'
      : 'No online payment processing on website. Reservations confirmed directly via Phone or WhatsApp.',
    copyright: lang === 'ro'
      ? 'Toate drepturile rezervate. The NEST Boutique Hotel Botoșani.'
      : 'All rights reserved. The NEST Boutique Hotel Botoșani.',
    viewOnBooking: lang === 'ro' ? 'Profil Oficial Booking.com' : 'Official Booking.com Listing',
    facebookPage: lang === 'ro' ? 'Pagină Facebook Oficială' : 'Official Facebook Page'
  };

  return (
    <footer className="bg-[#14100E] text-[#D8CFBF] pt-18 pb-12 border-t border-[#261F1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[#261F1B]">
          
          {/* Col 1: Brand & Bio with authentic quote (5 cols) */}
          <div className="lg:col-span-5 space-y-4.5">
            <div>
              <span className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#FAF7F2] block">
                {HOTEL_INFO.name}
              </span>
              <span className="text-[10px] font-sans tracking-[0.3em] text-[#C5A059] uppercase block pt-1">
                Boutique Hotel · Botoșani
              </span>
            </div>

            <p className="font-serif italic text-xs sm:text-sm text-[#B3A494] leading-relaxed max-w-sm">
              „{t.quote}”
            </p>
            
            <p className="text-[11px] font-sans font-medium text-[#C5A059]/90 tracking-wide">
              {t.hashtags}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={HOTEL_INFO.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#221B17] hover:bg-[#322822] border border-[#C5A059]/30 hover:border-[#C5A059]/60 transition-all shadow-2xs hover:shadow"
                title="Deschide profilul oficial Booking.com"
              >
                <BookingLogo className="h-3.5 w-auto shrink-0" variant="icon" />
                <span>Booking.com · 10/10</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <a
                href={HOTEL_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#1877F2]/90 hover:bg-[#1877F2] transition-all shadow-2xs hover:shadow"
                title="Deschide pagina oficială Facebook"
              >
                <FacebookLogo className="w-4 h-4 shrink-0" />
                <span>Facebook</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="font-serif text-base font-normal text-[#FAF7F2] tracking-wide">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#A89A8B]">
              <li>
                <a href="#camere" className="hover:text-[#FAF7F2] transition-colors">
                  {t.rooms}
                </a>
              </li>
              <li>
                <a href="#facilitati" className="hover:text-[#FAF7F2] transition-colors">
                  {t.amenities}
                </a>
              </li>
              <li>
                <a href="#galerie" className="hover:text-[#FAF7F2] transition-colors">
                  {t.gallery}
                </a>
              </li>
              <li>
                <a href="#recenzii" className="hover:text-[#FAF7F2] transition-colors">
                  {t.reviews}
                </a>
              </li>
              <li>
                <a href="#locatie" className="hover:text-[#FAF7F2] transition-colors">
                  {t.location}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Direct Inquiries (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="font-serif text-base font-normal text-[#FAF7F2] tracking-wide">
              {t.contactTitle}
            </h4>
            
            <div className="space-y-3 text-xs sm:text-sm">
              <a 
                href={`tel:${HOTEL_INFO.phoneRaw}`}
                className="flex items-center gap-3 text-[#A89A8B] hover:text-[#FAF7F2] transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#221B17] flex items-center justify-center border border-white/5 group-hover:border-[#C5A059]/40">
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                </div>
                <span>{HOTEL_INFO.phone}</span>
              </a>

              <a 
                href={getWhatsAppReservationUrl(undefined, lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#A89A8B] hover:text-[#FAF7F2] transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#221B17] flex items-center justify-center border border-white/5 group-hover:border-[#C5A059]/40">
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                </div>
                <span>WhatsApp: {HOTEL_INFO.phone}</span>
              </a>

              <a 
                href={`mailto:${HOTEL_INFO.email}`}
                className="flex items-center gap-3 text-[#A89A8B] hover:text-[#FAF7F2] transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#221B17] flex items-center justify-center border border-white/5 group-hover:border-[#C5A059]/40">
                  <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                </div>
                <span>{HOTEL_INFO.email}</span>
              </a>

              <div className="flex items-start gap-3 text-[#A89A8B] pt-1">
                <div className="w-7 h-7 rounded-lg bg-[#221B17] flex items-center justify-center border border-white/5 shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                </div>
                <span className="leading-snug">{HOTEL_INFO.address}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#8C7E70] pt-2 leading-relaxed">
              {t.receptionHours}
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7E70]">
          <p>
            © {currentYear} {t.copyright}
          </p>

          <div className="text-[11px] text-[#A89A8B]">
            {t.bookingNotice}
          </div>
        </div>

      </div>
    </footer>
  );
};
