"use client";

import { projects } from "@/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitText from "gsap/SplitText";
import Link from "next/link";
import { useEffect } from "react";
import Lotus from "../shared/Lotus";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Projects = () => {
  useEffect(() => {
    const split = new SplitText("#projects-text", {
      type: "chars",
    });

    // Initial state per character
    gsap.set(split.chars, {
      filter: "blur(10px)",
      scale: 1.5,
      opacity: 0,
      willChange: "filter, opacity, transform",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#projects-title-container",
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: true,
        // markers: true,
      },
    });

    // Blur → clear
    tl.to(split.chars, {
      filter: "blur(0px)",
      scale: 1,
      opacity: 1,
      stagger: 0.04,
      ease: "none",
      duration: 1,
    })

      // Hold
      .to({}, { duration: 0.1 })

      // Clear → blur
      .to(split.chars, {
        filter: "blur(10px)",
        scale: 1.5,
        opacity: 0,
        stagger: 0.04,
        ease: "none",
        duration: 1,
      });

    return () => {
      split.revert();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div id="projects" className="relative min-h-screen bg-white">
      {/* overlay nature animation for the projects */}
      <div id="overlay-items" className="sticky w-screen h-screen top-0 left-0">
        <div className="absolute bottom-0 left-20 flex items-center flex-col">
          <Lotus size="h-[50px] w-[30px]" gradient="bg-gradient-to-b from-[2%] from-green-500/80 via-[40%] via-green-400 to-[70%] to-white/70" />
          {/* <div className="border border-green-500 size-10 rounded-full" /> */}
          <div className="h-40 w-px bg-green-500" />
          <div className="absolute top-1/3 -left-1/2 rotate-10 bg-green-500 w-10 h-5 rounded-tl-full rounded-br-full" />
        </div>
      </div>

      <div id="projects-title-container" className="h-screen flex-center">
        <h1 id="projects-text" className="text-7xl">
          Projects
        </h1>
      </div>

      <div className="relative">
        {projects.map((project, index) => (
          <div key={index} className="h-screen flex-center">
            {project.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
