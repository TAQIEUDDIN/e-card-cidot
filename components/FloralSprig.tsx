"use client";

import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.15, duration: 1.1, ease: "easeInOut" },
      opacity: { delay: i * 0.15, duration: 0.3 },
    },
  }),
};

export default function FloralSprig({
  className = "",
  color = "#C9707E",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* main stem */}
      <motion.path
        d="M10 150 C 40 120, 55 95, 70 60 C 78 42, 85 28, 100 12"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        custom={0}
        variants={draw}
        initial="hidden"
        animate="visible"
      />
      {/* leaves */}
      <motion.path
        d="M42 118 C 55 108, 62 98, 58 84 C 46 90, 38 100, 42 118 Z"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        custom={1}
        variants={draw}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d="M62 82 C 76 78, 86 70, 84 56 C 70 58, 60 66, 62 82 Z"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        custom={1.4}
        variants={draw}
        initial="hidden"
        animate="visible"
      />
      {/* small blossom near base */}
      {[0, 72, 144, 216, 288].map((rot, idx) => (
        <motion.ellipse
          key={rot}
          cx="70"
          cy="60"
          rx="4"
          ry="9"
          stroke={color}
          strokeWidth="1.2"
          transform={`rotate(${rot} 70 60)`}
          custom={1.8 + idx * 0.08}
          variants={draw}
          initial="hidden"
          animate="visible"
        />
      ))}
      {/* top blossom */}
      {[0, 72, 144, 216, 288].map((rot, idx) => (
        <motion.ellipse
          key={`t-${rot}`}
          cx="100"
          cy="12"
          rx="3.4"
          ry="7.5"
          stroke={color}
          strokeWidth="1.1"
          transform={`rotate(${rot} 100 12)`}
          custom={2.3 + idx * 0.07}
          variants={draw}
          initial="hidden"
          animate="visible"
        />
      ))}
    </svg>
  );
}
