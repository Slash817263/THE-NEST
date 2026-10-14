import React, { useRef, useState } from 'react';
import { X, Upload, Camera, Check, Trash2, Image as ImageIcon } from 'lucide-react';
import { useHotelImages } from '../context/ImageContext';
import { DEFAULT_HOTEL_PHOTOS } from './VisualAssets';

const SLOTS = [
  { id: 'queen-superioara', name: '1. Cameră Queen superioară', ref: 'Dormitor cu baldachin alb & leagăn macrame' },
  { id: 'dubla-deluxe', name: '2. Cameră Dublă Deluxe', ref: 'Dormitor cu grinzi masive & balansoar alb' },
  { id: 'ethnic-boho-suite', name: '3. Dormitor Boho & Baldachin', ref: 'Evantaie de palmier & mobilier cobalt' },
  { id: 'bathroom_vintage', name: '4. Baie de Lux', ref: 'Lavoar bol & oglindă baroc iluminată' },
  { id: 'rope_tv_shelf', name: '5. Zonă Media & TV', ref: 'Consolă TV & etajeră pe frânghii' },
  { id: 'coffee_station', name: '6. Colțul Nespresso', ref: 'Espressor cafea & ceai de ospitalitate' },
  { id: 'elegance-damask-room', name: '7. Decor Clasic', ref: 'Tapet damasc vintage & sfeșnice' },
  { id: 'door_sign', name: '8. Detaliu Intrare', ref: 'Clanță vintage & plăcuță Please Knock' },
  { id: 'hallway_beams', name: '9. Holul Camerelor', ref: 'Grinzi masive & covor persan' },
  { id: 'stairs_gallery', name: '10. Scară Interioară', ref: 'Scară din lemn masiv & tablouri botanice' }
];

export const PhotoUploaderModal: React.FC = () => {
  const { photos, setPhotoForSlot, deletePhotoForSlot, uploadMultiplePhotos, clearPhotos, uploaderOpen, setUploaderOpen } = useHotelImages();
  const multiFileInputRef = useRef<HTMLInputElement>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!uploaderOpen) return null;

  const handleBatchFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const count = await uploadMultiplePhotos(e.target.files);
      setSuccessMessage(`S-au încărcat cu succes ${count} fotografii originale!`);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleDropBatch = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const count = await uploadMultiplePhotos(e.dataTransfer.files);
      setSuccessMessage(`S-au încărcat cu succes ${count} fotografii originale!`);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={() => setUploaderOpen(false)}
    >
      <div 
        className="relative max-w-3xl w-full bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#D5C9B5] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E2D8] bg-[#FAF8F5]">
          <div className="space-y-0.5">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C2420] flex items-center gap-2">
              <Camera className="w-6 h-6 text-[#4F6D5B]" />
              <span>Gestiune Fotografii Originale</span>
            </h3>
            <p className="text-xs text-[#7A6958]">
              Poți încărca, înlocui sau șterge individual fotografiile pentru fiecare spațiu al hotelului.
            </p>
          </div>

          <button 
            onClick={() => setUploaderOpen(false)}
            className="p-1.5 text-[#5A452E] hover:text-[#2C2420] rounded-full hover:bg-[#EFE9DF]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Master Drag and Drop Zone */}
          <div 
            onDrop={handleDropBatch}
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onClick={() => multiFileInputRef.current?.click()}
            className="p-8 rounded-2xl border-2 border-dashed border-[#C5A059] bg-[#F7F2EA] hover:bg-[#EFE7D8] transition-colors flex flex-col items-center justify-center text-center cursor-pointer space-y-3"
          >
            <div className="w-16 h-16 rounded-full bg-[#E5D7C0] flex items-center justify-center text-[#5A452E] shadow-xs">
              <Upload className="w-8 h-8 text-[#4F6D5B]" />
            </div>

            <div className="space-y-1">
              <p className="font-serif text-base font-bold text-[#2C2420]">
                Trage aici fotografiile tale originale
              </p>
              <p className="text-xs text-[#7A6958]">
                sau apasă aici pentru a alege fișiere de pe dispozitiv
              </p>
            </div>

            <span className="px-4 py-2 rounded-xl bg-[#4F6D5B] text-white font-bold text-xs shadow-sm hover:bg-[#3D5747] transition-colors">
              Selectează Fișiere
            </span>

            <input 
              ref={multiFileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleBatchFiles}
            />
          </div>

          {successMessage && (
            <div className="p-4 rounded-xl bg-[#E8F5E9] border border-[#A5D6A7] text-[#2E7D32] flex items-center gap-2 text-xs font-bold">
              <Check className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Individual Slot List with Delete and Replace */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-base font-bold text-[#2C2420]">
                Fotografiile Alocate pe Spații
              </h4>

              {Object.keys(photos).length > 0 && (
                <button
                  onClick={clearPhotos}
                  className="flex items-center gap-1 text-xs text-[#B91C1C] hover:underline"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Resetează toate fotografiile încărcate</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SLOTS.map((slot) => {
                const isCustomUploaded = Boolean(photos[slot.id]);
                const currentImg = 
                  photos[slot.id] || 
                  (slot.id === 'queen-superioara' ? photos['deluxe-canopy-swing'] : undefined) ||
                  (slot.id === 'dubla-deluxe' ? photos['rustic-chic-suite'] : undefined) ||
                  DEFAULT_HOTEL_PHOTOS[slot.id] ||
                  DEFAULT_HOTEL_PHOTOS['queen-superioara'];

                return (
                  <div 
                    key={slot.id}
                    className="p-3.5 rounded-xl bg-white border border-[#DFD7CB] flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img 
                        src={currentImg} 
                        alt={slot.name} 
                        loading="lazy"
                        decoding="async"
                        className="w-12 h-12 rounded-lg object-cover border border-[#DFD7CB] shrink-0"
                      />

                      <div className="overflow-hidden">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-bold text-[#2C2420] truncate">
                            {slot.name}
                          </p>
                          {isCustomUploaded && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] shrink-0" title="Foto încărcată" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#8C7657] truncate">
                          {slot.ref}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isCustomUploaded && (
                        <button
                          onClick={() => deletePhotoForSlot(slot.id)}
                          className="p-1.5 text-[#B91C1C] hover:bg-[#FEE2E2] rounded-md transition-colors"
                          title="Șterge fotografia încărcată"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <label className="cursor-pointer">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#FAF8F5] hover:bg-[#F2ECE1] border border-[#D5C9B5] text-[#2C2420] block">
                          Schimbă
                        </span>
                        <input 
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setPhotoForSlot(slot.id, file);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E8E2D8] flex justify-end">
          <button
            onClick={() => setUploaderOpen(false)}
            className="px-5 py-2 text-xs font-bold text-white bg-[#2C2420] hover:bg-[#3D2E24] rounded-lg transition-colors"
          >
            Gata / Închide
          </button>
        </div>

      </div>
    </div>
  );
};
