"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const WHATSAPP_NUMBER = "50360505363"; // Placeholder El Salvador number

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    let message = "¡Hola OlaStudio! 👋 Me gustaría realizar el siguiente pedido:\n\n";

    items.forEach((item) => {
      message += `- ${item.quantity}x ${item.name} (SKU: ${item.sku}) - $${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Total aproximado: $${totalPrice.toFixed(2)}*\n\n`;
    message += "¿Me podrían confirmar disponibilidad y métodos de pago?";

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

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
              <p>Tu carrito está vacío.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-border/50 pb-6 last:border-0 last:pb-0">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted mb-2">SKU: {item.sku}</p>
                  <p className="font-semibold text-ola-blue">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-muted hover:text-red-500 transition-colors"
                  >
                    Eliminar
                  </button>

                  <div className="flex items-center gap-3 bg-background rounded-full border border-border px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:text-ola-blue transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm w-4 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:text-ola-blue transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-border bg-background/50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium">Total</span>
              <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-ola-blue text-white rounded-full font-semibold hover:bg-ola-blue-hover transition-colors shadow-lg shadow-ola-blue/20"
            >
              Comprar por WhatsApp
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
