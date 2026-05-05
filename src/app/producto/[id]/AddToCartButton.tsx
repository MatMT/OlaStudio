"use client";

import { Product } from "@/context/CartContext";
import { useProductForm } from "@/hooks/useProductForm";

export function AddToCartButton({ product }: { product: Product }) {
  const {
    variants,
    selectedModel, setSelectedModel,
    selectedColor,  setSelectedColor,
    isReadyToAdd,   handleAdd,
  } = useProductForm(product);

  return (
    <div className="flex flex-col gap-6">
      {variants && (
        <div className="flex flex-col gap-4 bg-muted/5 border border-border p-6 rounded-2xl">
          {/* Model selector */}
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

          {/* Color selector */}
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
