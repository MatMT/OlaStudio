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
    includes: [
      "2x Puntas Premium Blancas",
      "2x Protectores de Silicona"
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
    includes: [
      "1x Grip de Silicona",
      "2x Puntas Premium",
      "2x Protectores de Silicona"
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
    includes: [
      "1x Funda Completa de Silicona",
      "4x Puntas Premium",
      "4x Protectores de Silicona"
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

export const LOOSE_PRODUCTS: Product[] = [
  {
    id: "ap-grip",
    name: "Grip Individual Apple Pencil",
    description: "Grip de silicona premium para Apple Pencil. Mejora el agarre y previene la fatiga durante largas sesiones de dibujo o escritura.",
    price: 6.00,
    sku: "OLA-AP-GRIP",
    image: "/products/ap-grip/1.png",
    images: [
      "/products/ap-grip/1.png"
    ],
    available: true,
  },
  {
    id: "ap-funda",
    name: "Funda Individual Apple Pencil",
    description: "Funda completa de silicona que protege tu Apple Pencil contra caídas y rayones. Mantiene la compatibilidad con carga magnética.",
    price: 7.00,
    sku: "OLA-AP-FUNDA",
    image: "/products/ap-funda/1.png",
    images: [
      "/products/ap-funda/1.png"
    ],
    available: true,
  },
  {
    id: "ap-anc",
    name: "2 Puntas Blancas de Repuesto",
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
