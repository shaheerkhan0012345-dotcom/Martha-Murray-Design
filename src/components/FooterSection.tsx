import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Instagram, Facebook, ArrowUpRight, Compass, ShieldCheck, Mail, MapPin } from 'lucide-react';
// @ts-ignore
import footerLivingRoom from '../assets/images/poliform_contemporary_1781864978393.jpg';

// Houzz SVG Icon to replace LinkedIn perfectly
function HouzzIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className} 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2Z" opacity="0.15" />
      <path d="M12 2.5L4.5 6.7v10.6L12 21.5l7.5-4.2V6.7L12 2.5ZM12 1L21 6v12l-9 5-9-5V6l9-5ZM8 14.5l4 2.2V12h4v4.7l4 2.3V10H8v4.5Z" />
    </svg>
  );
}

// 3D Tilt container styled for the footer landscape visualizer
function Footer3DVisual() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const rotateXSpring = useSpring(rotateX, { stiffness: 95, damping: 20 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 95, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Soft architectural tilt bounds for wide panoramic photo
    rotateY.set(mouseX * 16);
    rotateX.set(mouseY * -16);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative aspect-[16/10] w-full max-w-xl lg:max-w-none rounded-3xl overflow-hidden border border-neutral-900 shadow-2xl bg-neutral-950 cursor-pointer group transition-all duration-500 hover:border-[#CE9E56]/20"
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
        perspective: 1200
      }}
    >
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}
      >
        <img 
          src={footerLivingRoom} 
          alt="Curated contemporary space by Martha Murray Design" 
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Modern dark ambiance sheen overlays */}
        <div className="absolute inset-0 bg-neutral-950/20 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
      </div>

      <div 
        className="absolute bottom-6 left-6 z-10 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/5 flex items-center gap-2 text-[10px] text-white font-mono tracking-widest uppercase transition-opacity opacity-80 group-hover:opacity-100"
        style={{ transform: "translateZ(40px)" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#CE9E56] animate-pulse" />
        <span>CONVERSATION SPACE PIECE</span>
      </div>
    </motion.div>
  );
}

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#030303] text-white border-t border-neutral-950 overflow-hidden" id="mmd-conversational-footer">
      {/* Decorative premium radial gradients for ambiance */}
      <div className="absolute left-[10%] bottom-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_bottom,rgba(206,158,86,0.03),transparent_70%)] pointer-events-none" />
      <div className="absolute right-[5%] top-[10%] w-[30vw] h-[30vw] bg-[radial-gradient(circle_at_top,rgba(179,84,46,0.02),transparent_70%)] pointer-events-none" />

      {/* Main Structural Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-16 sm:pt-20 md:pt-28 pb-10 sm:pb-16 space-y-16 sm:space-y-20 md:space-y-24 relative z-10">
        
        {/* Top Part: High-End Header & Modern Landscape Visualizer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Column A: Typographic Invitation */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl font-normal tracking-tight leading-[1.08] text-white select-none" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Engage with Us in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4F0EA] to-[#CE9E56]">Conversation.</span>
            </h2>

            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed tracking-normal max-w-xl font-light font-sans">
              In a global world based on communication, a brand must look beyond its borders, open up to new experiences, and dare to be different. Meeting our clients' lifestyles and personal tasters in Bend, Oregon is the most beautiful way to nurture deep design creativity and custom sanctuaries that stand the test of physical time.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a 
                href="mailto:design@marthamurray.com" 
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white hover:text-[#CE9E56] border border-white/10 hover:border-[#CE9E56]/50 bg-white/[0.02] hover:bg-[#CE9E56]/10 px-5 py-3 rounded-xl transition-all duration-300"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>INQUIRE BY EMAIL</span>
              </a>
              <a 
                href="tel:+15414201261" 
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#neutral-300] hover:text-[#CE9E56] px-4 py-3 rounded-xl transition-colors duration-300"
              >
                <span>+1 541-420-1261</span>
              </a>
            </div>
          </div>

          {/* Column B: Fully 3D Interactive Living Room Card rendering as the perfect visualizer */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
            <Footer3DVisual />
          </div>

        </div>

        {/* Middle Part: Poliform-inspired 4-Column Layout */}
        <div className="border-t border-neutral-900/60 pt-12 sm:pt-16 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 items-start select-none">
          
          {/* Col 1: About */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-mono tracking-[3px] text-[#CE9E56] font-bold uppercase">ABOUT</h4>
            <ul className="space-y-2 text-xs tracking-wide text-neutral-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors duration-200">Our Story</a>
              </li>
              <li>
                <span className="text-neutral-500 line-through select-none">Showrooms (Independent)</span>
              </li>
              <li>
                <span className="text-neutral-300 font-medium">Bend Resident Studio</span>
              </li>
              <li>
                <a href="https://www.scalehouse.org" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200 flex items-center gap-1">
                  <span>Scalehouse Board</span> <ArrowUpRight className="w-2.5 h-2.5 text-neutral-500" />
                </a>
              </li>
              <li>
                <span className="text-neutral-400">Volunteer at BendFilm</span>
              </li>
            </ul>
          </div>

          {/* Col 2: Services / Product range */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-mono tracking-[3px] text-[#CE9E56] font-bold uppercase">SERVICES</h4>
            <ul className="space-y-2 text-xs tracking-wide text-neutral-400">
              <li>
                <span className="text-neutral-300">Residential Remodeling</span>
              </li>
              <li>
                <span className="text-neutral-400">Small Commercial Interiors</span>
              </li>
              <li>
                <span className="text-neutral-300 font-semibold text-white">SDH Fine European Linens</span>
              </li>
              <li>
                <span className="text-neutral-400">Atmospheric Light Curation</span>
              </li>
              <li>
                <span className="text-neutral-400">Independent Product Decor</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Social Portfolios */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-mono tracking-[3px] text-[#CE9E56] font-bold uppercase font-sans">SOCIAL MEDIA</h4>
            <ul className="space-y-2.5 text-xs tracking-wide text-neutral-400">
              <li>
                <a 
                  href="https://www.instagram.com/marthamurraydesign/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-all duration-200 flex items-center gap-2 group/link"
                >
                  <Instagram className="w-3.5 h-3.5 text-neutral-400 group-hover/link:text-[#CE9E56] transition-colors" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.facebook.com/MarthaMurrayDesign/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-all duration-200 flex items-center gap-2 group/link"
                >
                  <Facebook className="w-3.5 h-3.5 text-neutral-400 group-hover/link:text-[#CE9E56] transition-colors" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.houzz.com/professionals/kitchen-and-bath-designers/martha-murray-design-pfvwus-pf~1636039095" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-all duration-200 flex items-center gap-2 group/link font-medium text-white"
                >
                  <HouzzIcon className="w-3.5 h-3.5 text-neutral-400 group-hover/link:text-[#CE9E56] transition-colors" />
                  <span>Houzz</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Responsive Branding Typography mimicking Poliform */}
          <div className="col-span-2 md:col-span-1 flex flex-col justify-between items-start md:items-end h-full">
            <div className="text-left md:text-right hidden md:block">
              <span className="text-[9px] font-mono tracking-widest text-[#CE9E56] block">CO-PRODUCER</span>
              <span className="text-xs text-neutral-400">Bend Design Festival</span>
            </div>

            <div className="pt-6 md:pt-0 flex flex-col items-start md:items-end justify-end group transition-all duration-300" onClick={scrollToTop}>
              <div className="flex items-center gap-2 cursor-pointer">
                {/* Exactly the same Logo geometry as in the header but optimized for dark theme footer */}
                <svg viewBox="0 0 100 100" className="w-14 h-14 overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Terracotta solid sun/circle */}
                  <circle 
                    cx="36" 
                    cy="30" 
                    r="9" 
                    fill="#B3542E" 
                  />
                  {/* Shorter gold/ochre arch in front */}
                  <path 
                    d="M22 66 V45 C22 37.3 28.3 31 36 31 C43.7 31 50 37.3 50 45 V66 H22Z" 
                    stroke="#CE9E56" 
                    strokeWidth="2.2" 
                    fill="none" 
                  />
                  {/* Taller charcoal/brown arch behind, shaded lighter for contrast on black background */}
                  <path 
                    d="M41 58 V33 C41 24.7 47.7 18 56 18 C64.3 18 71 24.7 71 33 V58 H41" 
                    stroke="#E5DCD8" 
                    strokeWidth="2.2" 
                    fill="none" 
                  />
                  {/* Thin terracotta shader lines */}
                  <line 
                    x1="53.5" y1="60.5" x2="71" y2="60.5" 
                    stroke="#D1B2A5" strokeWidth="2" 
                  />
                  <line 
                    x1="53.5" y1="63" x2="71" y2="63" 
                    stroke="#D1B2A5" strokeWidth="2" 
                  />
                  <line 
                    x1="53.5" y1="65.5" x2="71" y2="65.5" 
                    stroke="#D1B2A5" strokeWidth="2" 
                  />
                </svg>
                
                <div className="flex flex-col text-left">
                  <span className="font-sans text-base font-bold tracking-[0.14em] text-white leading-none uppercase select-none transition-colors duration-300 group-hover:text-[#B3542E]">
                    MARTHA
                  </span>
                  <span className="text-[7px] font-semibold tracking-[0.380em] text-neutral-400 leading-tight uppercase select-none mt-1 transition-colors duration-300 group-hover:text-[#CE9E56]">
                    MURRAY DESIGN
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Lower copyright area */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] sm:text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
          <div className="flex items-center gap-2">
            <Compass className="w-3 h-3 text-[#CE9E56]" />
            <span>EST. BEND, OREGON, USA</span>
          </div>
          <span>© {new Date().getFullYear()} MARTHA MURRAY DESIGN. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-semibold text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#CE9E56]" /> INDEPENDENT EXPERTISE
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
