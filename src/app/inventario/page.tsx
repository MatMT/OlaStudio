import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { AVAILABLE_PRODUCTS, UPCOMING_PRODUCTS, LOOSE_PRODUCTS } from "@/data/products";
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
                Explora todos nuestros productos disponibles y próximos lanzamientos organizados por categorías.
              </p>
            </div>
            
            <InventoryList 
              kits={AVAILABLE_PRODUCTS} 
              sueltos={LOOSE_PRODUCTS}
              ecosistema={UPCOMING_PRODUCTS}
            />
          </div>
        </section>
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}
