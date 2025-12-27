import { NeuralBackground } from "@/components/NeuralBackground";

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border pt-20 lg:pt-24 pb-8">
      <div className="absolute inset-0 opacity-10">
        <NeuralBackground />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:hidden mb-4">
          <span className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Pro Intelligentia Artificiali
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-4xl">{title}</h1>
        {subtitle && (
          <p className="text-xl text-muted-foreground max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
