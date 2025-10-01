import React from "react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface CounterItemProps {
  label: string;
  startValue: number;
  endValue: number;
  icon: string;
  delay: number;
  isCircular?: boolean;
}

function CounterItem({ label, startValue, endValue, icon, delay, isCircular = false }: CounterItemProps) {
  const [count, setCount] = useState(startValue);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 2000;
      const increment = (endValue - startValue) / (duration / 16);
      let current = startValue;

      const counter = setInterval(() => {
        current += increment;
        if (current >= endValue) {
          setCount(endValue);
          setProgress(100);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
          setProgress((current / endValue) * 100);
        }
      }, 16);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [startValue, endValue, delay]);

  if (isCircular) {
    const radius = 60;
    const strokeWidth = 8;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: delay / 1000 }}
        className="bg-gradient-to-br from-white/10 to-white/5 
                   backdrop-blur-xl rounded-3xl 
                   p-6 sm:p-8 
                   border border-white/20 
                   hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20
                   transition-all duration-500"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-32 h-32 mb-4">
            <svg
              className="w-32 h-32 transform -rotate-90"
              viewBox={`0 0 ${radius * 2} ${radius * 2}`}
            >
              {/* Background circle */}
              <circle
                stroke="rgba(255, 255, 255, 0.2)"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              {/* Progress circle */}
              <motion.circle
                stroke="url(#gradient)"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 2, delay: delay / 1000 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl">{icon}</span>
              <span className="text-lg font-bold text-white">{Math.round(progress)}%</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {count.toLocaleString()}
            </div>
            <p className="text-gray-200/90 text-sm md:text-base">{label}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="bg-gradient-to-br from-white/10 to-white/5 
                 backdrop-blur-xl rounded-3xl 
                 p-6 sm:p-8 
                 border border-white/20 
                 hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20
                 transition-all duration-500"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="text-4xl">{icon}</span>
        <span className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
          {count.toLocaleString()}
        </span>
      </div>
      <p className="text-gray-200/90 text-sm md:text-base text-center">{label}</p>

      {/* Animated Progress Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: (delay / 1000) + 0.5 }}
        className="h-1.5 bg-gradient-to-r from-green-400 via-yellow-400 to-orange-500 
                   rounded-full mt-5 origin-left shadow-md"
      />
    </motion.div>
  );
}

export function LiveCounter() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4 py-12">
      <CounterItem
        label="Steps Goal Progress"
        startValue={0}
        endValue={7500}
        icon="👣"
        delay={500}
        isCircular={true}
      />
      <CounterItem
        label="Meals Logged"
        startValue={4200}
        endValue={4310}
        icon="🥗"
        delay={1000}
      />
      <CounterItem
        label="People Together"
        startValue={500}
        endValue={582}
        icon="🔥"
        delay={1500}
      />
    </div>
  );
}
