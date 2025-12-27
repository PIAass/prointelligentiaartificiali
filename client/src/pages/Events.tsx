import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { Section } from "@/components/Section";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PageHero } from "@/components/PageHero";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

const externalEvents = [
  {
    title: "Lugano AI Week 2025",
    date: "1-5 Dicembre 2025",
    location: "Asilo Ciani, Lugano",
    description: "Seconda edizione della settimana dedicata all'AI a Lugano. 50+ speaker, ingresso gratuito. Temi: arte, salute, robotica, business, geopolitica.",
    link: "https://www.luganolivinglab.ch/en/main-eventi/ai-week-2025",
    tags: ["Conferenza", "Gratuito", "Lugano"]
  },
  {
    title: "Swiss AI Summit 2025",
    date: "2025",
    location: "Zurigo",
    description: "Summit nazionale sull'intelligenza artificiale con leader del settore, fondatori e esperti.",
    link: "https://www.swissaisummit.com/",
    tags: ["Summit", "Business", "Zurigo"]
  },
  {
    title: "Swiss {ai} Weeks",
    date: "2025",
    location: "Svizzera",
    description: "Serie di eventi multi-location dedicati all'AI in tutta la Svizzera.",
    link: "https://swiss-ai-weeks.ch/",
    tags: ["Eventi", "Nazionale"]
  },
  {
    title: "SUPSI AI Research Day",
    date: "2025",
    location: "Manno, Ticino",
    description: "Giornata dedicata alla ricerca in AI presso SUPSI, con focus su progetti locali e collaborazioni internazionali.",
    link: "https://www.supsi.ch",
    tags: ["Ricerca", "Accademia", "Ticino"]
  }
];

export default function Events() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="min-h-screen">
      <PageHero title={t.events.title} subtitle={t.events.subtitle} />

      <Section>
        <h2 className="text-3xl font-bold mb-2">{t.events.relatedTitle}</h2>
        <p className="text-muted-foreground mb-8">{t.events.relatedSubtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {externalEvents.map((event, idx) => (
            <Card key={idx} className="group hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-xl">{event.title}</CardTitle>
                <CardDescription className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{event.description}</p>
                <a href={event.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" data-testid={`button-event-${idx}`}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t.events.learnMore}
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-primary/5">
        <div className="max-w-2xl mx-auto text-center">
          <Calendar className="w-16 h-16 text-primary mx-auto mb-6" strokeWidth={1.5} />
          <h2 className="text-2xl font-bold mb-4">{t.events.placeholder}</h2>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
      </Section>
    </div>
  );
}
