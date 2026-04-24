"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const words = [
  "creadores", "estudiantes", "ingenieros", "arquitectos", 
  "artistas", "diseñadores", "programadores", "médicos", 
  "emprendedores", "fotógrafos"
];

export function AnimatedText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500); // Change word every 2.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span layout className="inline-flex relative align-bottom text-ola-blue items-center overflow-visible">
      <AnimatePresence mode="popLayout">
        <motion.span
          layout
          key={index}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="whitespace-nowrap font-bold"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
