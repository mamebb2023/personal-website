"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const BLADES = Array.from({ length: 18 }, (_, i) => {
  const x = (i / 17) * 1440;
  const h = 26 + ((i * 7) % 4) * 12;
  const bend = ((i % 5) - 2) * 10;
  const opacity = 0.35 + ((i * 13) % 5) * 0.12;
  return { x, h, bend, opacity };
});

const Tree = ({ prefix }: { prefix: string }) => (
  <svg viewBox="0 0 240 300" className="nature-tree w-full" aria-hidden="true">
    <defs>
      <linearGradient id={`${prefix}-trunk`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#064e3b" />
        <stop offset="100%" stopColor="#065f46" />
      </linearGradient>
      <linearGradient id={`${prefix}-canopy`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#34d399" stopOpacity="0.95" />
        <stop offset="60%" stopColor="#10b981" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#059669" stopOpacity="0.85" />
      </linearGradient>
    </defs>
    <path
      d="M112 300 C116 240 106 200 114 150 L126 150 C134 200 124 240 128 300 Z"
      fill={`url(#${prefix}-trunk)`}
    />
    <path
      d="M118 190 C138 172 158 164 178 158"
      stroke="#065f46"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
    />
    <ellipse cx="120" cy="96" rx="88" ry="72" fill={`url(#${prefix}-canopy)`} />
    <ellipse cx="52" cy="140" rx="46" ry="38" fill="#059669" opacity="0.9" />
    <ellipse cx="188" cy="132" rx="50" ry="42" fill="#10b981" opacity="0.92" />
    <circle cx="88" cy="70" r="14" fill="#a7f3d0" opacity="0.55" />
    <circle cx="150" cy="58" r="8" fill="#d1fae5" opacity="0.5" />
  </svg>
);

const NatureBreak = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const trigger = {
      trigger: sectionRef.current,
      start: "top 75%",
      toggleActions: "play pause resume pause" as const,
    };

    const ctx = gsap.context(() => {
      gsap.from(".nature-text", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".nature-tree", {
        scale: 0.7,
        opacity: 0,
        transformOrigin: "bottom center",
        duration: 1.2,
        ease: "back.out(1.2)",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      if (!reduced) {
        gsap.to(".nature-tree", {
          rotation: 1.4,
          transformOrigin: "bottom center",
          duration: 5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.5,
          scrollTrigger: { ...trigger },
        });

        gsap.to(".nature-grass", {
          skewX: 3,
          transformOrigin: "bottom center",
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          scrollTrigger: { ...trigger },
        });

        gsap.to(".nature-float", {
          y: -18,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.6,
          scrollTrigger: { ...trigger },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="growth"
      className="relative overflow-x-hidden bg-white min-h-[70vh] flex items-center justify-center py-28"
    >
      <div className="absolute -top-20 right-[10%] w-80 h-80 bg-linear-to-br from-emerald-400/15 via-green-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-[5%] w-72 h-72 bg-linear-to-tr from-teal-400/10 via-green-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-17 left-[2%] w-32.5 md:w-52.5 pointer-events-none">
        <Tree prefix="nb-left" />
      </div>
      <div className="absolute bottom-16 right-[3%] w-25 md:w-40 -scale-x-100 pointer-events-none">
        <Tree prefix="nb-right" />
      </div>

      <div className="nature-float absolute top-1/4 left-[18%] size-4 bg-linear-to-br from-emerald-600 to-green-500 rounded-tl-full rounded-br-full opacity-40 pointer-events-none" />
      <div className="nature-float absolute top-1/3 right-[22%] size-3 bg-linear-to-br from-emerald-500 to-green-400 rounded-tl-full rounded-br-full opacity-30 pointer-events-none" />
      <div className="nature-float absolute top-[62%] left-[30%] size-2.5 bg-linear-to-br from-green-600 to-emerald-400 rounded-tl-full rounded-br-full opacity-25 pointer-events-none" />

      <div className="nature-text relative z-10 max-w-xl px-6 text-center flex flex-col items-center gap-4">
        <p className="text-green-500/60 uppercase tracking-[8px] text-sm font-medium">
          Nurtured Growth
        </p>
        <h2 className="text-4xl md:text-5xl uppercase tracking-[12px] text-green-950">
          From Seed To Bloom
        </h2>
        <p className="text-black/60 text-sm md:text-base leading-relaxed max-w-md">
          Every project begins as a simple idea — planted with intention,
          patiently cultivated through clean code and care, and given room to
          grow into something that lasts.
        </p>
        <div className="mt-2 h-px w-16 bg-linear-to-r from-transparent via-green-500 to-transparent" />
      </div>

      <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none">
        <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-green-500/40 to-transparent" />
        <svg
          className="nature-grass absolute bottom-0 inset-x-0 w-full h-20"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="nb-grass" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {BLADES.map((b, i) => (
            <path
              key={i}
              d={`M ${b.x} 90 Q ${b.x + b.bend} ${90 - b.h} ${
                b.x + b.bend * 1.6
              } ${90 - b.h}`}
              stroke="url(#nb-grass)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity={b.opacity}
            />
          ))}
        </svg>
      </div>
    </section>
  );
};

export default NatureBreak;
