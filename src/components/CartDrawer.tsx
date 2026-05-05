"use client";

import { X, Minus, Plus, ShoppingBag, Truck, Wallet, Info, Sparkles, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState, useRef, useEffect, useMemo } from "react";
import { AVAILABLE_PRODUCTS, UPCOMING_PRODUCTS, LOOSE_PRODUCTS } from "@/data/products";
import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = "50360505363";

type DeliveryOption = {
  id: string;
  name: string;
  price: number;
  label: string;
};

const DELIVERY_OPTIONS: DeliveryOption[] = [
  { id: 'pickup', name: 'Punto de Encuentro (Soyapango / UDB)', price: 0, label: 'Gratis ($0.00)' },
  { id: 'ss', name: 'Envío San Salvador y alrededores', price: 2.50, label: '$2.50' },
  { id: 'dep', name: 'Envío Departamental (Todo El Salvador)', price: 5.00, label: '(Solicita Cotización)' },
];

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, totalPrice, addToCart, clearCart } = useCart();
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const paymentRef = useRef<HTMLDivElement>(null);

  const isPendingShipping = selectedDelivery?.id === 'dep';
  const requiresPayment = selectedDelivery?.id === 'ss' || selectedDelivery?.id === 'dep';
  const finalTotal = totalPrice + (isPendingShipping ? 0 : (selectedDelivery?.price || 0));

  // Auto-scroll to payment selection when it appears
  useEffect(() => {
    if (requiresPayment && paymentRef.current) {
      setTimeout(() => {
        paymentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 150);
    }
  }, [requiresPayment, selectedDelivery]);

  // Suggested Products (Intelligent Upsell Logic Matrix)
  const suggestedProducts = useMemo(() => {
    if (items.length === 0) return [];
    
    // Define hierarchy to avoid suggesting inferior kits
    const hierarchy: Record<string, number> = {
      'ap-pro': 4,
      'ap-erg': 3,
      'ap-bas': 2,
      'ap-anc': 1,
      'ap-grip': 1,
      'ap-funda': 1
    };

    let highestTier = 0;
    let primaryItem = items[items.length - 1]; // default to last added
    
    items.forEach(item => {
      const tier = hierarchy[item.id] || 0;
      if (tier > highestTier) {
        highestTier = tier;
        primaryItem = item;
      }
    });

    let recommendedIds: string[] = [];

    switch (primaryItem.id) {
      case 'ap-anc': // Puntas Sueltas
        recommendedIds = ['ap-bas', 'ap-erg'];
        break;
      case 'ap-grip': // Grip Individual
        recommendedIds = ['ap-erg', 'ms-wal'];
        break;
      case 'ap-funda': // Funda Individual
        recommendedIds = ['ap-pro', 'ap-bas'];
        break;
      case 'ap-erg': // Kit Ergonómico
        recommendedIds = ['ap-pro', 'ip-cov'];
        break;
      case 'ap-pro': // Kit Pro 360
        // If they already reached the maximum kit (Kit Pro), only suggest 1 accessory.
        recommendedIds = ['ip-cov'];
        break;
      case 'ip-cov': // Funda Smart Cover iPad
        recommendedIds = ['ap-pro', 'ap-anc'];
        break;
      default:
        // Default suggestions if no match
        recommendedIds = ['ap-pro', 'ap-erg'];
        break;
    }

    const allProducts = [...AVAILABLE_PRODUCTS, ...UPCOMING_PRODUCTS, ...LOOSE_PRODUCTS];
    const cartIds = new Set(items.map(item => item.id));
    
    // Filter out items already in cart and return actual Product objects (max 2)
    return recommendedIds
      .filter(id => !cartIds.has(id))
      .map(id => allProducts.find(p => p.id === id))
      .filter(Boolean)
      .slice(0, 2);
  }, [items]);

  if (!isCartOpen) return null;

  const handleAddSuggestedProduct = (product: any) => {
    const itemsToRemove: string[] = [];
    const hierarchy: Record<string, number> = {
      'ap-pro': 4,
      'ap-erg': 3,
      'ap-bas': 2,
      'ap-anc': 1,
      'ap-grip': 1,
      'ap-funda': 1
    };
    
    const addedTier = hierarchy[product.id] || 0;
    if (addedTier > 0) {
      items.forEach(item => {
        const itemTier = hierarchy[item.id] || 0;
        // Remove any item that is an Apple Pencil product AND is a lower tier
        if (itemTier > 0 && itemTier < addedTier) {
          itemsToRemove.push(item.cartItemId);
        }
      });
    }

    itemsToRemove.forEach(id => removeFromCart(id));
    addToCart(product);
  };

  const handleCheckout = () => {
    if (!selectedDelivery || (requiresPayment && !selectedPayment)) return;

    let message = "¡Hola OlaStudio! Me gustaría realizar el siguiente pedido:\n\n";

    items.forEach((item) => {
      const variantStr = (item.variantModel && item.variantColor)
        ? ` (Para: ${item.variantModel} | Color: ${item.variantColor})`
        : "";
      message += `- ${item.quantity}x ${item.name}${variantStr} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\nSubtotal: $${totalPrice.toFixed(2)}\n`;

    if (isPendingShipping) {
      message += `Método de Entrega: ${selectedDelivery.name} (Cotización Pendiente)\n`;
      if (requiresPayment) message += `Método de Pago: ${selectedPayment}\n`;
      message += `Total a pagar: $${totalPrice.toFixed(2)} + Envío cotizado\n\n`;
    } else {
      message += `Método de Entrega: ${selectedDelivery.name} ($${selectedDelivery.price.toFixed(2)})\n`;
      if (requiresPayment) message += `Método de Pago: ${selectedPayment}\n`;
      message += `Total a pagar: $${finalTotal.toFixed(2)}\n\n`;
    }

    message += "¿Me podrían confirmar disponibilidad para coordinar el pago?";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-card-bg shadow-2xl z-50 flex flex-col animate-[slide-left_0.3s_ease-out]">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" /> Tu Carrito
            </h2>
            {items.length > 0 && (
              <button 
                onClick={clearCart}
                aria-label="Vaciar carrito"
                className="text-muted hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-500/10"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-muted/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted">
              <ShoppingBag className="w-20 h-20 mb-6 opacity-20" />
              <p className="text-lg">Tu carrito está vacío.</p>
            </div>
          ) : (
            <>
              {/* Product List */}
              <div className="flex flex-col gap-8">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-6 border-b border-border/50 pb-8 last:border-0 last:pb-0">
                    <div className="flex-1">
                      <Link href={`/producto/${item.id}`} className="hover:text-ola-blue transition-colors block" onClick={() => setIsCartOpen(false)}>
                        <h3 className="font-semibold text-lg text-foreground mb-1">{item.name}</h3>
                      </Link>
                      {(item.variantModel && item.variantColor) && (
                        <p className="text-sm text-muted font-medium mb-1">
                          Para: {item.variantModel} | Color: {item.variantColor}
                        </p>
                      )}
                      {item.includes && item.includes.length > 0 && (
                        <ul className="text-sm text-muted mb-2 space-y-1">
                          {item.includes.map((inc, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-ola-blue font-bold">•</span>
                              <span className="leading-tight">{inc}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <p className="text-sm text-muted mb-3">SKU: {item.sku}</p>
                      <p className="font-bold text-xl text-ola-blue">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-sm font-medium text-muted hover:text-red-500 transition-colors"
                      >
                        Eliminar
                      </button>

                      <div className="flex items-center gap-4 bg-background rounded-full border border-border px-3 py-2 mt-4">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1 hover:text-ola-blue transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-base w-6 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1 hover:text-ola-blue transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Completa tu Setup (Upsell) - Moved above Delivery Selection */}
              {suggestedProducts.length > 0 && (
                <div className="relative mt-2 mb-4">
                  {/* Glowing contour */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-ola-blue via-purple-500 to-cyan-400 rounded-2xl blur opacity-30 animate-pulse"></div>
                  <div className="relative border border-border/50 rounded-2xl p-5 bg-card-bg/90 backdrop-blur-sm shadow-xl">
                    <h3 className="font-bold text-base mb-4 text-foreground flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      Completa tu setup
                    </h3>
                    <div className="flex flex-col gap-4">
                      {suggestedProducts.map(product => (
                        <div key={product.id} className="flex gap-4 items-center bg-background border border-border p-3 rounded-xl hover:border-ola-blue/50 transition-colors">
                          <div className="relative w-16 h-16 bg-muted/10 rounded-lg shrink-0">
                            {product.image && (
                              <Image 
                                src={product.image} 
                                alt={product.name} 
                                fill 
                                className="object-cover rounded-lg"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-foreground truncate">{product.name}</p>
                            <p className="text-sm font-bold text-ola-blue">${product.price.toFixed(2)}</p>
                          </div>
                          <button 
                            onClick={() => handleAddSuggestedProduct(product)}
                            className="bg-ola-blue/10 hover:bg-ola-blue hover:text-white text-ola-blue p-2 rounded-full transition-colors shrink-0"
                            aria-label="Agregar"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Delivery Selection */}
              <div className="mt-4 border border-border rounded-2xl p-5 bg-background/50">
                <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                  <Truck className="w-5 h-5 text-ola-blue" />
                  Método de Entrega
                </h3>
                <div className="flex flex-col gap-3">
                  {DELIVERY_OPTIONS.map((option) => (
                    <label
                      key={option.id}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border cursor-pointer transition-all gap-2 sm:gap-4 ${selectedDelivery?.id === option.id
                        ? 'border-ola-blue bg-ola-blue/5'
                        : 'border-border/60 hover:border-border'
                        }`}
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <input
                          type="radio"
                          name="delivery"
                          value={option.id}
                          checked={selectedDelivery?.id === option.id}
                          onChange={() => setSelectedDelivery(option)}
                          className="w-4 h-4 mt-1 sm:mt-0 text-ola-blue accent-ola-blue shrink-0"
                        />
                        <span className="font-medium text-sm md:text-base break-words leading-tight">{option.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-muted sm:text-right shrink-0 ml-7 sm:ml-0">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Selection */}
              {requiresPayment && (
                <div ref={paymentRef} className="mt-4 border border-border rounded-2xl p-5 bg-background/50 animate-fade-in scroll-mt-24">
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                    <Wallet className="w-5 h-5 text-ola-blue" />
                    Método de Pago
                  </h3>
                  <div className="bg-muted/10 border border-border rounded-xl p-3 mb-4 flex items-start gap-3">
                    <Info className="w-4 h-4 text-ola-blue shrink-0 mt-0.5" />
                    <p className="text-sm text-muted font-medium leading-tight">
                      Pago anticipado requerido para asegurar tu producto en ruta.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {['Banco Agrícola', 'Banco Cuscatlán', 'Chivo Wallet'].map((payment) => (
                      <label
                        key={payment}
                        className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all gap-3 ${selectedPayment === payment
                          ? 'border-ola-blue bg-ola-blue/5'
                          : 'border-border/60 hover:border-border'
                          }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={payment}
                          checked={selectedPayment === payment}
                          onChange={() => setSelectedPayment(payment)}
                          className="w-4 h-4 text-ola-blue accent-ola-blue shrink-0"
                        />
                        <span className="font-medium text-sm md:text-base">{payment}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 border-t border-border bg-background/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg text-muted">Subtotal</span>
              <span className="text-xl font-medium">${totalPrice.toFixed(2)}</span>
            </div>
            {selectedDelivery && (
              <div className="flex justify-between items-center mb-2 animate-fade-in">
                <span className="text-lg text-muted">Envío</span>
                <span className="text-xl font-medium text-right max-w-[50%]">
                  {selectedDelivery.id === 'dep' ? 'Pendiente' : (selectedDelivery.price === 0 ? 'Gratis' : `$${selectedDelivery.price.toFixed(2)}`)}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center mt-4 mb-8 pt-4 border-t border-border/50">
              <span className="text-xl font-medium">Total a pagar</span>
              <span className="text-2xl md:text-3xl font-bold text-ola-blue text-right">
                {isPendingShipping ? (
                  <span className="text-xl">${totalPrice.toFixed(2)} + Envío</span>
                ) : (
                  `$${finalTotal.toFixed(2)}`
                )}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={!selectedDelivery || (requiresPayment && !selectedPayment)}
              className={`w-full hover:cursor-pointer py-5 text-lg text-white rounded-full font-bold transition-all shadow-lg ${selectedDelivery && (!requiresPayment || selectedPayment)
                ? 'bg-ola-blue hover:bg-ola-blue-hover shadow-ola-blue/20'
                : 'bg-muted cursor-not-allowed opacity-70 shadow-none'
                }`}
            >
              {!selectedDelivery
                ? 'Selecciona un método de envío'
                : (requiresPayment && !selectedPayment)
                  ? 'Selecciona método de pago'
                  : 'Pedir por WhatsApp'}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-left {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
