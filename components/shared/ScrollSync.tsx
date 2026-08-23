"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const ScrollSync = () => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      lenis.off("scroll", update);
      window.removeEventListener("load", refresh);
    };
  }, [lenis]);

  return null;
};

export default ScrollSync;
