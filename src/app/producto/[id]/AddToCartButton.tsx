"use client";

import { useCart, Product } from "@/context/CartContext";
import { productVariants } from "@/data/variants";
import { useState, useEffect } from "react";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const variants = productVariants[product.sku];

  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // When model changes, reset color if the new model doesn't have the current color
  useEffect(() => {
    if (variants && selectedModel) {
      const availableColors = variants[selectedModel] || [];
      if (!availableColors.includes(selectedColor)) {
        setSelectedColor("");
      }
    }
  }, [selectedModel, variants, selectedColor]);

  const handleAdd = () => {
    if (variants && (!selectedModel || !selectedColor)) {
      return;
    }
    addToCart(product, selectedModel, selectedColor);
    
    // Optional: Reset selections after adding?
    // setSelectedModel("");
    // setSelectedColor("");
  };

  const isReadyToAdd = variants ? (selectedModel && selectedColor) : true;

  return (
    <div className="flex flex-col gap-6">
      {variants && (
        <div className="flex flex-col gap-4 bg-muted/5 border border-border p-6 rounded-2xl">
          <div>
            <label className="block text-sm font-semibold mb-2">Selecciona el Modelo</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-ola-blue appearance-none"
            >
              <option value="" disabled>Elige una opción...</option>
              {Object.keys(variants).map((model) => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Color disponible</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              disabled={!selectedModel}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-ola-blue disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
            >
              <option value="" disabled>
                {selectedModel ? "Elige un color..." : "Primero elige un modelo"}
              </option>
              {selectedModel && variants[selectedModel]?.map((color) => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <button
        onClick={handleAdd}
        disabled={!isReadyToAdd}
        className={`w-full sm:w-auto px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:-translate-y-1 ${
          isReadyToAdd
            ? "bg-ola-blue text-white hover:bg-ola-blue-hover shadow-ola-blue/20"
            : "bg-muted text-background cursor-not-allowed opacity-70 hover:-translate-y-0 shadow-none"
        }`}
      >
        Agregar al Carrito
      </button>
    </div>
  );
}
