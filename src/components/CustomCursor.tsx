import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [hoverType, setHoverType] = useState<'default' | 'view' | 'text'>('default');

  // Motion values for smooth hardware-accelerated movement
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth physical spring animations
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // 1. Detect if touch device to disable custom cursor on mobile safely
    const checkTouch = () => {
      const hasTouch = 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        window.matchMedia('(hover: none)').matches;
      setIsTouchDevice(hasTouch);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (isTouchDevice) return;

    // 2. Track mouse position
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    // 3. Handle window bounds (mouse enter/leave document)
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // 4. Handle clicks
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // 5. Global hover listener to detect clickable/interactive items
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find if we are hovering over an interactive element
      const interactiveEl = target.closest(
        'button, a, input, select, textarea, [role="button"], .cursor-pointer, li'
      );

      if (interactiveEl) {
        setIsHovered(true);

        // Customize the cursor style depending on what we are hovering
        if (
          interactiveEl.classList.contains('gallery-item') || 
          interactiveEl.closest('.gallery-item') || 
          interactiveEl.closest('#portfolio-grid-item')
        ) {
          setHoverType('view');
        } else if (
          interactiveEl.tagName === 'INPUT' || 
          interactiveEl.tagName === 'TEXTAREA'
        ) {
          setHoverType('text');
        } else {
          setHoverType('default');
        }
      } else {
        setIsHovered(false);
        setHoverType('default');
      }
    };

    // Listeners
    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Dynamic global CSS to hide default cursor on desktop when component is active
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @media (min-width: 768px) {
        body, a, button, input, select, textarea, [role="button"], .cursor-pointer, li {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      if (styleEl && document.head.contains(styleEl)) {
        document.head.removeChild(styleEl);
      }
    };
  }, [cursorX, cursorY, isVisible, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  // Render responsive layered aesthetic cursor shapes
  return (
    <div className="fixed inset-0 pointer-events-none z-[99999]" id="mmd-bespoke-cursor">
      {/* 1. Tail Ring (Outer Guide) - Spring delayed follower */}
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? (hoverType === 'view' ? 70 : 44) : 24,
          height: isHovered ? (hoverType === 'view' ? 70 : 44) : 24,
          backgroundColor: isHovered 
            ? hoverType === 'view'
              ? 'rgba(179, 84, 46, 0.08)' 
              : 'rgba(206, 158, 86, 0.06)'
            : 'rgba(0, 0, 0, 0.03)',
          borderColor: isClicked 
            ? '#B3542E' 
            : isHovered 
              ? hoverType === 'view' 
                ? '#B3542E' 
                : '#CE9E56' 
              : '#171717',
          borderWidth: isHovered ? '2px' : '1px',
          scale: isClicked ? 0.9 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.1 }}
        className="absolute rounded-full border flex items-center justify-center transition-colors duration-300 backdrop-blur-[0.5px]"
      >
        <AnimatePresence>
          {isHovered && hoverType === 'view' && (
            <motion.span
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="text-[9px] font-mono tracking-widest text-[#B3542E] uppercase font-bold"
            >
              VIEW
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 2. core Pointer Dot - Exactly matches the terracotta design core */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicked ? 1.5 : isHovered ? 0.6 : 1,
          backgroundColor: isHovered 
            ? hoverType === 'view' 
              ? '#B3542E' 
              : '#CE9E56' 
            : '#B3542E',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450 }}
        className="absolute w-2 h-2 rounded-full shadow-sm"
      />
    </div>
  );
}
