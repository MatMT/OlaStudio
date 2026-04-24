import { Product } from "@/context/CartContext";

export const AVAILABLE_PRODUCTS: Product[] = [
  {
    id: "ap-bas",
    name: "Kit Básico (4 Piezas)",
    description: "El repuesto esencial. Incluye 2 puntas premium blancas y 2 protectores de silicona silenciosos. Ideal para reemplazos rápidos y protección de pantalla.",
    price: 8.00,
    sku: "OLA-AP-BAS",
    image: "/products/kit-basico.jpeg",
    available: true,
  },
  {
    id: "ap-erg",
    name: "Kit Ergonómico (5 Piezas)",
    description: "Balance perfecto para creadores. Incluye 1 grip de silicona para evitar fatiga, 2 puntas premium y 2 protectores de silicona.",
    price: 12.00,
    sku: "OLA-AP-ERG",
    image: "/products/kit-ergonomico.jpeg",
    available: true,
  },
  {
    id: "ap-pro",
    name: "Kit Pro 360° (9 Piezas)",
    description: "Blindaje y protección total. Incluye 1 funda completa de silicona (compatible con carga magnética), 4 puntas premium y 4 protectores de silicona.",
    price: 18.00,
    sku: "OLA-AP-PRO",
    image: "/products/kit-pro.jpeg",
    available: true,
  },
  {
    id: "ap-anc",
    name: "Kit Puntas Anclas",
    description: "Puntas especiales de repuesto con diseño de ancla para un agarre superior y trazos de precisión inigualable.",
    price: 5.00,
    sku: "OLA-AP-ANC",
    image: "/products/puntas.jpeg",
    available: true,
  }
];

export const UPCOMING_PRODUCTS: Product[] = [
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
