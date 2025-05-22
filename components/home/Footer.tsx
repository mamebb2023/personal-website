"use client";

import { name, socials } from "@/constants";
import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaUpwork } from "react-icons/fa6";
import { motion, useInView } from "framer-motion";

const Footer = () => {
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

  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.7 });

  // Animation variants for petals
  const petalVariants = {
    hidden: { opacity: 0, scaleY: 0, rotate: 0 },
    visible: (i: number) => ({
      opacity: petals[i].opacity,
      scaleY: 1,
      rotate: petals[i].angle,
      transition: {
        duration: 1,
        ease: "easeInOut",
        delay: Math.abs(i - centerIndex) * 0.05,
      },
    }),
  };

  // Animation for name letters
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
    <div id="footer" className="relative h-dvh overflow-hidden bg-white">
      {/* Petals container */}
      <div
        ref={containerRef}
        className="relative h-full w-full flex items-center justify-start"
      >
        {petals.map((_, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={petalVariants}
            className="bg-green-300 h-[70vh] md:h-[90vh] w-[280px] md:w-[280px] absolute"
            style={{
              clipPath: "ellipse(50% 50% at 50% 50%)",
              transformOrigin: "center bottom",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 size-full flex flex-col justify-between">
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

          {/* Socials */}
          <div className="flex gap-3 text-xl">
            {socials.map((social, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  delay: isInView ? 0.5 + index * 0.1 : 0,
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

        {/* Footer text */}
        <motion.div
          className="p-4 flex justify-end text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: isInView ? 1 : 0, duration: 0.5 }}
        >
          <p className="text-right">
            @ 2025
            <br />
            Designed and Developed by me
          </p>
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
      return "";
  }
}

export default Footer;
