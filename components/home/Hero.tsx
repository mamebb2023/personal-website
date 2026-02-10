"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { ScrollParallax } from "react-just-parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lotus from "../shared/Lotus";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {

  useEffect(() => {
    gsap.to("#lotus", {
      right: "50%",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    })

    const text = SplitType.create(".text", {
      types: "chars,words",
    })

    gsap.to(text.chars, {
      color: "white",
      stagger: 0.2,
      duration: 1.5,
      scrollTrigger: {
        trigger: "#about",
        start: "top top",
        end: "bottom+=1500 bottom",
        scrub: 0,
        pin: true,
      },
    })

    gsap.to(".circle-anim", {
      height: "100vh",
      width: "100vw",
      scrollTrigger: {
        trigger: "#about",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: true
      },
    })
  }, [])
  return (
    <div id="hero" className="relative">
      <div id="lotus" className="hidden md:block fixed -z-1 right-0 top-1/2">
        <Lotus dispayDelay={2} gradient="bg-gradient-to-b from-green-400 to-green-200/10" />
      </div>

      <div className="md:hidden absolute -z-1 right-0 top-1/4">
        <Lotus dispayDelay={2} gradient="bg-gradient-to-b from-green-400 to-green-200/10" />
      </div>

      <div className="h-screen p-6 flex flex-col gap-1 justify-center">
        <div className="relative">
          <Reveal text="Hello! I'm" className="font-bold uppercase" />

          <ScrollParallax isAbsolutelyPositioned strength={0.2}>
            <div className="absolute -top-1/3 -right-1/4">
              <Reveal
                text="Mohammednur"
                plusDelay={1.2}
                stagger={0.04}
                className="font-bold uppercase text-5xl md:text-7xl lg:text-9xl"
                style={{
                  WebkitTextStroke: "1px #ABFFBE",
                  WebkitTextFillColor: "transparent",
                }}
              />
            </div>
          </ScrollParallax>

          <Reveal
            text="Mohammednur"
            plusDelay={1}
            stagger={0.04}
            className="relative font-bold uppercase text-5xl md:text-7xl lg:text-9xl"
          />

          <ScrollParallax isAbsolutelyPositioned strength={0.04}>
            <div className="absolute -bottom-1/2 -left-1/4 text-stroke">
              <Reveal
                text="Mohammednur"
                plusDelay={1.2}
                stagger={0.05}
                className="font-bold uppercase text-5xl md:text-7xl lg:text-9xl"
                style={{
                  WebkitTextStroke: "1px #ABFFBE",
                  WebkitTextFillColor: "transparent",
                }}
              />
            </div>
          </ScrollParallax>
        </div>


      </div>

      <div id="about" className="hidden md:flex justify-center items-center h-screen px-6">
        <h1 className="text font-bold max-w-[500px] text-4xl uppercase tracking-wider transition-all text-gray-500/10 text-center">
          I&apos;m a Full-Stack Web Developer passionate about designing intuitive
          front-end interfaces and building robust back-end systems.
        </h1>
      </div>

      <div className="md:hidden flex justify-center items-center h-screen px-6">
        <h1 className="font-bold max-w-[500px] text-3xl uppercase tracking-wider transition-all text-green-950 text-center">
          I&apos;m a Full-Stack Web Developer passionate about designing intuitive
          front-end interfaces and building robust back-end systems.
        </h1>
      </div>

      <div className="hidden md:block circle-anim h-[50vh] bg-gradient-to-b from-transparent via-whtie to-white" />
    </div>
  );
};

const Reveal = ({
  className,
  text,
  plusDelay = 0,
  stagger = 0,
  style,
}: { className: string; text: string; plusDelay?: number; stagger?: number, style?: React.CSSProperties }) => {
  return (
    <div className="z-10 overflow-hidden">
      {Array.from(text).map((c, index) => (
        <motion.span
          key={index}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{
            duration: 1,
            delay: plusDelay + (stagger * index),
            ease: [0.85, 0.09, 0.15, 0.91]
          }}
          className={`${className} inline-block`}
          style={style}
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </div>
  );
};

export default Hero;