"use client";

import { motion } from "framer-motion";
import React, { useRef } from "react";
import { ScrollParallax } from "react-just-parallax";
import AnimatedTitle from "../AnimatedTitle";

const Hero = () => {
  const petalCount = 7;
  const centerIndex = Math.floor(petalCount / 2);
  const angleSpread = 150;
  const startAngle = -angleSpread / 2;
  const petals = Array.from({ length: petalCount }, (_, i) => {
    const angle = startAngle + (i * angleSpread) / (petalCount - 1);
    const distanceFromCenter = Math.abs(i - centerIndex);
    const opacity = 0.8 - distanceFromCenter * 0.2;

    return { angle, opacity };
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation variants for petals
  const petalVariants = {
    hidden: { opacity: 0, scaleY: 0, rotate: 0 },
    visible: (i: number) => ({
      opacity: petals[i].opacity,
      scaleY: 1,
      rotate: petals[i].angle,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="relative bg-white mb-10 md:mb-20">
      {/* Petals container */}
      <div
        ref={containerRef}
        className="absolute min-h-screen w-full flex items-center justify-center"
      >
        {petals.map((_, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={petalVariants}
            className="bg-green-300 h-[70vh] md:h-[90vh] w-[280px] md:w-[280px] absolute"
            style={{
              clipPath: "ellipse(50% 50% at 50% 50%)",
              transformOrigin: "center bottom",
            }}
          />
        ))}
      </div>

      <div className="z-10 min-h-screen flex-center">
        <ScrollParallax>
          <h1 className="uppercase text-9xl font-bold text-center">
            <AnimatedTitle title="Hey, I'm <br /> Mohammednur" />
          </h1>
        </ScrollParallax>
      </div>
    </div>
  );
};

export default Hero;
