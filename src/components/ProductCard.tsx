"use client";

import { useCart, Product } from "@/context/CartContext";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group flex flex-col bg-card-bg rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-square bg-muted/10 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
        {/* Placeholder for actual image. You can replace this with next/image later */}
        <div className="w-24 h-24 bg-gradient-to-tr from-muted/20 to-muted/40 rounded-full group-hover:scale-110 transition-transform duration-500" />
        {/* If unavailable, show badge */}
        {!product.available && (
          <span className="absolute top-3 right-3 bg-black/80 text-white text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-md">
            Próximamente
          </span>
        )}
      </div>
      
      <div className="flex-1 flex flex-col">
        <h3 className="font-semibold text-lg text-foreground mb-1">{product.name}</h3>
        <p className="text-sm text-muted mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>
        
        <div className="flex items-end justify-between mt-auto pt-4 border-t border-border/50">
          <div>
            <p className="text-xs text-muted mb-1">SKU: {product.sku}</p>
            <p className="font-bold text-xl text-foreground">
              ${product.price.toFixed(2)}
            </p>
          </div>
          
          {product.available ? (
            <button
              onClick={() => addToCart(product)}
              className="bg-foreground text-background px-4 py-2 rounded-full font-medium text-sm hover:bg-ola-blue hover:text-white transition-colors"
            >
              Agregar
            </button>
          ) : (
            <button
              disabled
              className="bg-muted/20 text-muted px-4 py-2 rounded-full font-medium text-sm cursor-not-allowed"
            >
              Agotado
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
