"use client";

import gsap from "gsap";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";

const Header = () => {
  const links = [
    {
      name: "Home",
      href: "#home",
    },
    {
      name: "Projects",
      href: "#projects",
    },
    {
      name: "Contact",
      href: "#contact",
    },
    {
      name: "Services",
      href: "#blog",
    },
    {
      name: "About",
      href: "#about",
    },
  ];
  const { y } = useWindowScroll();
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  let style = "";
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
      className={`fixed inset-x-0 top-4 z-50 border-none transition-all duration-700 sm:inset-x-6 
        `}
    >
      <div className="flex justify-end">
        <div className="flex gap-3 items-center text-sm text-black mix-blend-difference">
          {links.map((link, index) => (
            <Link key={index} href={link.href}>
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
