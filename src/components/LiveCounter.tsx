import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "motion/react";

interface CounterItemProps {
  label: string;
  startValue: number;
  endValue: number;
  icon: string;
  delay: number;
  isCircular?: boolean;
  showPercentOf?: number; // compare to another value
}

function CounterItem({
  label,
  startValue,
  endValue,
  icon,
  delay,
  isCircular = false,
  showPercentOf,
}: CounterItemProps) {
  const [count, setCount] = useState(startValue);
  const controls = useAnimation();

  useEffect(() => {
    const duration = 2; // seconds
    const start = performance.now();

    let raf: number;
    const step = (time: number) => {
      const elapsed = (time - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = startValue + (endValue - startValue) * eased;
      setCount(Math.floor(current));

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    const timer = setTimeout(() => {
      raf = requestAnimationFrame(step);
      controls.start({ opacity: 1, y: 0 });
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [startValue, endValue, delay, controls]);

  // ✅ if circular progress
  if (isCircular) {
    const radius = 60;
    const strokeWidth = 8;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    const progressPercent = showPercentOf
      ? (count / showPercentOf) * 100
      : (count / endValue) * 100;

    const strokeDashoffset =
      circumference - (progressPercent / 100) * circumference;

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={controls}
        transition={{ duration: 0.6, delay: delay / 1000 }}
        className="bg-gradient-to-br from-white/10 to-white/5 
                   backdrop-blur-xl rounded-3xl 
                   p-6 sm:p-8 
                   border border-white/20 
                   hover:scale-[1.03] hover:shadow-xl hover:shadow-black/30
                   transition-all duration-500"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-32 h-32 mb-4">
            <svg
              className="w-32 h-32 transform -rotate-90"
              viewBox={`0 0 ${radius * 2} ${radius * 2}`}
            >
              <circle
                stroke="rgba(255, 255, 255, 0.15)"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              <circle
                stroke="url(#gradient)"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: "stroke-dashoffset 0.2s linear" }}
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
              <span className="text-lg font-bold text-white">
                {Math.round(progressPercent)}%
              </span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {count.toLocaleString()} kcal
            </div>
            <p className="text-gray-200/90 text-sm md:text-base">{label}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  // ✅ default bar counter
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="bg-gradient-to-br from-white/10 to-white/5 
                 backdrop-blur-xl rounded-3xl 
                 p-6 sm:p-8 
                 border border-white/20 
                 hover:scale-[1.03] hover:shadow-xl hover:shadow-black/30
                 transition-all duration-500"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="text-4xl">{icon}</span>
        <span className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
          {count.toLocaleString()} kcal
        </span>
      </div>
      <p className="text-gray-200/90 text-sm md:text-base text-center">
        {label}
      </p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: delay / 1000 + 0.5 }}
        className="h-1.5 bg-gradient-to-r from-green-400 via-yellow-400 to-orange-500 
                   rounded-full mt-5 origin-left shadow-md"
      />
    </motion.div>
  );
}

export function LiveCounter() {
  const userCalories = 35000;
  const indiaCalories = 12500000;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 py-12">
      <CounterItem
        label="Your Calories Burned"
        startValue={0}
        endValue={userCalories}
        icon="💪"
        delay={500}
      />
      <CounterItem
        label="India’s Total Calories Burned"
        startValue={0}
        endValue={indiaCalories}
        icon="🇮🇳"
        delay={1000}
      />
      <CounterItem
        label="Your Share of India"
        startValue={0}
        endValue={userCalories}
        icon="🔥"
        delay={1500}
        isCircular
        showPercentOf={indiaCalories}
      />
    </div>
  );
}
