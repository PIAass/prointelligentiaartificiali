import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";

interface CardProps {
  title: string;
  subtitle?: string;
  description: string;
  link?: string;
  linkText?: string;
  className?: string;
  date?: string;
}

export function Card({ title, subtitle, description, link, linkText = "Leggi di più", className, date }: CardProps) {
  const content = (
    <div className={cn(
      "h-full p-8 border border-border bg-white transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1 flex flex-col group",
      className
    )}>
      {date && (
        <span className="font-mono text-xs text-muted-foreground mb-4 block">
          {new Date(date).toLocaleDateString()}
        </span>
      )}
      {subtitle && (
        <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
          {subtitle}
        </h4>
      )}
      <h3 className="text-2xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground mb-8 flex-grow">
        {description}
      </p>
      
      {link && (
        <div className="flex items-center text-sm font-bold uppercase tracking-wide mt-auto group-hover:underline">
          {linkText} <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      )}
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block h-full cursor-pointer">
        {content}
      </Link>
    );
  }

  return content;
}
