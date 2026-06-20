import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Sparkles, Hammer, Palette, Compass, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export default function ServicesSection({ onOpenQuote }: { onOpenQuote: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const services = [
    {
      icon: <Palette className="w-6 h-6 text-[#B3542E]" />,
      title: "Bespoke Space & Color Sensibilities",
      description: "Developing custom color wheels and functional floor blueprints. We curate textures that feel organic, eye-safe, and deeply comforting to your personal style.",
      price: "Bespoke Consults"
    },
    {
      icon: <Hammer className="w-6 h-6 text-[#B3542E]" />,
      title: "Older Home Remodeling Coordination",
      description: "Guiding renovations of historic and older properties in Bend, Oregon. We specialize in preserving charm while introducing premium modern configurations.",
      price: "Full-scale Services"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#B3542E]" />,
      title: "Contractor Liaison & Advocacy",
      description: "Finding top-tier contractors, analyzing work bids, and acting as your trusted advocate on-site. We align schedules and keep builders on budget.",
      price: "Turnkey Protection"
    },
    {
      icon: <Compass className="w-6 h-6 text-[#B3542E]" />,
      title: "Custom Timber & Wardrobe Mockups",
      description: "Sourcing premium woods like Spessart Oak, Black Elm, and saddle leather drawers. High-voltage linear lighting plans are built directly into carpentry blueprints.",
      price: "Material Curation"
    }
  ];

  return (
    <div className="relative w-full bg-[#fdfdfd] pt-32 pb-24 px-4 sm:px-6 md:px-12" id="services-page-section">
      {/* Background radial soft light gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(206,158,86,0.06),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Editorial Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="border border-[#B3542E]/30 px-4 py-1.5 rounded-full text-[#B3542E] text-[10px] sm:text-[11px] font-sans font-bold tracking-widest uppercase bg-[#B3542E]/5"
          >
            OUR DESIGN PHILOSOPHY & WORK
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-tight"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Aesthetic Clarity in Every Material Choice
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-neutral-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
          >
            With years of recognition in Oregon, our studio bridges the gap between home-owners, pristine materials, and elite local contractors.
          </motion.p>
        </div>

        {/* Dynamic Bento Cards */}
        <motion.div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 cursor-pointer"
        >
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                y: -8, 
                borderColor: '#CE9E56',
                boxShadow: '0 20px 40px -15px rgba(206, 158, 86, 0.12)'
              }}
              className="bg-white border border-neutral-100 p-6 sm:p-8 rounded-[2rem] flex flex-col justify-between space-y-6 group transition-all duration-300 relative overflow-hidden"
            >
              {/* Card top flare */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_100%_0%,rgba(179,84,46,0.06),transparent_70%)] pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100" />
              
              <div className="space-y-4">
                <div className="p-3 bg-neutral-50 rounded-2xl w-fit group-hover:bg-[#CE9E56]/10 group-hover:scale-110 transition-all duration-300">
                  {svc.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 font-sans group-hover:text-[#CE9E56] transition-colors duration-300">
                  {svc.title}
                </h3>
                <p className="text-neutral-500 text-xs sm:text-sm font-normal leading-relaxed">
                  {svc.description}
                </p>
              </div>

              <div className="border-t border-neutral-100 pt-4 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase">
                  {svc.price}
                </span>
                <span className="text-[11px] font-semibold text-[#B3542E] group-hover:translate-x-1.5 transition-transform duration-300 flex items-center gap-1">
                  Inquire Now <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Beautiful FAQ section indicating Contractor Advocacy */}
        <div className="bg-[#F4F0EA] rounded-[2rem] p-8 sm:p-12 border border-neutral-200/40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[9px] font-mono tracking-widest text-[#B3542E] uppercase block">
              COLLABORATIVE SUCCESS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 font-sans">
              The Value of an Advocate
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-sans">
              Kevin, a local client in Bend, observed: <br/>
              <span className="italic block mt-2 text-neutral-800">
                &ldquo;She quickly grasped our vision and helped us choose a contractor... she became an important advocate for us throughout the entire job.&rdquo;
              </span>
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-neutral-900">
            <div className="bg-white/60 backdrop-blur p-6 rounded-2xl border border-neutral-800/5 space-y-2">
              <h4 className="text-sm font-bold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#B3542E]" /> No Overwhelming Choices</h4>
              <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed">
                We handle the heavy lifting regarding material layouts and timber matching so you feel completely supported.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur p-6 rounded-2xl border border-neutral-800/5 space-y-2">
              <h4 className="text-sm font-bold flex items-center gap-1.5"><HelpCircle className="w-4 h-4 text-[#B3542E]" /> Complete Integrity</h4>
              <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed">
                From old remodel budgets to new construction homes - our fee makes up a surprisingly small percentage of total remodel budgets.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
