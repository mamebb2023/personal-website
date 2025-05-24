"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { ScrollParallax } from "react-just-parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

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

  const petalRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const petalVariants = {
    hidden: { opacity: 0, scaleY: 0, rotate: 0 },
    visible: (i: number) => ({
      opacity: petals[i].opacity,
      scaleY: 1,
      rotate: petals[i].angle,
      transition: {
        duration: 1,
        delay: 2,
        ease: [0.33, 1, 0.68, 1],
      },
    }),
  };

  useEffect(() => {
    const interval = setInterval(() => {
      petalRefs.current.forEach((el, i) => {
        if (!el) return;

        const baseAngle = petals[i].angle;
        const flickAngle = 1 + baseAngle + (Math.random() * 6 - 3);

        gsap.to(el, {
          rotate: flickAngle,
          duration: 0.4,
          ease: "power1.inOut",
          delay: i * 0.1,
        });

        gsap.to(el, {
          rotate: baseAngle,
          duration: 0.4,
          ease: "power1.inOut",
          delay: 0.5 + i * 0.1,
        });
      });
    }, 4000);

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        if (self.progress < 0.6) {
          gsap.to(containerRef.current, {
            transform: `translateX(-${self.progress * 70}%)`,
            opacity: 1,
          });
        }
        if (self.progress > 0.5) {
          gsap.to(containerRef.current, {
            opacity: 1 - self.progress,
          });
        }
      },
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[110vh] bg-white">
      {/* Petals container */}
      <div
        ref={containerRef}
        className="absolute h-dvh w-full flex items-center justify-end"
      >
        {petals.map((_, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={petalVariants}
            ref={(el) => {
              petalRefs.current[index] = el;
            }}
            className="bg-green-300 h-[70vh] md:h-[90vh] w-[230px] md:w-[280px] absolute"
            style={{
              clipPath: "ellipse(50% 50% at 50% 50%)",
              transformOrigin: "center bottom",
            }}
          />
        ))}
      </div>

      <div className="z-10 min-h-screen flex items-center px-10">
        <div className="uppercase font-bold">
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Hey, I'm
            </motion.p>
          </div>

          <ScrollParallax isAbsolutelyPositioned strength={0.3}>
            <div className="overflow-hidden absolute top-1/3 right-0">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1,
                  ease: [0.45, 0, 0.55, 1],
                }}
                className="text-6xl md:text-7xl lg:text-9xl"
                style={{
                  WebkitTextStroke: "1px #ABFFBE",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Mohammednur
              </motion.p>
            </div>
          </ScrollParallax>

          <ScrollParallax>
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.6,
                  ease: [0.45, 0, 0.55, 1],
                }}
                className="relative text-6xl md:text-7xl lg:text-9xl"
              >
                Mohammednur
              </motion.p>
            </div>
          </ScrollParallax>

          <ScrollParallax isAbsolutelyPositioned strength={0.4}>
            <div className="overflow-hidden absolute bottom-[37%] -left-20">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1.5,
                  ease: [0.45, 0, 0.55, 1],
                }}
                className="text-6xl md:text-7xl lg:text-9xl"
                style={{
                  WebkitTextStroke: "1px #ABFFBE",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Mohammednur
              </motion.p>
            </div>
          </ScrollParallax>
        </div>
      </div>
    </div>
  );
};

export default Hero;
