import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="font-semibold text-xl tracking-tight flex items-center gap-2 mb-2">
            <span className="text-ola-blue font-bold text-2xl">~</span>
            <span>OlaStudio</span>
          </Link>
          <p className="text-sm text-muted text-center md:text-left">
            Una rama de OlaLabs. Accesorios premium.
          </p>
        </div>
        
        <div className="text-sm text-muted flex items-center gap-6">
          <p>&copy; {new Date().getFullYear()} OlaStudio. El Salvador.</p>
        </div>
      </div>
    </footer>
  );
}
