import React, { useRef, useState, useEffect } from 'react';
import { useHotelImages } from '../context/ImageContext';

interface AssetProps {
  type: string;
  className?: string;
  title?: string;
  priority?: boolean;
}

// Authentic high-resolution photographs representing each room and space of The NEST Boutique Hotel
// Exactly matching the descriptions: canopy drapes, exposed timber beams, vessel sinks, baroque mirror, etc.
export const DEFAULT_HOTEL_PHOTOS: Record<string, string> = {
  // 1. Cameră Queen superioară (Canopy & Hanging Wicker Swing)
  'queen-superioara': '/images/queen-superioara.jpg',
  'deluxe-canopy-swing': '/images/queen-superioara.jpg',
  'bedroom_swing': '/images/queen-superioara.jpg',
  'g1': '/images/queen-superioara.jpg',
  'hero': '/images/queen-superioara.jpg',

  // 2. Cameră Dublă Deluxe (Exposed Timber Beams & White Rocking Chair)
  'dubla-deluxe': '/images/dubla-deluxe.jpg',
  'rustic-chic-suite': '/images/dubla-deluxe.jpg',
  'bedroom_rocking': '/images/dubla-deluxe.jpg',
  'g2': '/images/dubla-deluxe.jpg',

  // 3. Luxury Vintage Bathroom with Vessel Sink & Gilded Baroque Mirror
  'bathroom_vintage': '/images/bathroom_vintage.jpg',
  'bai': '/images/bathroom_vintage.jpg',
  'g3': '/images/bathroom_vintage.jpg',

  // 4. Rope-Suspended Media Console & Smart TV Area
  'rope_tv_shelf': '/images/rope_tv_shelf.jpg',
  'g4': '/images/rope_tv_shelf.jpg',

  // 5. Classic Elegance Decor with Damask Wallpaper & Candelabra
  'elegance-damask-room': '/images/elegance-damask-room.jpg',
  'bedroom_damask': '/images/elegance-damask-room.jpg',
  'g5': '/images/elegance-damask-room.jpg',

  // 6. Ethnic Boho Decor with Woven Palm Fans & Cobalt Accents
  'ethnic-boho-suite': '/images/ethnic-boho-suite.jpg',
  'bedroom_blue': '/images/ethnic-boho-suite.jpg',
  'g6': '/images/ethnic-boho-suite.jpg',

  // 7. Hallway with Exposed Timber Beams & Persian Runner Rug
  'hallway_beams': '/images/hallway_beams.jpg',
  'holuri': '/images/hallway_beams.jpg',
  'g7': '/images/hallway_beams.jpg',

  // 8. Nespresso Coffee Station with Porcelain
  'coffee_station': '/images/coffee_station.jpg',
  'g8': '/images/coffee_station.jpg',

  // 9. Brass Antique Door Handle & 'Please Knock' Plate
  'door_sign': '/images/door_sign.jpg',
  'g9': '/images/door_sign.jpg',

  // 10. Solid Timber Staircase with Botanical Art Frames
  'stairs_gallery': '/images/stairs_gallery.jpg',
  'g10': '/images/stairs_gallery.jpg'
};

export const UNSPLASH_FALLBACK_PHOTOS: Record<string, string> = {
  'queen-superioara': 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
  'dubla-deluxe': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85',
  'bathroom_vintage': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
  'rope_tv_shelf': 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85',
  'elegance-damask-room': 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=85',
  'ethnic-boho-suite': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=85',
  'hallway_beams': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
  'coffee_station': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
  'door_sign': 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=1200&q=85',
  'stairs_gallery': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=85'
};

const slotDescriptions: Record<string, string> = {
  'hero': 'Cameră Queen superioară cu baldachin & leagăn suspendat',
  'queen-superioara': 'Cameră Queen superioară cu baldachin & leagăn suspendat',
  'bedroom_swing': 'Cameră Queen superioară cu baldachin & leagăn',
  'deluxe-canopy-swing': 'Cameră Queen superioară cu baldachin & leagăn',
  'g1': 'Cameră Queen superioară cu baldachin & leagăn',
  
  'dubla-deluxe': 'Cameră Dublă Deluxe cu grinzi masive & balansoar alb',
  'bedroom_rocking': 'Cameră Dublă Deluxe cu grinzi masive & balansoar alb',
  'rustic-chic-suite': 'Cameră Dublă Deluxe cu grinzi masive & balansoar',
  'g2': 'Cameră Dublă Deluxe cu grinzi & balansoar alb',
  
  'bedroom_damask': 'Decor Clasic cu tapet damasc & sfeșnice',
  'elegance-damask-room': 'Decor Clasic cu tapet damasc & sfeșnice',
  'g5': 'Decor Clasic cu tapet damasc & covor verde',
  
  'bedroom_blue': 'Accente Boho cu evantaie de palmier & mobilier cobalt',
  'ethnic-boho-suite': 'Accente Boho cu evantaie de palmier',
  'g6': 'Accente Boho cu evantaie de palmier',
  
  'bathroom_vintage': 'Baie de lux cu lavoar bol & oglindă baroc aurită',
  'bai': 'Baie de lux cu lavoar bol & oglindă baroc aurită',
  'g3': 'Baie de lux cu lavoar bol & oglindă baroc aurită',
  
  'rope_tv_shelf': 'Consolă TV din lemn suspendată pe frânghii groase',
  'g4': 'Zonă TV & consolă suspendată pe frânghii groase',
  
  'hallway_beams': 'Holul camerelor cu grinzi din lemn & covor persan',
  'holuri': 'Holul camerelor cu grinzi din lemn & covor persan',
  'g7': 'Holul camerelor cu grinzi din lemn & covor persan',
  
  'coffee_station': 'Colțul de cafea & ceai Nespresso',
  'g8': 'Colțul de cafea & ceai Nespresso',
  
  'door_sign': 'Clanță vintage & plăcuță PLEASE KNOCK',
  'g9': 'Clanță vintage din alamă & plăcuță PLEASE KNOCK',
  
  'stairs_gallery': 'Scară din lemn masiv & tablouri botanice',
  'g10': 'Scară din lemn & galerie de artă botanică'
};

function normalizeSlotId(type: string): string {
  if (['queen-superioara', 'bedroom_swing', 'deluxe-canopy-swing', 'g1', 'hero'].includes(type)) return 'queen-superioara';
  if (['dubla-deluxe', 'bedroom_rocking', 'rustic-chic-suite', 'g2'].includes(type)) return 'dubla-deluxe';
  if (['bedroom_damask', 'elegance-damask-room', 'g5'].includes(type)) return 'elegance-damask-room';
  if (['bedroom_blue', 'ethnic-boho-suite', 'g6'].includes(type)) return 'ethnic-boho-suite';
  if (['bathroom_vintage', 'bai', 'g3'].includes(type)) return 'bathroom_vintage';
  if (['rope_tv_shelf', 'g4'].includes(type)) return 'rope_tv_shelf';
  if (['hallway_beams', 'holuri', 'g7'].includes(type)) return 'hallway_beams';
  if (['coffee_station', 'g8'].includes(type)) return 'coffee_station';
  if (['door_sign', 'g9'].includes(type)) return 'door_sign';
  if (['stairs_gallery', 'g10'].includes(type)) return 'stairs_gallery';
  return type;
}

export const VisualAsset: React.FC<AssetProps> = ({ type, className = '', title, priority = false }) => {
  const { photos } = useHotelImages();
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const slotId = normalizeSlotId(type);
  const fallbackUrl = 
    UNSPLASH_FALLBACK_PHOTOS[slotId] || 
    UNSPLASH_FALLBACK_PHOTOS[type] || 
    UNSPLASH_FALLBACK_PHOTOS['queen-superioara'];
  
  // 1. Image uploaded by user in browser session (data:image/...)
  // 2. Physical static file saved in public/images/<slotId>.jpg
  // 3. High-resolution fallback photo
  const uploadedUrl = photos[slotId] || photos[type];
  const staticFileUrl = `/images/${slotId}.jpg`;

  const activeImageUrl = hasError
    ? fallbackUrl
    : (uploadedUrl || staticFileUrl);

  const description = slotDescriptions[type] || title || 'Fotografie The NEST Boutique Hotel';

  // Reset loaded status on image change & check cached completion
  useEffect(() => {
    setHasError(false);
    setImageLoaded(false);
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setImageLoaded(true);
    }
  }, [slotId, uploadedUrl]);

  return (
    <div 
      className={`relative overflow-hidden group select-none bg-[#241E1A] ${className}`}
    >
      {/* Subtle Shimmer Skeleton while loading */}
      <div 
        className={`absolute inset-0 bg-[#251E1A] transition-opacity duration-700 pointer-events-none z-0 ${
          imageLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      >
        <div className="w-full h-full bg-gradient-to-r from-[#201915] via-[#322722] to-[#201915] animate-pulse" />
      </div>

      <img
        ref={imgRef}
        src={activeImageUrl}
        alt={title || description}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          if (!hasError) {
            setHasError(true);
          }
        }}
        className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-103 ${
          imageLoaded 
            ? 'opacity-100 scale-100 filter-none' 
            : 'opacity-0 scale-[1.03] blur-[3px]'
        }`}
      />

      {/* Subtle vignette gradient for luxury feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none z-1" />
    </div>
  );
};
