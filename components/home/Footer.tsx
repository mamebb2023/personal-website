"use client";

import { name, socials } from "@/constants";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaUpwork } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lotus from "../shared/Lotus";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Name letters
      tl.from(".footer-letter", {
        opacity: 0,
        y: -20,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      });

      // Social icons
      tl.from(
        ".footer-social",
        {
          scale: 0,
          stagger: 0.2,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

      // Line animation
      tl.from(
        ".footer-line",
        {
          width: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Words animation
      tl.from(
        ".footer-word",
        {
          opacity: 0,
          stagger: 0.25,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.6"
      );

      // Copyright
      tl.from(
        ".footer-copyright",
        {
          opacity: 0,
          duration: 0.4,
        },
        "-=0.2"
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={footerRef}
      id="contact"
      className="z-30 relative h-dvh overflow-hidden text-green-950 bg-white"
    >
      {/* Petals container */}
      <div
        ref={containerRef}
        className="relative h-full w-full flex items-center justify-start"
      >
        <Lotus />
      </div>

      {/* Foreground content */}
      <div className="absolute inset-0 size-full flex flex-col justify-between">
        {/* Top Row */}
        <div className="p-4 flex justify-between">
          {/* Name */}
          <div className="hidden md:flex gap-3">
            {name.map((letter, index) => (
              <span key={index} className="footer-letter">
                {letter}
              </span>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 text-xl">
            {socials.map((social, index) => (
              <div key={index} className="footer-social">
                <Link
                  className="size-8 rounded-full flex-center text-white flex items-center gap-2 hover:scale-110 transition-all"
                  style={{ backgroundColor: social.color }}
                  href={social.link}
                  target="_blank"
                >
                  {getSocialIcon(social.name)}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Middle text */}
        <div className="flex items-center justify-end gap-2 p-4">
          <div className="footer-line border-t border-green-950" />

          <div className="text-right flex gap-2 items-center justify-end text-sm font-bold">
            {"Designed and Developed with ❤️ by me"
              .split(" ")
              .map((word, index) => (
                <span key={index} className="footer-word">
                  {word}
                </span>
              ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="p-4 flex justify-end text-sm footer-copyright">
          <p className="text-right font-bold">© 2025</p>
        </div>
      </div>
    </div>
  );
};

function getSocialIcon(name: string) {
  switch (name) {
    case "Github":
      return <FaGithub />;
    case "LinkedIn":
      return <FaLinkedin />;
    case "Upwork":
      return <FaUpwork />;
    default:
      return null;
  }
}

export default Footer;