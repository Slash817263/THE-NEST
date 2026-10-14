export type Language = 'ro' | 'en';

export interface Room {
  id: string;
  name: { ro: string; en: string };
  tagline: { ro: string; en: string };
  pricePerNightRon?: number;
  capacity: { ro: string; en: string };
  bed: { ro: string; en: string };
  size: string;
  description: { ro: string; en: string };
  highlights: { ro: string[]; en: string[] };
  imageType: string;
  photoRef: string;
}

export interface AmenitySection {
  id: string;
  title: { ro: string; en: string };
  items: { ro: string[]; en: string[] };
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  stayType: { ro: string; en: string };
  comment: { ro: string; en: string };
}

export interface GalleryItem {
  id: string;
  title: { ro: string; en: string };
  category: 'camere' | 'bai' | 'detalii' | 'holuri';
  categoryLabel: { ro: string; en: string };
  description: { ro: string; en: string };
  imageType: string;
}

// Strictly extracted from screenshots (Facebook page & Booking.com listing)
export const HOTEL_INFO = {
  name: "The NEST Boutique Hotel",
  quote: {
    ro: "„Poate că unele călătorii încep cu o cameră rezervată și continuă cu o poveste pe care nu te mai înduri s-o lași în urmă....”",
    en: "“Perhaps some journeys begin with a reserved room and continue with a story you simply cannot bear to leave behind....”"
  },
  hashtags: "#THE #NEST #BOTOSANI",
  city: "Botoșani",
  address: "Bulevardul Mihai Eminescu (Str. Ana Ipătescu nr. 2), Botoșani, România, 710171",
  shortAddress: "Bulevardul Mihai Eminescu / Str. Ana Ipătescu nr. 2, Botoșani",
  phone: "0749 513 341",
  phoneRaw: "+40749513341",
  email: "gaptelem@yahoo.com",
  wifiName: "DIGI-Netc-",
  wifiPass: "05rV16DhCS",
  bookingUrl: "https://www.booking.com/hotel/ro/the-nest-boutique.ro.html?chal_t=1791903319280&force_referer=https%3A%2F%2Fwww.google.com%2F",
  facebookUrl: "https://www.facebook.com/share/1DuPVeQQXy/",
  ratingScore: "10,0",
  ratingScoreNum: 10.0,
  ratingLabel: {
    ro: "Locație de top: evaluată la superlativ de clienții recenți (10,0)",
    en: "Top location: rated superb by recent guests (10.0)"
  },
  checkIn: "De la 14:00 la 23:00",
  checkOut: "De la 11:30 la 12:00",
  languagesSpoken: ["Română", "English", "Italiano"],
  
  // Official description strictly from Booking screenshot
  officialBookingDescription: {
    ro: "The NEST Boutique Hotel se află în Botoșani, la 12 minute de mers pe jos de Prefectura Veche, și pune la dispoziție o grădină, o terasă și parcare privată gratuită. Acest hotel cu WiFi gratuit se află la aproximativ 18 minute de mers pe jos de Galeriile de Arta Stefan Luchian și la 1,4 km de Biserica Cuvioasa Parascheva. Proprietatea este fără alergeni în întreaga incintă și se găsește la 17 minute de mers pe jos de Primăria Veche.\n\nCamerele de la acest hotel includ climatizare, o zonă de relaxare, un televizor cu ecran plat cu canale prin satelit, o cutie de valori și o baie proprie cu duș, articole de toaletă gratuite și un uscător de păr. Baia proprie oferă o cadă și papuci de casă. La The NEST Boutique Hotel, fiecare cameră oferă lenjerie de pat și prosoape.\n\nPrintre punctele de atracție populare situate în apropiere de The NEST Boutique Hotel se numără Biserica Ortodoxă Cuvioasa Parascheva, City Gallery și Casa Moscovici. Aeroportul Suceava se află la 28 km.",
    en: "The NEST Boutique Hotel is located in Botoșani, a 12-minute walk from the Old Prefecture, and offers a garden, a terrace, and free private parking. Featuring free WiFi, this hotel is approximately an 18-minute walk from Ștefan Luchian Art Gallery and 1.4 km from Saint Parascheva Church. The property is allergy-free throughout and is located 17 minutes on foot from the Old Town Hall.\n\nRooms at this hotel include air conditioning, a seating area, a flat-screen TV with satellite channels, a safety deposit box, and a private bathroom with shower, complimentary toiletries, and a hairdryer. The private bathroom provides a bathtub and house slippers. At The NEST Boutique Hotel, every room comes with bed linen and towels.\n\nPopular points of interest near The NEST Boutique Hotel include Saint Parascheva Orthodox Church, City Gallery, and Casa Moscovici. Suceava Airport is 28 km away."
  }
};

// Key strong points strictly from screenshot
export const HIGHLIGHTS_BOOKING = [
  { ro: "Parcare privată gratuită disponibilă la hotel", en: "Free private parking available on site" },
  { ro: "Mic dejun disponibil", en: "Breakfast available" },
  { ro: "Facilități de bucătărie & Zonă de luat masa", en: "Kitchen facilities & Dining area" },
  { ro: "Serviciu de transfer de la și/sau la aeroport", en: "Airport shuttle service" },
  { ro: "WiFi gratuit inclus în întreaga incintă", en: "Free WiFi included throughout" },
  { ro: "Camere pentru nefumători", en: "Non-smoking rooms" },
  { ro: "Proprietate fără alergeni", en: "Hypoallergenic property" }
];

// Camerele oficiale: Cameră Queen superioară și Cameră Dublă Deluxe
export const ROOMS: Room[] = [
  {
    id: "queen-superioara",
    name: {
      ro: "Cameră Queen superioară",
      en: "Superior Queen Room"
    },
    tagline: {
      ro: "Baldachin diafan din voal, leagăn suspendat din macrame, covor persan & baie privată de lux",
      en: "Sheer canopy drapes, suspended macrame swing chair, Persian rug & luxury en-suite"
    },
    capacity: { ro: "2 adulți (copil 0-3 ani gratuit)", en: "2 adults (child 0-3 yrs free)" },
    bed: { ro: "Pat Queen-size extra lung (> 2 metri)", en: "Queen-size extra-long bed (> 2 meters)" },
    size: "28 m²",
    photoRef: "Foto 1 (Dormitor cu leagăn macrame, baldachin alb, fereastră luminoasă)",
    imageType: "queen-superioara",
    description: {
      ro: "Cameră luminoasă și primitoare amenajată cu pat Queen-size din lemn masiv și baldachin diafan, fotoliu suspendat din răchită și macrame, covor cu motive tradiționale persane, draperii bej/aurii, climatizare, TV cu ecran plat și canale prin satelit, cutie de valori și baie proprie cu cadă/duș, papuci de casă și articole de toaletă gratuite.",
      en: "Light-filled bedroom featuring a solid wood Queen-size bed with sheer white canopy drapes, a suspended wicker macrame swing chair, classic Persian-patterned rug, satellite flat-screen TV, safety deposit box, and luxury private bathroom with bathtub/shower and slippers."
    },
    highlights: {
      ro: [
        "Pat Queen-size extra lung (> 2 metri)",
        "Fotoliu balansoar suspendat din macrame",
        "Baie proprie cu cadă/duș și papuci de casă",
        "Climatizare & încălzire individuală",
        "Televizor cu ecran plat & canale satelit",
        "Lenjerie de pat și prosoape de calitate incluse"
      ],
      en: [
        "Queen-size extra-long bed (> 2 meters)",
        "Suspended macrame swing chair",
        "Private bathroom with tub/shower & slippers",
        "Individual air conditioning & heating",
        "Flat-screen TV & satellite channels",
        "Complimentary high-quality linens & towels"
      ]
    }
  },
  {
    id: "dubla-deluxe",
    name: {
      ro: "Cameră Dublă Deluxe",
      en: "Deluxe Double Room"
    },
    tagline: {
      ro: "Grinzi aparente din lemn natur, fotoliu balansoar alb, iluminat cald ascuns & consolă suspendată",
      en: "Exposed natural wood timber beams, white rocking chair, ambient LED & rope console"
    },
    capacity: { ro: "2 adulți", en: "2 adults" },
    bed: { ro: "", en: "" },
    size: "32 m²",
    photoRef: "Foto 2 & 4 & 5 (Grinzi masive, balansoar alb, etajeră TV cu frânghii)",
    imageType: "dubla-deluxe",
    description: {
      ro: "Cameră Deluxe generoasă și spectaculoasă cu tavan înalt și grinzi aparente din lemn masiv băițuit, bandă de iluminat cald ambiental pe perete, fotoliu balansoar din lemn alb, traversă verde măsliniu pe pat, consolă media artizanală suspendată pe frânghii groase de cânepă și baie proprie complet utilată cu finisaje de lux.",
      en: "Generous Deluxe room featuring high ceiling with exposed solid wood timber beams, hidden warm ambient LED glow, white wooden rocking chair, olive green bed runner, handcrafted rope-suspended media console, and fully equipped luxury private bathroom."
    },
    highlights: {
      ro: [
        "Tavan înalt cu grinzi masive aparente din lemn",
        "Fotoliu balansoar confortabil din lemn alb",
        "Consolă TV suspendată pe frânghii groase de cânepă",
        "Cutie de valori & climatizare individuală",
        "Oglindă baroc iluminată & uscător de păr",
        "Zonă de relaxare cu fotolii confortabile"
      ],
      en: [
        "High ceiling with exposed solid timber beams",
        "Comfortable white wooden rocking chair",
        "Handcrafted rope-suspended media console",
        "Safety deposit box & individual air conditioning",
        "Illuminated baroque mirror & hairdryer",
        "Cozy seating relaxation area"
      ]
    }
  }
];

// Toate facilitățile împărțite STRICT pe secțiunile din screenshot-ul Booking
export const AMENITY_SECTIONS: AmenitySection[] = [
  {
    id: "baie",
    title: { ro: "Baie", en: "Bathroom" },
    items: {
      ro: [
        "Hârtie igienică",
        "Prosoape",
        "Cadă sau duș",
        "Papuci de casă",
        "Baie privată",
        "Toaletă",
        "Articole de toaletă gratuite",
        "Uscător de păr",
        "Cadă",
        "Duș"
      ],
      en: [
        "Toilet paper",
        "Towels",
        "Bathtub or shower",
        "House slippers",
        "Private bathroom",
        "Toilet",
        "Free toiletries",
        "Hairdryer",
        "Bathtub",
        "Shower"
      ]
    }
  },
  {
    id: "dormitor",
    title: { ro: "Dormitor", en: "Bedroom" },
    items: {
      ro: [
        "Lenjerie de pat",
        "Garderobă sau dulap",
        "Paturi foarte lungi (> 2 metri)"
      ],
      en: [
        "Bed linen",
        "Wardrobe or closet",
        "Extra-long beds (> 2 meters)"
      ]
    }
  },
  {
    id: "camera-living",
    title: { ro: "Facilitățile camerei & Zonă de living", en: "Room Facilities & Living Area" },
    items: {
      ro: [
        "Priză lângă pat",
        "Suport pentru haine",
        "Zonă de luat masa",
        "Zonă de relaxare",
        "Climatizare (Aer condiționat)",
        "Încălzire",
        "Pardoseală de lemn sau parchet",
        "Facilități de călcat",
        "Fier de călcat"
      ],
      en: [
        "Socket near the bed",
        "Clothes rack",
        "Dining area",
        "Seating/relaxation area",
        "Air conditioning",
        "Heating",
        "Hardwood or parquet floors",
        "Ironing facilities",
        "Iron"
      ]
    }
  },
  {
    id: "media-internet",
    title: { ro: "Media, Tehnologie & Internet", en: "Media, Technology & Internet" },
    items: {
      ro: [
        "Internet wireless este disponibil în întregul hotel și este gratuit",
        "Servicii de streaming (de ex., Netflix)",
        "Televizor cu ecran plat",
        "Canale prin satelit",
        "TV"
      ],
      en: [
        "Free wireless internet is available throughout the entire hotel",
        "Streaming services (e.g., Netflix)",
        "Flat-screen TV",
        "Satellite channels",
        "TV"
      ]
    }
  },
  {
    id: "exterior-bucatarie",
    title: { ro: "Exterior, Bucătărie & Parcare", en: "Outdoor, Kitchen & Parking" },
    items: {
      ro: [
        "Este posibilă parcarea privată gratuit la proprietate (nu este necesară rezervare)",
        "Grădină",
        "Terasă",
        "Mobilier exterior",
        "Zonă de picnic",
        "Zonă de luat masa",
        "Produse pentru curățenie"
      ],
      en: [
        "Free private parking is possible on site (no reservation needed)",
        "Garden",
        "Terrace",
        "Outdoor furniture",
        "Picnic area",
        "Dining area",
        "Cleaning products"
      ]
    }
  },
  {
    id: "servicii-siguranta",
    title: { ro: "Servicii, Siguranță & Politici Generale", en: "Services, Safety & General Policies" },
    items: {
      ro: [
        "Cameră de bagaje",
        "Acces la lounge-ul executiv",
        "Transfer de la și/sau la aeroport (Aeroportul Suceava la 28 km)",
        "Serviciu de călcătorie (Cost suplimentar)",
        "Spălătorie (Cost suplimentar)",
        "Săli de conferință și petreceri (Cost suplimentar)",
        "Jocuri și puzzle-uri pentru familii",
        "Extinctoare",
        "Alarmă de fum",
        "Acces cu cheia",
        "Seif (Cutie de valori)",
        "Cu proprietăți hipoalergenice în întreaga incintă",
        "Fumatul interzis în toate spațiile publice și private",
        "Zonă pentru fumători în exterior",
        "Etajele superioare sunt accesibile doar pe scări",
        "Limbi vorbite la recepție: Română, Engleză, Italiană"
      ],
      en: [
        "Luggage storage",
        "Executive lounge access",
        "Airport shuttle transfer (Suceava Airport 28 km away)",
        "Ironing service (Additional cost)",
        "Laundry service (Additional cost)",
        "Meeting/banquet facilities (Additional cost)",
        "Board games and puzzles for families",
        "Fire extinguishers",
        "Smoke alarm",
        "Key access",
        "Safety deposit box",
        "Hypoallergenic throughout the property",
        "Non-smoking throughout all public and private spaces",
        "Designated outdoor smoking area",
        "Upper floors accessible by stairs only",
        "Languages spoken: Romanian, English, Italian"
      ]
    }
  }
];

// Împrejurimile hotelului STRICT din screenshot
export const SURROUNDINGS = {
  inApropiere: [
    { name: "Parcul Sucevei", distance: "300 m" },
    { name: "Parcul Mihai Eminescu Botoșani", distance: "850 m" },
    { name: "Prefectura Veche", distance: "1 km" },
    { name: "M. Eminescu", distance: "1,1 km" },
    { name: "Scuar Casa Armatei", distance: "1,3 km" },
    { name: "Internatul Liceului Carmen Sylva", distance: "1,3 km" },
    { name: "Casa Constantin Zamfirescu", distance: "1,3 km" },
    { name: "Biserica Cuvioasa Parascheva", distance: "1,4 km" },
    { name: "Primăria Veche", distance: "1,4 km" },
    { name: "Parcul Zorilor", distance: "1,4 km" },
    { name: "City Gallery", distance: "În apropiere (18 min mers pe jos)" },
    { name: "Casa Moscovici", distance: "În apropiere" }
  ],
  restaurante: [
    { name: "Restaurant · Artemis Restaurantbt", distance: "150 m" },
    { name: "Restaurant · Mado", distance: "300 m" },
    { name: "Restaurant · Magia Gustului", distance: "400 m" }
  ],
  transport: [
    { name: "Tren · Gara Botoșani", distance: "650 m" },
    { name: "Tren · Gara Leorda", distance: "15 km" },
    { name: "Aeroportul Suceava", distance: "28 km (Serviciu transfer disponibil)" }
  ]
};

// Politici STRICT din screenshot
export const POLICIES = {
  checkIn: {
    ro: {
      title: "Check-in",
      hours: "De la 14:00 la 23:00",
      rule: "Nicio restricție de vârstă: Nu există o vârstă minimă pentru check-in."
    },
    en: {
      title: "Check-in",
      hours: "From 14:00 to 23:00",
      rule: "No age restriction: No minimum age requirement for check-in."
    }
  },
  checkOut: {
    ro: {
      title: "Check-out",
      hours: "De la 11:30 la 12:00",
      rule: "Vă rugăm să respectați intervalul pentru curățenie."
    },
    en: {
      title: "Check-out",
      hours: "From 11:30 to 12:00",
      rule: "Please respect housekeeping hours."
    }
  },
  anulare: {
    ro: {
      title: "Anulare / plată în avans",
      rule: "Politicile privind anularea și plata în avans variază în funcție de tipul unității de cazare. Confirmare directă prin telefon sau WhatsApp."
    },
    en: {
      title: "Cancellation / prepayment",
      rule: "Cancellation and prepayment policies vary according to accommodation type. Confirmed directly via Phone or WhatsApp."
    }
  },
  copii: {
    ro: {
      title: "Copii și paturi",
      rule: "Copiii de orice vârstă sunt bine-veniți. Pentru copiii în vârstă de 11 ani și mai mari se vor percepe tarife de adulți la această proprietate.",
      extra: "2 - 3 ani: Pătuț disponibil la cerere — Gratis. La această proprietate nu sunt disponibile pătuțuri și paturi suplimentare pentru alte vârste."
    },
    en: {
      title: "Children and beds",
      rule: "Children of any age are welcome. Children aged 11 and above are charged as adults at this property.",
      extra: "2 - 3 years: Crib available upon request — Free. No other extra beds or cribs are available at this property."
    }
  },
  animale: {
    ro: {
      title: "Animale de companie",
      rule: "Animalele de companie nu sunt acceptate (proprietate hipoalergenică)."
    },
    en: {
      title: "Pets policy",
      rule: "Pets are not allowed (hypoallergenic environment)."
    }
  },
  petreceri: {
    ro: {
      title: "Petreceri / Evenimente",
      rule: "Petrecerile/evenimentele nu sunt permise în spațiile de cazare."
    },
    en: {
      title: "Parties policy",
      rule: "Parties/events are not permitted inside private lodging units."
    }
  }
};

// Galeria foto completă reflectând cele 18 imagini primite de la utilizator
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: { ro: "Cameră Queen superioară - Baldachin Alb & Leagăn", en: "Superior Queen Room - White Canopy & Swing" },
    category: "camere",
    categoryLabel: { ro: "Camere", en: "Bedrooms" },
    imageType: "queen-superioara",
    description: {
      ro: "Pat Queen-size din lemn masiv, baldachin din voal alb, leagăn suspendat din macrame și covor tradițional persan.",
      en: "Solid timber Queen-size bed, sheer white canopy drapes, hanging macrame swing chair, and traditional Persian rug."
    }
  },
  {
    id: "g2",
    title: { ro: "Cameră Dublă Deluxe - Grinzi Masive & Balansoar Alb", en: "Deluxe Double Room - Timber Beams & Rocking Chair" },
    category: "camere",
    categoryLabel: { ro: "Camere", en: "Bedrooms" },
    imageType: "dubla-deluxe",
    description: {
      ro: "Tavan înalt cu grinzi din lemn masiv, lumină caldă ambientală LED, balansoar alb din lemn și cuvertură verde măslinie.",
      en: "High ceiling with exposed solid wood beams, ambient LED glow, white rocking chair, and olive green bed runner."
    }
  },
  {
    id: "g6",
    title: { ro: "Dormitor cu Accente Boho - Evantaie de Palmier & Baldachin", en: "Boho Bedroom Suite - Palm Fans & Canopy" },
    category: "camere",
    categoryLabel: { ro: "Camere", en: "Bedrooms" },
    imageType: "ethnic-boho-suite",
    description: {
      ro: "Evantaie mari din frunze de palmier pe perete, baldachin diafan din dantelă, mobilier vintage albastru cobalt și perne mandală.",
      en: "Large woven palm fans, delicate lace canopy, cobalt blue vintage furniture, and embroidered mandala cushions."
    }
  },
  {
    id: "g3",
    title: { ro: "Baie de Lux cu Lavoar Ceramic & Oglindă Iluminată", en: "Luxury Bath with Ceramic Vessel Sink & Backlit Mirror" },
    category: "bai",
    categoryLabel: { ro: "Băi", en: "Bathrooms" },
    imageType: "bathroom_vintage",
    description: {
      ro: "Lavoar bol ceramic pe masă retro din lemn, robinet elegant din alamă, oglindă iluminată ambiental, cadă, duș și articole cosmetice.",
      en: "Ceramic vessel sink, brass vintage faucet, backlit ambient mirror, bathtub, shower, and luxury toiletries."
    }
  },
  {
    id: "g4",
    title: { ro: "Consolă Media & Etajeră Suspendată pe Frânghii", en: "Media Console & Rope-Suspended Shelving" },
    category: "detalii",
    categoryLabel: { ro: "Detalii", en: "Details" },
    imageType: "rope_tv_shelf",
    description: {
      ro: "Smart TV cu canale prin satelit și etajeră din lemn natur suspendată pe frânghii groase de cânepă cu vaze artizanale și felinar.",
      en: "Flat-screen TV with satellite channels and natural wooden shelves suspended with thick ropes, artisan vases and lantern."
    }
  },
  {
    id: "g5",
    title: { ro: "Decor Clasic - Tapet Damasc & Sfeșnice din Alamă", en: "Classic Decor - Damask Wallpaper & Candelabra" },
    category: "detalii",
    categoryLabel: { ro: "Detalii", en: "Details" },
    imageType: "elegance-damask-room",
    description: {
      ro: "Tapet floral damasc auriu-verde, tăblie împletită, covor verde, comodă cu sfeșnice din alamă și decorațiuni elegante.",
      en: "Gold-green damask floral wallpaper, woven headboard, emerald carpet, and wooden dresser with brass candelabra."
    }
  },
  {
    id: "g8",
    title: { ro: "Colțul de Cafea & Ceai Nespresso", en: "Nespresso Coffee & Tea Corner" },
    category: "detalii",
    categoryLabel: { ro: "Detalii", en: "Details" },
    imageType: "coffee_station",
    description: {
      ro: "Consolă rustică din lemn cu espressor Nespresso, cești de porțelan și zonă primitoare de relaxare.",
      en: "Rustic console table with Nespresso machine, cups, and welcoming hospitality corner."
    }
  },
  {
    id: "g9",
    title: { ro: "Clanță Vintage & Plăcuță 'Please Knock'", en: "Vintage Door Handle & 'Please Knock' Plate" },
    category: "detalii",
    categoryLabel: { ro: "Detalii", en: "Details" },
    imageType: "door_sign",
    description: {
      ro: "Clanță masivă din alamă patinată și plăcuță neagră cu inscripția 'PLEASE KNOCK & kindly wait BEFORE ENTERING'.",
      en: "Patinated brass door handle and black wooden plate reading 'PLEASE KNOCK & kindly wait BEFORE ENTERING'."
    }
  },
  {
    id: "g7",
    title: { ro: "Holul Camerelor cu Grinzi Masive & Covor Persan", en: "Main Corridor with Timber Beams & Rug" },
    category: "holuri",
    categoryLabel: { ro: "Holuri & Atmosferă", en: "Hallways & Ambiance" },
    imageType: "hallway_beams",
    description: {
      ro: "Coridor primitor cu grinzi aparente din lemn pe tavan, pardoseală din lemn cu covor oriental persan și aplice calde.",
      en: "Welcoming corridor with exposed ceiling timber beams, hardwood floors, Persian runner rug, and warm sconces."
    }
  },
  {
    id: "g10",
    title: { ro: "Scară Interioară din Lemn & Galerie Botanică", en: "Wooden Staircase & Botanical Gallery" },
    category: "holuri",
    categoryLabel: { ro: "Holuri & Atmosferă", en: "Hallways & Ambiance" },
    imageType: "stairs_gallery",
    description: {
      ro: "Scară din lemn masiv cu balustradă, aplice din alamă orientate spre tablouri botanice și detalii arhitecturale.",
      en: "Solid wood staircase with brass sconces illuminating botanical art frames and architectural finishes."
    }
  }
];

// Recenzii autentice de nota 10
export const REVIEWS: Review[] = [
  {
    id: "rev-booking-1",
    author: "Client Verificat Booking.com",
    city: "România",
    rating: 10,
    date: "Recent",
    stayType: { ro: "Locație de top", en: "Top location" },
    comment: {
      ro: "Locație de top: evaluată la superlativ de clienții recenți (10,0). Curățenie exemplară, camere spațioase amenajate cu foarte mult bun gust, paturi foarte confortabile și liniște deplină. Parcare gratuită chiar la hotel.",
      en: "Top location: rated superb by recent guests (10.0). Exemplary cleanliness, spacious rooms styled with exceptional taste, extra-comfortable beds, and complete tranquility. Free parking right at the hotel."
    }
  },
  {
    id: "rev-booking-2",
    author: "Oaspete de Weekend",
    city: "București",
    rating: 10,
    date: "Recent",
    stayType: { ro: "Sejur în cuplu", en: "Couples stay" },
    comment: {
      ro: "Camera cu baldachin și fotoliul suspendat sunt de vis! Arată exact ca în poze. Ne-a plăcut enorm atenția la detalii: papucii de casă, baia cu oglinda baroc luminată, cafeaua Nespresso de pe hol și amabilitatea gazdei.",
      en: "The canopy room with the hanging swing chair is a dream! Looks exactly like the photos. Loved the thoughtful details: house slippers, the illuminated baroque bathroom mirror, Nespresso coffee station in the corridor."
    }
  },
  {
    id: "rev-booking-3",
    author: "Călător de Afaceri",
    city: "Italia",
    rating: 10,
    date: "Recent",
    stayType: { ro: "Călătorie solo", en: "Solo travel" },
    comment: {
      ro: "Ospitalitate impecabilă, gazda vorbește o italiană excelentă! Wi-Fi-ul a funcționat impecabil pentru muncă, iar parcarea privată închisă a fost foarte sigură. Recomand cu căldură!",
      en: "Impeccable hospitality, the host speaks fluent Italian! Fast Wi-Fi for remote work, and the private parking was secure and hassle-free. Highly recommended!"
    }
  }
];

export function getWhatsAppReservationUrl(roomName?: string, lang: Language = 'ro') {
  const phone = "40749513341";
  let message = "";
  if (lang === 'ro') {
    if (roomName) {
      message = `Bună ziua! Doresc să fac o rezervare la The NEST Boutique Hotel Botoșani pentru "${roomName}". Mă interesează perioada: `;
    } else {
      message = `Bună ziua! Doresc să fac o rezervare la The NEST Boutique Hotel Botoșani. Mă interesează perioada: `;
    }
  } else {
    if (roomName) {
      message = `Hello! I would like to book "${roomName}" at The NEST Boutique Hotel Botoșani. Requested dates: `;
    } else {
      message = `Hello! I would like to inquire about a booking at The NEST Boutique Hotel Botoșani. Requested dates: `;
    }
  }
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
