import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StoryPanelProps {
  title: string;
  description: string;
  image: string;
  isDark?: boolean;
}

function StoryPanel({ title, description, image, isDark = false }: StoryPanelProps) {
  return (
    <div className={`flex-shrink-0 w-full h-full flex items-center justify-center relative ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="absolute inset-0">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${isDark ? 'bg-black/70' : 'bg-black/40'}`}></div>
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h2 
          className={`text-5xl md:text-7xl mb-8 ${isDark ? 'text-gray-300' : 'text-white'} tracking-tight`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h2>
        
        <motion.p 
          className={`text-xl md:text-2xl ${isDark ? 'text-gray-400' : 'text-gray-200'} leading-relaxed max-w-2xl mx-auto`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}

export function MovementStory() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const panels = [
    {
      title: "Fitness is lonely.",
      description: "Empty gyms. Solo struggles. No one to celebrate your wins or lift you up when you fall.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      isDark: true
    },
    {
      title: "Zeefit makes it a mission.",
      description: "Every step becomes a celebration. Every goal becomes a shared victory. Every challenge becomes an adventure.",
      image: "https://images.unsplash.com/photo-1662549905044-e3f71c293989?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwZml0bmVzcyUyMGdyb3VwJTIwd29ya291dCUyMHRvZ2V0aGVyfGVufDF8fHx8MTc1ODYyNTIxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Grow together. Be fit together.",
      description: "This is more than fitness. This is a movement. This is community. This is transformation that lasts.",
      image: "https://images.unsplash.com/photo-1718625168241-82bf46785323?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZmVzdGl2YWwlMjBjZWxlYnJhdGlvbiUyMHBlb3BsZSUyMGRhbmNpbmd8ZW58MXx8fHwxNzU4NjI1MjE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % panels.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + panels.length) % panels.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 3000); 

    
    return () => clearTimeout(timer);
  }, [currentSlide]); 

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-full"
        >
          <StoryPanel {...panels[currentSlide]} />
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-4 z-20">
        <button
          onClick={handlePrev}
          className="p-3 bg-white/30 hover:bg-white/50 text-white rounded-full transition-colors backdrop-blur-sm"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="p-3 bg-white/30 hover:bg-white/50 text-white rounded-full transition-colors backdrop-blur-sm"
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {panels.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}