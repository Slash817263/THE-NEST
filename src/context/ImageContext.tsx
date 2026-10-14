import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllPhotos, savePhoto, deletePhoto, clearAllPhotos } from '../utils/imageStore';

interface ImageContextType {
  photos: Record<string, string>;
  setPhotoForSlot: (slotId: string, file: File) => Promise<void>;
  setPhotoDataUrl: (slotId: string, dataUrl: string) => Promise<void>;
  deletePhotoForSlot: (slotId: string) => Promise<void>;
  uploadMultiplePhotos: (files: FileList | File[]) => Promise<number>;
  clearPhotos: () => Promise<void>;
  uploaderOpen: boolean;
  setUploaderOpen: (open: boolean) => void;
  activeUploadSlot: string | null;
  openUploaderForSlot: (slotId?: string) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [uploaderOpen, setUploaderOpen] = useState(false);
  const [activeUploadSlot, setActiveUploadSlot] = useState<string | null>(null);

  useEffect(() => {
    getAllPhotos().then(async (stored) => {
      let updated = { ...stored };

      // Migration: user requested "Sterge imaginea1 trimisa de mine acum"
      // Remove any uploaded photo sitting on 'queen-superioara' so it shows the authentic Queen canopy bedroom
      const cleanupKey = 'nest_clean_image1_v3';
      if (!localStorage.getItem(cleanupKey)) {
        if (updated['queen-superioara']) {
          // If rope_tv_shelf is empty, preserve the shelf photo in rope_tv_shelf
          if (!updated['rope_tv_shelf']) {
            await savePhoto('rope_tv_shelf', updated['queen-superioara']);
            updated['rope_tv_shelf'] = updated['queen-superioara'];
          }
          await deletePhoto('queen-superioara');
          delete updated['queen-superioara'];
        }

        // Fix image 2 mismatch: if bedroom photo ended up in hallway_beams, move to ethnic-boho-suite
        if (updated['hallway_beams'] && !updated['ethnic-boho-suite']) {
          await savePhoto('ethnic-boho-suite', updated['hallway_beams']);
          updated['ethnic-boho-suite'] = updated['hallway_beams'];
          await deletePhoto('hallway_beams');
          delete updated['hallway_beams'];
        }

        // If bathroom photo ended up in stairs_gallery, move to bathroom_vintage
        if (updated['stairs_gallery'] && !updated['bathroom_vintage']) {
          await savePhoto('bathroom_vintage', updated['stairs_gallery']);
          updated['bathroom_vintage'] = updated['stairs_gallery'];
          await deletePhoto('stairs_gallery');
          delete updated['stairs_gallery'];
        }

        localStorage.setItem(cleanupKey, 'true');
      }

      setPhotos(updated);

      // Auto-sync photos from browser IndexedDB to physical files in public/images/
      if (Object.keys(updated).length > 0) {
        try {
          fetch('/api/sync-photos-to-disk', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ photos: updated })
          }).catch(() => {});
        } catch {
          // ignore in static environments
        }
      }
    }).catch(console.error);
  }, []);

  const setPhotoForSlot = async (slotId: string, file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        await savePhoto(slotId, dataUrl);
        setPhotos((prev) => ({ ...prev, [slotId]: dataUrl }));
        resolve();
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const setPhotoDataUrl = async (slotId: string, dataUrl: string) => {
    await savePhoto(slotId, dataUrl);
    setPhotos((prev) => ({ ...prev, [slotId]: dataUrl }));
  };

  const deletePhotoForSlot = async (slotId: string) => {
    await deletePhoto(slotId);
    setPhotos((prev) => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
  };

  const defaultSlots = [
    'queen-superioara',
    'dubla-deluxe',
    'bathroom_vintage',
    'rope_tv_shelf',
    'ethnic-boho-suite',
    'elegance-damask-room',
    'coffee_station',
    'door_sign',
    'hallway_beams',
    'stairs_gallery'
  ];

  const uploadMultiplePhotos = async (files: FileList | File[]): Promise<number> => {
    const fileList = Array.from(files);
    let count = 0;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const slotId = defaultSlots[i % defaultSlots.length] || `custom_photo_${i}`;
      await setPhotoForSlot(slotId, file);
      count++;
    }
    return count;
  };

  const clearPhotos = async () => {
    await clearAllPhotos();
    setPhotos({});
  };

  const openUploaderForSlot = (slotId?: string) => {
    setActiveUploadSlot(slotId || null);
    setUploaderOpen(true);
  };

  return (
    <ImageContext.Provider
      value={{
        photos,
        setPhotoForSlot,
        setPhotoDataUrl,
        deletePhotoForSlot,
        uploadMultiplePhotos,
        clearPhotos,
        uploaderOpen,
        setUploaderOpen,
        activeUploadSlot,
        openUploaderForSlot
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useHotelImages = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useHotelImages must be used within an ImageProvider');
  }
  return context;
};
