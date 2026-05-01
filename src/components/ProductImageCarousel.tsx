"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ProductImageCarouselProps = {
  images: string[];
  productName: string;
};

export function ProductImageCarousel({ images, productName }: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToImage = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      z: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        z: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  if (!mounted) {
    return (
      <div className="w-full h-full bg-gradient-to-tr from-muted/20 to-muted/40 animate-pulse" />
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              goToNext();
            } else if (swipe > swipeConfidenceThreshold) {
              goToPrevious();
            }
          }}
          className="absolute inset-0 flex items-center justify-center p-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`${productName} - Imagen ${currentIndex + 1}`}
            fill
            priority={currentIndex === 0}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 dark:bg-background/50 backdrop-blur-md flex items-center justify-center shadow-lg border border-border/50 text-foreground hover:bg-background transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 scale-95 hover:scale-100"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-6 h-6 ml-[-2px]" />
          </button>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 dark:bg-background/50 backdrop-blur-md flex items-center justify-center shadow-lg border border-border/50 text-foreground hover:bg-background transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 scale-95 hover:scale-100"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-6 h-6 mr-[-2px]" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-background/30 backdrop-blur-md px-3 py-2 rounded-full border border-border/20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                goToImage(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-foreground w-4" 
                  : "bg-foreground/40 hover:bg-foreground/70"
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
