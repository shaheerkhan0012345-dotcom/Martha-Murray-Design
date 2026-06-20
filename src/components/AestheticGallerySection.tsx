import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate, useInView } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface AestheticGallerySectionProps {
  onOpenCatalog: () => void;
  onOpenQuote: () => void;
}

// Custom interactive ScrambleText component for high-end luxury feel
function ScrambleText({ text, delay = 0, className = "", triggerOnHover = true }: { text: string; delay?: number; className?: string; triggerOnHover?: boolean }) {
  const [display, setDisplay] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  
  const originalChars = text.split("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*";

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(
        originalChars
          .map((char, index) => {
            if (index < iterations) {
              return text[index];
            }
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iterations += 1 / 2.5; // step rate
      if (iterations >= text.length) {
        clearInterval(interval);
        setDisplay(text);
        setIsScrambling(false);
      }
    }, 28);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      scramble();
    }, delay);
    return () => clearTimeout(t);
  }, []);

  return (
    <span 
      onMouseEnter={triggerOnHover ? scramble : undefined} 
      className={`cursor-default inline-block select-none ${className}`}
    >
      {display}
    </span>
  );
}

// Custom dynamic count-up component with Spring ease-out on viewport intersection
function CountUpNumber({ value, delay = 0 }: { value: string; delay?: number }) {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView) return;

    // Parse numeric parts and suffix. E.g., "500+" splits into targetNum: 500, suffix: "+"
    const numMatch = value.match(/^(\d+)(.*)$/);
    if (!numMatch) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseInt(numMatch[1], 10);
    const suffix = numMatch[2] || '';

    const controls = animate(0, targetNum, {
      duration: 2.0,
      delay: delay / 1000,
      ease: [0.16, 1, 0.3, 1], // premium custom cubic-bezier
      onUpdate(latest) {
        setDisplayValue(Math.floor(latest).toString() + suffix);
      }
    });

    return () => controls.stop();
  }, [isInView, value, delay]);

  const triggerAnim = () => {
    const numMatch = value.match(/^(\d+)(.*)$/);
    if (!numMatch) return;
    const targetNum = parseInt(numMatch[1], 10);
    const suffix = numMatch[2] || '';
    animate(0, targetNum, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        setDisplayValue(Math.floor(latest).toString() + suffix);
      }
    });
  };

  return (
    <span 
      ref={ref} 
      onMouseEnter={triggerAnim}
      className="select-none cursor-pointer"
    >
      {displayValue}
    </span>
  );
}

// Premium Letter-Stagger text build for high-end editorial heading
function EditorialHeading({ text, className = "" }: { text: string; className?: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(headingRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025,
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const words = text.split(" ");

  return (
    <motion.h3
      ref={headingRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`font-semibold tracking-tight leading-snug ${className}`}
      style={{ fontFamily: '"Space Grotesk", sans-serif' }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-[0.25em] whitespace-nowrap overflow-hidden">
          <motion.span variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h3>
  );
}

export default function AestheticGallerySection({
  onOpenCatalog,
  onOpenQuote
}: AestheticGallerySectionProps) {
  // Reference for scroll-based Zoom-Out animation
  const sectionRef = useRef<HTMLDivElement>(null);

  // Monitor scroll progress relative to the container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Zoom-Out image starts at 1.18x zoom and eases gently to 1.0x as the section scrolls into center
  const imgScale = useTransform(scrollYProgress, [0, 0.45], [1.18, 1]);

  // --- 3D TILT WITH SPRING PHYSICS FOR LEFT CARD ---
  const leftX = useMotionValue(0);
  const leftY = useMotionValue(0);
  const leftRotateX = useSpring(useTransform(leftY, [-0.5, 0.5], [6, -6]), { stiffness: 180, damping: 26 });
  const leftRotateY = useSpring(useTransform(leftX, [-0.5, 0.5], [-6, 6]), { stiffness: 180, damping: 26 });

  // --- 3D TILT FOR EDITORIAL CARD ---
  const topX = useMotionValue(0);
  const topY = useMotionValue(0);
  const topRotateX = useSpring(useTransform(topY, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 26 });
  const topRotateY = useSpring(useTransform(topX, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 26 });

  // --- 3D TILT FOR BOTTOM-RIGHT CARD ---
  const botX = useMotionValue(0);
  const botY = useMotionValue(0);
  const botRotateX = useSpring(useTransform(botY, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 26 });
  const botRotateY = useSpring(useTransform(botX, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 26 });

  // Generic Tilt interaction helpers (only execute rotation if not on a touchscreen)
  const handleMouseMove = (xVal: any, yVal: any) => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      // Avoid tilting if it's a mobile touch event routed as mousemove (detect via touch capabilities)
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      xVal.set(x);
      yVal.set(y);
    };
  };

  const handleMouseLeave = (xVal: any, yVal: any) => {
    return () => {
      xVal.set(0);
      yVal.set(0);
    };
  };

  const stats = [
    { value: '500+', label: 'Products', description: 'Curated designs', delay: 100 },
    { value: '20+', label: 'Projects', description: 'Global installations', delay: 200 },
    { value: '50+', label: 'Satisfied Customers', description: 'Trust built organically', delay: 300 },
    { value: '1st', label: 'Top 1 in Paris', description: 'Recognized aesthetics', delay: 400 }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-white text-black py-16 md:py-24 px-4 sm:px-6 md:px-12 border-t border-neutral-100 overflow-visible"
      id="aesthetic-gallery-section"
      style={{ perspective: 1200 }}
    >
      <div className="max-w-7xl mx-auto w-full space-y-12 md:space-y-16">
        
        {/* Bento Grid Container - Columns: Stacks on mobile, beautifully aligned side-by-side on tablet/laptop/desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* --- LEFT CARD: Living Room Showcase with rounded cutout cutout --- */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove(leftX, leftY)}
            onMouseLeave={handleMouseLeave(leftX, leftY)}
            style={{ 
              rotateX: leftRotateX, 
              rotateY: leftRotateY,
              transformStyle: "preserve-3d"
            }}
            className="lg:col-span-8 relative rounded-[2rem] overflow-hidden border border-neutral-200/60 shadow-lg min-h-[420px] sm:min-h-[500px] md:min-h-[560px] lg:min-h-[600px] bg-[#fcfcfc] flex flex-col justify-end group/left transition-all duration-500 hover:shadow-2xl hover:border-[#CE9E56]/30 cursor-pointer"
          >
            {/* Background Image of Luxury Living Room (Zoom-Out Image Scroll Integration) */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <motion.img 
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80" 
                alt="Gorgeous Minimalist Living Room Interior" 
                style={{ scale: imgScale, transformOrigin: 'center center' }}
                className="w-full h-full object-cover object-center pointer-events-none group-hover/left:scale-[1.03] transition-transform duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              {/* Subtle elegant gradient to ensure maximum depth */}
              <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none group-hover/left:bg-black/15 transition-colors duration-500" />
            </div>

            {/* --- FAITHFUL DOUBLE-STEPPED ROUNDED CURVED CUTOUT STRUCTURE --- */}
            
            {/* Tier 1 (Top Level): Holds Badge Georgeus Interior */}
            <div 
              style={{ transform: "translateZ(30px)" }}
              className="absolute bottom-[106px] sm:bottom-[160px] md:bottom-[195px] left-0 w-[130px] xs:w-[145px] sm:w-[195px] md:w-[225px] h-[36px] sm:h-[48px] md:h-[56px] bg-white rounded-tr-[1.2rem] sm:rounded-tr-[1.8rem] md:rounded-tr-[2rem] z-10 flex items-center pl-3.5 sm:pl-6 select-none pointer-events-auto shadow-[0px_-2px_6px_rgba(0,0,0,0.02)]"
            >
              <div className="border border-neutral-400 dark:border-neutral-200 px-2.5 sm:px-4 py-0.5 sm:py-1 rounded-full text-black text-[8px] xs:text-[9px] sm:text-[11px] font-sans font-semibold tracking-wide bg-transparent whitespace-nowrap transform group-hover/left:scale-105 transition-transform duration-300">
                <ScrambleText text="Georgeus Interior" delay={500} />
              </div>
            </div>
            
            {/* Tier 1 Fillet Right */}
            <div className="absolute left-[130px] xs:left-[145px] sm:left-[195px] md:left-[225px] bottom-[106px] sm:bottom-[160px] md:bottom-[195px] w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-transparent rounded-bl-full shadow-[-8px_8px_0_8px_white] sm:shadow-[-12px_12px_0_12px_white] md:shadow-[-16px_16px_0_16px_white] z-10 pointer-events-none" />

            {/* Tier 2 (Middle Level): Holds "Modern" text */}
            <div 
              style={{ transform: "translateZ(20px)" }}
              className="absolute bottom-[56px] sm:bottom-[84px] md:bottom-[105px] left-0 w-[160px] xs:w-[180px] sm:w-[245px] md:w-[285px] h-[50px] sm:h-[76px] md:h-[90px] bg-white rounded-tr-[1.2rem] sm:rounded-tr-[1.8rem] md:rounded-tr-[2rem] z-10 flex items-end pb-1.5 sm:pb-3 md:pb-4 pl-3.5 sm:pl-6 select-none pointer-events-auto"
            >
              <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black leading-none group-hover/left:translate-x-2 transition-transform duration-500 ease-out" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                <ScrambleText text="Modern" delay={700} />
              </h2>
            </div>
            
            {/* Tier 2 Fillet Right */}
            <div className="absolute left-[160px] xs:left-[180px] sm:left-[245px] md:left-[285px] bottom-[56px] sm:bottom-[84px] md:bottom-[105px] w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-transparent rounded-bl-full shadow-[-8px_8px_0_8px_white] sm:shadow-[-12px_12px_0_12px_white] md:shadow-[-16px_16px_0_16px_white] z-10 pointer-events-none" />

            {/* Tier 3 (Bottom Level): Holds "Minimalist" text */}
            <div 
              style={{ transform: "translateZ(10px)" }}
              className="absolute bottom-0 left-0 w-[210px] xs:w-[240px] sm:w-[340px] md:w-[410px] h-[56px] sm:h-[84px] md:h-[105px] bg-white rounded-tr-[1.2rem] sm:rounded-tr-[1.8rem] md:rounded-tr-[2rem] z-10 flex items-start pt-1.5 sm:pt-3 md:pt-4 pl-3.5 sm:pl-6 select-none pointer-events-auto"
            >
              <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black leading-none group-hover/left:translate-x-2 transition-transform duration-500 ease-out" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                <ScrambleText text="Minimalist" delay={900} />
              </h2>
            </div>
            
            {/* Tier 3 Fillet Right */}
            <div className="absolute left-[210px] xs:left-[240px] sm:left-[340px] md:left-[410px] bottom-0 w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-transparent rounded-bl-full shadow-[-8px_8px_0_8px_white] sm:shadow-[-12px_12px_0_12px_white] md:shadow-[-16px_16px_0_16px_white] z-10 pointer-events-none" />
          </motion.div>

          {/* --- RIGHT COLUMN CONTAINER: Displays side-by-side on tablet/large mobile, and stacks on desktop --- */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6" style={{ transformStyle: "preserve-3d" }}>
            
            {/* Top Right Card: Elegant Sand/Beige Editorial with 3D Tilt */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              onMouseMove={handleMouseMove(topX, topY)}
              onMouseLeave={handleMouseLeave(topX, topY)}
              style={{ 
                rotateX: topRotateX, 
                rotateY: topRotateY,
                transformStyle: "preserve-3d"
              }}
              className="flex-1 bg-[#F4F0EA] rounded-[1.8rem] p-6 sm:p-8 border border-neutral-200/50 flex flex-col justify-between items-start text-black shadow-md min-h-[220px] transition-all duration-300 hover:shadow-xl hover:border-neutral-300 group cursor-pointer"
            >
              <div 
                style={{ transform: "translateZ(15px)" }}
                className="border border-neutral-800/80 px-4 py-1 rounded-full text-black text-[11px] font-medium tracking-wide group-hover:bg-neutral-900 group-hover:text-white group-hover:border-neutral-900 transition-colors duration-300"
              >
                <ScrambleText text="Aesthetic" delay={1100} />
              </div>

              <div 
                style={{ transform: "translateZ(25px)" }}
                className="space-y-4 mt-6"
              >
                <p className="text-neutral-600 text-xs sm:text-sm font-sans font-normal leading-relaxed max-w-[280px] group-hover:text-neutral-900 transition-colors duration-300">
                  Aesthetic furniture where every piece tells a story of style.
                </p>
                <EditorialHeading text="Into a gallery of elegance" className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 leading-snug group-hover:text-[#CE9E56] transition-colors duration-300" />
              </div>
            </motion.div>

            {/* Bottom Right Card: Sofa Chair with Arrow Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              onMouseMove={handleMouseMove(botX, botY)}
              onMouseLeave={handleMouseLeave(botX, botY)}
              style={{ 
                rotateX: botRotateX, 
                rotateY: botRotateY,
                transformStyle: "preserve-3d"
              }}
              className="flex-1 relative rounded-[1.8rem] overflow-hidden border border-neutral-200/40 shadow-md min-h-[260px] flex flex-col justify-between p-6 sm:p-7 group/item hover:shadow-2xl hover:border-[#CE9E56]/40 transition-all duration-500 cursor-pointer"
            >
              {/* Armchair Background Image */}
              <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&q=80" 
                  alt="Chic Minimalist Lounge Patio Armchair" 
                  className="w-full h-full object-cover object-center group-hover/item:scale-105 transition-transform duration-[1200ms] ease-out"
                  referrerPolicy="no-referrer"
                />
                {/* Elegant dark/soft contrast mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 z-1 group-hover/item:from-black/90 group-hover/item:via-black/30 group-hover/item:to-black/45 transition-colors duration-500" />
              </div>

              {/* Tag and Button overlays */}
              <div 
                style={{ transform: "translateZ(15px)" }}
                className="relative z-10 self-start"
              >
                <div className="backdrop-blur-md bg-black/30 border border-white/20 px-4 py-1 rounded-full text-white text-[11px] font-medium tracking-wide group-hover/item:bg-[#CE9E56]/90 group-hover/item:border-[#CE9E56] transition-all duration-300">
                  <ScrambleText text="Best Furniture" delay={1300} />
                </div>
              </div>

              <div 
                style={{ transform: "translateZ(25px)" }}
                className="relative z-10 flex items-end justify-between w-full mt-12"
              >
                <p className="text-white text-xs sm:text-sm font-medium pr-8 leading-snug max-w-[200px] group-hover/item:text-[#F4F0EA] transition-colors duration-300">
                  Indulge in the artistry of everyday living
                </p>

                {/* Stylish circular arrow button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenCatalog();
                  }}
                  className="w-10 h-10 rounded-full bg-white group-hover/item:bg-[#CE9E56] group-hover/item:text-white border border-neutral-100 group-hover/item:border-[#CE9E56] text-black flex items-center justify-center cursor-pointer transition-all duration-300 shadow-md group-hover/item:scale-110 active:scale-95 group/btn shrink-0"
                  aria-label="View furniture catalog"
                >
                  <ArrowUpRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5" />
                </button>
              </div>
            </motion.div>

          </div>

        </div>

        {/* --- STAT counters Row Section with Hover Scale/Elevation & Scramble effect --- */}
        <div className="border-t border-neutral-100 pt-10 sm:pt-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center sm:text-left">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="space-y-1 p-4 rounded-xl hover:bg-neutral-50/50 hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
            >
              <div 
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-950 transition-colors duration-300 group-hover:text-[#CE9E56]" 
                style={{ fontFamily: '"Space Grotesk", sans-serif' }}
              >
                <CountUpNumber value={stat.value} delay={stat.delay} />
              </div>
              <div className="text-sm font-semibold text-neutral-900 uppercase tracking-wider group-hover:text-[#CE9E56] transition-colors duration-300">
                {stat.label}
              </div>
              <div className="text-[11px] sm:text-xs text-neutral-400 font-normal">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
