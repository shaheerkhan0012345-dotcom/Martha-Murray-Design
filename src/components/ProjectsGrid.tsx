import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Calendar, Compass, Layers, CheckCircle2 } from 'lucide-react';
import { ProjectExhibit } from '../types';
import { PROJECTS } from '../data';

interface ProjectsGridProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
  initialProjectId?: string | null;
}

export default function ProjectsGrid({
  isOpen,
  onClose,
  onOpenQuote,
  initialProjectId
}: ProjectsGridProps) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeProject, setActiveProject] = useState<ProjectExhibit | null>(null);

  // Auto-open specific project if coming from slider or link selection
  useEffect(() => {
    if (isOpen) {
      if (initialProjectId) {
        // Map ex- IDs to proj- IDs
        const targetId = initialProjectId.startsWith('ex-') 
          ? 'proj-' + initialProjectId.substring(3) 
          : initialProjectId;
        const matchingProject = PROJECTS.find(p => p.id === targetId || p.id === initialProjectId);
        if (matchingProject) {
          setActiveProject(matchingProject);
        }
      }
    } else {
      setActiveProject(null);
    }
  }, [isOpen, initialProjectId]);

  const filters = ['All', 'Residential', 'Wellness Villa', 'Apparel Suite'];

  const filteredProjects = selectedFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedFilter);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          id="projects-grid-overlay"
        >
          <div className="relative max-w-6xl w-full h-[85vh] bg-[#090909] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-neutral-900 flex justify-between items-center bg-black/60 sticky top-0 backdrop-blur-md">
              <div>
                <span className="text-[10px] font-mono tracking-[4px] text-[#D4AF37] uppercase">PORTFOLIO EXHIBITS</span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-sans mt-1">Global Architectural Space Curation</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 text-neutral-400 hover:text-white bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 rounded-full transition-transform hover:scale-105 cursor-pointer"
                id="close-projects-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter pills and dynamic grid */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              
              {/* Category selector */}
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFilter(f)}
                    className={`text-[10px] sm:text-xs font-mono py-1.5 px-4 rounded-full border cursor-pointer transition-all ${
                      selectedFilter === f
                        ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
                    }`}
                  >
                    #{f}
                  </button>
                ))}
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredProjects.map((proj) => (
                  <motion.div
                    key={proj.id}
                    layoutId={`project-${proj.id}`}
                    onClick={() => setActiveProject(proj)}
                    whileHover={{ 
                      y: -6, 
                      scale: 1.01,
                      borderColor: '#CE9E56',
                      boxShadow: '0 12px 30px -10px rgba(179, 84, 46, 0.15)'
                    }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="relative rounded-2xl overflow-hidden border border-neutral-900 bg-neutral-950/40 p-4 space-y-4 cursor-pointer group transition-colors duration-300"
                  >
                    {/* Visual box */}
                    <div className="aspect-video rounded-xl overflow-hidden relative">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                      <span className="absolute top-3 left-3 bg-black/85 text-[8px] font-mono text-[#D4AF37] px-2 py-0.5 rounded border border-white/5 uppercase">
                        {proj.category}
                      </span>
                    </div>

                    {/* Metadata lines */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center space-x-1.5 text-neutral-400 text-xs font-mono">
                        <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{proj.location}</span>
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors">{proj.title}</h3>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 border-t border-white/5 pt-2">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-neutral-600" />
                        <span>Curated: {proj.year}</span>
                      </div>
                      <span className="text-[#D4AF37] group-hover:translate-x-1.5 transition-transform duration-300">EXPLORE BLUEPRINTS →</span>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>

            {/* Bottom info banner */}
            <div className="p-6 border-t border-neutral-950 bg-neutral-950/80 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-3 text-left">
                <div className="p-2.5 bg-neutral-900 rounded-xl border border-neutral-800 text-yellow-500 text-xs font-mono">
                  ★ ARCHITECTS CLUB
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Are you a Designer or Developer?</h4>
                  <p className="text-[11px] text-neutral-400">Request high-res CAD and 3ds Max blocks for all Martha Murray Design curated spaces.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  onOpenQuote();
                  onClose();
                }}
                className="bg-white hover:bg-neutral-200 text-black text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer transition-colors"
              >
                Inquire CAD Block Resources
              </button>
            </div>

          </div>

          {/* Project Details Modal over dynamic card click */}
          <AnimatePresence>
            {activeProject && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-55 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
              >
                <div className="relative max-w-4xl w-full bg-[#0a0a0a] border border-neutral-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
                  
                  {/* Close button */}
                  <button
                    onClick={() => setActiveProject(null)}
                    className="absolute top-6 right-6 p-2 bg-neutral-900 hover:bg-neutral-800 rounded-full text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    
                    {/* Left Frame Visual representation */}
                    <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-neutral-800 relative">
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex gap-1.5">
                        <span className="bg-black/85 text-[8px] font-mono text-[#D4AF37] px-2.5 py-1 rounded border border-neutral-800 uppercase flex items-center space-x-1">
                          <Layers className="w-3 h-3 text-neutral-500" />
                          <span>3D LAYOUT DONE</span>
                        </span>
                      </div>
                    </div>

                    {/* Right Tech Specs and description details */}
                    <div className="space-y-4">
                      <span className="text-[9px] font-mono text-[#D4AF37] tracking-[3px] uppercase block">Spatial Blueprint Audit</span>
                      <h3 className="text-2xl font-bold tracking-tight text-white">{activeProject.title}</h3>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono text-neutral-400 border-b border-neutral-900 pb-3">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{activeProject.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                          <span>Built: {activeProject.year}</span>
                        </div>
                      </div>

                      <p className="text-xs text-neutral-400 font-light leading-relaxed">
                        Executed seamlessly using Martha Murray Design custom wardrobes, low-profile bespoke sofas, and custom Calacatta Gold stone monolith partitions. The design team oversaw the complete custom ceiling profiles, ensuring embedded linear warmth loops align elegantly with high-grain Black Elm timbers across cabinet divisions.
                      </p>

                      <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800 space-y-2">
                        <h4 className="text-xs font-semibold uppercase text-neutral-300 flex items-center space-x-1.5">
                          <Compass className="w-4 h-4 text-[#D4AF37]" />
                          <span>COMPLETED BLUEPRINTS</span>
                        </h4>
                        <ul className="text-xs text-neutral-400 space-y-1.5 font-mono">
                          <li className="flex justify-between items-center">
                            <span>Sofa modules config:</span>
                            <span className="text-white flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1" /> Custom curvilinear</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span>Primary timbers:</span>
                            <span className="text-white">Black Elm Veneers</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span>Lighting blueprints:</span>
                            <span className="text-white">Moka ambient LED guides</span>
                          </li>
                        </ul>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => {
                            setActiveProject(null);
                            onOpenQuote();
                          }}
                          className="flex-1 text-center bg-[#D4AF37] text-black font-semibold text-xs py-3 rounded-lg hover:bg-yellow-600 transition-colors uppercase cursor-pointer"
                        >
                          Unlock Complete Layout
                        </button>
                        <button
                          onClick={() => setActiveProject(null)}
                          className="flex-1 text-center border border-neutral-800 hover:border-neutral-700 text-neutral-400 text-xs py-3 rounded-lg transition-colors cursor-pointer"
                        >
                          Back to grid
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
