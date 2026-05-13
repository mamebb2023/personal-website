"use client";

import { motion } from "framer-motion";

const Reveal = ({
  className,
  text,
  plusDelay = 0,
  stagger = 0,
  style,
}: { className: string; text: string; plusDelay?: number; stagger?: number, style?: React.CSSProperties }) => {
  return (
    <div className="z-10 overflow-hidden">
      {Array.from(text).map((c, index) => (
        <motion.span
          key={index}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{
            duration: 1,
            delay: plusDelay + (stagger * index),
            ease: [0.85, 0.09, 0.15, 0.91]
          }}
          className={`${className} inline-block`}
          style={style}
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </div>
  );
};

export default Reveal;