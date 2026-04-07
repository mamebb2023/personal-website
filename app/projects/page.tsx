"use client";

import Lotus from "@/components/shared/Lotus";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

const Page = () => {
  const projects = [
    {
      title: "Nexus",
      tag: "Metaverse | Hero Exploration",
      img: "/projects/thumb/nexus.png",
      link: "/projects/nexus",
    },
    {
      title: "Lumino",
      tag: "Hero Exploration",
      img: "/projects/thumb/lumino.png",
      link: "/projects/lumino",
    },
    {
      title: "Unleash",
      tag: "Hero Exploration",
      img: "/projects/thumb/unleash.png",
      link: "/projects/unleash",
    },
    {
      title: "LotusFlow",
      tag: "AI-Powered React Component Generator",
      img: "/assets/lotusflow/lotusflow-1.png",
      link: "https://lotusflow.vercel.app/",
    },
    {
      title: "WeMD Africa",
      tag: "Online Dermatology Clinic",
      img: "/assets/wemd/wemd-1.jpg",
      link: "wemd-africa.vercel.app",
    },
    {
      title: "SanAI",
      tag: "Your Personal AI Doctor",
      img: "/assets/sanai/sanai-1.png",
      link: "https://sanai-.vercel.app",
    },
    {
      title: "CalHabit",
      tag: "Habit tracking web app",
      img: "/assets/calhabit/calhabit-1.png",
      link: "https://cal-habit.vercel.app",
    },
    {
      title: "Brainwave",
      tag: "Modern & Responsive SaaS Landing Page",
      img: "/assets/brainwave/brainwave-1.png",
      link: "https://brainwave-iota-five-26.vercel.app/",
    },
  ];

  return (
    <section className="relative min-h-screen px-6 md:px-10 py-5 text-black">
      <div className="fixed -z-1 right-0 top-1/2">
        <Lotus animatePetals={false} />
      </div>
      {/* Back Button */}
      <div className="max-w-5xl mx-auto mb-5">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black transition"
        >
          <BsArrowLeft size={16} className="text-green-500" />
          Back
        </Link>
      </div>

      {/* Section Header */}
      <div className="max-w-5xl mx-auto mb-5">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-black via-black to-green-500">
          Projects
        </h1>
        <p className="text-sm text-black/60 mt-3 max-w-md">
          A collection of explorations, interfaces, and visual systems.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-5">
        {projects.map((project, index) => (
          <Link
            key={index}
            href={project.link}
            className="group cursor-pointer border border-gray-500/20 rounded-2xl p-2 hover:border-green-500/40 transition-all backdrop-blur-sm"
          >
            {/* Image */}
            <div className="relative w-full h-[180px] md:h-[260px] rounded-xl overflow-hidden bg-neutral-100">
              <Image
                src={project.img}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

            {/* Content */}
            <div className="mt-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg md:text-xl font-medium tracking-tight">
                  {project.title}
                </h2>
                <p className="text-md text-black/80 mt-1">
                  {project.tag}
                </p>
              </div>

              {/* subtle arrow */}
              <div className="text-green-800/80 text-sm group-hover:translate-x-1 transition">
                View →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Page;