import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, ArrowRight, User, Mail, Sparkles, Home, Phone, Sliders } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Entire Home Curation',
    style: 'Contemporary Minimalist',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate premium API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          id="quote-modal-overlay"
        >
          {/* Backdrop exit click */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Modal box */}
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            className="relative w-full max-w-2xl bg-[#0b0b0b] border border-neutral-900 rounded-3xl overflow-hidden p-6 md:p-8 space-y-6 shadow-2xl z-10"
            id="quote-modal-container"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-neutral-900 hover:bg-neutral-800 rounded-full text-white cursor-pointer transition-transform hover:rotate-90 duration-300"
              id="close-quote-btn"
            >
              <X className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="quote-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono tracking-[4px] text-[#D4AF37] uppercase flex items-center space-x-1.5 justify-center sm:justify-start">
                      <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
                      <span>BESPOKE CONSULTANCY REQUEST</span>
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white text-center sm:text-left">Inquire Martha Murray Design</h3>
                    <p className="text-xs text-neutral-400 text-center sm:text-left max-w-md font-light leading-relaxed">
                      Connect with our Milano design architects. Share your floor blueprints or space parameters to construct custom layouts.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-1">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">FULL NAME</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                        <input
                          type="text"
                          required
                          placeholder="Jean-Marie Massaud"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-900 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">EMAIL ADDRESS</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                        <input
                          type="email"
                          required
                          placeholder="massaud@design.it"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-900 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">MOBILE PHONE</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                        <input
                          type="tel"
                          required
                          placeholder="+39 02 654 3210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-900 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                        />
                      </div>
                    </div>

                    {/* Area of Interest */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">SPATIAL SCOPE</label>
                      <div className="relative">
                        <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                        <select
                          value={formData.interest}
                          onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-900 rounded-xl py-3 pl-11 pr-4 text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all appearance-none"
                        >
                          <option value="Entire Home Curation">Entire Home Curation</option>
                          <option value="Modular Sofa Configurator">Modular Sofa Systems</option>
                          <option value="Bespoke Dressing Wardrobes">Integrated Wardrobes</option>
                          <option value="Hospitality/Commercial Portfolio">Commercial Space</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Vibe selection */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">PREFERRED SYSTEM FINISH</label>
                    <div className="relative">
                      <Sliders className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                      <select
                        value={formData.style}
                        onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-900 rounded-xl py-3 pl-11 pr-4 text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all appearance-none"
                      >
                        <option value="Contemporary Minimalist">Contemporary Canapa Weave + Black Elm</option>
                        <option value="Monolithic Travertine">Monolithic Travertine + Calacatta Gold Marble</option>
                        <option value="Bespoke Dark Luxury">Castoro Saddle Leather + Champagne Metals</option>
                      </select>
                    </div>
                  </div>

                  {/* Custom Message */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">MESSAGE & BRIEF NOTES</label>
                    <textarea
                      placeholder="Specify your living room scale, ceiling height, or request catalog PDF files..."
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-900 rounded-xl py-3 px-4 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all resize-none"
                    />
                  </div>

                  {/* Submit lines with Next.js loading logic */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-white hover:bg-neutral-200 text-black text-xs font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg active:scale-99 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="w-4.5 h-4.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Submit Consultation Dossier</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="quote-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-8 space-y-5"
                >
                  <div className="inline-flex p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 animate-bounce">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-white">Dossier Registered Successfully</h3>
                    <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="text-[#D4AF37] font-semibold">{formData.name}</span>. An executive designer from Martha Murray Design is processing your request. We will contact you at <span className="text-white font-medium">{formData.email}</span> within 2 hours.
                    </p>
                  </div>
                  
                  <div className="bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800 text-left text-xs max-w-sm mx-auto space-y-1">
                    <span className="text-[9px] font-mono text-[#D4AF37] tracking-widest block font-bold uppercase">SUMMARIZED BRIEF</span>
                    <p className="text-neutral-300 font-mono">Scope: {formData.interest}</p>
                    <p className="text-neutral-400 font-mono">Theme Material: {formData.style}</p>
                  </div>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      onClose();
                    }}
                    className="bg-[#D4AF37] text-black hover:bg-yellow-600 text-xs font-semibold px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
