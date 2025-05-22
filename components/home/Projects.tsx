"use client";

import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaPython,
  FaGithub,
} from "react-icons/fa";
import { MouseParallax } from "react-just-parallax";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  const projects = [
    {
      color: "#7bf1a8",
      title: "WeMD Africa - Online Dermatology Clinic",
      description: "",
    },
    { color: "#ff0000", title: "Project 2" },
    { color: "#ff8c00", title: "Project 3" },
    { color: "#0000ff", title: "Project 4" },
    { color: "#8c00ff", title: "Project 5" },
  ];

  const icons = [FaReact, FaNodeJs, FaDatabase, FaPython, FaGithub];

  const iconPositions = [
    { x: "1%", y: "1%" },
    { x: "94%", y: "1%" },
    { x: "2%", y: "50%" },
    { x: "1%", y: "90%" },
    { x: "93%", y: "90%" },
  ];

  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLDivElement>(
      ".projects > div.projects > div"
    );

    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        snap: {
          snapTo: (value) =>
            index === 0 ? (value >= 0.5 ? 1 : 0) : Math.round(value),
          duration: { min: 0.2, max: 0.8 },
          ease: "power3.out",
        },
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top center", // When top of section hits center of screen
        end: "bottom center", // When bottom of section hits center again
        onEnter: () => {
          gsap.to(iconRefs.current, {
            color: `${projects[index].color}20`,
            duration: 0.5,
            ease: "power1.out",
          });
        },
        onEnterBack: () => {
          gsap.to(iconRefs.current, {
            color: `${projects[index].color}20`,
            duration: 0.5,
            ease: "power1.out",
          });
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

      gsap.fromTo(
        section,
        { opacity: 1, scale: 1 },
        {
          opacity: 0,
          scale: 0.9,
          ease: "power1.out",
          scrollTrigger: {
            trigger: section,
            start: "center center",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <div
        id="projects"
        className="p-5 md:py-7 md:px-14 flex gap-5 items-center"
      >
        <h1 className="text-3xl text-gray-600">Projects</h1>
        <div className="flex-1 border-t border-gray-200" />
      </div>

      <div className="projects relative">
        {/* background animated icons */}
        <div className="sticky top-0 left-0">
          <div className="absolute h-screen w-full overflow-hidden">
            {icons.map((Icons, index) => (
              <div
                key={index}
                ref={(el) => {
                  iconRefs.current[index] = el;
                }}
                className="absolute text-7xl text-transparent"
                style={{
                  top: `${iconPositions[index].y}`,
                  left: `${iconPositions[index].x}`,
                }}
              >
                {/* <MouseParallax> */}
                <Icons />
                {/* </MouseParallax> */}
              </div>
            ))}
          </div>
        </div>

        <div ref={containerRef} className="projects relative z-10">
          {projects.map((project, index) => {
            return (
              <div
                key={index}
                className="relative h-dvh flex items-center justify-center"
              >
                <div
                  className={`flex w-[90%] h-[90%] rounded-2xl shadow-lg overflow-hidden border-2`}
                  style={{ borderColor: project.color }}
                >
                  <div
                    className="w-1/4 hidden md:flex backdrop-blur-md"
                    style={{ background: `${project.color}09` }}
                  ></div>
                  <div className="flex-1 flex bg-white/50 backdrop-blur-2xl"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Projects;
