"use client";

import { projects } from "@/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitText from "gsap/SplitText";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Lotus from "../shared/Lotus";
import Image from "next/image";
import { BiCode } from "react-icons/bi";
import { FaExternalLinkAlt } from "react-icons/fa";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Projects = () => {
  const projectsRef = useRef(null);
  const titleRef = useRef(null);
  const splitRef = useRef<any>(null);

  // random positions for images
  const positions = [
    { top: 5, left: 65 },
    { top: 40, left: 75 },
    { top: 70, left: 70 },
    { top: 20, left: 10 },
    { top: 75, left: 20 },
  ];

  useEffect(() => {
    // Split text animation
    const split = new SplitText("#projects-text", {
      type: "chars",
    });
    splitRef.current = split;

    gsap.set(split.chars, {
      filter: "blur(10px)",
      scale: 1.5,
      opacity: 0,
      willChange: "filter, opacity, transform",
      force3D: true,
    });

    // Title animation with optimized settings
    gsap.timeline({
      scrollTrigger: {
        trigger: "#projects-title-container",
        start: "top top",
        end: "bottom center",
        pin: true,
        scrub: 1, // Add slight smoothing (0.5-2 recommended)
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    }).to(split.chars, {
      filter: "blur(0px)",
      scale: 1,
      opacity: 1,
      stagger: 0.05,
      ease: "none",
      duration: 0.5,
      force3D: true,
    });

    // Pin distributed images container with smoother scrub
    ScrollTrigger.create({
      trigger: "#projects-container",
      start: "top top",
      end: "bottom bottom",
      pin: "#distributed-images-container",
      pinSpacing: false,
      anticipatePin: 1,
      snap: {
        snapTo: 1 / (projects.length - 1),
        duration: { min: 0.2, max: 0.5 },
        ease: "power1.inOut", // Changed to smoother easing
        delay: 0.1,
      },
      scrub: 1, // Increased from true for smoother scrolling
      invalidateOnRefresh: true,
    });

    // Optimize distributed images animation
    const distributedImages = document.querySelectorAll(".distributed-img");

    distributedImages.forEach((box) => {
      const track = box.querySelector(".distributed-track");

      if (track) {
        // Set initial transform for better performance
        gsap.set(track, {
          force3D: true,
          willChange: "transform",
        });

        gsap.to(track, {
          yPercent: -81,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: "#projects-container",
            start: "top top",
            end: "bottom bottom",
            scrub: 1, // Increased from true for smoother scrolling
            invalidateOnRefresh: true,
          },
        });
      }
    });

    // Cleanup function
    return () => {
      if (splitRef.current) {
        splitRef.current.revert();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div id="projects" className="relative" ref={projectsRef}>
      <div
        id="projects-title-container"
        className="relative h-screen flex-center"
        ref={titleRef}
      >
        <div className="flex-center flex-col">
          <div
            id="quote-mark"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-bold leading-none text-green-500/5 select-none pointer-events-none"
            aria-hidden="true"
          >
            ;
          </div>
          <p className="text-green-500/60 uppercase tracking-[8px] text-sm font-medium">
            Selected
          </p>
          <h1 id="projects-text" className="text-7xl uppercase tracking-[15px]">
            Projects
          </h1>
        </div>
      </div>

      {/* Projects container wrapper for pinning */}
      <div className="relative">
        {/* Pinned distributed images container */}
        <div
          id="distributed-images-container"
          className="absolute top-0 left-0 w-screen h-screen pointer-events-none"
          style={{ willChange: "transform" }}
        >
          {positions.map((pos, imgIndex) => (
            <div
              key={imgIndex}
              className="distributed-img border border-green-500 rounded-xl w-[310px] h-[180px] p-2 overflow-hidden"
              style={{
                position: "absolute",
                top: `calc(${pos.top}% - 4px)`,
                left: `calc(${pos.left}% - 8px)`,
                willChange: "transform",
              }}
            >
              <div className="distributed-track space-y-2">
                {projects.map((project, projectIndex) => (
                  <Image
                    key={projectIndex}
                    src={project.images[imgIndex + 1]}
                    width={1000}
                    height={1000}
                    alt={`${project.title} image ${imgIndex + 1}`}
                    className="block w-full h-full object-cover rounded-lg shadow-xl"
                    draggable={false}
                    priority={projectIndex === 0}
                    loading={projectIndex === 0 ? "eager" : "lazy"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div id="projects-container" className="">
          {projects.map((project, index) => (
            <div
              key={index}
              id={`project-${index}`}
              className="relative h-screen flex-center"
            >
              {/* center content */}
              <div className="relative space-y-1">
                {/* title and links */}
                <div className="flex justify-between">
                  <p className="uppercase">{project.title}</p>
                  {/* links */}
                  <div className="flex gap-2 items-center">
                    {project.links.code && (
                      <Link
                        href={project.links.code}
                        target="_blank"
                        className="size-7 border border-green-500 rounded-lg text-green-500 flex-center cursor-pointer hover:bg-green-500 hover:text-white transition-all"
                      >
                        <BiCode size={12} />
                      </Link>
                    )}
                    {project.links.live && (
                      <Link
                        href={project.links.live}
                        target="_blank"
                        className="size-7 border border-green-500 rounded-lg text-green-500 flex-center cursor-pointer hover:bg-green-500 hover:text-white transition-all"
                      >
                        <FaExternalLinkAlt size={12} />
                      </Link>
                    )}
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
                    loading="lazy"
                  />
                  <Image
                    src={project.images[0]}
                    width={1000}
                    height={1000}
                    alt={`${index} ${project.title} image`}
                    className="relative w-[500px] rounded-lg shadow-xl"
                    draggable={false}
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>

                {/* images */}
                <div className="flex justify-between">
                  <p className="">{project.mini_title}</p>
                  <div className="flex gap-2 items-center" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="py-20 flex-center">
          <Link
            href="/projects"
            className="text-green-500 uppercase tracking-[8px] text-sm font-medium hover:underline"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Projects;