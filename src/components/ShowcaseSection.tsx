import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface ShowcaseSectionProps {
  onLearnMore: () => void;
}

export default function ShowcaseSection({ onLearnMore }: ShowcaseSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  // Scroll interactive Parallax variables
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Background layer shifts slowly downward to upward
  const yBg = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const yBgSpring = useSpring(yBg, { stiffness: 90, damping: 22 });

  // 3D Tilt interactive variables (mouse-tracking to tilt image container in 3D Space)
  const mouseXFraction = useMotionValue(0);
  const mouseYFraction = useMotionValue(0);

  const rotateX = useTransform(mouseYFraction, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseXFraction, [-0.5, 0.5], [-12, 12]);

  const rotateXSpring = useSpring(rotateX, { stiffness: 120, damping: 20 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 120, damping: 20 });

  // Glare / Sheen dynamic movement across the card
  const glareX = useTransform(mouseXFraction, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYFraction, [-0.5, 0.5], ["0%", "100%"]);
  const glareXSpring = useSpring(glareX, { stiffness: 120, damping: 20 });
  const glareYSpring = useSpring(glareY, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const currentMouseX = e.clientX - rect.left - width / 2;
    const currentMouseY = e.clientY - rect.top - height / 2;
    mouseXFraction.set(currentMouseX / width);
    mouseYFraction.set(currentMouseY / height);
  };

  const handleMouseLeave = () => {
    mouseXFraction.set(0);
    mouseYFraction.set(0);
  };

  // Text motion animation variants for parent staggering
  const textContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  // Blur → Sharp & Line-by-Line Reveal for individual elements
  const revealVariants = {
    hidden: { 
      y: 35, 
      filter: "blur(12px)", 
      opacity: 0 
    },
    visible: {
      y: 0,
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 18,
        duration: 0.8
      }
    }
  };

  // Text Fill wipe effect variants (reveals darker filled color from left-to-right)
  const textFillVariants = {
    hidden: { 
      clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" 
    },
    visible: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.5 // Occurs right as the upward line animation concludes
      }
    }
  };

  const paragraphSentences = [
    "Discover Martha Murray Design's curated preview, featuring",
    "sofas, chairs, and armchairs embodying diverse lifestyle concepts,",
    "alongside striking tables, coffee tables, and sideboards."
  ];

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#fdfdfd] py-20 sm:py-24 md:py-28 px-4 sm:px-6 md:px-12 border-t border-neutral-100 overflow-hidden"
      id="showcase-section"
    >
      {/* Editorial subtle light glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(206,158,86,0.04),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-18 items-center">
          
          {/* LEFT COLUMN: 3D FLOATING IMAGE WITH PARALLAX AND PREMIUM HOVER */}
          <div className="lg:col-span-7 relative w-full" style={{ perspective: 1200 }}>
            {/* Interactive Inner 3D Container */}
            <motion.div 
              style={{ 
                rotateX: rotateXSpring, 
                rotateY: rotateYSpring,
                transformStyle: "preserve-3d"
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[2.5rem] overflow-hidden bg-[#F4F0EA] aspect-[4/3] w-full shadow-xl border border-neutral-200/40 group/showcase cursor-pointer transition-shadow hover:shadow-[0_45px_100px_rgba(206,158,86,0.18)]"
            >
              {/* Parallax Layer : Background image shifting dynamically on scroll */}
              <div 
                className="absolute inset-0 w-full h-[120%] -top-[10%] overflow-hidden"
                style={{ transform: "translateZ(-20px) scale(1.1)" }}
              >
                <motion.img 
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80" 
                  alt="Modern Style Timeless Charm Living Room" 
                  style={{ y: yBgSpring }}
                  className="w-full h-full object-cover object-center pointer-events-none transition-all duration-[1200ms] group-hover/showcase:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Soft warm atmosphere color gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-amber-950/5 to-transparent mix-blend-multiply opacity-80" />
                <div className="absolute inset-0 bg-black/[0.03] transition-opacity duration-500 group-hover/showcase:opacity-0" />
              </div>

              {/* Dynamic Sheen / Specular Light Glare layer on custom 3D hover */}
              <motion.div 
                className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover/showcase:opacity-40 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 250px at calc(50% + ${glareXSpring} * 100px) calc(50% + ${glareYSpring} * 100px), rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 80%)`,
                  mixBlendMode: "overlay"
                }}
              />

              {/* Subtly moving diagonal glossy beam */}
              <div className="absolute inset-0 z-25 bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,0.18)_40%,rgba(255,255,255,0.3)_48%,rgba(255,255,255,0.18)_56%,transparent_70%)] -translate-x-[120%] group-hover/showcase:translate-x-[120%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />

              {/* Glowing internal border highlight */}
              <div 
                className="absolute inset-0 border border-white/20 rounded-[2.5rem] pointer-events-none z-10" 
                style={{ transform: "translateZ(10px)" }}
              />
            </motion.div>
          </div>

          {/* RIGHT COLUMN: HIGH-FIDELITY TEXT ANIMATION PIPELINE */}
          <motion.div 
            variants={textContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-5 flex flex-col justify-center items-start space-y-6 md:space-y-8 text-black"
          >
            {/* Tagline / Badge (Blur → Sharp reveal) */}
            <motion.div 
              variants={revealVariants}
              className="flex items-center space-x-2.5 bg-neutral-100/60 px-3.5 py-1.5 rounded-full border border-neutral-200/40"
            >
              <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-widest text-[#B3542E] uppercase">
                Elegance
              </span>
              <span className="text-neutral-300 select-none">•</span>
              <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-widest text-neutral-600 uppercase">
                Timeless
              </span>
            </motion.div>

            {/* Title container with Line-by-Line Reveal and Text Fill wiping to absolute black */}
            <div className="space-y-1 sm:space-y-2">
              <div className="overflow-hidden py-1">
                <motion.div 
                  variants={revealVariants}
                  className="relative text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] font-sans"
                  style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                >
                  {/* Underlay unfilled gray text - skeleton layer */}
                  <span className="text-neutral-200 select-none">
                    Modern Style
                  </span>
                  
                  {/* Overlay active filled dark text - wiping left to right */}
                  <motion.span 
                    variants={textFillVariants}
                    className="absolute inset-y-0 left-0 text-neutral-950 pr-4 block overflow-hidden bg-[#fdfdfd]"
                  >
                    Modern Style
                  </motion.span>
                </motion.div>
              </div>

              <div className="overflow-hidden py-1">
                <motion.div 
                  variants={revealVariants}
                  className="relative text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] font-sans"
                  style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                >
                  {/* Underlay unfilled gray text - skeleton layer */}
                  <span className="text-neutral-200 select-none">
                    Timeless Charm
                  </span>
                  
                  {/* Overlay active filled dark text - wiping left to right */}
                  <motion.span 
                    variants={textFillVariants}
                    className="absolute inset-y-0 left-0 text-neutral-950 pr-4 block overflow-hidden bg-[#fdfdfd]"
                  >
                    Timeless Charm
                  </motion.span>
                </motion.div>
              </div>
            </div>

            {/* Paragraph with Line-by-Line / Sentence-by-Sentence blur-reveal animations */}
            <div className="space-y-1.5">
              {paragraphSentences.map((sentence, idx) => (
                <div key={idx} className="overflow-hidden py-0.5">
                  <motion.p 
                    variants={revealVariants}
                    className="text-neutral-500 text-sm sm:text-base leading-relaxed font-sans max-w-lg origin-left"
                  >
                    {sentence}
                  </motion.p>
                </div>
              ))}
            </div>

            {/* Classic Luxury CTA Button (Blur → Sharp reveal) */}
            <motion.div variants={revealVariants} className="pt-2">
              <button
                onClick={onLearnMore}
                className="relative inline-flex items-center justify-between bg-neutral-950 hover:bg-[#B3542E] text-white text-[12px] sm:text-xs font-semibold px-7 sm:px-9 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-xl group select-none pointer-events-auto cursor-pointer"
              >
                <span className="mr-3 tracking-wider uppercase font-bold text-[10px]">About Us</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

