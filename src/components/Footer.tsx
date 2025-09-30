import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          {/* Logo */}
          <motion.h1 
            className="text-4xl md:text-5xl mb-4 tracking-tight"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="zeefit-gradient-text">Zeefit</span>
          </motion.h1>
          
          {/* Tagline */}
          <motion.p 
            className="text-xl mb-8 text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Grow Together. Be Fit Together.
          </motion.p>

          {/* Animated Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent mb-8 origin-center"
          />

          {/* Powered by */}
          <motion.p 
            className="text-sm text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
          >
            Powered by <span className="text-gray-400">WellnessZ</span>
          </motion.p>

          {/* Floating Elements */}
          <div className="relative">
            <motion.div
              animate={{ 
                y: [-10, 10, -10],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-8 left-1/4 w-2 h-2 bg-green-500 rounded-full"
            />
            <motion.div
              animate={{ 
                y: [10, -10, 10],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -top-8 right-1/4 w-1.5 h-1.5 bg-orange-500 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}