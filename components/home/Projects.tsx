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

    gsap.set(split.chars, {
      filter: "blur(10px)",
      scale: 1.5,
      opacity: 0,
      willChange: "filter, opacity, transform",
    });

    gsap.set("#overlay-lotus", {
      opacity: 0,
    });

    gsap.set("#overlay-line", {
      clipPath: "inset(100% 0% 0% 0%)",
    });

    gsap.set("#overlay-leaf", {
      opacity: 0,
      rotation: -10,
    });

    gsap.set(".overlay-circle", {
      scale: 0,
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: "#projects-title-container",
        start: "top top",
        end: "bottom center",
        pin: true,
        scrub: true,
      },
    })
      .to(split.chars, {
        filter: "blur(0px)",
        scale: 1,
        opacity: 1,
        stagger: 0.05,
        ease: "none",
        duration: 0.5,
      })

    ScrollTrigger.create({
      trigger: "#projects",
      start: "top top",
      end: "bottom bottom",
      pin: "#overlay-container",
      pinSpacing: false,
    });

    // nature components animation
    gsap.timeline({
      scrollTrigger: {
        trigger: "#projects",
        start: "top center",
        end: "+=100%",
        toggleActions: "play none none reverse",
      },
    })
      .to("#overlay-line", {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.5,
        delay: 0.1,
        ease: "power2.inOut",
      })
      .to("#overlay-lotus", {
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
      }, "-=0.2")
      .to("#overlay-leaf", {
        opacity: 1,
        rotation: 10,
        duration: 1,
        delay: 0.387,
        ease: "power2.out",
      }, "-=0.4")
      .to(".overlay-circle", {
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        delay: -1,
        ease: "back.out(1.7)",
      }, "-=0.5");

    // Ongoing leaf rotation animation
    gsap.set("#overlay-leaf", {
      transformOrigin: "left bottom",
    });

    gsap.to("#overlay-leaf", {
      rotation: 20,
      duration: 2.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    gsap.to(".circle-box", {
      rotation: -45,
      duration: 15,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    })

    return () => {
      split.revert();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div id="projects" className="relative min-h-screen bg-white">
      {/* nature overlay */}
      <div id="overlay-container" className="absolute top-0 left-0 w-screen h-screen">
        {/* lotus */}
        <div className="absolute bottom-0 left-20 flex items-center flex-col">
          <div id="overlay-lotus">
            <Lotus size="h-[50px] w-[30px]" gradient="bg-gradient-to-b from-green-500 to-transparent" />
          </div>
          <div id="overlay-line" className="h-40 w-px bg-gradient-to-b from-transparent via-green-500/50 to-green-500" />
          <div id="overlay-leaf" className="absolute top-1/3 -left-1/2 bg-green-500 w-10 h-5 rounded-tl-full rounded-br-full" />
        </div>


        <div className="circle-box absolute -top-40 -left-40 size-80 rotate-">
          <div className="overlay-circle size-full border border-green-500 rounded-full flex-center">
            <div className="overlay-circle size-[80%] bg-green-500 rounded-full" />
            <div className="overlay-circle absolute -bottom-20 left-30 size-[60%] bg-green-500/30 rounded-full" />
          </div>
        </div>
      </div>

      <div id="projects-title-container" className="relative h-screen flex-center">
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
