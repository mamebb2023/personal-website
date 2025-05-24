import About from "@/components/home/About";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Projects";
import React from "react";

const Page = () => {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Projects />
      <Footer />
    </>
  );
};

export default Page;
