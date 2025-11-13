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
      <h1 className="font-bold text max-w-[500px] text text-[2em] uppercase tracking-wider transition-all text-green-900 text-center">
        I&apos;m a Full-Stack Web Developer passionate about designing intuitive
        front-end interfaces and building robust back-end systems.
      </h1>
    </div>
  );
};

export default About;
