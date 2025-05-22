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

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  const projects = [
    { color: "#00ff00", title: "Project 1" },
    { color: "#ff0000", title: "Project 2" },
    { color: "#ff8c00", title: "Project 3" },
    { color: "#0000ff", title: "Project 4" },
    { color: "#8c00ff", title: "Project 5" },
  ];

  const icons = [FaReact, FaNodeJs, FaDatabase, FaPython, FaGithub];

  const iconPositions = [
    { x: "5%", y: "5%" },
    { x: "50%", y: "5%" },
    { x: "80%", y: "10%" },
    { x: "50%", y: "50%" },
    { x: "90%", y: "90%" },
  ];

  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLDivElement>(
      "#projects > div.projects > div"
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
            color: `${projects[index].color}10`,
            duration: 0.5,
            ease: "power1.out",
          });
        },
        onEnterBack: () => {
          gsap.to(iconRefs.current, {
            color: `${projects[index].color}10`,
            duration: 0.5,
            ease: "power1.out",
          });
        },
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
      <div className="p-5 md:py-7 md:px-14 flex gap-5 items-center">
        <h1 className="text-3xl text-gray-600">Projects</h1>
        <div className="flex-1 border-t border-gray-200" />
      </div>

      <div id="projects" className="relative">
        {/* background animated icons */}
        <div className="sticky top-0 left-0">
          <div className="absolute flex gap-2">
            {icons.map((Icons, index) => (
              <div
                key={index}
                ref={(el) => {
                  iconRefs.current[index] = el;
                }}
                className="absolute text-9xl text-transparent"
                style={{
                  top: `${iconPositions[index].y}`,
                  left: `${iconPositions[index].x}`,
                }}
              >
                <Icons />
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
                    style={{ background: `${project.color}10` }}
                  ></div>
                  <div className="flex-1 flex bg-white"></div>
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
