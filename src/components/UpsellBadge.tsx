"use client";

import Link from "next/link";
import { Wand2 } from "lucide-react";
import { PRODUCT_PAGE_UPSELL_MAP } from "@/data/upsellConfig";

type UpsellBadgeProps = {
  productId: string;
};

export function UpsellBadge({ productId }: UpsellBadgeProps) {
  const upsell = PRODUCT_PAGE_UPSELL_MAP[productId];

  if (!upsell) return null;

  const { title, items, targetId } = upsell;

  // Bold the price in the title (e.g. $12.00 → <strong>$12.00</strong>)
  const titleHtml = title.replace(/\$(\d+\.\d{2})/g, "<strong>$$$1</strong>");

  return (
    <div className="relative mt-4 mb-8">
      {/* Glowing background */}
      <div className="absolute -inset-1 bg-gradient-to-r from-ola-blue/60 via-purple-500/60 to-cyan-400/60 rounded-3xl blur opacity-75 animate-pulse" />

      {/* Card */}
      <div className="relative bg-card-bg border border-white/10 p-5 rounded-3xl shadow-2xl flex flex-col items-start gap-4">
        <div className="text-sm font-medium text-foreground leading-relaxed w-full">
          <p className="mb-2" dangerouslySetInnerHTML={{ __html: titleHtml }} />
          <ul className="space-y-1 text-muted">
            {items.map((line, i) => (
              <li key={i}>• {line}</li>
            ))}
          </ul>
        </div>

        {/* Magic button */}
        <Link
          href={`/producto/${targetId}`}
          className="relative flex h-12 overflow-hidden rounded-full p-[1px] w-full hover:scale-[1.02] transition-transform focus:outline-none focus:ring-2 focus:ring-ola-blue focus:ring-offset-2 focus:ring-offset-background"
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
