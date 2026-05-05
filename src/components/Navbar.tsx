"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [logoClicks, setLogoClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    // Prevent default navigation if we are just clicking for the easter egg
    if (logoClicks < 5) {
      setLogoClicks(prev => prev + 1);
      if (logoClicks === 4) {
        setShowEasterEgg(true);
        e.preventDefault();
      }
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border transition-all">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          className="font-semibold text-xl tracking-tight flex items-center gap-2 select-none cursor-pointer"
          onClick={handleLogoClick}
        >
          <span className="text-ola-blue font-bold text-2xl">~</span>
          <span>OlaStudio</span>
        </Link>

        {/* Global Navigation Links */}
        <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          <Link href="/#catalogo" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Kits Apple Pencil
          </Link>
          <Link href="/#accesorios" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Sueltos
          </Link>
          <Link href="/#ecosistema" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Ecosistema
          </Link>
          <Link href="/inventario" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Inventario Completo
          </Link>
        </div>

        <div className="flex items-center gap-4">
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
      
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-ola-blue text-white p-6 rounded-2xl shadow-2xl max-w-sm w-[90%] text-center border border-white/20"
          >
            <h3 className="text-xl font-bold mb-2">¡Huevo de Pascua encontrado! 🐣</h3>
            <p className="text-sm mb-4 opacity-90">
              Felicidades, descubriste nuestro secreto. Como estudiante de la UDB, tienes un descuento especial de $2.00 en los kits Pro y Ergonómico.
            </p>
            <div className="bg-black/20 rounded-lg p-3 mb-4 font-mono text-lg tracking-wider font-bold select-all">
              UDB2OFF
            </div>
            <button 
              onClick={() => setShowEasterEgg(false)}
              className="bg-white text-ola-blue px-6 py-2 rounded-full font-medium text-sm hover:bg-opacity-90 transition-all"
            >
              ¡Entendido!
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
