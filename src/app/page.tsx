import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { AnimatedText } from "@/components/AnimatedText";
import { InfiniteProductCarousel } from "@/components/InfiniteProductCarousel";
import { AVAILABLE_PRODUCTS, UPCOMING_PRODUCTS } from "@/data/products";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  // Only show the first 3 products on the home page
  const featuredProducts = AVAILABLE_PRODUCTS.slice(0, 3);
  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background pt-24 pb-32">
          {/* Animated Glow Background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] md:w-full max-w-4xl h-[400px] pointer-events-none z-0 opacity-80 dark:opacity-40 flex justify-center">
            <div className="absolute left-[10%] md:left-[20%] w-[50%] h-[80%] bg-ola-blue/30 dark:bg-ola-blue blur-[100px] rounded-full animate-[pulse_6s_ease-in-out_infinite]" />
            <div className="absolute right-[10%] md:right-[20%] w-[50%] h-[80%] bg-cyan-400/30 dark:bg-cyan-400 blur-[120px] rounded-full animate-[pulse_8s_ease-in-out_infinite_alternate]" />
          </div>

          <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col items-center text-center animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              Eleva tu ecosistema Apple. <br />
              <span className="inline-flex flex-wrap justify-center mt-4 text-4xl md:text-6xl font-semibold text-foreground/70 gap-x-3">
                <span>Hecho para</span> <AnimatedText />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted max-w-2xl mb-10 mt-4">
              Accesorios premium con diseño minimalista.
              Protección en cada detalle.
            </p>
            <a
              href="#catalogo"
              className="bg-ola-blue text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-ola-blue-hover transition-all duration-300 hover:shadow-lg hover:shadow-ola-blue/25 hover:-translate-y-1"
            >
              Ver Catálogo
            </a>
          </div>
        </section>

        {/* Catalog Section */}
        <section id="catalogo" className="py-24 bg-background">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Línea Apple Pencil</h2>
              <p className="text-lg text-muted">Kits de puntas y protección. Diseñados para máxima precisión.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Link 
                href="/inventario"
                className="inline-flex items-center gap-2 text-ola-blue font-semibold hover:text-ola-blue-hover transition-colors text-lg"
              >
                Ver Inventario Completo <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* All Products Carousel Section */}
        <section className="py-20 bg-background border-t border-border/50 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-center">Explora el Ecosistema Completo</h2>
          </div>
          <InfiniteProductCarousel products={[...AVAILABLE_PRODUCTS, ...UPCOMING_PRODUCTS]} speed={0.8} />
        </section>

        {/* Upcoming Section */}
        <section className="py-24 bg-card-bg/50 border-t border-border/50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-16">
              <div className="inline-block bg-muted/10 text-muted px-3 py-1 rounded-full text-sm font-semibold tracking-wider uppercase mb-4">
                Próximos Lanzamientos
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Ecosistema de Expansión</h2>
              <p className="text-lg text-muted">Nuevos productos en camino. Muy pronto en OlaStudio.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {UPCOMING_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* OlaLabs Advertisement Section */}
        <section className="py-32 bg-ola-blue text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/waves.png')] opacity-10 mix-blend-overlay"></div>
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">¿Necesitas una web profesional?</h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
              OlaStudio es una rama de <strong className="text-white">OlaLabs</strong>. Somos expertos en crear experiencias digitales, aplicaciones web y diseño de software de clase mundial.
            </p>
            <a
              href="https://wa.me/50360505363?text=Hola%20OlaLabs!%20Me%20interesa%20crear%20una%20web"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-ola-blue px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-block"
            >
              Contacta con OlaLabs
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}
