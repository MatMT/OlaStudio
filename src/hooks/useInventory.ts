"use client";

import { useState, useMemo } from "react";
import { Product } from "@/context/CartContext";

export type SortType = "default" | "price-asc" | "price-desc" | "alpha-asc";
export type TabType = "kits" | "sueltos" | "ecosistema";

interface UseInventoryProps {
  kits: Product[];
  sueltos: Product[];
  ecosistema: Product[];
}

export function useInventory({ kits, sueltos, ecosistema }: UseInventoryProps) {
  const [sortType, setSortType] = useState<SortType>("default");
  const [activeTab, setActiveTab] = useState<TabType>("kits");

  const currentProducts = useMemo(() => {
    switch (activeTab) {
      case "kits":      return kits;
      case "sueltos":   return sueltos;
      case "ecosistema": return ecosistema;
      default:          return kits;
    }
  }, [activeTab, kits, sueltos, ecosistema]);

  const sortedProducts = useMemo(() => {
    return [...currentProducts].sort((a, b) => {
      switch (sortType) {
        case "price-asc":  return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "alpha-asc":  return a.name.localeCompare(b.name);
        default:           return 0;
      }
    });
  }, [currentProducts, sortType]);

  return {
    activeTab,
    setActiveTab,
    sortType,
    setSortType,
    sortedProducts,
    currentCount: currentProducts.length,
  };
}
