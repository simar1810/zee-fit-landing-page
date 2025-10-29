import zeefitLogo from 'figma:asset/e9b8b703e22e4f666412667c60adb6e66b816ebd.png';
import { motion } from 'motion/react';
import React, { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { JoinNowModal } from './JoinNowModal';
import { LiveCounter } from './LiveCounter';
import { Button } from './ui/button';

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJoinClick = () => {
    setIsModalOpen(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background Effect */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1720798198209-f5577ce6aa3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMGZpdG5lc3MlMjBjb21tdW5pdHklMjBydW5uaW5nJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzU4NjI1MjE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Community running together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Animated Overlay Streaks */}
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '100vw', opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          className="absolute top-1/3 left-0 w-32 h-1 zeefit-streak"
        />
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '100vw', opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, delay: 1 }}
          className="absolute top-2/3 left-0 w-24 h-1 zeefit-streak"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Zeefit Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-12"
          >
            <img
              src={zeefitLogo}
              alt="Zeefit"
              className="h-24 md:h-32 lg:h-40 mx-auto"
            />
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl mb-6 text-white tracking-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            India's First<br />
            <span className="zeefit-gradient-text">Community</span><br />
            Fitness Brand
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Where every step counts — together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              onClick={handleJoinClick}
              className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-6 text-xl rounded-full zeefit-glow transition-all duration-300 hover:scale-105"
            >
              Join the Movement
            </Button>
           
          </motion.div>
        </motion.div>

        {/* Live Counters */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20"
        >
          <LiveCounter />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Join Now Modal */}
      <JoinNowModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}