import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { Section } from "@/components/Section";
import { NewsletterForm } from "@/components/NewsletterForm";
import { NeuralBackground } from "@/components/NeuralBackground";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Clock, User, Calendar } from "lucide-react";

const pastCourses = [
  {
    title: "AI Locale: Installare e Usare Modelli Open Source",
    date: "Novembre 2024",
    duration: "8 ore (4 sessioni)",
    instructor: "Ing. Marco Bernasconi",
    level: "Intermedio",
    description: "Come installare e configurare modelli AI open source (Llama, Mistral) sul proprio hardware per massimizzare privacy e controllo sui dati aziendali.",
    tags: ["AI Locale", "Privacy", "Open Source"]
  },
  {
    title: "Brand Identity con l'AI: Strategie Etiche",
    date: "Ottobre 2024",
    duration: "6 ore (3 sessioni)",
    instructor: "Dott.ssa Laura Bentivoglio",
    level: "Base",
    description: "Costruire un'identità di brand autentica usando strumenti AI per la creazione di contenuti, mantenendo coerenza e rispettando i valori etici.",
    tags: ["Brand", "Marketing", "Etica"]
  },
  {
    title: "Chatbot per PMI: Implementazione Pratica",
    date: "Settembre 2024",
    duration: "12 ore (6 sessioni)",
    instructor: "Ing. Paolo Bentivoglio",
    level: "Intermedio",
    description: "Progettare e implementare chatbot aziendali per customer care e vendite, con attenzione alla privacy dei dati e conformità nLPD.",
    tags: ["Chatbot", "PMI", "Customer Care"]
  },
  {
    title: "Introduzione all'AI per Professionisti",
    date: "Luglio 2024",
    duration: "4 ore (2 sessioni)",
    instructor: "Team PIA",
    level: "Base",
    description: "Un'introduzione pratica all'uso di ChatGPT, Claude e altri assistenti AI nel lavoro quotidiano. Prompt engineering, rischi e opportunità.",
    tags: ["Base", "Produttività", "Gratuito"]
  },
  {
    title: "Privacy e nLPD nell'Era dell'AI",
    date: "Giugno 2024",
    duration: "4 ore (2 sessioni)",
    instructor: "Avv. Chiara Bentivoglio",
    level: "Tutti",
    description: "Panoramica sulla nuova Legge sulla Protezione dei Dati svizzera (nLPD) e le sue implicazioni per l'uso di strumenti AI in azienda.",
    tags: ["Privacy", "nLPD", "Legale"]
  }
];

export default function Courses() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <Section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 opacity-10">
          <NeuralBackground />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.courses.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">{t.courses.description}</p>
        </div>
      </Section>

      {/* Newsletter CTA */}
      <Section className="bg-primary/5">
        <div className="max-w-2xl mx-auto text-center">
          <GraduationCap className="w-16 h-16 text-primary mx-auto mb-6" strokeWidth={1.5} />
          <h2 className="text-2xl font-bold mb-4">{t.courses.placeholder}</h2>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
      </Section>

      {/* Past Courses */}
      <Section>
        <h2 className="text-3xl font-bold mb-8">{t.courses.pastTitle}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pastCourses.map((course, idx) => (
            <Card key={idx} className="group hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {course.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <User className="w-4 h-4" />
                  <span>{course.instructor}</span>
                  <Badge variant="outline" className="ml-2">{course.level}</Badge>
                </div>
                <p className="text-muted-foreground">{course.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
