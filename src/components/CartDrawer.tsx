"use client";

import { X, Minus, Plus, ShoppingBag, Truck, Wallet, Info } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState, useRef, useEffect } from "react";

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
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, totalPrice } = useCart();
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

  if (!isCartOpen) return null;

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
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Tu Carrito
          </h2>
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
                      <h3 className="font-semibold text-lg text-foreground mb-1">{item.name}</h3>
                      {(item.variantModel && item.variantColor) && (
                        <p className="text-sm text-muted font-medium mb-1">
                          Para: {item.variantModel} | Color: {item.variantColor}
                        </p>
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
