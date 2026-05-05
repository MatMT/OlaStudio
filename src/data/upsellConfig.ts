/**
 * Upsell Configuration
 *
 * This file centralizes all upsell/cross-sell logic for the store.
 * To update recommendations, edit the maps below — no need to touch component code.
 */

// ─── Hierarchy ────────────────────────────────────────────────────────────────
// Used to determine which product is "superior" to another.
// When a customer accepts an upsell, all cart items with a lower tier are removed.
export const PRODUCT_HIERARCHY: Record<string, number> = {
  "ap-pro":   4,  // Kit Pro 360°
  "ap-erg":   3,  // Kit Ergonómico
  "ap-bas":   2,  // Kit Básico
  "ip-cov":   2,  // Funda Smart Cover (iPad — same tier, different category)
  "ap-anc":   1,  // 2 Puntas Blancas (suelto)
  "ap-grip":  1,  // Grip Individual (suelto)
  "ap-funda": 1,  // Funda Individual (suelto)
};

// ─── Cart Upsell Matrix ───────────────────────────────────────────────────────
// Defines which product IDs to suggest in the cart drawer for each primary product.
// Rules:
// - Max 2 suggestions for the first upsell.
// - Once the customer has reached tier 4 (Kit Pro), suggest only 1 accessory.
// - After 2 accepted upsells, no more suggestions are shown (controlled in useUpsell).
export const CART_UPSELL_MAP: Record<string, string[]> = {
  "ap-anc":   ["ap-bas", "ap-erg"],   // Puntas → Kit Básico, Kit Ergonómico
  "ap-grip":  ["ap-erg", "ms-wal"],   // Grip → Kit Ergonómico, MagSafe Wallet
  "ap-funda": ["ap-pro", "ap-bas"],   // Funda → Kit Pro, Kit Básico
  "ap-erg":   ["ap-pro", "ip-cov"],   // Kit Ergonómico → Kit Pro, Funda iPad
  "ap-pro":   ["ip-cov"],             // Kit Pro (top) → Solo 1 accesorio
  "ip-cov":   ["ap-pro", "ap-anc"],   // Funda iPad → Kit Pro, Puntas
  "ms-wal":   ["ad-cas"],             // MagSafe → Estuche AirPods
  "ad-cas":   ["ms-wal"],             // AirPods → MagSafe
};

// Default suggestions if the primary product has no specific mapping
export const DEFAULT_SUGGESTIONS: string[] = ["ap-pro", "ap-erg"];

// ─── Product Page Upsell ──────────────────────────────────────────────────────
// Defines the upsell badge shown on individual product pages.
export type ProductPageUpsell = {
  title: string;
  items: string[];   // bullet points for the badge
  targetId: string;  // product page to link to
};

export const PRODUCT_PAGE_UPSELL_MAP: Record<string, ProductPageUpsell> = {
  "ap-anc": {
    title: "Te recomendamos: Kit Básico ($8.00)",
    items: ["2x Puntas Blancas", "2x Protectores de pantalla silenciosos"],
    targetId: "ap-bas",
  },
  "ap-grip": {
    title: "Te recomendamos: Kit Ergonómico ($12.00)",
    items: ["1x Grip de silicona", "2x Puntas Blancas", "2x Protectores de pantalla"],
    targetId: "ap-erg",
  },
  "ap-funda": {
    title: "Te recomendamos: Kit Pro ($18.00)",
    items: ["1x Funda completa de silicona", "4x Puntas Blancas", "4x Protectores de pantalla"],
    targetId: "ap-pro",
  },
};
