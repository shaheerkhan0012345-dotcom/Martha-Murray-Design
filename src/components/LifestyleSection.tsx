import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Eye, Compass, Heart, Award } from 'lucide-react';
import { IMAGES } from '../data';

interface LifestyleSectionProps {
  onOpenCatalog: () => void;
  onOpenQuote: () => void;
}

export default function LifestyleSection({ onOpenCatalog, onOpenQuote }: LifestyleSectionProps) {
  const elements = [
    {
      title: "Atmospheric Acoustics",
      description: "How sound propagates through a contemporary penthouse. By utilizing organic linen weaves and thermal-treated Spessart Oak Panels, we acoustic-soften room volume directly.",
      img: IMAGES.contemporary,
      icon: <Award className="w-4 h-4 text-[#D4AF37]" />,
      vibe: "#RESONANCE"
    },
    {
      title: "Zenith Sunlight Loops",
      description: "Our window structures are aligned to harvest zenith light. We specify travertine textures that scatter natural daylight rather than glancing reflections, creating soft ambient rays.",
      img: IMAGES.minimalist,
      icon: <Compass className="w-4 h-4 text-[#D4AF37]" />,
      vibe: "#ILLUMINATION"
    }
  ];

  return (
    <div className="bg-[#060606] border-t border-neutral-900 py-16 md:py-24 px-6 md:px-12 relative overflow-hidden" id="lifestyle-showcase">
      {/* Decorative gradient glowing blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-yellow-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Editorial Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono tracking-[5px] text-[#D4AF37] uppercase flex items-center justify-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span>SENSORY HABITAT philosophy</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white font-sans">Human Sensorial Curation</h2>
          <p className="text-xs md:text-sm text-neutral-400 font-light leading-relaxed">
            Beautiful architectural aesthetics are only half the dialogue. Martha Murray Design curates furniture around acoustic absorption, warm lighting dispersion, and tactile comfort.
          </p>
        </div>

        {/* Dynamic Splits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {elements.map((elem, idx) => (
            <motion.div
              key={elem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="bg-neutral-950/40 rounded-2xl border border-neutral-900/60 p-6 space-y-6 hover:border-neutral-800 transition-colors"
            >
              {/* Image Frame */}
              <div className="aspect-video w-full rounded-xl overflow-hidden relative group">
                <img
                  src={elem.img}
                  alt={elem.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-transparent transition-colors" />
                <span className="absolute bottom-3 left-3 bg-black/85 text-[8px] font-mono text-neutral-400 border border-white/5 py-1 px-2.5 rounded">
                  {elem.vibe}
                </span>
              </div>

              {/* Text content */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#D4AF37]">
                  {elem.icon}
                  <h3 className="text-lg font-bold tracking-tight text-white">{elem.title}</h3>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  {elem.description}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex space-x-2 pt-2 border-t border-white/5">
                <button
                  onClick={onOpenCatalog}
                  className="text-xs font-semibold uppercase bg-white hover:bg-neutral-200 text-black px-4 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  Configure System
                </button>
                <button
                  onClick={onOpenQuote}
                  className="text-xs border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  Consult Designer
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Elegant horizontal stat board */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-neutral-950/30 rounded-2xl border border-neutral-950 text-center">
          {[
            { value: "COMO, IT", label: "Origin Factory" },
            { value: "1970", label: "Founded Year" },
            { value: "5-YEAR", label: "Bespoke Warranty" },
            { value: "100%", label: "Anodized Aluminum" }
          ].map((stat) => (
            <div key={stat.label} className="space-y-1">
              <p className="text-lg md:text-xl font-bold tracking-tight text-white">{stat.value}</p>
              <p className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
