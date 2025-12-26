import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { Shield } from "lucide-react";

export function Footer() {
  const { language } = useLanguage();
  const p = (path: string) => `/${language}${path}`;

  return (
    <footer className="bg-secondary/50 border-t border-border pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href={p("/")} className="flex items-center space-x-2 group cursor-pointer mb-6">
              <Shield className="w-6 h-6 text-primary" strokeWidth={2} />
              <span className="text-lg font-bold tracking-tight uppercase">Autonomia Digitale</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Associazione no-profit per l'indipendenza tecnologica e la sovranità digitale.
            </p>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider mb-6 text-sm">Organizzazione</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href={p("/mission")} className="hover:text-primary transition-colors">Chi Siamo</Link></li>
              <li><Link href={p("/projects")} className="hover:text-primary transition-colors">Progetti</Link></li>
              <li><Link href={p("/contact")} className="hover:text-primary transition-colors">Contatti</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider mb-6 text-sm">Risorse</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href={p("/blog")} className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href={p("/events")} className="hover:text-primary transition-colors">Eventi</Link></li>
              <li><Link href={p("/courses")} className="hover:text-primary transition-colors">Corsi</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider mb-6 text-sm">Legale</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><span className="block font-mono text-xs">UID: CHE-123.456.789</span></li>
              <li><span className="block font-mono text-xs">Reg. Nr: CH-123.4.567.890-1</span></li>
              <li><Link href={p("/privacy")} className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href={p("/terms")} className="hover:text-primary transition-colors">Termini di Servizio</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Associazione Autonomia Digitale. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-mono">Designed in Switzerland.</p>
        </div>
      </div>
    </footer>
  );
}
