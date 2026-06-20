import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress simulation matching elegant design transitions
    const startTime = Date.now();
    const duration = 2500; // 2.5 seconds total loading presentation

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const computed = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(computed);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 300); // Small cushion
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100%',
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-50 bg-[#f7f5f2] flex flex-col items-center justify-center select-none"
      id="website-preloader"
    >
      <div className="flex flex-col items-center max-w-sm px-6 text-center">
        {/* Animated Custom Logo */}
        <div className="relative mb-6">
          <svg 
            width="140" 
            height="140" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            {/* Taller charcoal/brown arch behind: Draws in dynamically */}
            <motion.path 
              d="M41 58 V33 C41 24.7 47.7 18 56 18 C64.3 18 71 24.7 71 33 V58 H41" 
              stroke="#52433D" 
              strokeWidth="2" 
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 1,
                transition: { duration: 1.4, ease: "easeInOut", delay: 0.2 } 
              }}
            />

            {/* Shorter gold/ochre arch in front: Draws in dynamically */}
            <motion.path 
              d="M22 66 V45 C22 37.3 28.3 31 36 31 C43.7 31 50 37.3 50 45 V66 H22Z" 
              stroke="#CE9E56" 
              strokeWidth="2" 
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 1,
                transition: { duration: 1.4, ease: "easeInOut", delay: 0.5 } 
              }}
            />

            {/* Terracotta solid sun/circle: Scales/Drops in from above */}
            <motion.circle 
              cx="36" 
              cy="30" 
              r="9" 
              fill="#B3542E" 
              initial={{ scale: 0, y: -20, opacity: 0 }}
              animate={{ 
                scale: 1, 
                y: 0, 
                opacity: 1,
                transition: { type: "spring", stiffness: 100, damping: 15, delay: 1.2 } 
              }}
            />

            {/* Thin terracotta shader lines: Reveal smoothly */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1.1, duration: 0.6 } }}
            >
              <line x1="53.5" y1="60.5" x2="71" y2="60.5" stroke="#D1B2A5" strokeWidth="1.8" />
              <line x1="53.5" y1="63" x2="71" y2="63" stroke="#D1B2A5" strokeWidth="1.8" />
              <line x1="53.5" y1="65.5" x2="71" y2="65.5" stroke="#D1B2A5" strokeWidth="1.8" />
            </motion.g>
          </svg>
        </div>

        {/* Text Brand Sequenced Reveals */}
        <div className="overflow-hidden mt-1 mb-1">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 1.3 } 
            }}
            className="font-sans text-3xl md:text-4xl font-bold tracking-[0.25em] text-[#3d2e27] uppercase leading-none"
          >
            MARTHA
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-6">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 1.5 } 
            }}
            className="text-[11px] md:text-xs font-semibold tracking-[0.48em] text-[#786358] uppercase mt-2.5 select-none"
          >
            MURRAY DESIGN
          </motion.p>
        </div>

        {/* Elegant Loader Progress Bar & Counter */}
        <div className="w-40 h-[1.5px] bg-neutral-200/60 rounded-full overflow-hidden relative mb-2">
          <motion.div 
            className="h-full bg-[#B3542E]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>

        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6, transition: { delay: 0.5 } }}
          className="font-mono text-xs md:text-sm tracking-widest text-[#786358] font-medium"
        >
          {progress}%
        </motion.span>
      </div>
    </motion.div>
  );
}
