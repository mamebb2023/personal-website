"use client";

import { name, socials } from "@/constants";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaUpwork } from "react-icons/fa6";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import Lotus from "../shared/Lotus";

const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.7 });

  // Name text animation
  const letterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div
      id="contact"
      className="z-30 relative h-dvh overflow-hidden text-green-950 bg-gradient-to-br from-white via-green-200 to-white"
    >
      {/* Petals container */}
      <div
        ref={containerRef}
        className="relative h-full w-full flex items-center justify-start"
      >
        {isInView && <Lotus gradient="bg-green-500/50" />}
      </div>

      {/* Foreground content */}
      <div className="absolute inset-0 size-full flex flex-col justify-between">
        {/* Top Row */}
        <div className="p-4 flex justify-between">
          {/* Name */}
          <div className="hidden md:flex gap-3">
            {name.map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={letterVariants}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 text-xl">
            {socials.map((social, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  delay: isInView ? 0.7 + index * 0.2 : 0,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <Link
                  className={`size-8 rounded-full flex-center text-white flex items-center gap-2 hover:scale-110 transition-all`}
                  style={{ backgroundColor: social.color }}
                  href={social.link}
                  target="_blank"
                >
                  {getSocialIcon(social.name)}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 p-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isInView ? 60 : 0 }}
            transition={{ duration: 1, delay: isInView ? 1 : 0 }}
            className="border-t border-green-950"
          />
          <div className="text-right flex gap-2 items-center justify-end text-sm font-bold">
            {"Designed and Developed with ❤️ by me"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  className=""
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{
                    delay: isInView ? 0.3 + 0.3 * index : 0,
                    duration: 0.5,
                  }}
                >
                  {word}
                </motion.span>
              ))}
          </div>
        </div>

        {/* Bottom Text */}
        <motion.div
          className="p-4 flex justify-end text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: isInView ? 1 : 0, duration: 0.5 }}
        >
          <p className="text-right font-bold">© 2025</p>
        </motion.div>
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
