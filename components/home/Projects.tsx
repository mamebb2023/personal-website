"use client";

import { projects } from "@/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitText from "gsap/SplitText";
import Link from "next/link";
import { useEffect } from "react";
import Lotus from "../shared/Lotus";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Projects = () => {
  // random positions for images
  const positions = [
    { top: 20, left: 10 },
    { top: 75, left: 15 },
    { top: 10, left: 65 },
    { top: 70, left: 70 },
    { top: 40, left: 80 },
  ]
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

    // Pin distributed images container and create snap scrolling
    ScrollTrigger.create({
      trigger: "#projects-container",
      start: "top top",
      end: "bottom bottom",
      pin: "#distributed-images-container",
      pinSpacing: false,
      // markers: true,
      snap: {
        snapTo: 1 / (projects.length - 1),
        duration: { min: 0.2, max: 0.5 },
        ease: "power3.out",
      },
      scrub: true
    });

    document.querySelectorAll(".distributed-img").forEach((box) => {
      const track = box.querySelector(".distributed-track");

      gsap.to(track, {
        yPercent: -81,
        ease: "none",
        scrollTrigger: {
          trigger: "#projects-container",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });
    });

    return () => {
      split.revert();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div id="projects" className="relative min-h-screen bg-white">
      {/* overlay */}
      <div id="overlay-container" className="absolute top-0 left-0 w-screen h-screen">
        {/* lotus */}
        <div className="absolute bottom-0 left-20 flex items-center flex-col">
          <div id="overlay-lotus">
            <Lotus size="h-[60px] w-[40px]" gradient="bg-gradient-to-b from-emerald-500 via-green-500/40 to-transparent" />
          </div>
          <div id="overlay-line" className="h-40 w-px bg-gradient-to-b from-transparent via-green-500/20 to-green-500" />
          <div id="overlay-leaf" className="absolute top-1/3 -left-1/2 bg-gradient-to-br from-emerald-600 to-green-500 w-10 h-5 rounded-tl-full rounded-br-full" />
        </div>

        {/* top left circles */}
        <div className="circle-box absolute -top-40 -left-40 size-80 flex-center">
          <div className="absolute size-full border border-green-500 rounded-full flex-center overlay-circle" />
          <div className="absolute -bottom-20 left-30 size-[60%] bg-green-500/30 rounded-full backdrop-blur-xs overlay-circle" />
          <div className="absolute size-[80%] bg-gradient-to-tr from-green-500 to-emerald-500 rounded-full overlay-circle" />
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400/20 via-green-500/10 to-transparent rounded-full blur-3xl overlay-circle" />
        <div className="absolute bottom-40 left-60 w-80 h-80 bg-gradient-to-tr from-teal-400/15 via-green-400/10 to-transparent rounded-full blur-3xl overlay-circle" />

        <div className="absolute bottom-0 right-0 overlay-circle">
          <svg width="200" height="300" viewBox="0 0 200 300" className="opacity-40">
            <path
              d="M 10 10 Q 50 80 30 150 T 80 250"
              stroke="url(#vineGradient)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="10" cy="10" r="4" fill="#10b981" opacity="0.6" />
            <circle cx="30" cy="150" r="4" fill="#10b981" opacity="0.6" />
            <circle cx="80" cy="250" r="4" fill="#10b981" opacity="0.6" />
            <defs>
              <linearGradient id="vineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.7" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div id="projects-title-container" className="relative h-screen flex-center">
        <h1 id="projects-text" className="text-7xl uppercase tracking-[15px]">
          Projects
        </h1>
      </div>

      {/* Projects container wrapper for pinning */}
      <div className="relative">
        {/* Pinned distributed images container */}
        <div
          id="distributed-images-container"
          className="absolute top-0 left-0 w-screen h-screen pointer-events-none"
        >
          {positions.map((pos, imgIndex) => (
            <div
              key={imgIndex}
              className="distributed-img border border-green-500 rounded-xl w-[310px] h-[180px] p-2 overflow-hidden"
              style={{
                position: "absolute",
                top: `calc(${pos.top}% - 4px)`,
                left: `calc(${pos.left}% - 8px)`
              }}
            >
              <div className="distributed-track space-y-2">
                {projects.map((project, projectIndex) => (
                  <Image
                    key={projectIndex}
                    src={project.images[imgIndex + 1]}
                    // src={project.images[0]}
                    width={1000}
                    height={1000}
                    alt={`${project.title} image ${imgIndex + 1}`}
                    className="block w-full h-full object-cover rounded-lg shadow-xl"
                    draggable={false}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>


        <div id="projects-container" className="">
          {projects.map((project, index) => (
            <div key={index} id={`project-${index}`} className="relative h-screen flex-center">
              {/* center content */}
              <div className="relative space-y-1">
                {/* title and links */}
                <div className="flex justify-between">
                  <p className="uppercase">{project.title}</p>
                  <div className="flex gap-2 items-center">
                    1 2
                  </div>
                </div>

                <div className="relative flex items-center">
                  <Image
                    src={project.logo}
                    width={1000}
                    height={1000}
                    alt={`${index} ${project.title} image`}
                    className="absolute -bottom-1/4 -right-1/5 w-[130px] opacity-50"
                    draggable={false}
                  />
                  <Image
                    src={project.images[0]}
                    width={1000}
                    height={1000}
                    alt={`${index} ${project.title} image`}
                    className="relative w-[500px] rounded-lg shadow-xl"
                    draggable={false}
                  />
                </div>

                {/* images */}
                <div className="flex justify-between">
                  <p className="">{project.mini_title}</p>

                  <div className="flex gap-2 items-center">

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;

