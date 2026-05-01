"use client";

import { useRef, useEffect, useState } from "react";
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
  speed = 0.5 // Slower speed
}: InfiniteProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Duplicating to create a seamless infinite loop
  const duplicatedProducts = [...products, ...products, ...products, ...products, ...products];

  useEffect(() => {
    let animationId: number;
    let lastTimestamp: number;

    const scroll = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (scrollRef.current && !isHovered && !isDragging) {
        // Adjust speed based on delta time to keep it consistent
        const moveBy = (speed * deltaTime) / 16;
        
        if (direction === "left") {
          scrollRef.current.scrollLeft += moveBy;
          if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
            scrollRef.current.scrollLeft = 0;
          }
        } else {
          scrollRef.current.scrollLeft -= moveBy;
          if (scrollRef.current.scrollLeft <= 0) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 2;
          }
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, isDragging, speed, direction]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2; 
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative w-full overflow-hidden bg-transparent py-10 flex items-center group">
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div
        ref={scrollRef}
        className="flex gap-6 pr-6 w-full overflow-x-hidden cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        {duplicatedProducts.map((product, idx) => (
          <div key={`${product.id}-${idx}`} className="w-[280px] md:w-[350px] shrink-0 pointer-events-none">
            <div className="pointer-events-auto transition-transform hover:scale-[1.02]">
               <ProductCard product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
