"use client";

import Link from 'next/link';
import React from 'react';
import { Engagement } from 'next/font/google';
import {
  FaBolt,
  FaDribbble,
  FaFigma,
  FaGithub,
  FaGoogle,
  FaPaintBrush,
  FaRocket,
} from 'react-icons/fa';
import { motion, Variants } from "framer-motion";

const font = Engagement({ weight: '400', subsets: ['latin'] });

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Lumino() {
  return (
    <div className="relative h-screen overflow-hidden flex flex-col justify-between bg-[url('/projects/nature-cloud.jpg')] bg-cover bg-center text-white">
      <div className="absolute inset-0 bg-black/25"></div>
      {/* <div className="absolute bottom-0 -translate-x-1/2 translate-y-1/2 left-1/2 w-[600px] h-[500px] opacity-50 blur-3xl bg-white rounded-full" /> */}
      <div className="flex flex-col gap-10">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="p-3 flex-center"
        >
          <div className="relative w-4xl rounded-full p-2 px-8 flex items-center justify-between bg-white/10 backdrop-blur-sm">
            <Link href="#" className={`${font.className} text-3xl`}>L</Link>

            <nav className='flex gap-4 text-sm'>
              <Link className="hover:text-gray-200 transition-all" href="#">Studio</Link>
              <Link className="hover:text-gray-200 transition-all" href="#">Branding</Link>
              <Link className="hover:text-gray-200 transition-all" href="#">Web Design</Link>
              <Link className="hover:text-gray-200 transition-all" href="#">Get in Touch</Link>
            </nav>

            <button className='border border-white bg-white hover:bg-transparent hover:text-white transition-all rounded-full p-2 px-4 cursor-pointer text-sm text-black'>
              Get Started
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative p-1 flex-center flex-col space-y-6"
        >
          <motion.div variants={fadeUp} className='space-y-2'>
            <h1 className={`text-6xl leading-tight text-center`}>
              Where <span className={`${font.className}`}>Ideas</span> Become<br /> Digital <span className={`${font.className}`}>Reality</span>
            </h1>

            <p className="text-center max-w-md text-lg text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white">
              A creative agency focused on bold branding and high-end web design that helps businesses look premium and memorable online.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="flex gap-4">
            <button className="cursor-pointer bg-white text-black px-6 py-3 rounded-full hover:scale-105 transition">
              Get Started
            </button>
            <button className="cursor-pointer border backdrop-blur-sm border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition">
              Contact Us
            </button>
          </motion.div>

          {/* TRUST */}
          <motion.div variants={fadeUp} className="flex gap-6 text-sm text-wite/70 items-center">
            <span className="flex items-center gap-2">
              <FaBolt />
              Brand identity & visuals
            </span>

            <span className="flex items-center gap-2">
              <FaPaintBrush />
              Premium website design
            </span>

            <span className="flex items-center gap-2">
              <FaRocket size={16} />
              Smooth animations & interactions
            </span>
          </motion.div>

        </motion.div>
      </div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="p-6 flex flex-col items-center gap-4 text-white/00"
      >
        <p className="text-sm text-center">
          Trusted by
          <br />
          forward-thinking brands & creators
        </p>

        <div className="flex gap-6 text-2xl">
          <FaGoogle />
          <FaGithub />
          <FaFigma />
          <FaDribbble />
        </div>
      </motion.div>
    </div>
  );
}