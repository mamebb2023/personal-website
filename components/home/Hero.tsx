"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { ScrollParallax } from "react-just-parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lotus from "../shared/Lotus";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  return (
    <div className="relative h-[110vh] bg-white">
      <div className="min-h-screen flex items-center px-5 md:px-7 lg:px-10">
        <div className="uppercase font-bold">
          <div className="z-10 overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Hello! I'm
            </motion.p>
          </div>

          <ScrollParallax isAbsolutelyPositioned strength={0.3}>
            <div className="overflow-hidden absolute top-1/3 right-0">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.3,
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
                  duration: 1,
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
                  duration: 1,
                  delay: 1.1,
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

        <Lotus gradient="bg-gradient-to-b from-green-500 to-green-200/50" />
      </div>
    </div>
  );
};

export default Hero;
