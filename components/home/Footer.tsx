"use client";

import { name, socials } from "@/constants";
import gsap from "gsap";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaUpwork } from "react-icons/fa6";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const petalRefs = useRef<HTMLDivElement[]>([]);

  const petalCount = 7;
  const centerIndex = Math.floor(petalCount / 2);
  const angleSpread = 150;
  const startAngle = -angleSpread / 2;

  const petals = Array.from({ length: petalCount }, (_, i) => {
    const angle = startAngle + (i * angleSpread) / (petalCount - 1);
    const distanceFromCenter = Math.abs(i - centerIndex);
    const opacity = 0.8 - distanceFromCenter * 0.2;

    return { angle, opacity };
  });

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#footer",
        start: "top+=300 bottom",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
      },
    });

    const centerIndex = Math.floor(petalRefs.current.length / 2);
    const animationOrder = [...Array(petalRefs.current.length).keys()].sort(
      (a, b) => Math.abs(a - centerIndex) - Math.abs(b - centerIndex)
    );

    animationOrder.forEach((i, orderIndex) => {
      const el = petalRefs.current[i];
      const { angle, opacity } = petals[i];

      tl.fromTo(
        el,
        {
          opacity: 0,
          scaleY: 0,
          transform: "rotate(0deg)",
          transformOrigin: "center bottom",
        },
        {
          opacity,
          scaleY: 1,
          transform: `rotate(${angle}deg)`,
          duration: 1,
          ease: "power1.inOut",
        },
        orderIndex * 0.05 // 👈 starts next petal before previous ends
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div id="footer" className="relative h-dvh overflow-hidden">
      {/* petal */}
      <div className="relative h-full w-full flex items-center justify-center">
        {petals.map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) petalRefs.current[index] = el;
            }}
            className="bg-green-300 h-[70vh] md:h-[90vh] w-[280px] md:w-[280px] absolute"
            style={{
              clipPath: "ellipse(50% 50% at 50% 50%)",
              transformOrigin: "center bottom",
            }}
          ></div>
        ))}
      </div>

      <div className="absolute inset-0 size-full flex flex-col justify-between">
        <div className="p-4 flex justify-between">
          {/* name */}
          <div className="hidden md:flex gap-3">
            {name.map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </div>

          {/* socials */}
          <div className="flex gap-3 text-xl">
            {socials.map((social, index) => (
              <Link
                key={index}
                className={`size-8 rounded-full flex-center text-white flex items-center gap-2 hover:scale-110 transition-all`}
                style={{ backgroundColor: social.color }}
                href={social.link}
                target="_blank"
              >
                {getSocialIcon(social.name)}
              </Link>
            ))}
          </div>
        </div>

        <div className="p-4 flex justify-between text-sm">
          <p className="">@ 2025</p>
          <p className="">Designed and Developed by me</p>
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
      return "";
  }
}

export default Footer;
