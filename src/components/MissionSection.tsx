import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export function MissionSection() {
  const navigate = useNavigate();

  // Track scroll for parallax
  const { scrollY } = useScroll();
  const streak1Y = useTransform(scrollY, [0, 800], [0, -150]); // streak parallax
  const streak2Y = useTransform(scrollY, [0, 800], [0, -80]);
  const particleY = useTransform(scrollY, [0, 800], [0, -100]);

  const pillars = [
    {
      title: "Challenge the Status Quo",
      subtitle: "Fun > Fear",
      description:
        "We reject the fitness industry's toxic culture of shame and fear. Every challenge is designed to spark joy, not anxiety.",
      icon: "🚀",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Empower Experts",
      subtitle: "Visibility & Scale",
      description:
        "We give our 3,000+ certified coaches the platform and tools they need to reach more people and change more lives.",
      icon: "👥",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Fuel Transformation",
      subtitle: "Real Results",
      description:
        "Every feature, every challenge, every interaction is designed to create lasting, measurable change in people's lives.",
      icon: "⚡",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Spark Movements",
      subtitle: "Scale Impact",
      description:
        "From one person to one team to one city. We're building a movement that spreads health and happiness everywhere.",
      icon: "🌍",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background animation */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Moving streaks with parallax */}
        <motion.div
          style={{ y: streak1Y }}
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 w-96 h-0.5 bg-gradient-to-r from-transparent via-green-500/70 to-transparent"
        />
        <motion.div
          style={{ y: streak2Y }}
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/3 w-72 h-0.5 bg-gradient-to-r from-transparent via-orange-500/70 to-transparent"
        />

        {/* Floating particles with parallax */}
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
            }}
            style={{ y: particleY }}
            animate={{
              y: ["0%", "100%"],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            className={`absolute w-1 h-1 rounded-full ${
              Math.random() > 0.5 ? "bg-green-400" : "bg-orange-400"
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
            <span className="block text-gray-400 text-3xl md:text-4xl mb-4">
              Zeefit is not about
            </span>
            <span className="line-through text-gray-500">
              calories, weight, or numbers.
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-200 max-w-3xl mx-auto">
            It’s about proving that{" "}
            <span className="zeefit-gradient-text">change is real</span> — when
            we do it <strong>together</strong>.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 mb-24">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="h-full"
            >
              <Card className="h-full p-6 lg:p-8 bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300 hover:bg-white/10">
                <div className="flex flex-col items-start h-full">
                  <div
                    className={`w-16 h-16 mb-6 flex items-center justify-center rounded-xl text-2xl text-white shadow-lg bg-gradient-to-r ${pillar.gradient} hover:scale-110 transition-transform duration-300`}
                  >
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-orange-400 text-sm font-medium mb-4">
                    {pillar.subtitle}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed flex-grow">
                    {pillar.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="relative w-72 h-72 mx-auto mb-10">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/20 to-orange-500/20 border border-white/10" />
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const r = 120;
              const cx = 144;
              const cy = 144;
              const x = Math.cos(angle) * r + cx;
              const y = Math.sin(angle) * r + cy;
              return (
                <motion.div
                  key={i}
                  style={{ left: x, top: y }}
                  className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-orange-400 shadow-md -translate-x-1/2 -translate-y-1/2"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              );
            })}
          </div>
          <p className="text-lg text-gray-400">
            From one college, one office, one city — to the world.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl text-white font-bold mb-4">
            Every challenge starts with{" "}
            <span className="zeefit-gradient-text">one step</span>.
          </h2>
          <p className="text-xl text-gray-400 mb-8">Are you in?</p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={() => navigate("/login")}
              className="px-10 py-5 text-lg rounded-full bg-gradient-to-r from-green-500 to-orange-500 text-white shadow-lg hover:shadow-green-500/30 transition-all"
            >
              <motion.span
                animate={{
                  opacity: [1, 0.7, 1],
                  scale: [1, 1.05, 1],
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
