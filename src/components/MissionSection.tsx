import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { Button } from './ui/button';

export function MissionSection() {
  const navigate = useNavigate();
  
  const pillars = [
    {
      title: "Challenge the Status Quo",
      subtitle: "Fun > Fear",
      description: "We reject the fitness industry's toxic culture of shame and fear. Every challenge is designed to spark joy, not anxiety.",
      icon: "🚀",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Empower Experts",
      subtitle: "Visibility & Scale",
      description: "We give our 3,000+ certified coaches the platform and tools they need to reach more people and change more lives.",
      icon: "👥",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Fuel Transformation",
      subtitle: "Real Results",
      description: "Every feature, every challenge, every interaction is designed to create lasting, measurable change in people's lives.",
      icon: "⚡",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Spark Movements",
      subtitle: "Scale Impact",
      description: "From one person to one team to one city. We're building a movement that spreads health and happiness everywhere.",
      icon: "🌍",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Glowing Streaks */}
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ 
            x: ['100%', '-100%'], 
            opacity: [0, 0.6, 0] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            repeatDelay: 2,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-0 w-96 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent"
        />
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ 
            x: ['100%', '-100%'], 
            opacity: [0, 0.4, 0] 
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            repeatDelay: 3,
            delay: 1,
            ease: "easeInOut"
          }}
          className="absolute top-3/4 left-0 w-64 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 0.6, 0]
            }}
            transition={{ 
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className={`absolute w-1 h-1 rounded-full ${
              Math.random() > 0.5 ? 'bg-green-500' : 'bg-orange-500'
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl mb-8 text-white tracking-tight leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            <span className="block text-4xl md:text-6xl mb-4 text-gray-400">Zeefit is not about</span>
            <span className="block text-gray-500 line-through">calories, weight, or numbers.</span>
          </motion.h1>
          
          <motion.p 
            className="text-3xl md:text-4xl text-white mb-8 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            It's about proving that <span className="zeefit-gradient-text">change is real</span> — when we do it <strong>together</strong>.
          </motion.p>
        </motion.div>

        {/* 4 Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="group perspective-1000"
            >
              <Card className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 h-full">
                <div className="p-8">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ duration: 0.3 }}
                    className={`w-16 h-16 bg-gradient-to-r ${pillar.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                  >
                    {pillar.icon}
                  </motion.div>
                  
                  <h3 className="text-xl mb-2 text-white group-hover:text-green-400 transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-orange-400 text-sm mb-4 font-medium">{pillar.subtitle}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{pillar.description}</p>
                </div>
                
                {/* Hover Glow Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className={`absolute inset-0 bg-gradient-to-r ${pillar.gradient} opacity-5 rounded-lg`}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Globe Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          <div className="relative w-80 h-80 mx-auto mb-12">
            {/* Globe Base */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/20 to-orange-500/20 border border-white/10">
              {/* Glowing Dots */}
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45) * Math.PI / 180;
                const radius = 120;
                const x = Math.cos(angle) * radius + 160;
                const y = Math.sin(angle) * radius + 160;
                
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: i * 0.2 
                    }}
                    style={{ left: x, top: y }}
                    className="absolute w-3 h-3 bg-gradient-to-r from-green-400 to-orange-400 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                  />
                );
              })}
            </div>
          </div>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            From one college, one office, one city — to the world.
          </motion.p>
        </motion.div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl mb-8 text-white">
            Every challenge starts with <span className="zeefit-gradient-text">one step</span>.
          </h2>
          <p className="text-2xl text-gray-300 mb-12">Are you in?</p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg"
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white px-12 py-6 text-xl rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300"
            >
              <motion.span
                animate={{ 
                  boxShadow: [
                    '0 0 0px rgba(52, 168, 83, 0)',
                    '0 0 20px rgba(52, 168, 83, 0.5)',
                    '0 0 0px rgba(52, 168, 83, 0)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Join Early Access
              </motion.span>
            </Button>
          </motion.div>
          
          <p className="text-sm text-gray-500 mt-6">
            Limited spots available before the epic community challenges begin
          </p>
        </motion.div>
      </div>

    </section>
  );
}