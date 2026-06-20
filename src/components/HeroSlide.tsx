import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, Maximize2, Sparkles, ChevronLeft, ChevronRight, Eye, VolumeX, Volume2, Info } from 'lucide-react';
import { CollectionItem, MaterialOption } from '../types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroSlideProps {
  collections: CollectionItem[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onOpenCatalog: () => void;
  onOpenQuote: () => void;
  isLoaded?: boolean;
}

export default function HeroSlide({
  collections,
  activeIndex,
  setActiveIndex,
  onOpenCatalog,
  onOpenQuote,
  isLoaded = true
}: HeroSlideProps) {
  const current = collections[activeIndex];
  const [isHoveredHero, setIsHoveredHero] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(true);
  const [detailZoomOpen, setDetailZoomOpen] = useState(false);
  const [hasAnimateOnce, setHasAnimateOnce] = useState(false);

  // References for GSAP pinning
  const triggerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRotation, setScrollRotation] = useState(0);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setHasAnimateOnce(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  // GSAP ScrollTrigger Implementation
  useEffect(() => {
    const trigger = triggerRef.current;
    const scrollContainer = scrollRef.current;
    if (!trigger || !scrollContainer || !isLoaded) return;

    // Fluid percent shift: moves by (collections.length - 1) panels leftward
    const targetXPercent = - (100 * (collections.length - 1)) / collections.length;

    let ctx = gsap.context(() => {
      gsap.to(scrollContainer, {
        xPercent: targetXPercent,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1.0, // Luxurious silky-smooth scrubbing lag
          start: 'top top', // Start pinning as soon as section reaches the very top of viewport
          end: '+=250%', // Generous, stable scroll duration (2.5 screens of vertical scroll tracking)
          onUpdate: (self) => {
            const progress = self.progress;
            const rawIndex = progress * (collections.length - 1);
            const index = Math.max(0, Math.min(collections.length - 1, Math.round(rawIndex)));
            
            // Sync current active dot identifier
            setActiveIndex(index);
            // Rotate circular badge dynamically
            setScrollRotation(progress * 360 * 1.8);
          }
        }
      });
    }, triggerRef);

    // After loading/rendering completes, trigger refresh to sync positions perfectly
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [collections.length, setActiveIndex, isLoaded]);

  // Fluent dot indicator click: smooth-scroll viewport page position to slide index
  const scrollToSlide = (index: number) => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    // Find ScrollTrigger instance for this target
    const st = ScrollTrigger.getAll().find(s => s.trigger === trigger);
    if (st) {
      const scrollPosition = st.start + (index / (collections.length - 1)) * (st.end - st.start);
      window.scrollTo({
        top: scrollPosition + 2, // Tiny buffer to snap precisely
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      ref={triggerRef}
      className="relative w-full bg-white text-black" 
      id="hero-slider-section"
    >
      {/* Scroll Trigger padding buffer to give space for page scroll-pinning */}
      <div className="w-full h-full px-4 md:px-12 pt-28 pb-8 flex flex-col justify-center min-h-[90vh] md:min-h-screen">
        
        {/* Hero Outer Wrapper with smooth rounded layout - Highly responsive dimensions */}
        <div 
          className="relative max-w-7xl mx-auto w-full h-[65vh] min-h-[480px] xs:min-h-[520px] sm:min-h-[560px] md:h-[78vh] rounded-[2rem] overflow-hidden border border-neutral-200 shadow-2xl group flex flex-col justify-between bg-[#0a0a0a]"
          onMouseEnter={() => setIsHoveredHero(true)}
          onMouseLeave={() => setIsHoveredHero(false)}
        >
          {/* Modern Professional Image Reveal Dark Overlay */}
          <motion.div
            initial={{ x: '0%' }}
            animate={{ x: isLoaded ? '100%' : '0%' }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.25 }}
            className="absolute inset-0 bg-[#070707] z-25 pointer-events-none"
          />

          {/* GSAP Horizontal Slide Strip Container representing images translating with page scroll */}
          <div
            ref={scrollRef}
            className="absolute inset-0 h-full flex flex-row flex-nowrap will-change-transform"
            style={{ width: `${collections.length * 100}%` }}
          >
            {collections.map((item, index) => (
              <div
                key={item.id}
                className="h-full flex-shrink-0 relative overflow-hidden flex flex-col justify-between"
                style={{ width: `${100 / collections.length}%` }}
              >
                {/* Slide Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  {/* Dark luxury vignette gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/45 z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/35 z-10" />

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transform scale-102 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    draggable="false"
                  />
                </div>

                {/* Dynamic Display Typography Overlapping Center */}
                <div className="absolute inset-0 flex items-center justify-center z-15 select-none pointer-events-none px-4">
                  <h1
                    className="text-white text-[9vw] sm:text-[7vw] md:text-[6.5vw] lg:text-[5vw] xl:text-[4.5rem] 2xl:text-[5rem] font-bold tracking-tighter text-center leading-[0.95] text-shadow-2xl"
                    style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                  >
                    {item.title}
                  </h1>
                </div>

                {/* --- BOTTOM FLOATING CARD LEFT: Description & Simple View More --- */}
                <motion.div 
                  whileHover={{ y: -6, scale: 1.012 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className="absolute bottom-14 left-3 right-3 xs:left-4 xs:right-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 lg:bottom-10 lg:left-10 sm:right-auto sm:w-[310px] md:w-[340px] lg:w-[360px] z-20 pointer-events-auto"
                >
                  <div className="bg-[#0a0a0a]/80 backdrop-blur-2xl rounded-2xl border border-white/10 hover:border-[#CE9E56]/40 p-3 sm:p-5 lg:p-6 shadow-2xl flex flex-col items-start space-y-2 sm:space-y-4 transition-colors duration-300 group/card">
                    {/* Description Paragraph mimicking luxury interior design portfolio */}
                    <p className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm text-white/90 leading-relaxed font-normal font-sans">
                      {item.description}
                    </p>

                    {/* Simple Elegant View More CTA Button with high-contrast golden accent */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenCatalog();
                      }}
                      className="bg-[#CE9E56] text-black hover:bg-white text-[10px] sm:text-[12px] font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg flex items-center justify-center space-x-1 cursor-pointer shadow-lg border border-[#CE9E56] hover:border-white transition-all duration-300 group/btn"
                      id={`btn-view-catalog-hero-${item.id}`}
                    >
                      <span>View More</span>
                      <span className="text-xs sm:text-sm font-semibold ml-1 transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

        {/* Ambient Overlay Sound Tracker when video thumbnail plays (simulated ambient room sound) */}
        <AnimatePresence>
          {isVideoPlaying && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/45 z-20 flex flex-col justify-between p-8 pointer-events-none"
            >
              <div className="flex justify-between items-center w-full z-30 mt-12">
                <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-mono tracking-widest text-emerald-400">ATMOSPHERE: ACTIVE</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSoundMuted(!isSoundMuted);
                  }}
                  className="pointer-events-auto p-2 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full border border-white/15 text-white active:scale-95 cursor-pointer flex items-center justify-center"
                  title="Toggle Sound"
                >
                  {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-bounce" />}
                </button>
              </div>

              {/* Sound waves overlay */}
              <div className="flex justify-center items-end space-x-1.5 h-16 w-full opacity-60">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((index) => (
                  <motion.div
                    key={index}
                    animate={{ height: isSoundMuted ? 4 : [8, 48, 12, 36, 16, 52, 6][index % 7] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.6 + (index * 0.05),
                      ease: 'easeInOut'
                    }}
                    className="w-1 bg-[#D4AF37]/80 rounded-full"
                  />
                ))}
              </div>

              <div className="text-center w-full">
                <span className="text-xs font-mono text-neutral-300">Click the video card to exit ambient cinematic mode.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Beautiful Dotted Indicators Centered at the Bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/5 pointer-events-auto shadow-2xl">
          {collections.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ease-out cursor-pointer ${i === activeIndex ? 'bg-[#CE9E56] w-6' : 'bg-white/30 hover:bg-white/50 w-1.5'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* --- BOTTOM FLOATING CARD RIGHT: Circular spinning text --- */}
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-20 pointer-events-auto hidden sm:flex flex-col items-center justify-center select-none">
          
          {/* Circular badge - Link rotation dynamically to scroll position */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              scale: isLoaded ? 1 : 0.85 
            }}
            transition={{ 
              duration: 1.0, 
              ease: [0.16, 1, 0.3, 1], 
              delay: !hasAnimateOnce ? 1.10 : 0.28 
            }}
            className="relative w-18 h-18 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center font-bold"
          >
            {/* Text circle */}
            <motion.svg 
              animate={{ rotate: scrollRotation }}
              viewBox="0 0 100 100" 
              className="w-full h-full text-neutral-400 opacity-90 overflow-visible"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                />
              </defs>
              <text className="fill-current text-[10px] sm:text-[11px] md:text-[11.5px] font-mono font-bold uppercase tracking-[3px]">
                <textPath href="#circlePath">
                  Modern • Minimalist • Modern • Minimalist •
                </textPath>
              </text>
            </motion.svg>
          </motion.div>
        </div>

      </div>
      </div>

      {/* Examine Detail Modal (Zoom-in overlay) */}
      <AnimatePresence>
        {detailZoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-55 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            id="detail-examine-modal"
          >
            <div className="relative max-w-4xl w-full bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden p-6 md:p-8 space-y-6 shadow-2xl">
              <button
                onClick={() => setDetailZoomOpen(false)}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white cursor-pointer transition-transform duration-200"
              >
                <ChevronLeft className="w-5 h-5 inline-block mr-1" /> Close Close
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Visual detail zoom */}
                <div className="aspect-square w-full rounded-xl overflow-hidden border border-neutral-800 relative group">
                  <span className="absolute top-3 left-3 bg-black/85 text-white border border-neutral-800 text-[9px] font-mono px-2 py-1 rounded">DETAIL CLOSE-UP</span>
                  <img
                    src={current.secondaryImage}
                    alt="Examine Close-up Details"
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Technical architecture specs */}
                <div className="space-y-4">
                  <span className="text-[9px] font-mono text-[#D4AF37] tracking-widest uppercase block">SPEC SHEET & AUDIT</span>
                  <h3 className="text-2xl font-bold tracking-tight text-white">{current.title} Space Blueprint</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">
                    Designed by Jean-Marie Massaud and our internal Milano architecture team. Every spacing, joint, and illumination satisfies the highest spatial standards. We prioritize premium, sustainly harvested Elm timbers and pure Carrara marble deposits.
                  </p>

                  <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800/80 space-y-2">
                    <h4 className="text-xs font-semibold tracking-wider text-neutral-300 uppercase">Interactive Setup Configs</h4>
                    <ul className="text-xs text-neutral-400 space-y-1.5 font-mono">
                      <li className="flex justify-between">
                        <span>Available Woods:</span>
                        <span className="text-white">Black Elm, Spessart Oak</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Purity:</span>
                        <span className="text-white">Class-A Low Emission certified</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Origin:</span>
                        <span className="text-white">COMO LABS, MILAN, IT</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Illumination:</span>
                        <span className="text-white">Warm LEDs integrated (CRI &gt; 95)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setDetailZoomOpen(false);
                        onOpenQuote();
                      }}
                      className="flex-1 text-center bg-[#D4AF37] text-black text-xs font-semibold uppercase py-3 rounded-lg cursor-pointer hover:bg-yellow-600 transition-all duration-200"
                    >
                      Inquire Blueprints
                    </button>
                    <button
                      onClick={() => setDetailZoomOpen(false)}
                      className="flex-1 text-center border border-neutral-800 text-neutral-400 text-xs py-3 rounded-lg hover:border-neutral-700 hover:text-white transition-all cursor-pointer"
                    >
                      Back details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
