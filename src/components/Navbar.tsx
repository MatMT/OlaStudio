"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border transition-all">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl tracking-tight flex items-center gap-2">
          {/* Olas icon or text */}
          <span className="text-ola-blue font-bold text-2xl">~</span>
          <span>OlaStudio</span>
        </Link>

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
    </nav>
  );
}
