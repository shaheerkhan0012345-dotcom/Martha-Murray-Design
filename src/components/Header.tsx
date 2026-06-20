import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Menu, X, ArrowRight, User, Compass, Phone } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCatalog: () => void;
  onOpenProjects: () => void;
  onOpenQuote: () => void;
  currentCollection: string;
  isLoaded?: boolean;
}

export default function Header({
  activeTab,
  setActiveTab,
  onOpenCatalog,
  onOpenProjects,
  onOpenQuote,
  currentCollection,
  isLoaded = true
}: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', action: () => setActiveTab('home'), accent: 'Inizio' },
    { label: 'Service', action: () => setActiveTab('service'), accent: 'Servizi' },
    { label: 'About', action: () => setActiveTab('about'), accent: 'Studio' },
    { label: 'Portfolio', action: () => setActiveTab('portfolio'), accent: 'Progetti' },
    { label: 'Contact', action: () => setActiveTab('contact'), accent: 'Contatto' }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isLoaded ? 0 : -100, 
          opacity: isLoaded ? 1 : 0 
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="fixed top-0 left-0 w-full z-40 bg-white/70 backdrop-blur-md border-b border-neutral-100 px-6 md:px-12 py-5" 
        id="main-header"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Martha Murray Design */}
          {/* Logo Martha Murray Design */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -10 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover="hover"
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            {/* Exactly the same Logo as in the image but slightly larger */}
            <svg viewBox="0 0 100 100" className="w-16 h-16 overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Terracotta solid sun/circle */}
              <motion.circle 
                cx="36" 
                cy="30" 
                r="9" 
                fill="#B3542E" 
                variants={{
                  hover: { scale: 1.25, y: -1, x: -1, transition: { type: "spring", stiffness: 300, damping: 10 } }
                }}
              />
              {/* Shorter gold/ochre arch in front */}
              <motion.path 
                d="M22 66 V45 C22 37.3 28.3 31 36 31 C43.7 31 50 37.3 50 45 V66 H22Z" 
                stroke="#CE9E56" 
                strokeWidth="2" 
                fill="none" 
                variants={{
                  hover: { y: -2, stroke: "#B3542E", transition: { duration: 0.3, ease: "easeOut" } }
                }}
              />
              {/* Taller charcoal/brown arch behind */}
              <motion.path 
                d="M41 58 V33 C41 24.7 47.7 18 56 18 C64.3 18 71 24.7 71 33 V58 H41" 
                stroke="#52433D" 
                strokeWidth="2" 
                fill="none" 
                variants={{
                  hover: { y: -3, stroke: "#3d2e27", transition: { duration: 0.3, ease: "easeOut" } }
                }}
              />
              {/* Thin terracotta shader lines */}
              <motion.line 
                x1="53.5" y1="60.5" x2="71" y2="60.5" 
                stroke="#D1B2A5" strokeWidth="1.8" 
                variants={{
                  hover: { x: 2, stroke: "#B3542E", transition: { duration: 0.3 } }
                }}
              />
              <motion.line 
                x1="53.5" y1="63" x2="71" y2="63" 
                stroke="#D1B2A5" strokeWidth="1.8" 
                variants={{
                  hover: { x: 4, stroke: "#B3542E", transition: { duration: 0.3 } }
                }}
              />
              <motion.line 
                x1="53.5" y1="65.5" x2="71" y2="65.5" 
                stroke="#D1B2A5" strokeWidth="1.8" 
                variants={{
                  hover: { x: 6, stroke: "#B3542E", transition: { duration: 0.3 } }
                }}
              />
            </svg>
            <div className="flex flex-col">
              <span className="font-sans text-lg font-bold tracking-[0.14em] text-[#3d2e27] leading-none uppercase select-none transition-colors duration-300 group-hover:text-[#B3542E]">
                MARTHA
              </span>
              <span className="text-[7.5px] font-semibold tracking-[0.380em] text-[#786358] leading-tight uppercase select-none mt-1 transition-colors duration-300 group-hover:text-[#CE9E56]">
                MURRAY DESIGN
              </span>
            </div>
          </motion.div>
 
           {/* Desktop Navigation */}
           <nav className="hidden md:flex items-center space-x-8 text-[14px] font-medium font-sans">
             {menuItems.map((item, index) => {
               const isActive = activeTab === item.label.toLowerCase();
               return (
                 <motion.button
                   key={item.label}
                   initial={{ opacity: 0, y: -10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: index * 0.05 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={item.action}
                   className={`relative py-1 cursor-pointer font-medium tracking-wide group transition-all duration-300 ease-out hover:-translate-y-0.5 ${isActive ? 'text-[#B3542E]' : 'text-neutral-500 hover:text-[#B3542E]'}`}
                 >
                   <span className="relative z-10">{item.label}</span>
                   {/* Continuous, sleek underbar with high-performance CSS scaling */}
                   <span 
                     className={`absolute bottom-0 left-0 right-0 h-[2px] bg-[#B3542E] origin-left transition-transform duration-300 ease-out ${
                       isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                     }`}
                   />
                 </motion.button>
               );
             })}
           </nav>
 
           {/* Action Buttons */}
           <div className="flex items-center space-x-4">
             {/* Search Toggle - Circular Dark Icon matching top right of poliform page */}
             <motion.button
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               whileHover={{ scale: 1.1, backgroundColor: '#B3542E', rotate: 15 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => setIsSearchOpen(true)}
               className="w-10 h-10 bg-[#1c1c1c] text-white rounded-full flex items-center justify-center cursor-pointer shadow-md transition-colors duration-300"
               title="Search Portfolio"
               id="search-btn"
             >
               <Search className="w-4 h-4" />
             </motion.button>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-neutral-800 hover:text-black cursor-pointer"
              aria-label="Toggle mobile menu"
              id="mobile-menu-btn"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Slideout Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
            id="search-overlay"
          >
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 p-3 text-neutral-400 hover:text-white bg-white/5 rounded-full cursor-pointer transition-transform hover:scale-105"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <div className="w-full max-w-2xl text-center space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-[#888] uppercase block">
                SEARCH ARCHITECTURE & COLLECTIONS
              </span>
              <motion.div 
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                className="relative border-b-2 border-neutral-800 focus-within:border-white transition-colors duration-300 py-3"
              >
                <input
                  type="text"
                  placeholder="Canapa, Elm wood, Lexington, Closet..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent text-white text-2xl md:text-3xl font-light outline-none border-none placeholder-neutral-700 font-sans tracking-wide"
                />
              </motion.div>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['Saint-Germain', 'Le Club', 'Travertine Classico', 'Black Elm', 'Dressing Closet'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="text-xs font-mono text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors duration-200 cursor-pointer"
                  >
                    #{term}
                  </button>
                ))}
              </div>
              
              {searchQuery && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs font-mono text-neutral-500 pt-4"
                >
                  Press [Enter] to submit search or contact consultants for bespoke curation.
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="fixed inset-y-0 right-0 w-full sm:w-80 z-50 bg-[#060606] border-l border-neutral-900 shadow-2xl p-8 flex flex-col justify-between"
            id="mobile-drawer"
          >
            <div className="space-y-8">
              <div className="flex justify-between items-center pb-4 border-b border-neutral-900">
                <span className="font-sans text-lg font-bold tracking-wider text-white">
                  Martha Murray Design
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-neutral-400 hover:text-white bg-neutral-900 rounded-full cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="space-y-6">
                <span className="text-[9px] font-mono tracking-widest text-neutral-600 uppercase block">
                  EXPLORE ARCHITECTURE
                </span>
                <nav className="flex flex-col space-y-4">
                  {menuItems.map((item, idx) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        item.action();
                      }}
                      className="text-left py-2 group flex justify-between items-center border-b border-neutral-900/40"
                    >
                      <div>
                        <span className="text-lg text-neutral-300 font-bold tracking-wider group-hover:text-white transition-colors duration-200">
                          {item.label}
                        </span>
                        <p className="text-[10px] font-mono text-neutral-600 block lowercase tracking-widest">
                          {item.accent}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-700 group-hover:text-white transition-all group-hover:translate-x-1" />
                    </motion.button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-900 space-y-2">
              <p className="text-[9px] font-mono tracking-widest text-[#D4AF37]">
                BESPOKE INTERIOR DESIGN CONCIERGE
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Unlock exclusive materials and design templates for your next master project.
              </p>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full mt-2 text-center bg-white text-black text-xs font-semibold py-2 rounded-lg cursor-pointer hover:bg-neutral-200 transition-colors"
              >
                Inquire Curation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
