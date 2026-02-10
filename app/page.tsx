"use client"

import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Projects";
import React from "react";
import { motion } from "framer-motion"

const Page = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Header />
      <Hero />
      <Projects />
    </motion.div>
  );
};

export default Page;
