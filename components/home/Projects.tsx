"use client";

import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      color: "#FFF2F2",
      title: "Project 1",
    },
    {
      color: "#F2FFF2",
      title: "Project 2",
    },
    {
      color: "#FFF2E2",
      title: "Project 3",
    },
    {
      color: "#F2F2FF",
      title: "Project 4",
    },
    {
      color: "#FFF2FF",
      title: "Project 5",
    },
  ];

  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLDivElement>("#projects > div");

    sections.forEach((section, index) => {
      // Custom snapping function
      const snapFunc = (value: number) => {
        // For first section, snap at 50% (center of screen)
        if (index === 0) {
          return value >= 0.5 ? 1 : 0;
        }
        // For other sections, snap at top of screen
        return Math.round(value);
      };

      // Color change trigger when section passes 50% of screen
      ScrollTrigger.create({
        trigger: section,
        start: "center center",
        end: "bottom top",
        onEnter: (self) => {
          if (self.isActive && containerRef.current) {
            containerRef.current.style.backgroundColor = projects[index].color;
          }
        },
        onEnterBack: (self) => {
          if (self.isActive && containerRef.current) {
            containerRef.current.style.backgroundColor = projects[index].color;
          }
        },
      });

      // Pin section
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        snap: {
          snapTo: snapFunc,
          duration: { min: 0.2, max: 0.8 },
          ease: "power3.out",
        },
      });

      // Animate on leave
      gsap.fromTo(
        section,
        {
          opacity: 1,
          scale: 1,
        },
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
    <div
      id="projects"
      ref={containerRef}
      className="transition-colors duration-500"
    >
      {projects.map((project, index) => (
        <div key={index} className="h-dvh flex items-center justify-center">
          <div className="bg-white w-[90%] h-[90%] rounded-2xl shadow-lg p-4">
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <p className="text-gray-700 mt-2">
              Description of {project.title}.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
