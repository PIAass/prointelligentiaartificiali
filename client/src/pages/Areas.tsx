import { Section } from "@/components/Section";
import { Shield, MessageSquare, Briefcase, Eye } from "lucide-react";

export default function Areas() {
  return (
    <div className="min-h-screen">
      <Section className="pt-32 pb-16 border-b border-border">
        <h1 className="max-w-4xl">Aree di Intervento.</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mt-6">
          Il nostro lavoro si concentra su quattro pilastri fondamentali per garantire una cittadinanza digitale piena e consapevole.
        </p>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-primary/10 flex items-center justify-center text-primary">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Privacy & Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                Difendiamo il diritto alla crittografia e all'anonimato. Insegniamo come proteggere le comunicazioni personali e aziendali da sorveglianza indebita e data mining. La sicurezza non è un prodotto, è un processo.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-primary/10 flex items-center justify-center text-primary">
              <MessageSquare className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Chatbot & AI Etica</h3>
              <p className="text-muted-foreground leading-relaxed">
                Analizziamo l'impatto dei Large Language Models sulla società. Promuoviamo lo sviluppo e l'uso di modelli open source, trasparenti e privi di bias discriminatori, che potenzino l'umano invece di sostituirlo.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-primary/10 flex items-center justify-center text-primary">
              <Eye className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Brand & Identità Digitale</h3>
              <p className="text-muted-foreground leading-relaxed">
                Aiutiamo organizzazioni e individui a costruire una presenza online che rispecchi i propri valori, senza cedere la proprietà della propria identità alle piattaforme social. Il tuo sito web è la tua casa digitale.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-primary/10 flex items-center justify-center text-primary">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Lavoro & Strumenti</h3>
              <p className="text-muted-foreground leading-relaxed">
                Promuoviamo l'adozione di strumenti di collaborazione open source (Nextcloud, Matrix, Jitsi) che garantiscono la sovranità dei dati aziendali e la continuità operativa indipendente dai capricci dei giganti tech.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
