import { motion } from 'motion/react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { JoinNowModal } from './JoinNowModal';

interface VoiceCardProps {
  name: string;
  role: string;
  progress: string;
  quote: string;
  avatar: string;
  day: number;
  delay: number;
}

function VoiceCard({ name, role, progress, quote, avatar, day, delay }: VoiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Card className="relative overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 border-0 hover:scale-105">
        <div className="aspect-video relative">
          <ImageWithFallback
            src={avatar}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Play Button Overlay */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
            </div>
          </motion.div>
          
          {/* Day Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-gradient-to-r from-green-500 to-orange-500 text-white border-0">
              Day {day}
            </Badge>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-orange-500 rounded-full flex items-center justify-center text-white font-medium">
              {name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{name}</h3>
              <p className="text-sm text-gray-600">{role}</p>
            </div>
          </div>
          
          <blockquote className="text-gray-700 text-sm leading-relaxed mb-4">
            "{quote}"
          </blockquote>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Progress</span>
            <span className="text-sm font-medium zeefit-gradient-text">{progress}</span>
          </div>
          
          {/* Progress Animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: delay + 0.5 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-green-500 to-orange-500 rounded-full mt-3 origin-left"
          />
        </div>
      </Card>
    </motion.div>
  );
}

export function CommunityVoices() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const voices = [
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      progress: "15kg lost, 120 days strong",
      quote: "I never thought fitness could be this fun. The community challenges kept me going when motivation failed.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?crop=face&fit=crop&w=150&h=150",
      day: 120
    },
    {
      name: "Arjun Patel",
      role: "College Student",
      progress: "10,000 steps daily streak",
      quote: "From couch potato to marathon runner. Zeefit made it feel like a game, not a chore.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=face&fit=crop&w=150&h=150",
      day: 87
    },
    {
      name: "Sneha Gupta",
      role: "Marketing Manager",
      progress: "25kg team milestone",
      quote: "Our office team lost 25kg together! The friendly competition made all the difference.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=face&fit=crop&w=150&h=150",
      day: 45
    },
    {
      name: "Rahul Singh",
      role: "Entrepreneur",
      progress: "5km run personal best",
      quote: "The streaks are addictive! I've never been more consistent with any fitness routine.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=face&fit=crop&w=150&h=150",
      day: 67
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-6 text-gray-900 tracking-tight">
            Community <span className="zeefit-gradient-text">Voices</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Real people. Real transformations. Real community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {voices.map((voice, index) => (
            <VoiceCard
              key={voice.name}
              {...voice}
              delay={index * 0.2}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-8">
            Ready to share your transformation story?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-green-500 to-orange-500 text-white px-8 py-4 rounded-full font-medium hover:shadow-lg transition-all duration-300"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>

      {/* Join Now Modal */}
      <JoinNowModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}