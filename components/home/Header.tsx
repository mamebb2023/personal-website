"use client";

import { links } from "@/constants";
import gsap from "gsap";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

const Header = () => {
  const { y } = useWindowScroll();
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const lenis = useLenis();

  useEffect(() => {
    if (y === 0) {
      setIsNavVisible(true);
    } else if (y > lastScrollY) {
      setIsNavVisible(false);
    } else if (y < lastScrollY) {
      setIsNavVisible(true);
    }

    setLastScrollY(y);
  }, [y, lastScrollY]);

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
      className={`fixed inset-x-0 top-4 z-50 border-none transition-all duration-700 sm:inset-x-6`}
    >
      <div className="flex items-center justify-evenly">
        <div className="flex w-full gap-3 items-center text-sm text-black mix-blend-difference overflow-hidden">
          {links.map((link, index) => (
            <motion.span
              key={index}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
              className="relative cursor-pointer text-black hover:underline"
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
      </div>
    </div>
  );
};

export default Header;
