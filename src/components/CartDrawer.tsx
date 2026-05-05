"use client";

import { X, Minus, Plus, ShoppingBag, Truck, Wallet, Info, Sparkles, Trash2, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useUpsell } from "@/hooks/useUpsell";
import { useCheckout, DELIVERY_OPTIONS } from "@/hooks/useCheckout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const { suggestedProducts, handleAddSuggestedProduct } = useUpsell();
  const [isUpsellOpen, setIsUpsellOpen] = useState(false);
  const {
    selectedDelivery, setSelectedDelivery,
    selectedPayment,  setSelectedPayment,
    isPendingShipping, requiresPayment, finalTotal,
    isReadyToCheckout, handleCheckout, paymentRef,
  } = useCheckout();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-card-bg shadow-2xl z-50 flex flex-col animate-[slide-left_0.3s_ease-out]">

        {/* Header */}
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

        {/* Body */}
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
                  <div key={item.cartItemId} className="flex gap-6 border-b border-border/50 pb-8 last:border-0 last:pb-0">
                    <div className="flex-1">
                      <Link
                        href={`/producto/${item.id}`}
                        className="hover:text-ola-blue transition-colors block"
                        onClick={() => setIsCartOpen(false)}
                      >
                        <h3 className="font-semibold text-lg text-foreground mb-1">{item.name}</h3>
                      </Link>

                      {item.variantModel && item.variantColor && (
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
                        <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="p-1 hover:text-ola-blue transition-colors">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-base w-6 text-center font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="p-1 hover:text-ola-blue transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Completa tu Setup — Collapsible Upsell */}
              {suggestedProducts.length > 0 && (
                <div className="mt-2 mb-4">
                  {/* Trigger button — glowing border via box-shadow */}
                  <button
                    onClick={() => setIsUpsellOpen((prev) => !prev)}
                    style={{
                      boxShadow: isUpsellOpen
                        ? "0 0 0 1.5px #8b5cf6, 0 0 16px 2px rgba(139,92,246,0.35), 0 0 32px 4px rgba(59,130,246,0.2)"
                        : "0 0 0 1px rgba(139,92,246,0.4)",
                    }}
                    className="w-full flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-ola-blue/10 via-purple-500/10 to-cyan-400/10 hover:from-ola-blue/15 hover:via-purple-500/15 hover:to-cyan-400/15 transition-all duration-300 group"
                  >
                    <span className="flex items-center gap-2 font-semibold text-sm text-foreground">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      Mejorar mi compra
                      <span className="text-xs font-normal text-muted bg-muted/20 px-2 py-0.5 rounded-full">
                        {suggestedProducts.length} sugerencia{suggestedProducts.length > 1 ? "s" : ""}
                      </span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted transition-transform duration-300 ${isUpsellOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Collapsible panel — glow via ring + shadow, no overflow-hidden conflict */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isUpsellOpen ? "max-h-[400px] opacity-100 mt-3" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                    style={{ overflow: isUpsellOpen ? "visible" : "hidden" }}
                  >
                    <div
                      className="rounded-2xl p-4 bg-card-bg/95 backdrop-blur-sm flex flex-col gap-3"
                      style={{
                        boxShadow:
                          "0 0 0 1.5px rgba(139,92,246,0.5), 0 0 24px 4px rgba(139,92,246,0.2), 0 0 48px 8px rgba(59,130,246,0.1)",
                      }}
                    >
                      {suggestedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex gap-4 items-center bg-background border border-border p-3 rounded-xl hover:border-ola-blue/50 transition-colors"
                        >
                          <div className="relative w-14 h-14 bg-muted/10 rounded-lg shrink-0">
                            {product.image && (
                              <Image src={product.image} alt={product.name} fill className="object-cover rounded-lg" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-foreground truncate">{product.name}</p>
                            <p className="text-sm font-bold text-ola-blue">${product.price.toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => handleAddSuggestedProduct(product)}
                            className="bg-ola-blue/10 hover:bg-ola-blue hover:text-white text-ola-blue p-2 rounded-full transition-colors shrink-0"
                            aria-label={`Agregar ${product.name}`}
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
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border cursor-pointer transition-all gap-2 sm:gap-4 ${
                        selectedDelivery?.id === option.id
                          ? "border-ola-blue bg-ola-blue/5"
                          : "border-border/60 hover:border-border"
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
                    {["Banco Agrícola", "Banco Cuscatlán", "Chivo Wallet"].map((payment) => (
                      <label
                        key={payment}
                        className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all gap-3 ${
                          selectedPayment === payment
                            ? "border-ola-blue bg-ola-blue/5"
                            : "border-border/60 hover:border-border"
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

        {/* Footer / Checkout */}
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
                  {selectedDelivery.id === "dep"
                    ? "Pendiente"
                    : selectedDelivery.price === 0
                    ? "Gratis"
                    : `$${selectedDelivery.price.toFixed(2)}`}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center mt-4 mb-8 pt-4 border-t border-border/50">
              <span className="text-xl font-medium">Total a pagar</span>
              <span className="text-2xl md:text-3xl font-bold text-ola-blue text-right">
                {isPendingShipping
                  ? <span className="text-xl">${totalPrice.toFixed(2)} + Envío</span>
                  : `$${finalTotal.toFixed(2)}`}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={!isReadyToCheckout}
              className={`w-full hover:cursor-pointer py-5 text-lg text-white rounded-full font-bold transition-all shadow-lg ${
                isReadyToCheckout
                  ? "bg-ola-blue hover:bg-ola-blue-hover shadow-ola-blue/20"
                  : "bg-muted cursor-not-allowed opacity-70 shadow-none"
              }`}
            >
              {!selectedDelivery
                ? "Selecciona un método de envío"
                : requiresPayment && !selectedPayment
                ? "Selecciona método de pago"
                : "Pedir por WhatsApp"}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-left {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
