"use client";

import Link from "next/link";
import { Sparkles, Wand2 } from "lucide-react";

type UpsellBadgeProps = {
  productId: string;
};

export function UpsellBadge({ productId }: UpsellBadgeProps) {
  let title = "";
  let message = "";
  let targetId = "";

  if (productId === "ap-anc") {
    title = "Te recomendamos: Kit Básico ($8.00)";
    message = "Incluye:\n• 2x Puntas Blancas\n• 2x Protectores de pantalla silenciosos";
    targetId = "ap-bas";
  } else if (productId === "ap-grip") {
    title = "Te recomendamos: Kit Ergonómico ($12.00)";
    message = "Incluye:\n• 1x Grip de silicona\n• 2x Puntas Blancas\n• 2x Protectores de pantalla";
    targetId = "ap-erg";
  } else if (productId === "ap-funda") {
    title = "Te recomendamos: Kit Pro ($18.00)";
    message = "Incluye:\n• 1x Funda completa de silicona\n• 4x Puntas Blancas\n• 4x Protectores de pantalla";
    targetId = "ap-pro";
  }

  if (!title) return null;

  return (
    <div className="relative mt-4 mb-8">
      {/* Background glowing effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-ola-blue/60 via-purple-500/60 to-cyan-400/60 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
      
      {/* Container */}
      <div className="relative bg-card-bg border border-white/10 p-5 rounded-3xl shadow-2xl flex flex-col items-start gap-4">
        
        <div className="text-sm font-medium text-foreground leading-relaxed">
          <p className="mb-2" dangerouslySetInnerHTML={{ __html: title.replace(/\$(\d+\.\d{2})/g, '<strong>$$$1</strong>') }}></p>
          <ul className="space-y-1 text-muted">
            {message.split('\n').map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>

        <Link 
          href={`/producto/${targetId}`}
          className="relative flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-ola-blue focus:ring-offset-2 focus:ring-offset-background hover:scale-[1.02] transition-transform w-full"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background/95 px-6 py-1 text-sm font-semibold text-foreground backdrop-blur-3xl gap-2">
            <Wand2 className="w-4 h-4 text-purple-400" />
            Mejorar mi compra
          </span>
        </Link>
      </div>
    </div>
  );
}
