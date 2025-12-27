import { Section } from "@/components/Section";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { PageHeader } from "@/components/PageHeader";
import { Check } from "lucide-react";

export default function Services() {
  const { language } = useLanguage();
  const p = (path: string) => `/${language}${path}`;

  const plans = [
    {
      name: "Consulenza Base",
      price: "150 CHF",
      unit: "/ ora",
      description: "Ideale per privati e freelance che vogliono migliorare la propria sicurezza digitale.",
      features: ["Audit privacy dispositivi", "Configurazione password manager", "Setup email sicura", "Backup strategies"]
    },
    {
      name: "Audit Aziendale",
      price: "2'500 CHF",
      unit: "/ pacchetto",
      description: "Analisi completa dell'infrastruttura IT per PMI fino a 20 dipendenti.",
      features: ["Vulnerability scan", "GDPR/LPD Compliance check", "Formazione dipendenti (4h)", "Report dettagliato + Roadmap", "Supporto migrazione Open Source"]
    },
    {
      name: "Formazione Team",
      price: "Su misura",
      unit: "",
      description: "Workshop pratici per rendere il tuo team autonomo e consapevole.",
      features: ["Phishing awareness", "Secure collaboration tools", "Digital hygiene", "Personalized curriculum"]
    }
  ];

  return (
    <div className="min-h-screen">
      <PageHeader />
      <Section className="pt-8 lg:pt-32 pb-16 border-b border-border">
        <h1 className="max-w-4xl">Servizi per l'indipendenza.</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mt-6">
          Offriamo consulenza strategica e tecnica per aiutare individui e aziende a liberarsi dalla dipendenza tecnologica.
        </p>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className="flex flex-col p-8 border border-border bg-white hover:shadow-xl hover:border-primary transition-all duration-300">
              <h3 className="text-xl font-bold uppercase tracking-wide mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold text-primary">{plan.price}</span>
                <span className="text-muted-foreground ml-2 text-sm">{plan.unit}</span>
              </div>
              <p className="text-muted-foreground mb-8 text-sm min-h-[60px]">{plan.description}</p>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start text-sm">
                    <Check className="w-4 h-4 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href={p("/contact")} className="w-full block text-center px-6 py-3 border-2 border-foreground font-bold uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors">
                Richiedi Info
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Non trovi quello che cerchi?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Siamo un'associazione flessibile. Parliamo delle tue esigenze specifiche e costruiamo un percorso su misura.
          </p>
          <Link href={p("/contact")} className="text-primary font-bold text-lg hover:underline uppercase tracking-wide">
            Contattaci per un preventivo personalizzato
          </Link>
        </div>
      </Section>
    </div>
  );
}
