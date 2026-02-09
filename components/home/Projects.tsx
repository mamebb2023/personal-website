"use client";

import { projects } from "@/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  useEffect(() => {
    const split = new SplitText(".projects-text", {
      type: "chars",
    });

    gsap.set(".projects-text", {
      filter: "blur(10px)",
      scale: "1.5",
      opacity: 0,
      willChange: "filter, opacity",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".projects-title-container",
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: true,
        markers: true,
      },
    });


    tl.to(".projects-text", {
      filter: "blur(0px)",
      scale: "1",
      opacity: 1,
      duration: 1,
      ease: "none",
    })


      .to({}, { duration: 0.7 })


      .to(".projects-text", {
        filter: "blur(10px)",
        scale: "1.5",
        opacity: 0,
        duration: 1,
        ease: "none",
      });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div id="projects" className="min-h-screen bg-white">
      <div className="projects-title-container h-screen flex-center">
        <h1 className="projects-text text-7xl">
          Projects
        </h1>
      </div>

      {projects.map((project, index) => (
        <div key={index} className="h-screen flex-center">
          {project.title}
        </div>
      ))}
    </div>
  );
};

export default Projects;
