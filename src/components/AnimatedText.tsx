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
    <div className="inline-flex overflow-hidden relative w-[250px] md:w-[350px] justify-center items-center h-[40px] md:h-[60px] align-bottom text-ola-blue">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5, ease: "anticipate" }}
          className="absolute font-bold"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
