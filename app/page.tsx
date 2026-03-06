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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
    </motion.div>
  );
};

export default Page;
