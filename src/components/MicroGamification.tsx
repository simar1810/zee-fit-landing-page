import { motion } from 'motion/react';
import { useState } from 'react';
import { Card } from './ui/card';
// import { Progress } from './ui/progress'; // Not needed anymore
import { JoinNowModal } from './JoinNowModal';

interface GameCardProps {
  title: string;
  description: string;
  icon: string;
  progress: number;
  maxValue: number;
  unit: string;
  color: 'green' | 'orange';
  delay: number;
  interactionText: string;
}

function GameCard({ title, description, icon, progress, maxValue, unit, color, delay, interactionText }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0); // This is for initial viewport animation
  const percentage = (progress / maxValue) * 100;

  const colorClasses = {
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, amount: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onViewportEnter={() => {
        // This triggers the initial animation of the progress bar when it enters the viewport
        setTimeout(() => setAnimatedProgress(percentage), delay * 1000 + 500);
      }}
      onClick={() => setIsClicked(!isClicked)}
      className="group perspective-1000 cursor-pointer"
    >
      <Card className="relative overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 border-0 hover:scale-105 transform-gpu">
        {/* Animated Background Pattern - remains for subtle card texture */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
          {/* Removed the radial gradient background animation here to prevent overall card color change */}
        </div>

        <div className="relative p-8">
          {/* Icon with Animation */}
          <motion.div
            animate={isHovered ? { 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            } : {}}
            transition={{ duration: 0.6 }}
            className={`w-16 h-16 bg-gradient-to-r ${colorClasses[color]} rounded-2xl flex items-center justify-center text-white text-2xl mb-6 shadow-lg`}
          >
            {icon}
          </motion.div>

          <h3 className="text-xl mb-3 text-gray-900">{title}</h3>
          <motion.div
            initial={false}
            animate={{ height: isClicked ? 'auto' : 'auto' }} // This can be animated for a smoother expand/collapse
            className="overflow-hidden"
          >
            {!isClicked ? (
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{description}</p>
            ) : (
              <p className="text-green-600 text-sm leading-relaxed mb-6 italic">
                {interactionText}
              </p>
            )}
          </motion.div>

          {/* Progress Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Progress</span>
              <span className="text-sm text-gray-700">
                {progress.toLocaleString()} / {maxValue.toLocaleString()} {unit}
              </span>
            </div>
            
            {/* The actual progress bar visual */}
            <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                // Use animatedProgress for the initial viewport animation
                // Use `percentage` on hover for the hover fill effect
                initial={{ width: '0%' }}
                animate={isHovered ? { width: `${percentage}%` } : { width: `${animatedProgress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`absolute top-0 left-0 h-full bg-gradient-to-r ${colorClasses[color]} rounded-full`}
              />
            </div>
          </div>

          {/* Spark Effects - these will still animate on hover */}
          <motion.div
            animate={isHovered ? {
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8],
            } : {}}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute top-4 right-4"
          >
            <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-lg" />
          </motion.div>
          
          <motion.div
            animate={isHovered ? {
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8],
            } : {}}
            transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
            className="absolute bottom-4 left-4"
          >
            <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full shadow-lg" />
          </motion.div>
        </div>

        {/* --- REMOVED THE GLOBAL CARD GLOW EFFECT HERE --- */}
        {/*
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          className={`absolute inset-0 bg-gradient-to-r ${colorClasses[color]} opacity-5 rounded-lg`}
        />
        */}
      </Card>
    </motion.div>
  );
}

export function MicroGamification() {
  const [showModal, setShowModal] = useState(false);

  const gameData = [
    {
      title: "Daily Steps",
      description: "Track your movement and build momentum every single day.",
      icon: "👣",
      progress: 8542,
      maxValue: 10000,
      unit: "steps",
      color: "green" as const,
      delay: 0,
      interactionText: "Amazing! You're so close to your goal. Keep moving!"
    },
    {
      title: "Community Challenges",
      description: "Join team challenges and push each other to new heights.",
      icon: "🏆",
      progress: 3,
      maxValue: 5,
      unit: "completed",
      color: "orange" as const,
      delay: 0.2,
      interactionText: "Your team is counting on you! Two more challenges to go!"
    },
    {
      title: "Fitness Streak",
      description: "Consistency breeds excellence. How long can you go?",
      icon: "🔥",
      progress: 12,
      maxValue: 30,
      unit: "days",
      color: "green" as const,
      delay: 0.4,
      interactionText: "You're on fire! This streak is getting impressive!"
    }
  ];

  return (
    <>
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [-20, 20, -20],
              y: [-10, 10, -10],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 w-32 h-32 bg-green-100 rounded-full opacity-30"
          />
          <motion.div
            animate={{
              x: [20, -20, 20],
              y: [10, -10, 10],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-10 w-40 h-40 bg-orange-100 rounded-full opacity-20"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-6 text-gray-900 tracking-tight">
              Make Every Step <span className="zeefit-gradient-text">Count</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Turn your fitness journey into an engaging adventure with real-time progress tracking and community challenges.
            </p>
          </motion.div>

          {/* Game Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {gameData.map((card, index) => (
              <GameCard key={index} {...card} />
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center"
          >
            <motion.button
              onClick={() => setShowModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-gradient-to-r from-green-500 to-orange-500 text-white rounded-full text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Journey
            </motion.button>
          </motion.div>
        </div>
      </section>

      <JoinNowModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
}