import React, { useState } from 'react';
import Header from './components/Header';
import HeroSlide from './components/HeroSlide';
import LifestyleSection from './components/LifestyleSection';
import AestheticGallerySection from './components/AestheticGallerySection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import PortfolioSection from './components/PortfolioSection';
import ContactSection from './components/ContactSection';
import ShowcaseSection from './components/ShowcaseSection';
import ProudlyCollectionSection from './components/ProudlyCollectionSection';
import ProductDrawer from './components/ProductDrawer';
import ProjectsGrid from './components/ProjectsGrid';
import QuoteModal from './components/QuoteModal';
import Loader from './components/Loader';
import FooterSection from './components/FooterSection';
import AIAgentChat from './components/AIAgentChat';
import CustomCursor from './components/CustomCursor';
import { COLLECTIONS } from './data';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // State for premium overlay modals/drawers
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleOpenProjectWithId = (id: string) => {
    if (id === 'all') {
      setSelectedProjectId(null);
      setIsProjectsOpen(true);
    } else {
      setSelectedProjectId(id);
      setIsProjectsOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black select-none overflow-x-visible overflow-y-visible relative flex flex-col justify-between">
      
      {/* High-end startup logo preloader */}
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <Loader onComplete={() => setIsLoaded(true)} />
        )}
      </AnimatePresence>

      {/* Header Container conforming closely to Poliform logo aesthetics */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCatalog={() => setIsCatalogOpen(true)}
        onOpenProjects={() => setIsProjectsOpen(true)}
        onOpenQuote={() => setIsQuoteOpen(true)}
        currentCollection={COLLECTIONS[activeSlideIndex].title}
        isLoaded={isLoaded}
      />

      {/* Primary Pristine Hero Section */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <HeroSlide
                collections={COLLECTIONS}
                activeIndex={activeSlideIndex}
                setActiveIndex={setActiveSlideIndex}
                onOpenCatalog={() => setIsCatalogOpen(true)}
                onOpenQuote={() => setIsQuoteOpen(true)}
                isLoaded={isLoaded}
              />
              <AestheticGallerySection
                onOpenCatalog={() => setIsCatalogOpen(true)}
                onOpenQuote={() => setIsQuoteOpen(true)}
              />
              <ShowcaseSection onLearnMore={() => setActiveTab('about')} />
              <ProudlyCollectionSection onExploreCollection={handleOpenProjectWithId} />
            </motion.div>
          )}
          {activeTab === 'service' && (
            <motion.div
              key="service"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <ServicesSection onOpenQuote={() => setIsQuoteOpen(true)} />
            </motion.div>
          )}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <AboutSection onOpenQuote={() => setIsQuoteOpen(true)} />
            </motion.div>
          )}
          {activeTab === 'portfolio' && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <PortfolioSection onOpenQuote={() => setIsQuoteOpen(true)} />
            </motion.div>
          )}
          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <ContactSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Poliform-inspired Premium Footer section with live conversational coordinates */}
      <FooterSection />

      {/* Portal components for deep interaction if clicked in the Hero */}
      <ProductDrawer
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onOpenQuote={() => {
          setIsCatalogOpen(false);
          setIsQuoteOpen(true);
        }}
      />

      <ProjectsGrid
        isOpen={isProjectsOpen}
        onClose={() => {
          setIsProjectsOpen(false);
          setSelectedProjectId(null);
        }}
        onOpenQuote={() => {
          setIsProjectsOpen(false);
          setIsQuoteOpen(true);
          setSelectedProjectId(null);
        }}
        initialProjectId={selectedProjectId}
      />

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />

      <AIAgentChat />
      <CustomCursor />

    </div>
  );
}
