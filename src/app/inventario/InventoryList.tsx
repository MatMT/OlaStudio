"use client";

import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/context/CartContext";
import { useInventory, SortType, TabType } from "@/hooks/useInventory";

interface InventoryListProps {
  kits: Product[];
  sueltos: Product[];
  ecosistema: Product[];
}

const TABS: { key: TabType; label: string }[] = [
  { key: "kits",       label: "Kits Apple Pencil" },
  { key: "sueltos",    label: "Accesorios Individuales" },
  { key: "ecosistema", label: "Ecosistema de Expansión" },
];

const SORT_OPTIONS: { value: SortType; label: string }[] = [
  { value: "default",    label: "Recomendados" },
  { value: "price-asc",  label: "Menor Precio" },
  { value: "price-desc", label: "Mayor Precio" },
  { value: "alpha-asc",  label: "Alfabético (A-Z)" },
];

export function InventoryList({ kits, sueltos, ecosistema }: InventoryListProps) {
  const { activeTab, setActiveTab, sortType, setSortType, sortedProducts, currentCount } =
    useInventory({ kits, sueltos, ecosistema });

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6 border-b border-border/50 pb-4">

        {/* Tabs */}
        <div className="flex flex-wrap w-full md:w-auto gap-2">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 md:flex-none whitespace-nowrap px-4 md:px-6 py-3 rounded-xl md:rounded-full font-semibold transition-all ${
                activeTab === key
                  ? "bg-ola-blue text-white shadow-lg shadow-ola-blue/30"
                  : "bg-muted/20 text-foreground/80 hover:bg-muted/30 border border-border/50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm font-medium text-muted">Ordenar por:</span>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value as SortType)}
            className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-ola-blue"
          >
            {SORT_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-muted">{currentCount} productos disponibles en esta categoría</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
