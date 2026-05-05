"use client";

import { useState, useEffect } from "react";
import { Product, useCart } from "@/context/CartContext";
import { productVariants } from "@/data/variants";

export function useProductForm(product: Product) {
  const { addToCart } = useCart();
  const variants = productVariants[product.sku];

  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // Reset color when model changes and selected color is not available
  useEffect(() => {
    if (variants && selectedModel) {
      const availableColors = variants[selectedModel] || [];
      if (!availableColors.includes(selectedColor)) {
        setSelectedColor("");
      }
    }
  }, [selectedModel, variants, selectedColor]);

  const isReadyToAdd = variants ? !!(selectedModel && selectedColor) : true;

  const handleAdd = () => {
    if (!isReadyToAdd) return;
    addToCart(product, selectedModel || undefined, selectedColor || undefined);
  };

  return {
    variants,
    selectedModel,
    setSelectedModel,
    selectedColor,
    setSelectedColor,
    isReadyToAdd,
    handleAdd,
  };
}
