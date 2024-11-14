import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Plus, Search, Heart } from 'lucide-react';
import { RemedyFinder } from './heritage/RemedyFinder';
import { RemedySubmission } from './heritage/RemedySubmission';
import { RemedyGallery } from './heritage/RemedyGallery';
import { SavedRemedies } from './heritage/SavedRemedies';

export const HeritageHeals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'find' | 'submit' | 'gallery' | 'saved'>('gallery');

  const tabs = [
    { id: 'find', label: 'Find Remedy', icon: Search },
    { id: 'submit', label: 'Share Remedy', icon: Plus },
    { id: 'gallery', label: 'Remedy Gallery', icon: Utensils },
    { id: 'saved', label: 'Saved Remedies', icon: Heart }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center mb-8 md:mb-12"
      >
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl">
          <div className="relative w-full h-[400px] md:h-[600px]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute w-full h-full object-cover opacity-75"
              style={{ filter: 'brightness(0.85)' }}
            >
              <source src="https://cdn.pixabay.com/video/2022/07/12/123887-729425521_large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-brown-900/50 to-brown-900/80" />
          </div>
        </div>

        <div className="relative py-12 md:py-24">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="mb-6 md:mb-8"
          >
            <Utensils className="w-16 h-16 md:w-20 md:h-20 mx-auto text-cream" />
          </motion.div>
          <h2 className="font-display text-4xl md:text-6xl text-cream mb-4 md:mb-6">
            Heritage Heals
          </h2>
          <p className="text-xl md:text-2xl text-cream/90 mb-8 md:mb-12 max-w-3xl mx-auto px-4">
            Discover ancient remedies and comfort foods passed down through generations
          </p>

          {/* Mobile Tab Navigation */}
          <div className="flex md:hidden overflow-x-auto gap-2 px-4 pb-4 snap-x snap-mandatory">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-shrink-0 snap-start flex items-center gap-2 px-6 py-3 rounded-lg transition-all text-base ${
                  activeTab === tab.id
                    ? 'bg-cream text-brown-800'
                    : 'bg-white/20 text-cream hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Desktop Tab Navigation */}
          <div className="hidden md:flex flex-wrap justify-center gap-4">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-8 py-4 rounded-lg transition-all text-lg ${
                  activeTab === tab.id
                    ? 'bg-cream text-brown-800'
                    : 'bg-white/20 text-cream hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                <tab.icon className="w-6 h-6" />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="min-h-[600px] bg-cream/95 rounded-xl p-4 md:p-8 shadow-xl">
        {activeTab === 'find' && <RemedyFinder />}
        {activeTab === 'submit' && <RemedySubmission />}
        {activeTab === 'gallery' && <RemedyGallery />}
        {activeTab === 'saved' && <SavedRemedies />}
      </div>
    </div>
  );
};