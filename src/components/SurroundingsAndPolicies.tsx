import React from 'react';
import { 
  Clock, Baby, Ban, Shield, MapPin, 
  ExternalLink, MessageCircle, Car, Sparkles, Navigation
} from 'lucide-react';
import { HOTEL_INFO, Language, getWhatsAppReservationUrl } from '../data/hotelData';
import { BookingLogo } from './BrandLogos';

interface Props {
  lang: Language;
}

export const SurroundingsAndPolicies: React.FC<Props> = ({ lang }) => {
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("The NEST Boutique Hotel, Bulevardul Mihai Eminescu, Botoșani")}`;
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent("Bulevardul Mihai Eminescu 2, Botosani, Romania")}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  const t = {
    kicker: lang === 'ro' ? 'Locație & Ospitalitate' : 'Location & Hospitality',
    title: lang === 'ro' ? 'Amplasare & Promisiuni de Liniște' : 'Prime Location & Quiet Sanctuary',
    subtitle: lang === 'ro'
      ? 'Situat pe Bulevardul Mihai Eminescu nr. 2 din Botoșani, The NEST vă oferă acces facil la principalele repere ale orașului, garantând totodată intimitate deplină, parcare privată și o atmosferă de profundă relaxare.'
      : 'Situated at 2 Mihai Eminescu Boulevard in Botoșani, The NEST combines effortless connectivity to local landmarks with absolute privacy, free parking, and serene relaxation.',
    openMaps: lang === 'ro' ? 'Deschide în Google Maps' : 'Open in Google Maps',
    landmarksTitle: lang === 'ro' ? 'Repere în proximitate:' : 'Nearby highlights:',
    landmarks: [
      lang === 'ro' ? 'Parcul Sucevei (300 m)' : 'Sucevei Park (300 m)',
      lang === 'ro' ? 'Parcul Mihai Eminescu (850 m)' : 'Mihai Eminescu Park (850 m)',
      lang === 'ro' ? 'Aeroportul Suceava (28 km)' : 'Suceava Airport (28 km)'
    ],
    rulesTitle: lang === 'ro' ? 'Promisiuni de Liniște & Confort' : 'Promises of Peace & Comfort',
    rulesBadge: lang === 'ro' ? 'Ospitalitate Verificată' : 'Verified Hospitality',
    checkInTitle: lang === 'ro' ? 'Sosire & Plecare Asistată' : 'Assisted Arrival & Departure',
    checkInHours: lang === 'ro' 
      ? 'Check-in: 14:00 - 22:00 · Check-out: 08:00 - 11:00. Gazda vă întâmpină personal sau oferă acces discret conform preferințelor dumneavoastră.' 
      : 'Check-in: 14:00 - 22:00 · Check-out: 08:00 - 11:00. The host welcomes you personally or arranges discreet arrival at your convenience.',
    peaceTitle: lang === 'ro' ? 'Sanctuar de Liniște & Aer Curat' : 'Smoke-Free Peace Sanctuary',
    peaceText: lang === 'ro'
      ? 'Proprietate dedicată exclusiv nefumătorilor în interior, fără petreceri sau evenimente zgomotoase, pentru a ocroti somnul profund al tuturor oaspeților.'
      : 'Strictly non-smoking indoor spaces and zero tolerance for parties, safeguarding deep, uninterrupted sleep for every guest.',
    familyTitle: lang === 'ro' ? 'Oaspeți & Familii Binevenite' : 'Welcoming Guests & Families',
    familyText: lang === 'ro'
      ? 'Capacitate optimă de 2 adulți per suită. Copiii cu vârsta între 0 și 3 ani sunt oaspeții noștri de onoare și sunt cazați gratuit.'
      : 'Optimal occupancy of 2 adults per suite. Children aged 0 to 3 are our honor guests and stay free of charge.',
    parkingTitle: lang === 'ro' ? 'Parcare Privată Gratuită' : 'Complimentary Private Parking',
    parkingText: lang === 'ro'
      ? 'Locuri de parcare private gratuite asigurate direct la proprietate, fără necesitatea unei rezervări prealabile.'
      : 'Free private on-site parking spaces available for our guests with no prior reservation needed.',
    fullPoliciesBooking: lang === 'ro' ? 'Consultă profilul și condițiile pe Booking.com' : 'View full conditions on Booking.com',
    directAssistanceTitle: lang === 'ro' ? 'Aveți solicitări speciale la sosire?' : 'Special arrival or check-in requests?',
    directAssistanceSub: lang === 'ro' ? 'Contactați direct gazda prin apel telefonic sau WhatsApp' : 'Connect directly with the host via Phone or WhatsApp'
  };

  return (
    <section id="locatie" className="py-18 sm:py-28 bg-[#FAF7F2] border-b border-[#1F1A17]/8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-px bg-[#8E7044]/40" />
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#8E7044] font-semibold">
              {t.kicker}
            </p>
            <span className="w-6 h-px bg-[#8E7044]/40" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#1F1A17] font-normal tracking-[-0.015em] leading-tight">
            {t.title}
          </h2>

          <p className="text-sm sm:text-base text-[#6E5D4F] leading-relaxed font-light max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* 2-Column Grid: Boutique Google Maps Showcase (Left) & Promises of Peace (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Boutique Interactive Google Maps (C5.1) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#1F1A17]/8 shadow-[0_4px_30px_rgba(0,0,0,0.03)] space-y-4 h-full flex flex-col justify-between">
              
              {/* Address Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1F1A17]/8">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-[#FAF7F2] text-[#8E7044] flex items-center justify-center border border-[#1F1A17]/8 shrink-0 mt-0.5">
                    <MapPin className="w-4.5 h-4.5 text-[#8E7044]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1F1A17]">
                      The NEST Boutique Hotel
                    </h3>
                    <p className="text-xs text-[#6E5D4F]">
                      {HOTEL_INFO.address}
                    </p>
                  </div>
                </div>

                <a
                  href={googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#1F1A17] hover:bg-[#2C2420] border border-[#1F1A17] transition-all shadow-xs self-start sm:self-auto"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#FFDE99]" />
                  <span>{t.openMaps}</span>
                  <ExternalLink className="w-3 h-3 opacity-75" />
                </a>
              </div>

              {/* Minimalist Proximity Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#6E5D4F]">
                <span className="font-medium text-[#1F1A17]">{t.landmarksTitle}</span>
                {t.landmarks.map((lm, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#1F1A17]/6 font-light"
                  >
                    {lm}
                  </span>
                ))}
              </div>

              {/* Clean Google Maps Canvas */}
              <div className="relative rounded-2xl overflow-hidden border border-[#1F1A17]/8 shadow-inner bg-[#F4EFEA] flex-1 min-h-[380px] sm:min-h-[440px] mt-2">
                <iframe
                  title="The NEST Boutique Hotel Botoșani Google Maps"
                  src={googleMapsEmbedUrl}
                  className="w-full h-full border-0 grayscale-[15%] contrast-[1.02]"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </div>
          </div>

          {/* Right Column: Promises of Peace & Comfort (C5.2) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-white border border-[#1F1A17]/8 shadow-[0_4px_30px_rgba(0,0,0,0.03)] space-y-5">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#1F1A17]/8">
                <div className="flex items-center gap-2.5">
                  <Shield className="w-5 h-5 text-[#8E7044]" />
                  <h3 className="font-serif text-xl font-medium text-[#1F1A17]">
                    {t.rulesTitle}
                  </h3>
                </div>

                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#8E7044] px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#1F1A17]/8">
                  {t.rulesBadge}
                </span>
              </div>

              {/* Promise 1: Check-in / Check-out */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#1F1A17]/6 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1F1A17]">
                  <Clock className="w-4 h-4 text-[#8E7044]" />
                  <span>{t.checkInTitle}</span>
                </div>
                <p className="text-xs text-[#554639] leading-relaxed font-light pt-0.5">
                  {t.checkInHours}
                </p>
              </div>

              {/* Promise 2: Peace & Non-smoking Sanctuary */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#1F1A17]/6 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1F1A17]">
                  <Ban className="w-4 h-4 text-[#8E7044]" />
                  <span>{t.peaceTitle}</span>
                </div>
                <p className="text-xs text-[#554639] leading-relaxed font-light pt-0.5">
                  {t.peaceText}
                </p>
              </div>

              {/* Promise 3: Families & Children */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#1F1A17]/6 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1F1A17]">
                  <Baby className="w-4 h-4 text-[#8E7044]" />
                  <span>{t.familyTitle}</span>
                </div>
                <p className="text-xs text-[#554639] leading-relaxed font-light pt-0.5">
                  {t.familyText}
                </p>
              </div>

              {/* Promise 4: Free Parking */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#1F1A17]/6 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1F1A17]">
                  <Car className="w-4 h-4 text-[#8E7044]" />
                  <span>{t.parkingTitle}</span>
                </div>
                <p className="text-xs text-[#554639] leading-relaxed font-light pt-0.5">
                  {t.parkingText}
                </p>
              </div>

              {/* Booking link for complete official conditions */}
              <div className="pt-1">
                <a
                  href={HOTEL_INFO.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-semibold text-[#1F1A17] bg-[#FAF7F2] hover:bg-white border border-[#C5A059]/40 hover:border-[#8E7044] transition-all shadow-2xs"
                >
                  <BookingLogo className="h-3.5 w-auto shrink-0" variant="icon" />
                  <span>{t.fullPoliciesBooking}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-75" />
                </a>
              </div>

            </div>

            {/* Direct Host Assistance Banner */}
            <div className="p-6 rounded-3xl bg-[#1F1A17] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm border border-[#1F1A17]">
              <div className="space-y-1">
                <p className="text-xs font-medium text-[#FFDE99] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFDE99]" />
                  <span>{t.directAssistanceTitle}</span>
                </p>
                <p className="text-[11.5px] text-[#C8BCAC] font-light">
                  {t.directAssistanceSub} · <strong className="text-white font-medium">{HOTEL_INFO.phone}</strong>
                </p>
              </div>

              <a
                href={getWhatsAppReservationUrl(undefined, lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4.5 py-2.5 text-xs font-semibold text-[#1F1A17] bg-[#FFDE99] hover:bg-[#FFE8B8] rounded-full transition-colors whitespace-nowrap shrink-0 shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#1F1A17]" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
