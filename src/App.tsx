import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RoomsSection } from './components/RoomsSection';
import { AmenitiesSection } from './components/AmenitiesSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { SurroundingsAndPolicies } from './components/SurroundingsAndPolicies';
import { Footer } from './components/Footer';
import { StickyBookingBar } from './components/StickyBookingBar';
import { ReservationModal } from './components/ReservationModal';
import { ImageProvider } from './context/ImageContext';
import { Room, Language } from './data/hotelData';

export default function App() {
  const [lang, setLang] = useState<Language>('ro');
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('nest_preferred_lang');
      if (stored === 'ro' || stored === 'en') {
        setLang(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem('nest_preferred_lang', newLang);
    } catch {
      // ignore
    }
  };

  const handleOpenBookingModal = (room?: Room) => {
    setSelectedRoomForBooking(room || null);
    setReservationModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setReservationModalOpen(false);
    setSelectedRoomForBooking(null);
  };

  return (
    <ImageProvider>
      <div className="min-h-screen bg-[#FAF7F2] text-[#1F1A17] flex flex-col font-sans pb-16 sm:pb-0">
        {/* Top Bar Navigation */}
        <Navbar
          lang={lang}
          onLanguageChange={handleLanguageChange}
          onOpenBookingModal={() => handleOpenBookingModal()}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Hero with focal visuals, value proposition & Booking sync */}
          <Hero
            lang={lang}
            onOpenBookingModal={() => handleOpenBookingModal()}
          />

          {/* 2. Rooms & Booking.com Synced Rates with live link & WhatsApp action */}
          <RoomsSection
            lang={lang}
            onSelectRoom={(room) => handleOpenBookingModal(room)}
          />

          {/* 3. Detailed Amenities strictly from Booking screenshot */}
          <AmenitiesSection
            lang={lang}
          />

          {/* 4. Interactive Photo Gallery with filter tabs & Lightbox */}
          <GallerySection
            lang={lang}
          />

          {/* 5. 10,0 Score & Guest Reviews strictly from screenshots */}
          <ReviewsSection
            lang={lang}
          />

          {/* 6. Surroundings, Distances & Official Hotel Policies */}
          <SurroundingsAndPolicies
            lang={lang}
          />
        </main>

        {/* Official Footer with Contacts, Wi-Fi details & Hours */}
        <Footer
          lang={lang}
        />

        {/* Mobile Sticky Quick Booking Bar */}
        <StickyBookingBar
          lang={lang}
          onOpenBookingModal={() => handleOpenBookingModal()}
        />

        {/* Direct Reservation Modal (WhatsApp composer / Phone call / Booking check) */}
        <ReservationModal
          isOpen={reservationModalOpen}
          onClose={handleCloseBookingModal}
          selectedRoom={selectedRoomForBooking}
          lang={lang}
        />
      </div>
    </ImageProvider>
  );
}
