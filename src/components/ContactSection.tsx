import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MapPin, Clock, Send, HelpCircle, CheckCircle2, Bookmark, Sparkles, AlertTriangle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Remodel',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setIsDemoMode(false);

    const metaEnv = (import.meta as any).env || {};
    const serviceId = metaEnv.VITE_EMAILJS_SERVICE_ID;
    const templateId = metaEnv.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = metaEnv.VITE_EMAILJS_PUBLIC_KEY;

    // Check if configuration exists
    if (!serviceId || !templateId || !publicKey) {
      // Configuration is missing. Run demo mode simulation so the UI remains pristine, 
      // but inform the user beautifully of what steps to take.
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setIsDemoMode(true);
        setFormData({ name: '', email: '', phone: '', projectType: 'Remodel', message: '' });
      }, 1200);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          phone: formData.phone || 'N/A',
          project_type: formData.projectType,
          message: formData.message,
        },
        publicKey
      );
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      setIsDemoMode(false);
      setFormData({ name: '', email: '', phone: '', projectType: 'Remodel', message: '' });
    } catch (err: any) {
      console.error('EmailJS Submit Error:', err);
      setErrorMessage(err?.text || err?.message || 'Could not send the email message. Verify your active EmailJS Public API key credentials.');
      setIsSubmitting(false);
    }
  };


  return (
    <div className="relative w-full bg-white pt-32 pb-24 px-4 sm:px-6 md:px-12" id="contact-page-section">
      <div className="absolute inset-0 bg-[#F4F0EA]/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="border border-[#B3542E]/30 px-4 py-1.5 rounded-full text-[#B3542E] text-[10px] sm:text-[11px] font-sans font-bold tracking-widest uppercase bg-[#B3542E]/5 inline-block">
            INQUIRE A BESPOKE SPACE
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Let's Pull It Together
          </h1>
          <p className="text-neutral-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Ready to remodel an older home or align blueprints for new construction? Coordinate directly with Martha Murray Design today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Details Panel */}
          <div className="lg:col-span-5 bg-[#F4F0EA]/60 rounded-[2.5rem] p-8 sm:p-10 border border-neutral-200/50 flex flex-col justify-between space-y-8">
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-sans text-neutral-900 tracking-tight">Studio Coordinates</h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed max-w-[280px]">
                Located in Bend, Oregon. Feel free to contact our coordinator to schedule a physical or digital layout consultation.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              {/* Phone Line */}
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200/50 flex items-center justify-center text-[#B3542E] group-hover:bg-[#B3542E] group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">TELEPHONE</span>
                  <a href="tel:+15414201261" className="text-sm font-bold text-[#3d2e27] group-hover:text-[#B3542E] transition-colors font-sans">
                    +1 541-420-1261
                  </a>
                </div>
              </div>

              {/* Address Coordinates */}
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200/50 flex items-center justify-center text-[#B3542E] group-hover:bg-[#B3542E] group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">STUDIO LOCATION</span>
                  <p className="text-sm font-bold text-[#3d2e27] font-sans group-hover:text-[#B3542E] transition-colors leading-tight">
                    50 SE Scott St #8, Bend, OR 97702
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200/50 flex items-center justify-center text-[#B3542E] shadow-sm shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">HOURS</span>
                  <p className="text-sm font-bold text-[#3d2e27] font-sans">
                    Opens 9:00 AM - 5:00 PM <span className="text-[10px] text-[#B3542E] block italic lowercase font-normal">(Juneteenth / Holidays might affect these hours)</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps History / Label block */}
            <div className="border-t border-neutral-200/60 pt-6">
              <div className="flex items-center space-x-2 text-xs text-neutral-500 font-mono">
                <Bookmark className="w-4 h-4 text-[#CE9E56]" />
                <span>Bend Oregon USA • 3M2W+78 Bend, Oregon</span>
              </div>
            </div>

          </div>

          {/* Right Inquiry Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-neutral-200/60 rounded-[2.5rem] shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_100%_0%,rgba(206,158,86,0.06),transparent_70%)] pointer-events-none" />

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-[#CE9E56] px-4 py-3 rounded-xl outline-none transition-all text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase">Email address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-[#CE9E56] px-4 py-3 rounded-xl outline-none transition-all text-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase">Phone number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-[#CE9E56] px-4 py-3 rounded-xl outline-none transition-all text-sm"
                        placeholder="+1 541-XXX-XXXX"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase">Project Target</label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-[#CE9E56] px-4 py-3.5 rounded-xl outline-none transition-all text-sm appearance-none cursor-pointer"
                      >
                        <option value="Remodel">Old Home Remodeling</option>
                        <option value="NewConstruction">New Construction Home</option>
                        <option value="Consultation">Bespoke Color / Material Consult</option>
                        <option value="CAD">Blueprint CAD block Access</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase">Inquiry requirements</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                      className="w-full bg-neutral-50 border border-neutral-200 focus:border-[#CE9E56] px-4 py-3 rounded-xl outline-none transition-all text-sm resize-none"
                      placeholder="Describe your design dream, budget limits, or architectural notes..."
                    />
                  </div>

                  {errorMessage && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex gap-2.5 items-start mt-2"
                    >
                      <AlertTriangle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                      <div>
                        <span className="font-bold block">Transmission Interrupted</span>
                        <span>{errorMessage}</span>
                      </div>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-neutral-950 hover:bg-[#B3542E] text-white py-3.5 rounded-xl font-semibold text-xs transition-colors duration-300 disabled:opacity-50 flex items-center justify-center space-x-2 shadow cursor-pointer uppercase tracking-wider h-12"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending inquiry...
                      </span>
                    ) : (
                      <>
                        <span>Submit Consultation Request</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-6 space-y-5"
                >
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-200 text-emerald-600 shadow-sm">
                    <CheckCircle2 className="w-8 h-8 fill-emerald-50/10" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-neutral-950 font-sans tracking-tight">Inquiry Received Perfectly</h3>
                    <p className="text-neutral-500 text-xs sm:text-sm max-w-sm leading-relaxed font-sans font-light">
                      Thank you. Your layout coordinates and project notes have been queued. Martha Murray will review them and follow up within 24 business hours.
                    </p>
                  </div>

                  {isDemoMode && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-left p-4.5 rounded-2xl bg-[#F4F0EA]/70 border border-[#CE9E56]/30 text-neutral-800 text-[11px] space-y-2 max-w-md"
                    >
                      <div className="flex items-center gap-1.5 font-bold font-mono text-[#neutral-900] uppercase text-[9px] tracking-widest">
                        <Sparkles className="w-3.5 h-3.5 text-[#CE9E56]" />
                        <span>Live Email Integration Guidelines</span>
                      </div>
                      <p className="font-sans leading-relaxed text-neutral-600 font-light">
                        The form was simulated successfully! To enable real email delivery directly to Martha's inbox, configure these keys in your AI Studio Secrets:
                      </p>
                      <ul className="list-disc list-inside space-y-1 font-mono text-[9px] text-[#B3542E] pl-1 font-semibold">
                        <li>VITE_EMAILJS_SERVICE_ID</li>
                        <li>VITE_EMAILJS_TEMPLATE_ID</li>
                        <li>VITE_EMAILJS_PUBLIC_KEY</li>
                      </ul>
                    </motion.div>
                  )}

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-mono text-[#B3542E] hover:underline pt-2 cursor-pointer transition-colors"
                  >
                    ← Submit another request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </div>
  );
}
