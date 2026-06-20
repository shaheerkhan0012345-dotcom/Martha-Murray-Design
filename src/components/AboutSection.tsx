import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Star, MapPin, Sparkles, ArrowRight, Award, Compass, Heart } from 'lucide-react';
// @ts-ignore
import marthaPortrait from '../assets/images/martha_murray_portrait_1781943430427.jpg';

// PREMIUM PROFILE 3D CARD WITH REAL-TIME TILT DEPTH
function Profile3DCard({ src }: { src: string }) {
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
    
    // Relative position from center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Tilt limits (up to 15 degrees)
    rotateY.set(mouseX * 30);
    rotateX.set(mouseY * -30);
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
      className="relative aspect-square w-full max-w-[340px] md:max-w-md mx-auto lg:mx-0 rounded-[2.5rem] overflow-hidden border border-neutral-200/50 shadow-xl bg-white cursor-pointer group transition-all duration-500 hover:shadow-2xl hover:border-[#CE9E56]/30 select-none"
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
        perspective: 1200
      }}
    >
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
      >
        <img 
          src={src} 
          alt="Martha Murray Professional Portrait" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Glamour gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/40 via-transparent to-white/20 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent pointer-events-none" />
      </div>
      
      {/* Decorative Floating Status with 3D Offset depth */}
      <div 
        className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-neutral-100 z-10 flex items-center justify-between transition-colors group-hover:bg-white duration-300"
        style={{ transform: "translateZ(60px)" }}
      >
        <div>
          <span className="text-[9px] font-mono tracking-widest text-[#B3542E] uppercase block font-bold">FOUNDER & DESIGNER</span>
          <span className="text-sm font-semibold text-neutral-900">Martha Murray</span>
        </div>
        <div className="flex items-center gap-1 bg-[#CE9E56]/15 hover:bg-[#CE9E56]/20 px-2.5 py-1 rounded-lg text-[#B3542E] text-[10px] uppercase tracking-wider font-mono font-medium transition-colors">
          <Heart className="w-3 h-3 text-[#CE9E56] fill-current" />
          <span>Bend, OR</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutSection({ onOpenQuote }: { onOpenQuote: () => void }) {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const reviews = [
    {
      author: "Kevin Archer",
      role: "Bend Homeowner Remodel",
      text: "One of the smartest things we did when first considering a remodel was to hire an interior designer. Martha was at the top of the list. She quickly grasped our vision and helped us choose a contractor, offering several compatible possibilities. Because of this coordination, she became an important advocate for us throughout the entire job. Her space, design and color sensibilities are excellent. She helped open the blinders to ideas we never would have considered. She’s fun to work with but also no nonsense when it was necessary to keep us on track.",
      avatar: "KA"
    },
    {
      author: "Linda Ulmer",
      role: "Local Guide · 11 reviews",
      text: "I hired Martha after interviewing other candidates to help with a remodel of an older home. Martha helped my husband and I find a wonderful contractor and she served as our liaison with this company to ensure work was completed perfectly. Her attention to detail saved us so much time.",
      avatar: "LU"
    },
    {
      author: "Aimee Williamson",
      role: "New Construction Home Client",
      text: "We hired Martha Murray to be our designer for our new construction home and it was the BEST decision we made in the project. Without the help of a professional, the many decisions you have to make throughout the build can be overwhelming. Martha guided us with absolute patience.",
      avatar: "AW"
    }
  ];

  return (
    <div className="relative w-full bg-white pt-24 pb-20 px-4 sm:px-6 md:px-12" id="about-page-section">
      <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-[#F4F0EA]/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Main Bio Grid with 3D Portrait Column and Typographic narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Column 1: Interactive 3D portrait - Fully responsive, auto-centered on mobile */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <Profile3DCard src={marthaPortrait} />
          </div>

          {/* Column 2: Editorial Text Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 bg-[#CE9E56]/10 border border-[#CE9E56]/30 px-3 py-1 rounded-full text-[#CE9E56] text-[10px] sm:text-[11px] font-sans font-bold tracking-widest uppercase w-fit"
              >
                <Award className="w-3.5 h-3.5" />
                <span>MEET MARTHA MURRAY</span>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                Martha Murray <span className="text-[#B3542E]">Design</span>
              </h1>

              <div className="flex items-center space-x-2 bg-neutral-50 px-4 py-2.5 rounded-2xl border border-neutral-100 w-fit">
                <div className="flex text-[#CE9E56]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-bold text-neutral-900">5.0</span>
                <span className="text-xs text-neutral-400 font-mono">(3 Real Reviews)</span>
                <span className="text-xs text-neutral-400 font-sans">• Bend, Oregon</span>
              </div>
            </div>

            {/* Structured Biography Narrative paragraphs */}
            <div className="space-y-5 text-neutral-700 text-sm sm:text-base leading-relaxed font-sans max-w-2xl font-light">
              <p>
                Martha Murray brings more than <strong className="font-semibold text-neutral-900">25 years of professional design and business experience</strong> to her clients’ interior design projects. Her inspiration and expertise as an interior designer come from working in creative and entrepreneurial roles in virtually every aspect of the design industry, from floral and graphic design to event staging and fine art.
              </p>
              
              <p>
                Martha Murray Design specializes in both <strong className="font-semibold text-[#B3542E]">residential and small commercial interiors</strong>. As an independent interior design studio in Bend, she has access to the widest array of home decor products and services, which allows her clients’ lifestyles and personal taste to guide the process, not the inventory in a single showroom.
              </p>

              {/* Sophisticated highlight calling out SDH Fine European Linens luxury BEDDING sanctuary service */}
              <div className="p-5 rounded-2xl bg-[#F4F0EA]/70 border border-[#CE9E56]/20 relative overflow-hidden group space-y-1.5 shadow-sm">
                <div className="absolute right-0 top-0 w-24 h-24 bg-[#CE9E56]/5 rounded-full filter blur-xl transition-all group-hover:bg-[#CE9E56]/10" />
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B3542E]" />
                  <span className="text-xs text-neutral-400 font-mono uppercase tracking-widest font-bold">Luxury Bedroom Sanctuaries</span>
                </div>
                <p className="text-sm text-neutral-800 leading-relaxed font-sans">
                  A recent addition to MMD is <strong className="font-semibold text-neutral-900">SDH Fine European Linens</strong>. Exquisite bedding that will transform your bedroom into the sanctuary you want.
                </p>
              </div>

              <p>
                A native of the San Francisco Bay Area, Martha moved to Bend in 2003. She contributes to the central Oregon community as a board member for <strong className="font-semibold text-neutral-900">Scalehouse</strong> and volunteer for <strong className="font-semibold text-neutral-900">BendFilm</strong>. She is a co-producer of <strong className="font-semibold text-[#B3542E]">Bend Design</strong>, a three-day event promoting creativity and innovation.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onOpenQuote}
                className="bg-neutral-950 hover:bg-[#B3542E] text-white text-xs font-semibold px-6 py-3.5 rounded-xl transition-all hover:scale-105 duration-300 shadow-md flex items-center gap-2 cursor-pointer"
              >
                Start Your Remodel <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Interactive Reviews Carousel */}
        <div className="border-t border-neutral-100 pt-16 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-[4px] text-neutral-400 uppercase">CLIENT TESTIMONIALS</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-sans text-neutral-900 mt-1">
                Loved Across central Oregon
              </h2>
            </div>
            
            {/* Review Selectors */}
            <div className="flex gap-2">
              {reviews.map((rev, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReviewIndex(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider font-sans border cursor-pointer transition-all ${
                    activeReviewIndex === idx
                      ? 'bg-neutral-950 text-white border-neutral-950'
                      : 'bg-white text-neutral-500 border-neutral-100 hover:bg-neutral-50 hover:text-black'
                  }`}
                >
                  {rev.author.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="relative min-h-[300px] sm:min-h-[220px] bg-[#F4F0EA]/30 rounded-[2.5rem] border border-neutral-200/20 p-8 sm:p-12 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReviewIndex}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Big decorative quote */}
                <div className="text-[72px] text-[#CE9E56]/30 leading-none h-3 select-none pointer-events-none font-serif font-bold">&ldquo;</div>
                <p className="text-neutral-800 text-sm sm:text-lg italic leading-relaxed font-sans font-light pl-4">
                  {reviews[activeReviewIndex].text}
                </p>

                <div className="flex items-center space-x-4 pl-4 pt-2">
                  <div className="w-10 h-10 bg-[#B3542E] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-inner">
                    {reviews[activeReviewIndex].avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-950 font-sans">{reviews[activeReviewIndex].author}</h4>
                    <p className="text-[11px] text-neutral-500 uppercase tracking-widest font-mono">{reviews[activeReviewIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
