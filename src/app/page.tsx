import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { Product } from "@/context/CartContext";

const AVAILABLE_PRODUCTS: Product[] = [
  {
    id: "ap-bas",
    name: "Kit Básico (4 Piezas)",
    description: "El repuesto esencial. Incluye 2 puntas premium blancas y 2 protectores de silicona silenciosos. Ideal para reemplazos rápidos y protección de pantalla.",
    price: 8.00,
    sku: "OLA-AP-BAS",
    available: true,
  },
  {
    id: "ap-erg",
    name: "Kit Ergonómico (5 Piezas)",
    description: "Balance perfecto para creadores. Incluye 1 grip de silicona para evitar fatiga, 2 puntas premium y 2 protectores de silicona.",
    price: 12.00,
    sku: "OLA-AP-ERG",
    available: true,
  },
  {
    id: "ap-pro",
    name: "Kit Pro 360° (9 Piezas)",
    description: "Blindaje y protección total. Incluye 1 funda completa de silicona (compatible con carga magnética), 4 puntas premium y 4 protectores de silicona.",
    price: 18.00,
    sku: "OLA-AP-PRO",
    available: true,
  },
];

const UPCOMING_PRODUCTS: Product[] = [
  {
    id: "ms-wal",
    name: "MagSafe Wallet (Cartera Magnética)",
    description: "Tarjetero magnético premium de diseño ultradelgado para iPhone. Excelente fuerza de adherencia, ideal para llevar lo esencial.",
    price: 10.00,
    sku: "OLA-MS-WAL",
    available: false,
  },
  {
    id: "ad-cas",
    name: "Estuche de Protección para AirPods",
    description: "Funda protectora de silicona con cordón creativo para AirPods. Protege contra impactos y rayones. Colores oscuros.",
    price: 10.00,
    sku: "OLA-AD-CAS",
    available: false,
  },
  {
    id: "ip-cov",
    name: "Funda Smart Cover para iPad",
    description: "Funda protectora inteligente para iPad con tapa plegable y soporte. Protege el equipo al 100% mientras permite diferentes ángulos de visión.",
    price: 18.00,
    sku: "OLA-IP-COV",
    available: false,
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background pt-24 pb-32">
          <div className="absolute inset-0 bg-gradient-to-b from-ola-blue/5 to-transparent pointer-events-none" />
          <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col items-center text-center animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
              Eleva tu ecosistema.
            </h1>
            <p className="text-xl md:text-2xl text-muted max-w-2xl mb-10">
              Accesorios premium diseñados para creadores. 
              Minimalismo y protección en cada detalle.
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {AVAILABLE_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
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
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}
