"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border transition-all">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.svg" 
            alt="OlaLabs Logo" 
            width={120} 
            height={45} 
            priority
            className="object-contain"
          />
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-muted/10 transition-colors"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="w-5 h-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-ola-blue rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
