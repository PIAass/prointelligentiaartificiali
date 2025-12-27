import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { SiInstagram, SiLinkedin } from "react-icons/si";
import logoImage from "@assets/logo_castagna_tech_PIA_1766794794162.png";

export function Footer() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const p = (path: string) => `/${language}${path}`;

  return (
    <footer className="bg-secondary/50 border-t border-border pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href={p("/")} className="flex items-center space-x-2 group cursor-pointer mb-6">
              <img 
                src={logoImage} 
                alt="PIA Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-lg font-bold tracking-tight uppercase">PIA</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
                data-testid="link-instagram"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
                data-testid="link-linkedin"
              >
                <SiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider mb-6 text-sm">{t.footer.organization}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href={p("/mission")} className="hover:text-primary transition-colors">{t.footer.aboutUs}</Link></li>
              <li><Link href={p("/services")} className="hover:text-primary transition-colors">{t.footer.services}</Link></li>
              <li><Link href={p("/contact")} className="hover:text-primary transition-colors">{t.footer.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider mb-6 text-sm">{t.footer.resources}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href={p("/events")} className="hover:text-primary transition-colors">{t.footer.events}</Link></li>
              <li><Link href={p("/courses")} className="hover:text-primary transition-colors">{t.footer.courses}</Link></li>
              <li><Link href={p("/areas")} className="hover:text-primary transition-colors">{t.footer.areas}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider mb-6 text-sm">{t.footer.legal}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><span className="block font-mono text-xs">UID: CHE-XXX.XXX.XXX</span></li>
              <li><Link href={p("/privacy")} className="hover:text-primary transition-colors">{t.footer.privacy}</Link></li>
              <li><Link href={p("/terms")} className="hover:text-primary transition-colors">{t.footer.terms}</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-2 items-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Associazione Pro Intelligentia Artificiali. {t.footer.copyright}</p>
          <p className="font-mono">Via Maestri Comacini 7, 6830 Chiasso</p>
        </div>
      </div>
    </footer>
  );
}
