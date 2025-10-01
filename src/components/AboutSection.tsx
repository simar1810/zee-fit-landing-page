import { motion } from 'motion/react';
import { useState } from 'react';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { JoinNowModal } from './JoinNowModal';
import wellnessZLogo from 'figma:asset/058903fc878eccbba2b6329afa742dcea04028d4.png';
import simarImage from '../assets/simar.webp';
import ananayImage from '../assets/basic.png';

export function AboutSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedCard, setClickedCard] = useState<string | null>(null);

  const founders = [
    {
      name: "Simarpreet Singh",
      role: "Founder & CEO",
      quote: "Fitness shouldn't be a lonely journey. We're building the community that transforms lives.",
      image: simarImage
    },
    {
      name: "Ananay Mehra",
      role: "Co-Founder & CMO",
      quote: "Technology should bring people together, not isolate them. That's the Zeefit difference.",
      image: ananayImage
    }
  ];

  const milestones = [
    { number: "3,000+", label: "Expert Coaches", description: "Certified professionals ready to guide your journey" },
    { number: "50,000+", label: "Lives Transformed", description: "Through WellnessZ platform over 3 years" },
    { number: "500+", label: "Corporate Partners", description: "Building healthier workplaces across India" },
    { number: "100+", label: "Cities Reached", description: "From metros to small towns, health knows no boundaries" }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          <div className="mb-12">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1742877742037-ae9d6546141c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBsaW5raW5nJTIwaGFuZHMlMjBjaXJjbGUlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzU4NjI1MjE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="People linking hands in community"
              className="w-full h-96 object-cover rounded-3xl shadow-2xl"
            />
          </div>
          
          <h2 className="text-5xl md:text-6xl mb-8 text-gray-900 tracking-tight">
            We're not another <span className="zeefit-gradient-text">fitness app</span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're India's first community-driven fitness brand, transforming how people think about health and wellness.
          </p>
        </motion.div>

        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <img
                src={wellnessZLogo}
                alt="WellnessZ"
                className="h-16"
              />
              <h3 className="text-4xl text-gray-900">Our Story</h3>
            </div>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                It started with <strong className="text-green-600">WellnessZ</strong> – a platform connecting 3,000+ certified coaches with people seeking transformation. We witnessed incredible journeys, but something was missing.
              </p>
              <p>
                <strong className="text-gray-800">The community.</strong> People were succeeding, but they were doing it alone. We realized that the most powerful transformations happened when people supported each other.
              </p>
              <p>
                That's when Zeefit was born – not just as a service, but as a movement. A place where every step, every meal, every victory is shared and celebrated together.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 gap-6"
          >
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setClickedCard(clickedCard === milestone.label ? null : milestone.label)}
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl cursor-pointer hover:shadow-lg transition-all duration-300"
              >
                <div className="text-3xl mb-2 zeefit-gradient-text">{milestone.number}</div>
                <div className="text-sm text-gray-900 mb-2">{milestone.label}</div>
                <motion.div
                  initial={false}
                  animate={{ opacity: clickedCard === milestone.label ? 1 : 1 }}
                  className="text-xs text-gray-600 leading-relaxed"
                >
                  {clickedCard === milestone.label ? (
                    <span className="text-green-600 italic">Click to explore our impact! 🌟</span>
                  ) : (
                    milestone.description
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Why Zeefit Exists - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative mb-24 p-16 bg-gradient-to-br from-gray-900 via-green-900 to-orange-900 rounded-3xl overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(52, 168, 83, 0.2) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(255, 111, 60, 0.2) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 20%, rgba(52, 168, 83, 0.2) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 80%, rgba(255, 111, 60, 0.2) 0%, transparent 50%)'
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute inset-0"
            />
          </div>
          
          <div className="relative z-10 text-center text-white">
            <motion.h3 
              className="text-6xl mb-12 zeefit-gradient-text"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Why Zeefit Exists
            </motion.h3>
            
            <motion.p 
              className="text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Traditional fitness is broken. It's built on fear, shame, and isolation. 
              <br className="hidden md:block" />
              <span className="zeefit-gradient-text">We're fixing it with joy, celebration, and community.</span>
            </motion.p>
            
            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {[
                {
                  icon: "💔",
                  title: "Fitness is Broken",
                  description: "Solo struggles, expensive gyms, unsustainable diets",
                  gradient: "from-red-500 to-red-600"
                },
                {
                  icon: "🔧", 
                  title: "We Fix It",
                  description: "Community challenges, shared goals, lasting habits",
                  gradient: "from-blue-500 to-blue-600"
                },
                {
                  icon: "🎉",
                  title: "Together We Thrive",
                  description: "Every victory is celebrated, every setback is supported",
                  gradient: "from-green-500 to-orange-500"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="text-6xl mb-6">{item.icon}</div>
                  <div className={`text-2xl mb-4 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                    {item.title}
                  </div>
                  <div className="text-gray-300 leading-relaxed">{item.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>

        {/* Founders */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-24"
        >
          <h3 className="text-4xl mb-12 text-center text-gray-900">The Founders</h3>
          <div className="grid md:grid-cols-2 gap-12">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-6 mb-6">
                    <ImageWithFallback
                      src={founder.image}
                      alt={founder.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-xl text-gray-900">{founder.name}</h4>
                      <p className="text-gray-600">{founder.role}</p>
                    </div>
                  </div>
                  <blockquote className="text-lg text-gray-700 leading-relaxed italic">
                    "{founder.quote}"
                  </blockquote>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* The Future */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center p-12 bg-gray-900 rounded-3xl text-white"
        >
          <h3 className="text-4xl mb-8">The Future</h3>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-300">
            This is just the beginning. We're planning epic community challenges – from the 1000kg weight loss mission to corporate fit-offs and student streak wars.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-green-500 to-orange-500 text-white px-8 py-4 rounded-full font-medium hover:shadow-lg transition-all duration-300 zeefit-glow"
          >
            Be Part of the Future
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