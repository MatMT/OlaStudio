"use client";

import { useMemo } from "react";
import { CartItem, Product, useCart } from "@/context/CartContext";
import { AVAILABLE_PRODUCTS, UPCOMING_PRODUCTS, LOOSE_PRODUCTS } from "@/data/products";
import {
  PRODUCT_HIERARCHY,
  CART_UPSELL_MAP,
  DEFAULT_SUGGESTIONS,
} from "@/data/upsellConfig";

export function useUpsell() {
  const { items, addToCart, removeFromCart } = useCart();

  // Resolve the highest-tier item in the cart to base suggestions on
  const primaryItem = useMemo((): CartItem | null => {
    if (items.length === 0) return null;
    let highestTier = 0;
    let primary = items[items.length - 1];
    items.forEach((item) => {
      const tier = PRODUCT_HIERARCHY[item.id] ?? 0;
      if (tier > highestTier) {
        highestTier = tier;
        primary = item;
      }
    });
    return primary;
  }, [items]);

  // Compute suggested product objects from the upsell map
  const suggestedProducts = useMemo((): Product[] => {
    if (!primaryItem) return [];

    const recommendedIds =
      CART_UPSELL_MAP[primaryItem.id] ?? DEFAULT_SUGGESTIONS;

    const allProducts = [
      ...AVAILABLE_PRODUCTS,
      ...UPCOMING_PRODUCTS,
      ...LOOSE_PRODUCTS,
    ];
    const cartIds = new Set(items.map((item) => item.id));

    return recommendedIds
      .filter((id) => !cartIds.has(id))
      .map((id) => allProducts.find((p) => p.id === id))
      .filter((p): p is Product => p !== undefined)
      .slice(0, 2);
  }, [primaryItem, items]);

  // Add a suggested product, removing any inferior Apple Pencil kit/accessory first
  const handleAddSuggestedProduct = (product: Product) => {
    const addedTier = PRODUCT_HIERARCHY[product.id] ?? 0;

    if (addedTier > 0) {
      items.forEach((item) => {
        const itemTier = PRODUCT_HIERARCHY[item.id] ?? 0;
        if (itemTier > 0 && itemTier < addedTier) {
          removeFromCart(item.cartItemId);
        }
      });
    }

    addToCart(product);
  };

  return { suggestedProducts, handleAddSuggestedProduct };
}
