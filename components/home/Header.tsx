"use client";

import { links } from "@/constants";
import gsap from "gsap";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

const Header = () => {
  const navContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const lenis = useLenis();

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        let newVisible = isNavVisible;

        if (y === 0) {
          newVisible = true;
        } else if (y > lastScrollY.current) {
          newVisible = false; // scrolling down
        } else if (y < lastScrollY.current) {
          newVisible = true; // scrolling up
        }

        if (newVisible !== isNavVisible) {
          setIsNavVisible(newVisible);
        }

        lastScrollY.current = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNavVisible]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className={`fixed inset-x-0 top-3 flex gap-3 z-50 border-none transition-all duration-700 sm:inset-x-6 overflow-hidden px-3`}
    >
      {links.map((link, index) => (
        <motion.span
          key={index}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
          className="relative cursor-pointer text-black hover:underline text-sm"
          onClick={() => {
            if (lenis) {
              lenis.scrollTo(link.href);
            }
          }}
        >
          <Link href={link.href}>{link.name}</Link>
        </motion.span>
      ))}
    </div>
  );
};

export default Header;
