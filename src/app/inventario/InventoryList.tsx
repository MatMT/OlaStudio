"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/context/CartContext";

type SortType = "default" | "price-asc" | "price-desc" | "alpha-asc";
type TabType = "kits" | "sueltos" | "ecosistema";

interface InventoryListProps {
  kits: Product[];
  sueltos: Product[];
  ecosistema: Product[];
}

export function InventoryList({ kits, sueltos, ecosistema }: InventoryListProps) {
  const [sortType, setSortType] = useState<SortType>("default");
  const [activeTab, setActiveTab] = useState<TabType>("kits");

  let currentProducts: Product[] = [];
  if (activeTab === "kits") currentProducts = kits;
  if (activeTab === "sueltos") currentProducts = sueltos;
  if (activeTab === "ecosistema") currentProducts = ecosistema;

  const sortedProducts = [...currentProducts].sort((a, b) => {
    switch (sortType) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "alpha-asc":
        return a.name.localeCompare(b.name);
      default:
        return 0; // maintain original order
    }
  });

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6 border-b border-border/50 pb-4">
        <div className="flex flex-wrap w-full md:w-auto gap-2 pb-2 md:pb-0">
          <button
            onClick={() => setActiveTab("kits")}
            className={`flex-1 md:flex-none whitespace-nowrap px-4 md:px-6 py-3 rounded-xl md:rounded-full font-semibold transition-all ${
              activeTab === "kits"
                ? "bg-ola-blue text-white shadow-lg shadow-ola-blue/30"
                : "bg-muted/20 text-foreground/80 hover:bg-muted/30 border border-border/50"
            }`}
          >
            Kits Apple Pencil
          </button>
          <button
            onClick={() => setActiveTab("sueltos")}
            className={`flex-1 md:flex-none whitespace-nowrap px-4 md:px-6 py-3 rounded-xl md:rounded-full font-semibold transition-all ${
              activeTab === "sueltos"
                ? "bg-ola-blue text-white shadow-lg shadow-ola-blue/30"
                : "bg-muted/20 text-foreground/80 hover:bg-muted/30 border border-border/50"
            }`}
          >
            Accesorios Individuales
          </button>
          <button
            onClick={() => setActiveTab("ecosistema")}
            className={`flex-1 md:flex-none whitespace-nowrap px-4 md:px-6 py-3 rounded-xl md:rounded-full font-semibold transition-all ${
              activeTab === "ecosistema"
                ? "bg-ola-blue text-white shadow-lg shadow-ola-blue/30"
                : "bg-muted/20 text-foreground/80 hover:bg-muted/30 border border-border/50"
            }`}
          >
            Ecosistema de Expansión
          </button>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm font-medium text-muted">Ordenar por:</span>
          <select 
            value={sortType}
            onChange={(e) => setSortType(e.target.value as SortType)}
            className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-ola-blue"
          >
            <option value="default">Recomendados</option>
            <option value="price-asc">Menor Precio</option>
            <option value="price-desc">Mayor Precio</option>
            <option value="alpha-asc">Alfabético (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-muted">{currentProducts.length} productos disponibles en esta categoría</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
