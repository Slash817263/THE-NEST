import React, { useState } from 'react';
import { X, Phone, MessageCircle, ExternalLink, Calendar, Users, ShieldCheck, Sparkles } from 'lucide-react';
import { HOTEL_INFO, Room, Language } from '../data/hotelData';
import { BookingLogo } from './BrandLogos';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoom: Room | null;
  lang: Language;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  selectedRoom,
  lang
}) => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestsCount, setGuestsCount] = useState('2');
  const [customNotes, setCustomNotes] = useState('');

  if (!isOpen) return null;

  const buildWhatsAppCustomUrl = () => {
    const phone = "40749513341";
    let message = "";
    const roomTitle = selectedRoom ? selectedRoom.name[lang] : (lang === 'ro' ? 'o suită' : 'a suite');

    if (lang === 'ro') {
      message = `Bună ziua! Doresc să fac o solicitare de rezervare la The NEST Boutique Hotel Botoșani pentru "${roomTitle}".\n`;
      if (checkInDate) message += `· Sosire (Check-in): ${checkInDate}\n`;
      if (checkOutDate) message += `· Plecare (Check-out): ${checkOutDate}\n`;
      if (guestsCount) message += `· Număr persoane: ${guestsCount}\n`;
      if (customNotes.trim()) message += `· Mențiuni / Preferințe: ${customNotes.trim()}\n`;
      message += `Vă rog să-mi confirmați disponibilitatea și cel mai bun tarif direct. Vă mulțumesc!`;
    } else {
      message = `Hello! I would like to inquire about a direct reservation at The NEST Boutique Hotel Botoșani for "${roomTitle}".\n`;
      if (checkInDate) message += `· Check-in: ${checkInDate}\n`;
      if (checkOutDate) message += `· Check-out: ${checkOutDate}\n`;
      if (guestsCount) message += `· Guests: ${guestsCount}\n`;
      if (customNotes.trim()) message += `· Special requests: ${customNotes.trim()}\n`;
      message += `Please confirm availability and direct rate. Thank you!`;
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const t = {
    kicker: lang === 'ro' ? 'Serviciul Concierge The NEST' : 'The NEST Concierge Service',
    modalTitle: lang === 'ro' ? 'Rezervare Directă & Asistență' : 'Direct Booking & Inquiries',
    modalSub: lang === 'ro' 
      ? 'Fără comisioane intermediare sau plăți online nesigure. Rezervările se confirmă direct cu gazda prin telefon sau WhatsApp.'
      : 'No third-party commissions or unverified card payments. Stays are confirmed directly with the host via Phone or WhatsApp.',
    chosenRoom: lang === 'ro' ? 'Suita Selectată' : 'Selected Suite',
    phoneCallHeading: lang === 'ro' ? 'Opțiunea 1: Apel Direct la Recepție' : 'Option 1: Direct Phone Call to Host',
    phoneCallBtn: lang === 'ro' ? 'Apelează 0749 513 341' : 'Call 0749 513 341',
    whatsAppHeading: lang === 'ro' ? 'Opțiunea 2: Solicitare Rapidă pe WhatsApp' : 'Option 2: Direct WhatsApp Inquiry',
    whatsAppBtn: lang === 'ro' ? 'Trimite Solicitarea pe WhatsApp' : 'Send Inquiry on WhatsApp',
    checkInLabel: lang === 'ro' ? 'Check-in (14:00 - 22:00)' : 'Check-in (14:00 - 22:00)',
    checkOutLabel: lang === 'ro' ? 'Check-out (08:00 - 11:00)' : 'Check-out (08:00 - 11:00)',
    guestsLabel: lang === 'ro' ? 'Oaspeți' : 'Guests',
    notesLabel: lang === 'ro' ? 'Mențiuni speciale sau preferințe (opțional)' : 'Special requests or preferences (optional)',
    bookingNoticeHeadline: lang === 'ro' 
      ? 'Doriți să verificați disponibilitatea în timp real?'
      : 'Prefer to check live dates on Booking.com?',
    checkBookingBtn: lang === 'ro' ? 'Deschide Booking.com' : 'Open Booking.com',
    closeBtn: lang === 'ro' ? 'Închide' : 'Close'
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#1F1A17]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div 
        className="relative max-w-xl w-full bg-[#FAF7F2] rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.25)] border border-[#1F1A17]/10 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Top Gold Hairline */}
        <div className="h-1 bg-gradient-to-r from-[#8E7044]/30 via-[#8E7044] to-[#8E7044]/30" />

        {/* Header */}
        <div className="flex items-start justify-between px-6 sm:px-8 pt-6 pb-4 border-b border-[#1F1A17]/8 bg-[#FAF7F2]">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E7044] font-semibold block">
              {t.kicker}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1F1A17] tracking-[-0.01em]">
              {t.modalTitle}
            </h3>
            <p className="text-xs text-[#6E5D4F] font-light leading-relaxed max-w-md pt-0.5">
              {t.modalSub}
            </p>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-[#6E5D4F] hover:text-[#1F1A17] rounded-full hover:bg-[#1F1A17]/5 transition-colors"
            aria-label={t.closeBtn}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
          
          {/* Selected Room Pill/Card */}
          {selectedRoom ? (
            <div className="p-4.5 rounded-2xl bg-white border border-[#1F1A17]/8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-1.5">
              <span className="text-[9.5px] uppercase font-semibold tracking-wider text-[#8E7044]">
                {t.chosenRoom}
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="font-serif text-lg font-medium text-[#1F1A17]">
                  {selectedRoom.name[lang]}
                </p>
                <a
                  href={HOTEL_INFO.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#8E7044] hover:text-[#1F1A17] flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#1F1A17]/8 self-start sm:self-auto transition-colors"
                >
                  <BookingLogo className="h-3 w-auto shrink-0" variant="icon" />
                  <span>{lang === 'ro' ? 'Vezi tarif Booking' : 'Check rate on Booking'}</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
              <p className="text-xs text-[#6E5D4F] font-serif italic pt-0.5">
                „{selectedRoom.tagline[lang]}”
              </p>
            </div>
          ) : null}

          {/* Option 1: Direct Phone Call */}
          <div className="p-5 rounded-2xl bg-white border border-[#1F1A17]/8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F1A17] uppercase tracking-wider">
              <Phone className="w-4 h-4 text-[#8E7044]" />
              <span>{t.phoneCallHeading}</span>
            </div>
            <p className="text-xs text-[#6E5D4F] leading-relaxed font-light">
              {lang === 'ro'
                ? 'Sunați direct la recepția hotelului pentru asistență promptă și confirmare instantă a disponibilității.'
                : 'Call the hotel reception directly for immediate booking confirmation and personalized assistance.'}
            </p>
            <a
              href={`tel:${HOTEL_INFO.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-xl bg-[#1F1A17] hover:bg-[#2C2420] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#FFDE99]" />
              <span>{t.phoneCallBtn}</span>
            </a>
          </div>

          {/* Option 2: WhatsApp Direct Message with Concierge form */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#1F1A17]/8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1F1A17] uppercase tracking-wider">
              <MessageCircle className="w-4 h-4 text-[#8E7044]" />
              <span>{t.whatsAppHeading}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-[#6E5D4F] mb-1">
                  {t.checkInLabel}
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#1F1A17]/12 bg-[#FAF7F2] text-[#1F1A17] focus:outline-none focus:ring-1 focus:ring-[#8E7044]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#6E5D4F] mb-1">
                  {t.checkOutLabel}
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#1F1A17]/12 bg-[#FAF7F2] text-[#1F1A17] focus:outline-none focus:ring-1 focus:ring-[#8E7044]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="sm:col-span-1">
                <label className="block text-[11px] font-semibold text-[#6E5D4F] mb-1">
                  {t.guestsLabel}
                </label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#1F1A17]/12 bg-[#FAF7F2] text-[#1F1A17] focus:outline-none focus:ring-1 focus:ring-[#8E7044]"
                >
                  <option value="1">{lang === 'ro' ? '1 Oaspete' : '1 Guest'}</option>
                  <option value="2">{lang === 'ro' ? '2 Oaspeți' : '2 Guests'}</option>
                  <option value="2 adulți + copil (0-3 ani gratis)">{lang === 'ro' ? '2 Adulți + Copil (gratuit)' : '2 Adults + Child (free)'}</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-[#6E5D4F] mb-1">
                  {t.notesLabel}
                </label>
                <input
                  type="text"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder={lang === 'ro' ? 'ex: Sosire târzie, pat suplimentar...' : 'e.g., Late arrival, extra crib...'}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#1F1A17]/12 bg-[#FAF7F2] text-[#1F1A17] placeholder-[#A69784] focus:outline-none focus:ring-1 focus:ring-[#8E7044]"
                />
              </div>
            </div>

            <a
              href={buildWhatsAppCustomUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-4 rounded-xl bg-[#23583C] hover:bg-[#1C4630] text-white font-semibold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#FFDE99]" />
              <span>{t.whatsAppBtn}</span>
            </a>
          </div>

          {/* Booking.com Transparency Verification Card */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#1F1A17]/8 flex items-center justify-between gap-3 text-xs">
            <span className="text-[#6E5D4F]">{t.bookingNoticeHeadline}</span>
            <a
              href={HOTEL_INFO.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-[#1F1A17] hover:text-[#8E7044] shrink-0 transition-colors"
            >
              <BookingLogo className="h-3 w-auto shrink-0" variant="icon" />
              <span>{t.checkBookingBtn}</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
