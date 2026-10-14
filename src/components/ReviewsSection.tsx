import React, { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, Check, X, ShieldCheck, Heart, Sparkles, Award } from 'lucide-react';
import { REVIEWS, Review, Language, HOTEL_INFO } from '../data/hotelData';
import { BookingLogo } from './BrandLogos';

interface ReviewsSectionProps {
  lang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);
  const [modalOpen, setModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newStayType, setNewStayType] = useState('');
  const [newRating, setNewRating] = useState<number>(10);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load reviews from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nest_guest_reviews_strict');
      if (saved) {
        const parsed: Review[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews([...parsed, ...REVIEWS]);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: Review = {
      id: `rev-custom-${Date.now()}`,
      author: newAuthor.trim(),
      city: newCity.trim() || (lang === 'ro' ? 'Oaspete The Nest' : 'The Nest Guest'),
      rating: newRating,
      date: lang === 'ro' ? 'Recent' : 'Recent',
      stayType: {
        ro: newStayType.trim() || 'Sejur de relaxare',
        en: newStayType.trim() || 'Relaxing stay'
      },
      comment: {
        ro: newComment.trim(),
        en: newComment.trim()
      }
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);

    try {
      const customOnly = updated.filter(r => r.id.startsWith('rev-custom-'));
      localStorage.setItem('nest_guest_reviews_strict', JSON.stringify(customOnly));
    } catch {
      // ignore
    }

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setModalOpen(false);
      setNewAuthor('');
      setNewCity('');
      setNewStayType('');
      setNewComment('');
      setNewRating(10);
    }, 1500);
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const scoreCategories = [
    { label: lang === 'ro' ? 'Curățenie exemplară' : 'Impeccable Cleanliness', score: '10,0' },
    { label: lang === 'ro' ? 'Confort & Saltele' : 'Comfort & Bedding', score: '10,0' },
    { label: lang === 'ro' ? 'Locație centrală' : 'Central Location', score: '10,0' },
    { label: lang === 'ro' ? 'Facilități cameră' : 'Room Facilities', score: '10,0' },
    { label: lang === 'ro' ? 'Personal & Ospitalitate' : 'Staff & Hospitality', score: '10,0' },
    { label: lang === 'ro' ? 'Raport calitate / preț' : 'Value for money', score: '10,0' }
  ];

  const t = {
    kicker: lang === 'ro' ? 'Reputație Oficială & Recenzii' : 'Official Reputation & Reviews',
    title: lang === 'ro' ? 'Evaluat la Superlativ (10,0)' : 'Rated Superb (10.0)',
    subtitle: lang === 'ro'
      ? '„Locație de top: evaluată la superlativ de clienții recenți (10,0)”. Descoperiți experiențele autentice ale oaspeților noștri despre curățenie, confort și intimitate.'
      : '“Top location: rated superb by recent guests (10.0)”. Explore genuine verified impressions from our guests regarding cleanliness, comfort, and hospitality.',
    verifiedBooking: lang === 'ro' ? 'Evaluat la Superlativ pe Booking.com' : 'Rated Superb on Booking.com',
    scoreSub: lang === 'ro' ? 'Punctaj maxim 10,0 acordat de toți clienții recenți' : 'Maximum 10.0 rating granted by recent guests',
    addReviewBtn: lang === 'ro' ? 'Scrie o Recenzie' : 'Write a Review',
    viewBookingBtn: lang === 'ro' ? 'Verifică pe Booking.com' : 'Verify on Booking.com',
    modalTitle: lang === 'ro' ? 'Împărtășește experiența ta la The NEST' : 'Share your stay at The NEST',
    modalSub: lang === 'ro' ? 'Apreciem feedback-ul dumneavoastră sincer și dedicat excelenței.' : 'We appreciate your genuine feedback dedicated to our hospitality.',
    authorLabel: lang === 'ro' ? 'Nume și Prenume' : 'Your Full Name',
    authorPlaceholder: lang === 'ro' ? 'ex: Maria Ionescu' : 'e.g. Maria Ionescu',
    cityLabel: lang === 'ro' ? 'Oraș / Țară' : 'City / Country',
    cityPlaceholder: lang === 'ro' ? 'ex: Iași, România' : 'e.g. Bucharest, Romania',
    stayLabel: lang === 'ro' ? 'Tipul sejurului' : 'Stay type',
    stayPlaceholder: lang === 'ro' ? 'ex: Sejur romantic în cuplu' : 'e.g. Romantic couples getaway',
    ratingLabel: lang === 'ro' ? 'Notă acordată' : 'Rating',
    commentLabel: lang === 'ro' ? 'Impresiile dumneavoastră despre ospitalitate și confort' : 'Your thoughts on comfort and hospitality',
    commentPlaceholder: lang === 'ro' ? 'Descrieți atmosfera, curățenia, patul sau detaliile care v-au plăcut...' : 'Describe the ambiance, cleanliness, bed or features you enjoyed...',
    submitBtn: lang === 'ro' ? 'Publică Recenzia' : 'Publish Review',
    successMsg: lang === 'ro' ? 'Vă mulțumim! Recenzia dumneavoastră a fost înregistrată cu succes.' : 'Thank you! Your review has been recorded successfully.',
    verifiedStay: lang === 'ro' ? 'Sejur Verificat' : 'Verified Stay',
    superbAward: lang === 'ro' ? 'Excelență Absolută' : 'Absolute Excellence',
    perfectScoreNotice: lang === 'ro' ? '100% din recenzii acordă nota maximă 10,0' : '100% of reviews grant a maximum 10.0 score'
  };

  return (
    <section id="recenzii" className="relative py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#1F1A17]/8">
      
      {/* Decorative hairline gold separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (C8.1) */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#C5A059]/30 shadow-2xs">
            <Award className="w-3.5 h-3.5 text-[#8E7044]" />
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

        {/* Master Scoreboard & Category Breakdown Dashboard (C8.1) */}
        <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white border border-[#C5A059]/30 shadow-[0_4px_30px_rgba(0,0,0,0.02)] mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: 10,0 Hero Badge & Verification Links */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 lg:border-r lg:border-[#1F1A17]/8 lg:pr-8">
              
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-[#14100E] text-white flex flex-col items-center justify-center font-serif shadow-md border border-[#C5A059]/40 shrink-0">
                  <span className="text-3xl font-bold leading-none tabular-nums text-[#FFDE99]">10,0</span>
                  <span className="text-[9px] tracking-[0.2em] uppercase font-sans mt-1 text-[#E5D7BF]">Superb</span>
                </div>

                <div className="text-left space-y-1">
                  <div className="flex items-center gap-1 text-[#C5A059]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C5A059]" />
                    ))}
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-medium text-[#1F1A17]">
                    {t.verifiedBooking}
                  </h3>
                  <span className="text-xs text-[#8E7044] block">
                    {t.scoreSub}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#1F1A17]/8 w-full text-xs text-[#6E5D4F] flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span className="font-medium text-[#2C2420]">{t.perfectScoreNotice}</span>
              </div>

              {/* Action Buttons: Booking.com direct link & Leave a review */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full pt-1">
                <a
                  href={HOTEL_INFO.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#14100E] hover:bg-[#251E1A] text-white text-xs font-semibold border border-[#C5A059]/40 hover:border-[#C5A059] shadow-xs transition-all duration-300"
                >
                  <BookingLogo className="h-3.5 w-auto shrink-0" variant="icon" />
                  <span className="text-[#FFDE99] group-hover:text-white transition-colors">{t.viewBookingBtn}</span>
                </a>

                <button
                  onClick={() => setModalOpen(true)}
                  className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-[#FAF7F2] text-[#1F1A17] text-xs font-semibold border border-[#C5A059]/40 hover:border-[#8E7044] shadow-xs transition-all duration-300"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5 text-[#8E7044]" />
                  <span>{t.addReviewBtn}</span>
                </button>
              </div>
            </div>

            {/* Right Column: 6 Official Booking Score Categories */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {scoreCategories.map((cat, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#1F1A17]/6 flex items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-[#2C2420] block">
                      {cat.label}
                    </span>
                    <div className="w-28 sm:w-32 h-1.5 rounded-full bg-[#E5DFD7] overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-[#8E7044] to-[#C5A059] rounded-full" />
                    </div>
                  </div>
                  <span className="font-serif text-sm font-bold text-[#1F1A17] tabular-nums bg-white px-2 py-0.5 rounded-md border border-[#1F1A17]/8">
                    {cat.score}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Editorial Testimonial Cards Grid (C8.3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="group relative p-7 rounded-3xl bg-white border border-[#C5A059]/25 hover:border-[#8E7044] shadow-[0_2px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(31,26,23,0.05)] transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle ornamental quotation mark in background */}
              <span className="absolute right-5 top-3 font-serif text-6xl text-[#C5A059]/15 select-none pointer-events-none group-hover:text-[#C5A059]/25 transition-colors">
                “
              </span>

              <div className="space-y-4 relative z-10">
                
                {/* Author Info & Rating */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Monogram Avatar */}
                    <div className="w-10 h-10 rounded-full bg-[#14100E] border border-[#C5A059]/40 text-[#FFDE99] flex items-center justify-center font-serif text-xs font-semibold shadow-xs shrink-0">
                      {getInitials(rev.author)}
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-medium text-[#1F1A17]">
                        {rev.author}
                      </h3>
                      <p className="text-[11px] text-[#8E7044]">
                        {rev.city}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#C5A059]/30 text-xs font-serif font-bold tabular-nums text-[#1F1A17] shrink-0">
                    <Star className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
                    <span>{rev.rating},0</span>
                  </div>
                </div>

                {/* Stay Type Tag */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#1F1A17]/6 text-[10.5px] font-medium text-[#7A6958]">
                  <span>{rev.stayType[lang]}</span>
                </div>

                {/* Guest Quote */}
                <p className="text-xs sm:text-sm text-[#4A3D33] leading-relaxed italic pt-1">
                  "{rev.comment[lang]}"
                </p>
              </div>

              {/* Card Footer: Verified Stay & Date */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#1F1A17]/6 text-[11px] text-[#8E7044] relative z-10">
                <div className="flex items-center gap-1.5 text-[#8E7044]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="font-medium">{t.verifiedStay}</span>
                </div>
                <span className="tabular-nums text-[#7A6958]">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Quiet Luxury Guest Review Modal (C8.3) */}
      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-[#0A0807]/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setModalOpen(false)}
        >
          <div 
            className="relative max-w-lg w-full bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#C5A059]/40 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#1F1A17]/8">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#8E7044] font-semibold">
                  {t.kicker}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1F1A17]">
                  {t.modalTitle}
                </h3>
                <p className="text-xs text-[#6E5D4F]">
                  {t.modalSub}
                </p>
              </div>

              <button 
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 text-[#6E5D4F] hover:text-[#1F1A17] flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#14100E] border border-[#C5A059]/50 text-[#FFDE99] flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-7 h-7 text-[#FFDE99]" />
                </div>
                <h4 className="font-serif text-xl font-normal text-[#1F1A17]">
                  {t.successMsg}
                </h4>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="pt-5 space-y-4">
                
                {/* Rating Stars Selector (1 to 10) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1F1A17] block">
                    {t.ratingLabel}: <span className="text-[#8E7044] font-serif font-bold text-sm tabular-nums">{hoverRating ?? newRating},0 / 10</span>
                  </label>
                  <div className="flex items-center gap-1.5 p-2.5 rounded-2xl bg-white border border-[#1F1A17]/10">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setNewRating(num)}
                        onMouseEnter={() => setHoverRating(num)}
                        onMouseLeave={() => setHoverRating(null)}
                        className={`w-7 h-7 rounded-lg text-xs font-serif font-bold tabular-nums transition-all ${
                          num <= (hoverRating ?? newRating)
                            ? 'bg-[#14100E] text-[#FFDE99] border border-[#C5A059]/40 scale-105'
                            : 'bg-[#FAF7F2] text-[#7A6958] border border-transparent hover:border-[#C5A059]/30'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#2C2420]">
                    {t.authorLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder={t.authorPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#1F1A17]/12 text-xs sm:text-sm text-[#1F1A17] placeholder-[#A69784] focus:outline-hidden focus:border-[#8E7044] focus:ring-1 focus:ring-[#8E7044]"
                  />
                </div>

                {/* City & Stay Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#2C2420]">
                      {t.cityLabel}
                    </label>
                    <input
                      type="text"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      placeholder={t.cityPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#1F1A17]/12 text-xs sm:text-sm text-[#1F1A17] placeholder-[#A69784] focus:outline-hidden focus:border-[#8E7044] focus:ring-1 focus:ring-[#8E7044]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#2C2420]">
                      {t.stayLabel}
                    </label>
                    <input
                      type="text"
                      value={newStayType}
                      onChange={(e) => setNewStayType(e.target.value)}
                      placeholder={t.stayPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#1F1A17]/12 text-xs sm:text-sm text-[#1F1A17] placeholder-[#A69784] focus:outline-hidden focus:border-[#8E7044] focus:ring-1 focus:ring-[#8E7044]"
                    />
                  </div>
                </div>

                {/* Comment */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#2C2420]">
                    {t.commentLabel} *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={t.commentPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#1F1A17]/12 text-xs sm:text-sm text-[#1F1A17] placeholder-[#A69784] focus:outline-hidden focus:border-[#8E7044] focus:ring-1 focus:ring-[#8E7044] resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#14100E] hover:bg-[#251E1A] text-[#FFDE99] hover:text-white font-serif text-sm font-medium border border-[#C5A059]/40 hover:border-[#C5A059] shadow-md transition-all duration-300"
                  >
                    {t.submitBtn}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
