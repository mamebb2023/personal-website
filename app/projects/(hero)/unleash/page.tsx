"use client";

import Link from 'next/link';
import React from 'react';
import { Engagement } from 'next/font/google';
import { FaBolt, FaDribbble, FaFigma, FaGithub, FaGoogle, FaPaintBrush, FaRocket } from 'react-icons/fa';

const font = Engagement({ weight: '400', subsets: ['latin'] });

export default function HeroSection() {
  return (
    <div className="relative h-screen overflow-hidden flex flex-col justify-between bg-[url('/projects/horse-image.jpg')] bg-cover bg-center">

      {/* header */}
      <div className="p-3 flex-center">
        <div className="w-4xl border-white/50 border rounded-full p-2 px-8 flex items-center justify-between bg-white/20 backdrop-blur-md">
          <Link href="#" className={`${font.className} text-3xl`}>U</Link>

          <nav className='flex gap-4 text-sm'>
            <Link className="hover:text-yellow-950 transition-all" href="#">About</Link>
            <Link className="hover:text-yellow-950 transition-all" href="#">Projects</Link>
            <Link className="hover:text-yellow-950 transition-all" href="#">Contact</Link>
          </nav>

          <button className='border border-white bg-white hover:bg-transparent hover:text-white transition-all rounded-full p-2 px-4 cursor-pointer text-sm'>
            Get Started
          </button>
        </div>
      </div>

      {/* content */}
      <div className="p-1 flex-center">
        <div className="w-7xl flex justify-between items-end">

          {/* LEFT */}
          <div className='space-y-6'>
            <div className='space-y-2'>
              <h1 className={`${font.className} text-6xl leading-tight`}>
                Unleash Your Potential
              </h1>

              <p className="max-w-md text-lg text-transparent bg-clip-text bg-gradient-to-br from-black via-yellow-950 to-yellow-800">
                Build bold digital experiences that stand out, connect deeply, and leave a lasting impression.
              </p>
            </div>

            {/* CTA */}
            <div className="flex gap-4">
              <button className="bg-black text-white px-6 py-3 rounded-full hover:scale-105 transition">
                Get Started
              </button>
              <button className="border border-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition">
                Contact Us
              </button>
            </div>

            {/* trust indicators */}
            <div className="flex gap-6 text-sm text-black/70 items-center">
              <span className="flex items-center gap-2">
                <FaBolt className="text-black" />
                Fast delivery
              </span>

              <span className="flex items-center gap-2">
                <FaPaintBrush className="text-black" />
                Clean design
              </span>

              <span className="flex items-center gap-2">
                <FaRocket size={16} className="text-black" />
                Scalable builds
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className='space-y-3'>
            <p className="max-w-md text-lg text-end text-transparent bg-clip-text bg-gradient-to-br from-black via-yellow-950 to-yellow-800">
              Unleash your business potential with digital experiences built to convert, scale, and stand out.
              From idea to execution, every detail is crafted to push your brand further.
            </p>
            <p className="text-sm text-end text-black/60">
              Turn vision into momentum.
            </p>
          </div>
        </div>
      </div>

      {/* bottom section */}
      <div className="p-6 flex flex-col items-center gap-4 text-black/70">
        <p className="text-sm text-center">
          Trusted by
          <br />
          forward-thinking brands & creators
        </p>

        <div className="flex gap-6 text-2xl opacity-80">
          <FaGoogle />
          <FaGithub />
          <FaFigma />
          <FaDribbble />
        </div>
      </div>
    </div>
  );
}