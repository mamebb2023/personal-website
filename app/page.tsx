"use client"

import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Projects";
import Testimonials from "@/components/home/Testimonials";
import React, { useEffect } from "react";
import { motion } from "framer-motion"
import Lotus from "@/components/shared/Lotus";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Footer from "@/components/home/Footer";
import Reveal from "@/components/shared/Reveal";
import { ScrollParallax } from "react-just-parallax";
import { projects } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { BiCode } from "react-icons/bi";
import { FaExternalLinkAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  useEffect(() => {

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

    ScrollTrigger.create({
      trigger: "#overlay-container-box",
      start: "top top",
      end: "bottom bottom",
      pin: "#overlay-container",
      pinSpacing: false,
    });

    // nature components animation
    gsap.timeline({
      scrollTrigger: {
        trigger: "#overlay-container-box",
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
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hidden md:block"
      >
        <Header />
        <Hero />
        <div id="overlay-container-box" className="relative bg-white">
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
          <Projects />
          <Testimonials />
        </div>
        <div className="h-[50vh] bg-white" />
        <Footer />
      </motion.div>

      <div className="md:hidden">
        <Header />

        {/* Hero */}
        <div id="hero" className="relative">
          <Lotus isStatic />

          <div className="h-screen p-6 flex flex-col gap-1 justify-center">
            <div className="relative">
              <Reveal text="Hello! I'm" className="font-bold uppercase" />

              <ScrollParallax isAbsolutelyPositioned strength={0.2}>
                <div className="absolute -top-1/3 -right-1/4">
                  <Reveal
                    text="Mohammednur"
                    plusDelay={1.2}
                    stagger={0.04}
                    className="font-bold uppercase text-6xl md:text-7xl lg:text-9xl"
                    style={{
                      WebkitTextStroke: "1px #ABFFBE",
                      WebkitTextFillColor: "transparent",
                    }}
                  />
                </div>
              </ScrollParallax>

              <Reveal
                text="Mohammednur"
                plusDelay={1}
                stagger={0.04}
                className="relative font-bold uppercase text-5xl md:text-7xl lg:text-9xl"
              />

              <ScrollParallax isAbsolutelyPositioned strength={0.04}>
                <div className="absolute -bottom-1/2 -left-1/4 text-stroke">
                  <Reveal
                    text="Mohammednur"
                    plusDelay={1.2}
                    stagger={0.05}
                    className="font-bold uppercase text-6xl md:text-7xl lg:text-9xl"
                    style={{
                      WebkitTextStroke: "1px #ABFFBE",
                      WebkitTextFillColor: "transparent",
                    }}
                  />
                </div>
              </ScrollParallax>
            </div>
          </div>

          <div id="about" className="flex justify-center items-center h-screen px-6 relative">
            <ScrollParallax isAbsolutelyPositioned>
              <div className="absolute top-1/4 left-1/5 size-20 rounded-full bg-green-500/10 rotate-45">
                <div className="absolute -inset-2 border-l border-green-500 rounded-full"></div>
              </div>
            </ScrollParallax>
            <motion.h1
              initial={{ opacity: 20 }}
              whileInView={{ opacity: 100 }}
              viewport={{ margin: '-15px' }}
              className="text-2xl font-bold max-w-[500px] uppercase tracking-wider transition-all text-green-500/70 text-center"
            >
              I&apos;m a Web Engineer passionate about developing intuitive
              front-end interfaces and building robust back-end systems.
            </motion.h1>
          </div>
        </div>

        {/* Projects */}
        <div id="projects" className="relative min-h-screen">
          <div className="flex-center flex-col">
            <div
              className="text-[20vw] font-bold leading-none text-green-500/50 select-none pointer-events-none"
            >
              ;
            </div>
            <p className="text-green-500/60 uppercase tracking-[8px] text-sm font-medium">
              Selected
            </p>
            <h1 id="projects-text" className="text-4xl uppercase tracking-[15px]">
              Projects
            </h1>
          </div>

          <div className="py-5 flex-center flex-col gap-5">
            {projects.map((p, i) => (
              <div key={i} className="relative size-[calc(100vw-10vw)] md:size-[calc(100vw-20vw)] border border-green-500 rounded-3xl p-4">
                <div className="absolute inset-4 rounded-2xl overflow-hidden">
                  <Image src={p.images[0]} fill className="object-cover " alt="image" />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80"></div>

                  <div className="z-10 absolute top-3 right-3 flex gap-2 items-center">
                    {p.links.code && (
                      <Link href={p.links.code} target="_blank" className="size-7 border border-green-500 rounded-lg text-green-500 flex-center cursor-pointer hover:bg-green-500 hover:text-white transition-all">
                        <BiCode size={12} />
                      </Link>
                    )}
                    {p.links.live && (
                      <Link href={p.links.live} target="_blank" className="size-7 border border-green-500 rounded-lg text-green-500 flex-center cursor-pointer hover:bg-green-500 hover:text-white transition-all">
                        <FaExternalLinkAlt size={12} />
                      </Link>
                    )}
                  </div>
                </div>



                <div className="relative h-full flex flex-col justify-end text-white p-4">
                  <div
                    className="size-10 rounded-lg flex-center p-1 mb-1"
                    style={{ border: `1px solid ${p.color}`, background: `${p.color}22` }}
                  >
                    <Image src={p.logo} width={100} height={100} className="shrink-0" alt="image" />
                  </div>
                  <h1 className="text-lg font-bold">
                    {p.title}
                  </h1>
                  <p className="text-gray-400 text-sm">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2 py-2">
                    {p.features.slice(0, 3).map((f, i) => (
                      <div
                        className="shrink-0 text-xs px-2 py-1 rounded-full"
                        style={{ border: `1px solid ${p.color}`, color: p.color }}
                      >
                        {f}
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>

          <div className="py-5 flex-center">
            <Link href="/projects" className="text-green-500 uppercase tracking-[8px] text-sm font-medium hover:underline">
              View All Projects
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Page;
