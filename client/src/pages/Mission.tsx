import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";

export default function Mission() {
  return (
    <div className="min-h-screen">
      <PageHeader />
      <Section className="pt-8 lg:pt-32 pb-16 border-b border-border">
        <h1 className="max-w-4xl">La nostra missione è semplice: restituire il <span className="text-primary">potere digitale</span> alle persone.</h1>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8 md:col-start-3 prose prose-lg prose-neutral max-w-none">
            <p className="lead text-2xl font-medium text-foreground">
              In un'epoca in cui poche grandi corporazioni controllano l'infrastruttura digitale globale, crediamo che la conoscenza e l'autonomia siano le uniche vere forme di resistenza.
            </p>
            
            <hr className="my-12 border-primary w-24 border-2" />

            <h3>Perché esistiamo</h3>
            <p>
              La tecnologia non è neutra. Ogni software che usiamo, ogni piattaforma su cui comunichiamo, porta con sé valori e strutture di potere. Quando non comprendiamo questi strumenti, ne diventiamo sudditi passivi.
            </p>
            <p>
              Autonomia Digitale nasce per colmare questo divario. Non siamo luddisti: amiamo la tecnologia. Ma la amiamo libera, aperta e trasparente.
            </p>

            <h3>I nostri valori</h3>
            <ul className="list-none pl-0 space-y-6 mt-8">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-4 text-xl">01.</span>
                <div>
                  <strong className="block text-foreground text-lg mb-1">Privacy come diritto umano</strong>
                  La sorveglianza di massa non è il prezzo da pagare per il progresso. Difendiamo la crittografia e l'anonimato.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-4 text-xl">02.</span>
                <div>
                  <strong className="block text-foreground text-lg mb-1">Open Source per definizione</strong>
                  Il codice chiuso è una scatola nera. Promuoviamo solo software verificabile, modificabile e condivisibile.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-4 text-xl">03.</span>
                <div>
                  <strong className="block text-foreground text-lg mb-1">Decentralizzazione</strong>
                  Rifiutiamo i monopoli digitali. Sosteniamo il Fediverso, l'hosting indipendente e le reti peer-to-peer.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
