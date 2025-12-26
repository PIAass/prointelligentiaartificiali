import { useLanguage } from "@/hooks/use-language";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Link } from "wouter";
import { ArrowRight, Shield, Briefcase, Bot } from "lucide-react";

export default function Home() {
  const { language } = useLanguage();
  const p = (path: string) => `/${language}${path}`;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="pt-32 pb-20 md:pt-48 md:pb-32 border-b border-border">
        <div className="max-w-4xl">
          <h1 className="mb-8">
            Costruiamo un futuro digitale <span className="text-primary">libero</span> e <span className="text-primary">consapevole</span>.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
            Autonomia Digitale è l'associazione svizzera che promuove la sovranità tecnologica, la privacy e l'uso etico dell'intelligenza artificiale.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={p("/mission")} className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors">
              La Nostra Missione
            </Link>
            <Link href={p("/courses")} className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-foreground text-foreground font-bold uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors">
              Scopri i Corsi
            </Link>
          </div>
        </div>
      </Section>

      {/* Pillars */}
      <Section className="bg-secondary/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-background border border-border">
            <Shield className="w-12 h-12 text-primary mb-6" strokeWidth={1.5} />
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">Privacy & Sicurezza</h3>
            <p className="text-muted-foreground">Proteggere i propri dati non è solo un diritto, ma una necessità civica nel mondo interconnesso.</p>
          </div>
          <div className="p-8 bg-background border border-border">
            <Bot className="w-12 h-12 text-primary mb-6" strokeWidth={1.5} />
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">Intelligenza Artificiale</h3>
            <p className="text-muted-foreground">Comprendere e governare gli algoritmi per metterli al servizio dell'umano, non viceversa.</p>
          </div>
          <div className="p-8 bg-background border border-border">
            <Briefcase className="w-12 h-12 text-primary mb-6" strokeWidth={1.5} />
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">Lavoro Digitale</h3>
            <p className="text-muted-foreground">Formazione continua e strumenti open-source per professionisti e aziende indipendenti.</p>
          </div>
        </div>
      </Section>

      {/* Recent Updates */}
      <Section>
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-bold">In Evidenza</h2>
          <Link href={p("/blog")} className="text-primary font-bold uppercase tracking-wide hover:underline flex items-center">
            Vedi tutto <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card 
            date="2023-10-15"
            subtitle="Webinar"
            title="Introduzione a Linux per PMI"
            description="Come migrare la tua azienda verso software libero risparmiando sulle licenze."
            link={p("/events/linux-pmi")}
          />
          <Card 
            date="2023-11-02"
            subtitle="Corso"
            title="Privacy First Marketing"
            description="Strategie di marketing digitale rispettose del GDPR e della LPD Svizzera."
            link={p("/courses/privacy-marketing")}
          />
          <Card 
            date="2023-11-20"
            subtitle="Blog"
            title="Perché l'Open Source è il futuro della PA"
            description="Analisi dei benefici economici e strategici dell'adozione di software libero nella pubblica amministrazione."
            link={p("/blog/open-source-pa")}
          />
        </div>
      </Section>

      {/* CTA Section */}
      <Section dark className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Pronto a prendere il controllo?</h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
          Unisciti alla nostra community o richiedi una consulenza personalizzata per la tua azienda.
        </p>
        <Link href={p("/contact")} className="inline-flex items-center justify-center px-10 py-5 bg-primary text-white font-bold uppercase tracking-wider text-lg hover:bg-primary/90 transition-transform hover:-translate-y-1">
          Contattaci Ora
        </Link>
      </Section>
    </div>
  );
}
