"use client";

import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import Link from "next/link";
import { RiLinkM } from "react-icons/ri";
import { FaCode } from "react-icons/fa";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      color: "#7bf1a8",
      title: "WeMD Africa - Online Dermatology Clinic",
      description: "Connecting patients with dermatologists across Africa.",
      role: "Front-end Developer",
      links: [
        "https://wemd-africa.netlify.app/",
        "https://github.com/mamebb2023/wemd-africa",
      ],
      duration: "Nov 2024 - Dec 2024",
      features: [
        "Light/Dark Theme",
        "Fully Responsive",
        "Localization (English ad Amharic)",
        "Doctor Consultation Stepped Form",
        "Chat Page",
        "Animations ...",
      ],
      images: ["/assets/wemd/wemd-1.jpg"],
      bestProject: true,
      forClient: true,
    },
    { color: "#ff0000", title: "Project 2" },
    { color: "#ff8c00", title: "Project 3" },
    { color: "#0000ff", title: "Project 4" },
    { color: "#8c00ff", title: "Project 5" },
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
          gsap.to(containerRef.current, {
            backgroundColor: `${projects[index].color}20`,
            duration: 0.5,
            ease: "power1.out",
          });
        },
        onEnterBack: () => {
          gsap.to(containerRef.current, {
            backgroundColor: `${projects[index].color}20`,
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
      <div
        id="projects"
        className="p-5 md:py-7 md:px-14 flex gap-5 items-center"
      >
        <h1 className="text-3xl text-gray-600">Projects</h1>
        <div className="flex-1 border-t border-gray-200" />
      </div>

      <div className="projects relative">
        <div ref={containerRef} className="projects relative z-10">
          {projects.map((project, index) => {
            return (
              <div
                key={index}
                className="relative h-dvh flex items-center justify-center "
              >
                <div
                  className={`flex w-[90%] h-[90%] rounded-2xl shadow-lg overflow-hidden borde r-2`}
                  style={{ borderColor: project.color }}
                >
                  {/* left section */}
                  <div
                    className="w-1/4 hidden md:flex flex-col justify-between backdrop-blur-md p-3"
                    style={{ background: `${project.color}15` }}
                  >
                    <div className="flex items-center justify-between text-sm p-3">
                      <p
                        className="py-1 px-2 rounded-full font-bold text-white"
                        style={{ backgroundColor: project.color }}
                      >
                        {project.forClient ? "Client" : "Personal"}
                      </p>
                      <div className="flex gap-2">
                        {project.bestProject && (
                          <span className="text-yellow-900 py-1 px-2 rounded-full bg-gradient-to-br from-yellow-500 via-yellow-200 to-yellow-500 font-bold">
                            Best Project
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-sm">
                        <p className="">{project.role}</p>
                        <div className="flex gap-2">
                          {project.links?.map((link, index) => (
                            <Link
                              key={index}
                              href={link}
                              className="size-8 border-1 text-xl hover:bg-white text-white rounded-full flex-center"
                              style={{ backgroundColor: project.color }}
                              target="_blank"
                            >
                              {index === 0 ? <RiLinkM /> : <FaCode />}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <p className="text-xl font-bold text-gray-800">
                        {project.title}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {project.description}
                      </p>
                      <p className="text-green-800 text-sm text-right">
                        {project.duration}
                      </p>

                      <ul className="list-disc space-y-1 text-sm pl-4">
                        {project.features?.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* right section */}
                  <div className="relative flex-1 flex bg-white/70">
                    <div className="absolute flex items-center justify-center w-full h-full overflow-hidden">
                      <Image
                        src={project.images?.[0] || "/assets/default-image.jpg"}
                        width={800}
                        height={800}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-40 blur-sm"
                      />
                    </div>

                    <div className="relative flex items-center justify-center w-full h-full">
                      <Image
                        src={project.images?.[0] || "/assets/default-image.jpg"}
                        width={1000}
                        height={1000}
                        alt={project.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
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
