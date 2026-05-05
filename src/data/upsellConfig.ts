/**
 * Upsell Configuration — Graph-node model
 *
 * Single source of truth: declare each product as a node in the upgrade graph.
 * PRODUCT_HIERARCHY, CART_UPSELL_MAP and UPGRADE_REPLACES are all derived
 * automatically — you only ever edit ONE place to add or change a product.
 *
 * Node shape:
 *   tier        — 0 = accessory branch (no kit hierarchy), 1-4 = kit ladder
 *   upgradeTo   — ordered list of product IDs to suggest next (graph edges)
 *   replaces    — IDs to remove from cart when THIS node is accepted as an upgrade
 *                 (items whose functionality this kit already covers)
 */

// ─── Graph ────────────────────────────────────────────────────────────────────

export type ProductNode = {
  id: string;
  tier: number;
  upgradeTo: string[];
  replaces: string[];
};

export const PRODUCT_GRAPH: ProductNode[] = [
  // ── Loose accessories (tier 1) ──────────────────────────────────────────────
  {
    id: "ap-funda",
    tier: 1,
    upgradeTo: ["ap-pro"],              // Funda suelta → Kit Pro 360° (ya la incluye)
    replaces:  [],
  },
  {
    id: "ap-grip",
    tier: 1,
    upgradeTo: ["ap-erg"],              // Grip suelto → Kit Ergonómico (ya lo incluye)
    replaces:  [],
  },
  {
    id: "ap-anc",
    tier: 1,
    upgradeTo: ["ap-bas", "ap-erg"],    // Puntas sueltas → Kit Básico o Ergonómico
    replaces:  [],
  },

  // ── Kits (tier 2-4) ─────────────────────────────────────────────────────────
  {
    id: "ap-bas",
    tier: 2,
    upgradeTo: ["ap-erg", "ap-pro"],    // Kit Básico → Kit Ergonómico → Kit Pro
    replaces:  ["ap-anc"],              // ya incluye las puntas sueltas
  },
  {
    id: "ap-erg",
    tier: 3,
    upgradeTo: ["ap-pro", "ip-cov"],    // Kit Ergonómico → Kit Pro, luego extras
    replaces:  ["ap-grip", "ap-anc", "ap-bas"],
  },
  {
    id: "ap-pro",
    tier: 4,
    upgradeTo: ["ip-cov", "ms-wal"],    // Kit Pro (tope) → solo accesorios extra
    replaces:  ["ap-funda", "ap-grip", "ap-anc", "ap-bas", "ap-erg"],
  },

  // ── Extra accessories (tier 0 — rama independiente) ─────────────────────────
  {
    id: "ip-cov",
    tier: 0,
    upgradeTo: ["ms-wal", "ad-cas"],
    replaces:  [],
  },
  {
    id: "ms-wal",
    tier: 0,
    upgradeTo: ["ad-cas", "ip-cov"],
    replaces:  [],
  },
  {
    id: "ad-cas",
    tier: 0,
    upgradeTo: ["ms-wal"],
    replaces:  [],
  },
];

// ─── Derived lookup tables (auto-generated — do not edit manually) ─────────────

/** tier number for each product id */
export const PRODUCT_HIERARCHY: Record<string, number> = Object.fromEntries(
  PRODUCT_GRAPH.map((n) => [n.id, n.tier])
);

/** which products to suggest next, per primary cart product */
export const CART_UPSELL_MAP: Record<string, string[]> = Object.fromEntries(
  PRODUCT_GRAPH.map((n) => [n.id, n.upgradeTo])
);

/** which cart items to remove when a product is accepted as an upgrade */
export const UPGRADE_REPLACES: Record<string, string[]> = Object.fromEntries(
  PRODUCT_GRAPH.map((n) => [n.id, n.replaces])
);

/** fallback suggestions when primaryItem has no node in the graph */
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

