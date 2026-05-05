import { Product } from "@/context/CartContext";

export const AVAILABLE_PRODUCTS: Product[] = [
  {
    id: "ap-bas",
    name: "Kit Básico (4 Piezas)",
    description: "El repuesto esencial. Incluye 2 puntas premium blancas y 2 protectores de silicona silenciosos. Ideal para reemplazos rápidos y protección de pantalla.",
    price: 8.00,
    sku: "OLA-AP-BAS",
    image: "/products/ap-bas/1.jpeg",
    images: [
      "/products/ap-bas/1.jpeg",
      "/products/ap-bas/2.avif",
      "/products/ap-bas/3.avif"
    ],
    available: true,
  },
  {
    id: "ap-erg",
    name: "Kit Ergonómico (5 Piezas)",
    description: "Balance perfecto para creadores. Incluye 1 grip de silicona para evitar fatiga, 2 puntas premium y 2 protectores de silicona.",
    price: 12.00,
    sku: "OLA-AP-ERG",
    image: "/products/ap-erg/1.jpeg",
    images: [
      "/products/ap-erg/1.jpeg"
    ],
    available: true,
  },
  {
    id: "ap-pro",
    name: "Kit Pro 360° (9 Piezas)",
    description: "Blindaje y protección total. Incluye 1 funda completa de silicona (compatible con carga magnética), 4 puntas premium y 4 protectores de silicona.",
    price: 18.00,
    sku: "OLA-AP-PRO",
    image: "/products/ap-pro/1.jpeg",
    images: [
      "/products/ap-pro/1.jpeg",
      "/products/ap-pro/2.jpeg",
      "/products/ap-pro/3.avif",
      "/products/ap-pro/4.avif"
    ],
    available: true,
  },
  {
    id: "ap-anc",
    name: "Kit Puntas Anclas",
    description: "Puntas especiales de repuesto con diseño de ancla para un agarre superior y trazos de precisión inigualable.",
    price: 5.00,
    sku: "OLA-AP-ANC",
    image: "/products/ap-anc/1.jpeg",
    images: [
      "/products/ap-anc/1.jpeg"
    ],
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
    image: "/products/ms-wal/1.jpeg",
    images: [
      "/products/ms-wal/1.jpeg",
      "/products/ms-wal/2.avif"
    ],
    available: true,
  },
  {
    id: "ad-cas",
    name: "Estuche de Protección para AirPods",
    description: "Funda protectora de silicona con cordón creativo para AirPods. Protege contra impactos y rayones. Compatible con AirPods Pro (1ª y 2ª Gen) y AirPods 4.",
    price: 10.00,
    sku: "OLA-AD-CAS",
    image: "/products/ad-cas/1.avif",
    images: [
      "/products/ad-cas/1.avif",
      "/products/ad-cas/2.png"
    ],
    available: true,
  },
  {
    id: "ip-cov",
    name: "Funda Smart Cover para iPad",
    description: "Funda protectora inteligente con tapa plegable y soporte. Diseño bicolor: trasera transparente y delantera negra. Compatible exclusivamente con iPad Mini (6ª y 7ª Generación).",
    price: 18.00,
    sku: "OLA-IP-COV",
    image: "/products/ip-cov/1.avif",
    images: [
      "/products/ip-cov/1.avif",
      "/products/ip-cov/2.avif",
      "/products/ip-cov/3.avif"
    ],
    available: true,
  },
];
