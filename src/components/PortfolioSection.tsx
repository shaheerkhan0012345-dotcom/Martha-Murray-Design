import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Compass, Layers, CheckCircle2, ChevronRight, X, ArrowUpRight } from 'lucide-react';
import { ProjectExhibit } from '../types';
import { PROJECTS } from '../data';

export default function PortfolioSection({ onOpenQuote }: { onOpenQuote: () => void }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeProject, setActiveProject] = useState<ProjectExhibit | null>(null);

  const filters = ['All', 'Residential', 'Wellness Villa', 'Apparel Suite'];

  const filteredProjects = selectedFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedFilter);

  return (
    <div className="relative w-full bg-[#fcfcfc] pt-32 pb-24 px-4 sm:px-6 md:px-12" id="portfolio-page-section">
      <div className="absolute inset-0 bg-[#F4F0EA]/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Editorial Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-4 border-b border-neutral-100">
          <div>
            <span className="text-[10px] font-mono tracking-[4px] text-[#B3542E] uppercase block">PREMIUM BLUEPRINTS</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mt-1" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Architectural Exhibits
            </h1>
          </div>
          
          {/* Tagline */}
          <p className="text-neutral-500 text-xs sm:text-sm font-normal max-w-sm leading-relaxed">
            Delivering bespoke spatial designs for luxury villas, residences, and suites across international boundaries.
          </p>
        </div>

        {/* Categories / Filter Selector */}
        <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`text-xs font-semibold px-5 py-2.5 rounded-full border cursor-pointer transition-all duration-300 ${
                selectedFilter === f
                  ? 'bg-neutral-950 text-white border-neutral-950 shadow-md scale-105'
                  : 'bg-white text-neutral-500 border-neutral-150 hover:bg-neutral-50 hover:text-black'
              }`}
            >
              {f === 'All' ? 'All Spaces' : `#${f}`}
            </button>
          ))}
        </div>

        {/* Dynamic Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-4">
          {filteredProjects.map((proj) => (
            <motion.div
              key={proj.id}
              layoutId={`portfolio-proj-${proj.id}`}
              onClick={() => setActiveProject(proj)}
              whileHover={{ 
                y: -10, 
                borderColor: '#CE9E56',
                boxShadow: '0 30px 60px -20px rgba(179, 84, 46, 0.12)'
              }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-3xl overflow-hidden border border-neutral-100 bg-white p-5 space-y-4 cursor-pointer group/item transition-all duration-500 shadow-md"
            >
              {/* Image Frame with zoom effects */}
              <div className="aspect-[4/3] rounded-2.5xl overflow-hidden relative shadow-inner">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover/item:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover/item:opacity-95 transition-opacity duration-300" />
                
                <span className="absolute top-4 left-4 bg-white/95 text-[9px] font-bold text-neutral-900 px-3 py-1 rounded-full border border-neutral-100 shadow-sm uppercase">
                  {proj.category}
                </span>
                
                <span className="absolute bottom-4 right-4 w-9 h-9 bg-white/90 text-neutral-950 rounded-full flex items-center justify-center transform scale-90 group-hover/item:scale-105 group-hover/item:bg-[#B3542E] group-hover/item:text-white transition-all duration-300 shadow">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              {/* Data Content */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center space-x-1.5 text-neutral-400 text-xs font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[#B3542E]" />
                  <span>{proj.location}</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 group-hover/item:text-[#B3542E] transition-colors duration-300 font-sans">
                  {proj.title}
                </h3>
              </div>

              {/* Card Footer detail */}
              <div className="flex justify-between items-center text-[11px] font-mono text-neutral-400 border-t border-neutral-100 pt-3">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-neutral-450" />
                  <span>Curated: {proj.year}</span>
                </div>
                <span className="text-[#CE9E56] font-semibold flex items-center gap-1 group-hover/item:text-[#B3542E] transition-colors">
                  Explore Blueprint <ChevronRight className="w-3 h-3 group-hover/item:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action bar matching CAD resource inquiry */}
        <div className="bg-[#F4F0EA] rounded-[2.5rem] p-8 sm:p-12 border border-neutral-200/50 flex flex-col md:flex-row justify-between items-center gap-6 mt-12 transition-all duration-300 shadow">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="bg-[#CE9E56]/15 border border-[#CE9E56]/30 text-[#CE9E56] text-[9.5px] font-sans font-bold px-3 py-1 rounded-full uppercase inline-block">
              CAD Architecture Resources
            </span>
            <h4 className="text-xl font-bold text-neutral-950 font-sans leading-tight">Request Blueprint CAD Blocks?</h4>
            <p className="text-neutral-600 text-xs sm:text-sm font-sans tracking-wide">
              We provide architects, developers, and partners high-resolution 3ds Max models, CAD frameworks, and curated finish swatch directories.
            </p>
          </div>
          <button
            onClick={onOpenQuote}
            className="w-full md:w-auto bg-neutral-950 hover:bg-[#B3542E] text-white text-xs font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 tracking-wide inline-block shrink-0 shadow cursor-pointer text-center"
          >
            Inquire CAD Block files
          </button>
        </div>

      </div>

      {/* Project Expansion Overlay */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <div className="relative max-w-4xl w-full bg-[#0a0a0a] border border-neutral-800 rounded-[2.5rem] p-6 md:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
              
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 p-2 bg-neutral-900 hover:bg-neutral-800 rounded-full text-white cursor-pointer transition-transform hover:scale-105"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4 md:pt-0">
                
                {/* Visual Section */}
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-neutral-800/80 relative">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex gap-1.5">
                    <span className="bg-black/90 text-[8.5px] font-mono text-[#CE9E56] px-3 py-1 rounded border border-neutral-800 uppercase flex items-center space-x-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>3D LAYOUT APPROVED</span>
                    </span>
                  </div>
                </div>

                {/* Specs Section */}
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-[#CE9E56] tracking-[3px] uppercase block">Spatial Blueprint Audit</span>
                  <h3 className="text-2xl font-bold tracking-tight text-white font-sans">{activeProject.title}</h3>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono text-neutral-400 border-b border-neutral-900 pb-3">
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#CE9E56]" />
                      <span>{activeProject.location}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Built: {activeProject.year}</span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    Designed and coordinated as our signature spatial statement. This layout utilizes low-profile curved sofas, bespoke multi-density cushions, and premium Black Elm veneers. Martha Murray's curated lighting plans create exceptional depth, balancing day-time rays with moka LED borders.
                  </p>

                  <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
                    <h4 className="text-xs font-semibold uppercase text-neutral-300 flex items-center space-x-1.5">
                      <Compass className="w-4 h-4 text-[#CE9E56]" />
                      <span>COMPLETED BLUEPRINTS</span>
                    </h4>
                    <ul className="text-xs text-neutral-400 space-y-1.5 font-mono">
                      <li className="flex justify-between items-center">
                        <span>Layout configuration:</span>
                        <span className="text-white flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1" /> Handcrafted custom</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Timbers & Hardware:</span>
                        <span className="text-white">Smoked Walnut & Oak</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Vibe & Ambiance:</span>
                        <span className="text-white">Warm minimal</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => {
                        setActiveProject(null);
                        onOpenQuote();
                      }}
                      className="flex-1 text-center bg-[#CE9E56] text-black font-semibold text-xs py-3 rounded-lg hover:bg-[#B3542E] hover:text-white transition-all uppercase cursor-pointer"
                    >
                      Request Layout swatches
                    </button>
                    <button
                      onClick={() => setActiveProject(null)}
                      className="flex-1 text-center border border-neutral-800 hover:border-neutral-750 text-neutral-400 text-xs py-3 rounded-lg transition-colors cursor-pointer"
                    >
                      Back to Portfolio
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
