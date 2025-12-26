import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export function Section({ children, className, dark = false }: SectionProps) {
  return (
    <section className={cn(
      "py-20 md:py-32 px-4 sm:px-6 lg:px-8",
      dark ? "bg-foreground text-background" : "bg-background text-foreground",
      className
    )}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}
