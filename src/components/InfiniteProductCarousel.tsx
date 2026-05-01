"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useVelocity, useAnimationFrame } from "framer-motion";
import { Product } from "@/context/CartContext";
import { ProductCard } from "./ProductCard";

interface InfiniteProductCarouselProps {
  products: Product[];
  direction?: "left" | "right";
  speed?: number;
}

export function InfiniteProductCarousel({ 
  products, 
  direction = "left", 
  speed = 1 
}: InfiniteProductCarouselProps) {
  const baseX = useRef(0);
  
  // We duplicate the array a few times so the carousel feels truly infinite
  const duplicatedProducts = [...products, ...products, ...products, ...products];

  useAnimationFrame((t, delta) => {
    let moveBy = direction === "left" ? -speed * (delta / 16) : speed * (delta / 16);
    
    baseX.current += moveBy;
    
    // Reset to create infinite loop
    // Assuming a card width + gap is roughly 350px. With 4 products, one set is 1400px.
    // A more exact measurement would use a ref, but a percentage approach is robust.
    // If we use framer-motion's percent translation, we need to loop when it reaches a certain point.
    // We'll translate the whole container.
    
    // Actually, framer motion has an easier way to do continuous marquee using animate.
  });

  return (
    <div className="relative w-full overflow-hidden bg-transparent py-10 flex items-center group">
      {/* Gradient edges for smooth fade out */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <motion.div
        className="flex gap-6 pr-6 w-max"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          ease: "linear",
          duration: 30 / speed,
          repeat: Infinity,
        }}
      >
        {duplicatedProducts.map((product, idx) => (
          <div key={`${product.id}-${idx}`} className="w-[280px] md:w-[350px] shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
