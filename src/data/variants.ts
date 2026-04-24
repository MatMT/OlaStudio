export type ProductVariantMap = {
  [model: string]: string[]; // Model -> Array of Colors
};

export const productVariants: Record<string, ProductVariantMap> = {
  "OLA-AP-PRO": { // SKU del Kit Pro 360
    "Apple Pencil Pro": ["Negro", "Gris"],
    "Apple Pencil 2ª Gen": ["Negro"],
    "Apple Pencil 1ª Gen": ["Naranja"]
  },
  "OLA-AD-CAS": { // SKU de Estuches AirPods
    "AirPods 4": ["Blanco", "Negro"],
    "AirPods Pro 2 / Pro": ["Blanco", "Negro"]
  },
  "OLA-AP-ERG": { // Kit Ergonómico tiene variantes de color según el requerimiento
    "Universal": ["Gris", "Negro"]
  }
};
