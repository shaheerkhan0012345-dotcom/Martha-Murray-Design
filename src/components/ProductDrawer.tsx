import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Share2, Filter, Ruler, UserCheck, ShieldCheck } from 'lucide-react';
import { FurnitureProduct } from '../types';
import { PRODUCTS } from '../data';

interface ProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
}

export default function ProductDrawer({
  isOpen,
  onClose,
  onOpenQuote
}: ProductDrawerProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProduct, setActiveProduct] = useState<FurnitureProduct | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const categories = ['All', 'Sofa Systems', 'Armchairs', 'Wardrobe Systems', 'Coffee Tables'];

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end"
          id="product-drawer-overlay"
        >
          {/* Backdrop exit click */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Draggable Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="relative w-full max-w-4xl h-full bg-[#0d0d0d] border-l border-neutral-900 shadow-2xl flex flex-col z-10"
            id="product-drawer-container"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-neutral-900 flex justify-between items-center bg-[#090909]/90 backdrop-blur-md">
              <div>
                <span className="text-[10px] font-mono tracking-[4px] text-[#D4AF37] uppercase">PREMIUM HARMONY</span>
                <h2 className="text-2xl font-bold tracking-tight text-white font-sans mt-1">Martha Murray Design Catalog</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 text-neutral-400 hover:text-white bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 rounded-full transition-colors cursor-pointer"
                id="close-catalog-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Interactive Content Split */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              
              {/* Left Column: Grid of Products */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6 progress-scrollbar">
                
                {/* Horizontal Category Pill Filter */}
                <div className="flex flex-wrap gap-2 pb-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-[10px] md:text-xs font-semibold px-4 py-2 rounded-full cursor-pointer transition-all duration-300 border ${
                        selectedCategory === cat
                          ? 'bg-white text-black border-white shadow-md'
                          : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProducts.map((prod) => (
                    <motion.div
                      layoutId={`prod-card-${prod.id}`}
                      key={prod.id}
                      onClick={() => setActiveProduct(prod)}
                      whileHover={{ 
                        y: -4, 
                        scale: 1.015,
                        borderColor: '#CE9E56',
                        boxShadow: '0 10px 25px -5px rgba(206, 158, 86, 0.12)' 
                      }}
                      whileTap={{ scale: 0.995 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                      className={`group relative rounded-xl overflow-hidden border p-4 bg-neutral-950/60 cursor-pointer transition-colors duration-300 ${
                        activeProduct?.id === prod.id
                          ? 'border-[#D4AF37] bg-neutral-900/40 shadow-lg shadow-black/60'
                          : 'border-neutral-900'
                      }`}
                    >
                      {/* Thumbnail Container */}
                      <div className="aspect-video w-full rounded-lg overflow-hidden relative">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        <span className="absolute bottom-2.5 left-2.5 bg-black/85 text-[9px] font-mono text-[#D4AF37] px-2 py-0.5 rounded border border-white/5">
                          {prod.category}
                        </span>
                      </div>

                      {/* Info lines */}
                      <div className="mt-3 space-y-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">{prod.name}</h3>
                          <span className="text-[10px] font-mono text-neutral-500">{prod.year}</span>
                        </div>
                        <p className="text-[10px] text-neutral-400 font-mono">Designed by {prod.designer}</p>
                      </div>

                      {/* Corner subtle arrow */}
                      <div className="absolute top-4 right-4 bg-black/60 p-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Column: In-depth Detail Panel */}
              <div className="w-full md:w-[380px] bg-neutral-950/40 border-t md:border-t-0 md:border-l border-neutral-900 p-6 flex flex-col justify-between overflow-y-auto">
                <AnimatePresence mode="wait">
                  {activeProduct ? (
                    <motion.div
                      key={activeProduct.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="space-y-6"
                    >
                      {/* Product full view */}
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-neutral-800">
                        <img
                          src={activeProduct.image}
                          alt={activeProduct.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Header lines */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-[#D4AF37] tracking-[2px] block uppercase">{activeProduct.category}</span>
                        <h3 className="text-xl font-bold tracking-tight text-white">{activeProduct.name}</h3>
                        <p className="text-xs text-neutral-400">Designer: <span className="text-white font-medium">{activeProduct.designer}</span> ({activeProduct.year})</p>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-neutral-400 leading-relaxed font-light">
                        {activeProduct.description}
                      </p>

                      {/* Specifications Accordion Box */}
                      <div className="space-y-2 bg-[#090909] p-4 rounded-xl border border-neutral-800">
                        <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider flex items-center space-x-1.5">
                          <Ruler className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>TECHNICAL SPECIFICATIONS</span>
                        </span>
                        <ul className="text-xs text-neutral-400 space-y-1.5 font-mono">
                          {activeProduct.specs.map((spec, i) => (
                            <li key={i} className="flex justify-between items-center border-b border-white/5 pb-1">
                              <span>Spec #{i + 1}</span>
                              <span className="text-white font-medium">{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* High-end trust labels */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-lg border border-neutral-800 flex items-center space-x-2 bg-neutral-900/30">
                          <UserCheck className="w-4 h-4 text-neutral-400" />
                          <span className="text-[9px] font-mono text-neutral-400">MILANO DIRECT</span>
                        </div>
                        <div className="p-2.5 rounded-lg border border-neutral-800 flex items-center space-x-2 bg-neutral-900/30">
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          <span className="text-[9px] font-mono text-neutral-400">5 YR WARRANTY</span>
                        </div>
                      </div>

                      {/* Inquire buttons */}
                      <div className="space-y-2 pt-2">
                        <button
                          onClick={onOpenQuote}
                          className="w-full text-center bg-[#D4AF37] text-black font-semibold text-xs py-3 rounded-lg hover:bg-yellow-600 transition-colors uppercase cursor-pointer"
                        >
                          Book Custom Quote
                        </button>
                        <button
                          onClick={handleCopyLink}
                          className="w-full text-center border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs py-2.5 rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer bg-neutral-950/40 active:scale-98"
                        >
                          <Share2 className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{copiedLink ? "Curation Link Copied!" : "Distribute Blueprint Link"}</span>
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-4">
                      <div className="p-4 bg-neutral-900 rounded-full border border-neutral-800 text-neutral-500">
                        <Filter className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Select a Furniture Piece</h4>
                        <p className="text-xs text-neutral-400 max-w-[200px] mx-auto mt-1">
                          Click any collection piece from the left list to inspect blueprints, designers, and finishes.
                        </p>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
