"use client";

import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";
import Link from "next/link";
import { RiLinkM } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight, FaCode } from "react-icons/fa6";
import Image from "next/image";
import { miniProjects, projects } from "@/constants";
import { AnimatePresence, motion } from "framer-motion";
import { MdNavigateNext } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
            index !== projects.length
              ? value >= 0.5
                ? 1
                : 0
              : Math.round(value),
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
            background: `linear-gradient(to bottom right, transparent, ${projects[index].color}50)`,
            duration: 0.5,
            ease: "power1.out",
          });
        },
        onEnterBack: () => {
          gsap.to(containerRef.current, {
            background: `linear-gradient(to bottom right, transparent, ${projects[index].color}50)`,
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

      gsap.fromTo(
        section.querySelectorAll(".project-sections"),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top center-=200px",
            toggleActions: "play none none reverse",
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

      <div className="projects">
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
                    className="w-1/4 hidden md:flex flex-col justify-between backdrop-blur-md px-3 py-5"
                    style={{
                      background: `linear-gradient(to bottom, transparent, ${project.color}10, ${project.color}50)`,
                    }}
                  >
                    {/* top */}
                    <div className="project-sections flex items-center justify-between text-sm p-2">
                      <p
                        className={`py-1 px-2 rounded-full font-bold ${
                          project.forClient
                            ? "text-white"
                            : `text-[${project.color}]`
                        }`}
                        style={{
                          color: project.forClient ? "white" : project.color,
                          backgroundColor: project.forClient
                            ? project.color
                            : "transparent",
                          border: `1px solid ${
                            project.forClient ? "white" : project.color
                          }`,
                        }}
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

                    {/* middle */}
                    <div className="project-sections flex-center">
                      {project.logo && (
                        <Image
                          src={project.logo}
                          width={100}
                          height={100}
                          alt={project.title}
                          className="w-24 h-24 object-contain"
                        />
                      )}
                    </div>

                    {/* bottom */}
                    <div className="flex flex-col gap-1">
                      <div className="project-sections flex items-center justify-between text-sm">
                        <p className="">{project.role}</p>
                        <div className="flex gap-2">
                          {project.links?.map((link, index) => (
                            <Link
                              key={index}
                              href={link}
                              className="size-8 border-2 border-transparent hover:border-white text-xl hover:bg-white text-white rounded-full flex-center transition-all duration-500"
                              style={{ backgroundColor: project.color }}
                              target="_blank"
                            >
                              {index === 0 ? <RiLinkM /> : <FaCode />}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <p className="project-sections text-xl font-bold text-gray-800">
                        {project.title}
                      </p>
                      <p className="project-sections text-gray-600 text-sm">
                        {project.description}
                      </p>
                      <p
                        className="self-end project-sections font-bold px-3 py-1 rounded-full bg-white text-sm text-right"
                        style={{ color: project.color }}
                      >
                        {project.duration}
                      </p>

                      <ul className="project-sections list-disc space-y-1 text-sm pl-4">
                        {project.features?.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* right section */}
                  <ProjectImageSlider
                    images={project.images ?? []}
                    title={project.title}
                    color={project.color}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="z-30 relative flex h-screen w-screen">
          {miniProjects.map((project, index) => (
            <motion.div
              key={index}
              className="relative flex-1 hover:flex-6 group overflow-hidden transition-all duration-500"
              style={{
                background: `url("${project.image}") no-repeat center center/cover`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="w-lg absolute left-2 bottom-2 p-4 text-white bg-gradient-to-br from-white/5 via-white/30 to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-500 rounded-lg backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-100 to-green-300">
                  {project.title}
                </h2>
                <p className="text-sm text-green-200">{project.description}</p>

                <div className="flex gap-2 mt-2">
                  {project.links?.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link}
                      target="_blank"
                      className="border px-2 py-1 rounded-full text-xs hover:bg-white hover:text-green-500 transition"
                    >
                      {idx === 0 ? "Live" : "Code"}
                    </Link>
                  ))}
                </div>

                <ul className="mt-2 list-disc pl-4 space-y-1">
                  {project.features?.map((feature, idx) => (
                    <li key={idx} className="text-sm">
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="absolute bottom-0 right-0 p-3">
                  <Image
                    src={project.logo}
                    width={50}
                    height={50}
                    alt={project.title}
                    className="w-12 h-12 object-contain"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

const ProjectImageSlider = ({
  images = [],
  title = "Project",
  color,
}: {
  images: string[];
  title?: string;
  color?: string;
}) => {
  const validImages = images.length ? images : ["/assets/default-image.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + validImages.length) % validImages.length
    );
  };

  return (
    <div className="relative flex-1 flex bg-white/70">
      {/* Blurred background image */}
      <motion.div
        key={`blur-${currentIndex}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute flex items-center justify-center w-full h-full overflow-hidden"
      >
        <Image
          src={validImages[currentIndex]}
          width={800}
          height={800}
          alt={title}
          className="w-full h-full object-cover opacity-90 blur-sm"
        />
      </motion.div>

      {/* Foreground image */}
      <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`image-${currentIndex}`}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ duration: 0.4 }}
            className="absolute w-full h-full"
          >
            <Image
              src={validImages[currentIndex]}
              width={1000}
              height={1000}
              alt={title}
              className="w-full h-full object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        {validImages.length > 1 && (
          <div className="w-full absolute flex justify-between p-2">
            <button
              onClick={handlePrev}
              className="text-white not-first:text-md border-2 hover:scale-105 bg-white/10 cursor-pointer rounded-full flex-center transition-all p-2 text-lg"
              style={{ borderColor: color, color }}
            >
              <MdNavigateNext className="rotate-180" />
            </button>
            <button
              onClick={handleNext}
              className="text-white not-first:text-md border-2 hover:scale-105 bg-white/10 cursor-pointer rounded-full flex-center transition-all p-2 text-lg"
              style={{ borderColor: color, color }}
            >
              <MdNavigateNext />
            </button>
          </div>
        )}

        <div className="absolute bottom-2 flex-center gap-2">
          {validImages.map((image, index) => (
            <div
              key={index}
              className={`size-2 rounded-full border-1 cursor-pointer transition-all duration-300 `}
              style={{
                borderColor: color,
                backgroundColor: currentIndex === index ? color : "transparent",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
