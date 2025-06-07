"use client";

import gsap from "gsap";
import React, { useEffect } from "react";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/all";
import {
  FaDatabase,
  FaGithub,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { MouseParallax } from "react-just-parallax";
import { RiNextjsFill } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const icons = [
    FaReact,
    FaNodeJs,
    FaDatabase,
    FaPython,
    FaGithub,
    RiNextjsFill,
  ];
  const iconPositions = [
    { x: "25%", y: "15%" },
    { x: "20%", y: "50%" },
    { x: "30%", y: "80%" },
    { x: "65%", y: "20%" },
    { x: "70%", y: "60%" },
    { x: "60%", y: "80%" },
  ];
  const iconRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const split = new SplitType(".text", {
      types: "words,chars",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top top",
        end: "bottom+=1000 bottom",
        scrub: 0,
        pin: true,
      },
    });

    // Animate icons
    iconRefs.current.forEach((icon, i) => {
      if (!icon) return;

      if (i === 0) {
        // React icon rotates
        gsap.to(icon, {
          rotate: 360,
          duration: 20,
          repeat: -1,
          ease: "linear",
        });
      } else {
        // Other icons float up and down
        gsap.to(icon, {
          y: -10,
          duration: 2 + i, // vary slightly for a natural feel
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    tl.to(split.chars, {
      duration: 1.5,
      color: "white",
      stagger: 0.5,
    });
  }, []);

  return (
    <div id="about" className="relative min-h-screen flex-center">
      <div className="absolute h-screen w-full overflow-hidden">
        {icons.map((Icons, index) => (
          <div
            key={index}
            className="absolute text-7xl text-green-400"
            ref={(el) => {
              iconRefs.current[index] = el;
            }}
            style={{
              top: `${iconPositions[index].y}`,
              left: `${iconPositions[index].x}`,
            }}
          >
            <MouseParallax strength={index % 2 === 0 ? 0.1 : -0.1}>
              <Icons />
            </MouseParallax>
          </div>
        ))}
      </div>
      <h1 className="font-bold text max-w-[500px] text text-[2em] uppercase tracking-wider transition-all text-green-500/10 text-center">
        I&apos;m a Full-Stack Web Developer passionate about designing intuitive
        front-end interfaces and building robust back-end systems.
      </h1>
    </div>
  );
};

export default About;
