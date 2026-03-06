"use client";

import { projects } from "@/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitText from "gsap/SplitText";
import Link from "next/link";
import { useEffect } from "react";
import Lotus from "../shared/Lotus";
import Image from "next/image";
import { BiCode } from "react-icons/bi";
import { FaExternalLinkAlt } from "react-icons/fa";

gsap.registerPlugin(SplitText);

const Projects = () => {
  // random positions for images
  const positions = [
    { top: 20, left: 10 },
    { top: 75, left: 20 },
    { top: 5, left: 65 },
    { top: 70, left: 70 },
    { top: 40, left: 75 },
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
    <div id="projects" className="relative">
      <div id="projects-title-container" className="relative h-screen flex-center">
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
                  {/* links */}
                  <div className="flex gap-2 items-center">
                    {project.links.code && (
                      <Link href={project.links.code} target="_blank" className="size-7 border border-green-500 rounded-lg text-green-500 flex-center cursor-pointer hover:bg-green-500 hover:text-white transition-all">
                        <BiCode size={12} />
                      </Link>
                    )}
                    {project.links.live && (
                      <Link href={project.links.live} target="_blank" className="size-7 border border-green-500 rounded-lg text-green-500 flex-center cursor-pointer hover:bg-green-500 hover:text-white transition-all">
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

