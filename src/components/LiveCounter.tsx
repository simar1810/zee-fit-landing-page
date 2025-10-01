import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface CounterItemProps {
  label: string;
  startValue: number;
  endValue: number;
  icon: string;
  delay: number;
}

function CounterItem({ label, startValue, endValue, icon, delay }: CounterItemProps) {
  const [count, setCount] = useState(startValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 2000;
      const increment = (endValue - startValue) / (duration / 16);
      let current = startValue;
      
      const counter = setInterval(() => {
        current += increment;
        if (current >= endValue) {
          setCount(endValue);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [startValue, endValue, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
    >
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <motion.span 
          className="text-3xl md:text-4xl text-white tracking-tight"
          key={count}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {count.toLocaleString()}+
        </motion.span>
      </div>
      <p className="text-gray-200 text-sm md:text-base">{label}</p>
      
      {/* Streak Effect */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: (delay / 1000) + 0.5 }}
        className="h-1 bg-gradient-to-r from-green-500 to-orange-500 rounded-full mt-3 origin-left"
      />
    </motion.div>
  );
}

export function LiveCounter() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <CounterItem
        label="Community Steps Today"
        startValue={0}
        endValue={500}
        icon="👣"
        delay={500}
      />
      <CounterItem
        label="Meals Logged"
        startValue={0}
        endValue={100}
        icon="🥗"
        delay={1000}
      />
      <CounterItem
        label="People Together"
        startValue={0}
        endValue={100}
        icon="🔥"
        delay={1500}
      />
    </div>
  );
}