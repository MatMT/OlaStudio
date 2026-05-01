import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { AVAILABLE_PRODUCTS, UPCOMING_PRODUCTS } from "@/data/products";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { ProductImageCarousel } from "@/components/ProductImageCarousel";

// Helper component for add to cart since this is a server component
import { AddToCartButton } from "./AddToCartButton";

export function generateStaticParams() {
  const allProducts = [...AVAILABLE_PRODUCTS, ...UPCOMING_PRODUCTS];
  return allProducts.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = [...AVAILABLE_PRODUCTS, ...UPCOMING_PRODUCTS].find(p => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-background min-h-screen pt-12 pb-24">
        <div className="max-w-6xl mx-auto px-4">
          <Link
            href="/inventario"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al inventario
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Image */}
            <div className="aspect-square bg-muted/10 rounded-3xl flex items-center justify-center p-0 border border-border/50 relative overflow-hidden">
              {product.images && product.images.length > 1 ? (
                <ProductImageCarousel images={product.images} productName={product.name} />
              ) : product.image ? (
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-muted/20 to-muted/40 rounded-full animate-pulse m-8" />
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              <div className="mb-2">
                <span className="inline-block bg-ola-blue/10 text-ola-blue px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                  {product.available ? "Disponible" : "Próximamente"}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-muted mb-6">SKU: {product.sku}</p>

              <p className="text-3xl font-bold text-ola-blue mb-8">
                ${product.price.toFixed(2)}
              </p>

              <div className="prose prose-lg dark:prose-invert mb-10">
                <p>{product.description}</p>
              </div>

              {product.available ? (
                <div className="mb-12">
                  <AddToCartButton product={product} />
                </div>
              ) : (
                <div className="bg-muted/10 border border-border p-6 rounded-2xl mb-12">
                  <p className="text-muted text-center font-medium">Este producto aún no está a la venta. Mantente atento a nuestras redes.</p>
                </div>
              )}

              {/* Info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-border/50">
                <div className="flex gap-4">
                  <div className="bg-background border border-border w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Envíos a todo El Salvador</h4>
                    <p className="text-sm text-muted">San Salvador y envíos departamentales seguros.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-background border border-border w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Compatibilidad asegurada</h4>
                    <p className="text-sm text-muted">Productos de alta calidad diseñadas para funcionar a la perfección.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}
