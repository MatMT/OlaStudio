import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { AVAILABLE_PRODUCTS, UPCOMING_PRODUCTS } from "@/data/products";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { InventoryList } from "./InventoryList";

export const metadata = {
  title: "Inventario Completo - OlaStudio",
  description: "Todo nuestro catálogo de accesorios premium en un solo lugar.",
};

export default function Inventario() {
  return (
    <>
      <Navbar />
      
      <main className="flex-1">
        <section className="py-24 bg-background min-h-screen">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-8">
              <Link 
                href="/"
                className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" /> Volver al inicio
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Inventario Completo</h1>
              <p className="text-xl text-muted max-w-2xl">
                Explora todos nuestros productos disponibles para entrega inmediata.
              </p>
            </div>
            
            <InventoryList products={AVAILABLE_PRODUCTS} />

            <div className="mt-32 mb-16 border-t border-border/50 pt-16">
              <div className="inline-block bg-muted/10 text-muted px-3 py-1 rounded-full text-sm font-semibold tracking-wider uppercase mb-4">
                Próximos Lanzamientos
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Ecosistema de Expansión</h2>
              <p className="text-lg text-muted mb-8">Nuevos productos en camino. Muy pronto en OlaStudio.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {UPCOMING_PRODUCTS.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}
