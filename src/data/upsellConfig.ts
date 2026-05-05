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

// ─── Upgrade Replaces Map ─────────────────────────────────────────────────────
// When a customer accepts an upsell to the KEY product,
// remove ALL of the listed product IDs from the cart (because the kit already includes them).
// This is additive on top of the tier-based removal in useUpsell.
export const UPGRADE_REPLACES: Record<string, string[]> = {
  "ap-pro":  ["ap-funda", "ap-grip", "ap-anc", "ap-bas", "ap-erg"], // Kit Pro includes funda + grip + tips
  "ap-erg":  ["ap-grip", "ap-anc", "ap-bas"],                        // Kit Erg includes grip + tips
  "ap-bas":  ["ap-anc"],                                              // Kit Básico includes puntas sueltas
};

// ─── Cart Upsell Matrix ───────────────────────────────────────────────────────
// Defines which product IDs to suggest in the cart drawer for each primary product.
// Rules:
// - ap-funda in cart  → upgrade to Kit Pro 360° (it already includes the funda)
// - ap-grip in cart   → upgrade to Kit Ergonómico (it already includes the grip)
// - Once at Kit Pro (tier 4), only suggest non-kit extras (wallet, iPad cover)
// - Once at Kit Erg (tier 3), suggest Kit Pro upgrade OR one accessory
export const CART_UPSELL_MAP: Record<string, string[]> = {
  // ── Loose accessories ─────────────────────────────────────────────────────
  "ap-funda": ["ap-pro"],             // Funda suelta → upgrade a Kit Pro 360° (ya incluye la funda)
  "ap-grip":  ["ap-erg"],             // Grip suelto  → upgrade a Kit Ergonómico (ya incluye el grip)
  "ap-anc":   ["ap-bas", "ap-erg"],   // Puntas sueltas → Kit Básico o Kit Ergonómico
  // ── Kits ─────────────────────────────────────────────────────────────────
  "ap-bas":   ["ap-erg", "ap-pro"],   // Kit Básico → Kit Ergonómico → Kit Pro
  "ap-erg":   ["ap-pro", "ip-cov"],   // Kit Ergonómico → Kit Pro, luego extras
  "ap-pro":   ["ip-cov", "ms-wal"],   // Kit Pro (top) → solo accesorios extra
  // ── Accesorios extra ─────────────────────────────────────────────────────
  "ip-cov":   ["ms-wal", "ad-cas"],   // Funda iPad → Wallet o Estuche AirPods
  "ms-wal":   ["ad-cas", "ip-cov"],   // MagSafe Wallet → Estuche AirPods o Funda iPad
  "ad-cas":   ["ms-wal"],             // Estuche AirPods → MagSafe Wallet
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
    title: "Te recomendamos: Kit Pro 360° ($18.00)",
    items: ["1x Funda completa de silicona", "4x Puntas Blancas", "4x Protectores de pantalla"],
    targetId: "ap-pro",
  },
};
