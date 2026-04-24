"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/context/CartContext";

type SortType = "default" | "price-asc" | "price-desc" | "alpha-asc";

export function InventoryList({ products }: { products: Product[] }) {
  const [sortType, setSortType] = useState<SortType>("default");

  const sortedProducts = [...products].sort((a, b) => {
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <p className="text-muted">{products.length} productos disponibles</p>
        
        <div className="flex items-center gap-2">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
