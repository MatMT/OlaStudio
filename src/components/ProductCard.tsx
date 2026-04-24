"use client";

import { useCart, Product } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { productVariants } from "@/data/variants";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const hasVariants = !!productVariants[product.sku];

  return (
    <div className="group flex flex-col bg-card-bg rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link href={`/producto/${product.id}`} className="block">
        <div className="aspect-square bg-muted/10 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden group">
          {product.image ? (
            <Image 
              src={product.image} 
              alt={product.name} 
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-24 h-24 bg-gradient-to-tr from-muted/20 to-muted/40 rounded-full group-hover:scale-110 transition-transform duration-500" />
          )}
          {/* If unavailable, show badge */}
          {!product.available && (
            <span className="absolute top-3 right-3 bg-black/80 text-white text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-md">
              Próximamente
            </span>
          )}
        </div>
      </Link>
      
      <div className="flex-1 flex flex-col">
        <Link href={`/producto/${product.id}`} className="block">
          <h3 className="font-semibold text-lg text-foreground mb-1 hover:text-ola-blue transition-colors">{product.name}</h3>
        </Link>
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
            hasVariants ? (
              <Link
                href={`/producto/${product.id}`}
                className="bg-foreground text-background px-4 py-2 rounded-full font-medium text-sm hover:bg-ola-blue hover:text-white transition-colors cursor-pointer relative z-10 text-center"
              >
                Ver opciones
              </Link>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="bg-foreground text-background px-4 py-2 rounded-full font-medium text-sm hover:bg-ola-blue hover:text-white transition-colors cursor-pointer relative z-10"
              >
                Agregar
              </button>
            )
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
