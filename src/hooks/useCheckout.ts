"use client";

import { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";

const WHATSAPP_NUMBER = "50360505363";

export type DeliveryOption = {
  id: string;
  name: string;
  price: number;
  label: string;
};

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  { id: "pickup", name: "Punto de Encuentro (Soyapango / UDB)", price: 0, label: "Gratis ($0.00)" },
  { id: "ss",     name: "Envío San Salvador y alrededores",     price: 2.50, label: "$2.50" },
  { id: "dep",    name: "Envío Departamental (Todo El Salvador)", price: 5.00, label: "(Solicita Cotización)" },
];

export function useCheckout() {
  const { items, totalPrice } = useCart();

  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption | null>(null);
  const [selectedPayment, setSelectedPayment]   = useState<string | null>(null);
  const paymentRef = useRef<HTMLDivElement>(null);

  const isPendingShipping = selectedDelivery?.id === "dep";
  const requiresPayment   = selectedDelivery?.id === "ss" || selectedDelivery?.id === "dep";
  const finalTotal        = totalPrice + (isPendingShipping ? 0 : selectedDelivery?.price ?? 0);

  // Auto-scroll to payment section when it first appears
  useEffect(() => {
    if (requiresPayment && paymentRef.current) {
      setTimeout(() => {
        paymentRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 150);
    }
  }, [requiresPayment, selectedDelivery]);

  const isReadyToCheckout =
    !!selectedDelivery && (!requiresPayment || !!selectedPayment);

  const handleCheckout = () => {
    if (!isReadyToCheckout) return;

    let message = "¡Hola OlaStudio! Me gustaría realizar el siguiente pedido:\n\n";

    items.forEach((item) => {
      const variantStr =
        item.variantModel && item.variantColor
          ? ` (Para: ${item.variantModel} | Color: ${item.variantColor})`
          : "";
      message += `- ${item.quantity}x ${item.name}${variantStr} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\nSubtotal: $${totalPrice.toFixed(2)}\n`;

    if (isPendingShipping) {
      message += `Método de Entrega: ${selectedDelivery!.name} (Cotización Pendiente)\n`;
      if (requiresPayment) message += `Método de Pago: ${selectedPayment}\n`;
      message += `Total a pagar: $${totalPrice.toFixed(2)} + Envío cotizado\n\n`;
    } else {
      message += `Método de Entrega: ${selectedDelivery!.name} ($${selectedDelivery!.price.toFixed(2)})\n`;
      if (requiresPayment) message += `Método de Pago: ${selectedPayment}\n`;
      message += `Total a pagar: $${finalTotal.toFixed(2)}\n\n`;
    }

    message += "¿Me podrían confirmar disponibilidad para coordinar el pago?";

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return {
    selectedDelivery,
    setSelectedDelivery,
    selectedPayment,
    setSelectedPayment,
    isPendingShipping,
    requiresPayment,
    finalTotal,
    isReadyToCheckout,
    handleCheckout,
    paymentRef,
  };
}
