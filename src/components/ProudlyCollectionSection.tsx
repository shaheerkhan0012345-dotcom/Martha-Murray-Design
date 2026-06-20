import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'motion/react';
import { ArrowUpRight, Compass, Star, ArrowRight } from 'lucide-react';

interface ProjectCard {
  id: string;
  scope: string;
  year: string;
  title: string;
  location: string;
  image: string;
}

interface ProudlyCollectionSectionProps {
  onExploreCollection: (id: string) => void;
}

// PREMIUM 3D TILT CARD COMPONENT WITH CURSOR-TRACKING REFLECTION & SMOOTH SPRING LAYERS
interface Premium3DCardProps {
  project: ProjectCard;
  idx: number;
  onExploreCollection: (id: string) => void;
  scrollYProgress: any;
  scrollRange: number;
}

function Premium3DProjectCard({ 
  project, 
  idx, 
  onExploreCollection,
  scrollYProgress,
  scrollRange
}: Premium3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Independent spring-loaded mouse-coordinate fractions (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Map coordinate fractions to precise low-friction 3D angles
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);

  // Springs for buttery smooth interpolation with no lag or jitter
  const rotateXSpring = useSpring(rotateX, { stiffness: 95, damping: 20 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 95, damping: 20 });

  // Map lighting refraction position relative to the mouse vector
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  const glareXSpring = useSpring(glareX, { stiffness: 95, damping: 20 });
  const glareYSpring = useSpring(glareY, { stiffness: 95, damping: 20 });

  // Dynamic carousel scroll-tilt Y rotation based on its physical viewport alignment
  // As the card moves dynamically across the page, it bends towards or away from the central axis!
  const rotateYScroll = useTransform(scrollYProgress, (progress: number) => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const cardWidth = width > 768 ? 340 : 270;
    const gap = width > 768 ? 32 : 24;
    const itemOffset = idx * (cardWidth + gap);

    // Compute active horizontal translated position relative to central viewport coordinates
    const currentX = itemOffset - (progress * scrollRange);
    const centerScreen = width / 2;
    const distanceCenter = (currentX - centerScreen + (cardWidth / 2)) / width;

    // Normalizing and clamping to protect aesthetics
    const clampedDistance = Math.max(-0.5, Math.min(0.5, distanceCenter));
    
    // Tilt angle matches perspective curve (up to 14 degrees)
    return clampedDistance * -14; 
  });

  const rotateYScrollSpring = useSpring(rotateYScroll, { stiffness: 85, damping: 22 });

  // Perfectly aggregate mouse tilt with the underlying kinetic scroll rotation
  const rotateYCombined = useTransform(
    [rotateYSpring, rotateYScrollSpring],
    ([mouseRotY, scrollRotY]) => (mouseRotY as number) + (scrollRotY as number)
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Convert current mouse location to range [-0.5, 0.5]
    const currentX = (e.clientX - rect.left) / width - 0.5;
    const currentY = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(currentX);
    mouseY.set(currentY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onExploreCollection(project.id)}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYCombined,
        transformStyle: "preserve-3d",
        perspective: 1200
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 30px 70px -15px rgba(179, 84, 46, 0.18)'
      }}
      className="w-full h-full rounded-[2rem] overflow-hidden bg-neutral-100 border border-neutral-200/50 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-end p-5 md:p-6 text-white"
    >
      {/* Visual Backdrop Frame with exquisite zooming */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none"
        style={{ transform: "translateZ(-15px) scale(1.05)" }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-108"
          referrerPolicy="no-referrer"
        />
        
        {/* Rich Dark Cinematic Gradient Overlay for typographic legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5 group-hover:via-black/25 transition-all duration-500" />
        
        {/* Premium Specular Light Spotlight tracking the cursor position dynamically */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-45 transition-opacity duration-350"
          style={{
            background: `radial-gradient(circle 300px at calc(50% + ${glareXSpring} * 150px) calc(50% + ${glareYSpring} * 150px), rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 80%)`,
            mixBlendMode: "overlay"
          }}
        />

        {/* Sliding Glossy Glass Reflection on hover entering from left to right */}
        <div className="absolute inset-0 z-25 bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,0.18)_40%,rgba(255,255,255,0.30)_48%,rgba(255,255,255,0.18)_56%,transparent_70%)] -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />
      </div>

      {/* Floating 3D Text Overlay Content */}
      <div 
        className="relative z-10 w-full flex flex-col justify-between h-full pointer-events-none"
        style={{ transform: "translateZ(30px)" }}
      >
        {/* Top interactive elements: badge index and arrow */}
        <div className="flex justify-between items-start w-full">
          <div 
            className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 shadow-sm"
            style={{ transform: "translateZ(10px)" }}
          >
            <Compass className="w-3 h-3 text-[#CE9E56]" />
            <span className="text-[9px] font-mono tracking-wider text-white">0{idx + 1}</span>
          </div>
          <div 
            className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-neutral-900 transition-all duration-300 scale-90 md:scale-100"
            style={{ transform: "translateZ(20px)" }}
          >
            <ArrowUpRight className="w-4 h-4 text-white group-hover:text-neutral-900 transition-colors" />
          </div>
        </div>

        {/* Divider line & details */}
        <div className="border-t border-white/10 w-full pt-2.5 space-y-2" style={{ transform: "translateZ(15px)" }}>
          <div className="flex justify-between text-[9px] font-semibold text-neutral-300 uppercase tracking-widest font-mono">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-[#CE9E56] fill-[#CE9E56]" />
              {project.scope}
            </span>
            <span>{project.year}</span>
          </div>

          <h3 
            className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-[#CE9E56] transition-colors duration-300 leading-snug line-clamp-2"
            style={{ fontFamily: '"Space Grotesk", sans-serif', transform: "translateZ(10px)" }}
          >
            {project.title}
          </h3>
          
          <span 
            className="inline-block text-[10px] tracking-widest uppercase font-mono font-medium text-neutral-300"
            style={{ transform: "translateZ(10px)" }}
          >
            {project.location}
          </span>
        </div>
      </div>

      {/* Floating Border Highlight frame */}
      <div 
        className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none z-20" 
        style={{ transform: "translateZ(5px)" }}
      />
    </motion.div>
  );
}

export default function ProudlyCollectionSection({ onExploreCollection }: ProudlyCollectionSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.2 });

  const [scrollRange, setScrollRange] = useState(0);

  // 8 premium architectural designs specifically situated in New York
  const projects: ProjectCard[] = [
    {
      id: "ex-timber-garage",
      scope: "Dusk Facade",
      year: "2025",
      title: "Double Garage Twilight Lodge",
      location: "New York",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ex-wood-villa",
      scope: "ArchitectClad",
      year: "2024",
      title: "Dusk Cascade Villa Plan",
      location: "New York",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ex-fireplace-gallery",
      scope: "Salon Layout",
      year: "2025",
      title: "Modern Fireside Gallery Salon",
      location: "New York",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ex-folding-terrace",
      scope: "AtriumTransition",
      year: "2025",
      title: "Folding Glass Twilight Terrace",
      location: "New York",
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ex-culinary-studio",
      scope: "Chef Kitchen",
      year: "2023",
      title: "Carrara Oak Culinary Studio",
      location: "New York",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ex-curved-kitchen",
      scope: "BespokeMill",
      year: "2024",
      title: "Architectural Curved Kitchen Suite",
      location: "New York",
      image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ex-stone-firepit",
      scope: "CourtyardLounge",
      year: "2025",
      title: "Single-Story Stone Firepit Lounge",
      location: "New York",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ex-wood-panel",
      scope: "WardrobeJoinery",
      year: "2024",
      title: "Oak Panel Master Kitchen Plan",
      location: "New York",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Calculate the horizontal width minus window width so pinning finishes precisely when the last image appears
  useEffect(() => {
    const calculateRange = () => {
      if (trackRef.current) {
        // Precise scrollRange width matches track size minus viewport adjusted padding to expose final item beautifully
        const viewportPadding = window.innerWidth > 768 ? 160 : 24;
        const totalScrollable = trackRef.current.scrollWidth - window.innerWidth + viewportPadding;
        setScrollRange(Math.max(0, totalScrollable));
      }
    };

    // Calculate immediately and on resize
    calculateRange();
    
    // ResizeObserver guarantees capture if layout changes or lazy image loads complete
    const resizeObserver = new ResizeObserver(() => {
      calculateRange();
    });
    
    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    // Interval fallback to capture late-rendering content sizes
    const interval = setInterval(calculateRange, 1000);
    window.addEventListener('resize', calculateRange);
    
    return () => {
      resizeObserver.disconnect();
      clearInterval(interval);
      window.removeEventListener('resize', calculateRange);
    };
  }, [projects.length]);

  // Track the scroll progress of the entire pin container relative to active viewport pinning
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Dynamically map 0 to 1 scroll progression to exactly -scrollRange pixels shifted left
  // The custom transform function automatically adapts to dynamic scrollRange state updates
  const xTransform = useTransform(scrollYProgress, (progress) => {
    const start = 0.02;
    const end = 0.98;
    if (progress <= start) return "0px";
    if (progress >= end) return `-${scrollRange}px`;
    
    const percentage = (progress - start) / (end - start);
    return `-${percentage * scrollRange}px`;
  });

  const xSpring = useSpring(xTransform, { stiffness: 85, damping: 22 });

  return (
    <div 
      ref={containerRef} 
      // h-[320vh] height establishes the scrolling distance for pinning before release
      className="relative h-[320vh] w-full bg-[#FAF9F5] border-t border-neutral-200/50"
      id="proudly-collection-section"
    >
      {/* Sticky Frame viewport container: Pins section perfectly in screen until images list is fully translated */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-center py-4 xs:py-6 sm:py-10 md:py-16">
        
        {/* Subtle background decorative warm organic spot light */}
        <div className="absolute top-[8%] left-[4%] w-96 h-96 bg-[#B3542E]/[0.02] rounded-full filter blur-[120px] pointer-events-none" />
        
        {/* Section Header */}
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 mb-4 xs:mb-6 md:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-6 select-none z-10">
          <div ref={headerRef} className="space-y-1 sm:space-y-2">
            <span className="text-[10px] md:text-[11px] font-mono tracking-[4px] text-[#B3542E] uppercase block font-semibold">
              PINNED EXHIBITION
            </span>
            <motion.h2 
              initial={{ opacity: 0, y: 25 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-900 leading-[1.1]"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              Elevating Everyday <br className="hidden sm:inline" />
              Living Through Design
            </motion.h2>
          </div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            onClick={() => onExploreCollection("all")}
            className="group flex items-center justify-between gap-2.5 text-neutral-900 hover:text-[#B3542E] text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-300 pb-1 border-b border-neutral-900 hover:border-[#B3542E] cursor-pointer"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* Horizontal Card Track */}
        <div className="relative w-full overflow-hidden flex items-center h-[360px] sm:h-[420px] md:h-[460px] z-10 px-4 sm:px-6 md:px-12 lg:px-20">
          <motion.div 
            ref={trackRef}
            style={{ x: xSpring }}
            className="flex items-center gap-6 sm:gap-8 h-full"
          >
            {projects.map((project, idx) => (
              <div key={project.id} className="flex-shrink-0 w-[270px] sm:w-[310px] md:w-[340px] h-[340px] sm:h-[400px] md:h-[430px]">
                <Premium3DProjectCard 
                  project={project}
                  idx={idx}
                  onExploreCollection={onExploreCollection}
                  scrollYProgress={scrollYProgress}
                  scrollRange={scrollRange}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Progress interactive deck utility line */}
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 mt-8 sm:mt-12 flex items-center justify-between select-none z-10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest text-[#B3542E] uppercase font-semibold">
              SCROLL TO PROGRESS
            </span>
            <div className="h-[2px] w-12 sm:w-24 bg-neutral-200 relative overflow-hidden rounded-full font-sans">
              <motion.div 
                style={{ scaleX: scrollYProgress }}
                className="absolute inset-y-0 left-0 right-0 bg-[#B3542E] origin-left"
              />
            </div>
          </div>
          <p className="text-[11px] sm:text-xs text-neutral-400 font-sans max-w-[200px] sm:max-w-xs text-right leading-normal">
            Scroll vertically to slide through our curated luxury spatial plans.
          </p>
        </div>

      </div>
    </div>
  );
}
