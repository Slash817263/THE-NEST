import React from 'react';
import { 
  BedDouble, Bath, Wifi, Coffee, Sparkles, Gem
} from 'lucide-react';
import { Language } from '../data/hotelData';

interface AmenitiesSectionProps {
  lang: Language;
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ lang }) => {
  const t = {
    kicker: lang === 'ro' ? 'Dotări & Experiență Exclusivă' : 'Exclusive Amenities & Experience',
    title: lang === 'ro' ? 'Ospitalitate & Confort de Lux' : 'Luxury Comfort & Hospitality',
    subtitle: lang === 'ro'
      ? 'Fiecare detaliu al proprietății noastre a fost conceput pentru a crea o atmosferă de liniște, eleganță și relaxare profundă.'
      : 'Every aspect of our boutique hotel has been designed to deliver an intimate ambiance of serenity, timeless elegance, and effortless relaxation.',
    pillars: [
      {
        icon: BedDouble,
        badge: lang === 'ro' ? 'Somn Profund' : 'Deep Sleep',
        title: lang === 'ro' ? 'Odihnă & Rafinament' : 'Rest & Refinement',
        desc: lang === 'ro'
          ? 'Paturi mari extra-lungi (>2m), baldachine diafane și grinzi aparente din lemn masiv pentru un somn odihnitor.'
          : 'Generous extra-long beds (>2m), sheer romantic canopies, and exposed timber beams for deep restorative sleep.',
        highlights: [
          lang === 'ro' ? 'Paturi extra-lungi (>2m) & saltele confort' : 'Extra-long beds (>2m) & premium mattresses',
          lang === 'ro' ? 'Lenjerii fine din bumbac & izolare fonică' : 'Fine cotton bed linens & sound insulation',
          lang === 'ro' ? 'Ambianță exclusiv de nefumători & fără alergeni' : 'Strictly non-smoking & hypoallergenic sanctuary'
        ]
      },
      {
        icon: Bath,
        badge: lang === 'ro' ? 'Spa Privat' : 'Private Spa',
        title: lang === 'ro' ? 'Băi Private de Lux' : 'En-Suite Luxury Bathrooms',
        desc: lang === 'ro'
          ? 'Spații intime complet echipate cu cadă generoasă sau duș modern, oglinzi baroc și finisaje rafinate.'
          : 'Intimate private sanctuaries featuring generous bathtubs or modern showers, baroque mirrors, and fine finishes.',
        highlights: [
          lang === 'ro' ? 'Cadă relaxantă și/sau duș walk-in' : 'Relaxing soaking tub and/or walk-in shower',
          lang === 'ro' ? 'Papuci de casă și articole cosmetice gratuite' : 'House slippers & complimentary fine toiletries',
          lang === 'ro' ? 'Uscător de păr profesional & prosoape de pluș' : 'Professional hairdryer & plush luxury towels'
        ]
      },
      {
        icon: Wifi,
        badge: lang === 'ro' ? 'Tehnologie & Climat' : 'Climate & Tech',
        title: lang === 'ro' ? 'Climatizare & Tehnologie' : 'Climate & Connectivity',
        desc: lang === 'ro'
          ? 'Control individual al temperaturii, internet de mare viteză și ecrane Smart TV pentru relaxare fără efort.'
          : 'Individual ambient climate control, high-speed Wi-Fi, and flat-screen Smart TVs for seamless entertainment.',
        highlights: [
          lang === 'ro' ? 'Climatizare silențioasă & încălzire reglabilă' : 'Quiet air conditioning & adjustable heating',
          lang === 'ro' ? 'Wi-Fi de mare viteză în întreaga clădire' : 'High-speed complimentary Wi-Fi throughout',
          lang === 'ro' ? 'Smart TV cu canale satelit & seif în cameră' : 'Flat-screen Smart TV & in-room safety safe'
        ]
      },
      {
        icon: Coffee,
        badge: lang === 'ro' ? 'Mic Dejun & Relaxare' : 'Breakfast & Lounge',
        title: lang === 'ro' ? 'Ospitalitate & Servicii' : 'Hospitality & Leisure',
        desc: lang === 'ro'
          ? 'Mic dejun disponibil la proprietate, cafea premium, ceai și parcare privată gratuită pentru oaspeți.'
          : 'Breakfast available on site, complimentary premium coffee, tea, and free private parking for total peace of mind.',
        highlights: [
          lang === 'ro' ? 'Mic dejun disponibil la proprietate' : 'Breakfast available on site',
          lang === 'ro' ? 'Parcare privată gratuită (fără rezervare)' : 'Free private parking (no reservation needed)',
          lang === 'ro' ? 'Espressor Nespresso, selecție de ceai & dining' : 'Nespresso coffee machine, fine tea & dining area'
        ]
      }
    ]
  };

  return (
    <section id="facilitati" className="relative py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#1F1A17]/8">
      
      {/* Decorative hairline gold separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#C5A059]/30 shadow-2xs">
            <Gem className="w-3.5 h-3.5 text-[#8E7044]" />
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

        {/* 4 Luxury Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative p-7 rounded-3xl bg-white border border-[#C5A059]/25 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_36px_rgba(31,26,23,0.06)] hover:border-[#8E7044] transition-all duration-500 flex flex-col justify-between overflow-hidden"
              >
                {/* Gold Top Accent Line */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent group-hover:via-[#C5A059] transition-all" />

                <div className="space-y-4">
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] text-[#8E7044] group-hover:bg-[#14100E] group-hover:text-[#FFDE99] flex items-center justify-center border border-[#C5A059]/30 transition-colors duration-500 shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[9.5px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#8E7044] border border-[#C5A059]/30">
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-1.5 pt-1">
                    <h3 className="font-serif text-xl font-normal text-[#1F1A17]">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#6E5D4F] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Feature Bullets */}
                  <div className="space-y-2 pt-3 border-t border-[#1F1A17]/6">
                    {pillar.highlights.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-2 text-xs text-[#2C2420]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8E7044] shrink-0 mt-1.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1F1A17]/6 flex items-center justify-between text-[11px] text-[#A69784]">
                  <span className="font-medium tracking-wide">
                    {lang === 'ro' ? 'Standard 5 Stele' : '5-Star Standard'}
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]/70 group-hover:text-[#C5A059] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
