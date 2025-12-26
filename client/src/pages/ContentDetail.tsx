import { useLanguage } from "@/hooks/use-language";
import { useContentDetail } from "@/hooks/use-content";
import { ContentType } from "@shared/schema";
import { Section } from "@/components/Section";
import { Loader2, Calendar, Clock, MapPin, User, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link, useRoute } from "wouter";

interface ContentDetailProps {
  type: ContentType;
}

export default function ContentDetail({ type }: ContentDetailProps) {
  const { language } = useLanguage();
  const [match, params] = useRoute(`/${language}/${type}/:slug`);
  const slug = params?.slug || "";
  
  const { data, isLoading, error } = useContentDetail(language, type, slug);
  const p = (path: string) => `/${language}${path}`;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-muted-foreground mb-8">Contenuto non trovato.</p>
        <Link href={p("/")} className="text-primary hover:underline">Torna alla Home</Link>
      </div>
    );
  }

  const { frontmatter, content } = data;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Section className="pt-32 pb-16 bg-secondary/30 border-b border-border">
        <Link href={p(`/${type}`)} className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Torna a {type}
        </Link>
        
        {frontmatter.date && (
          <span className="block font-mono text-sm text-primary mb-4">
            {new Date(frontmatter.date).toLocaleDateString(language, { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        )}
        
        <h1 className="max-w-4xl">{frontmatter.title}</h1>
        {frontmatter.description && (
          <p className="text-2xl text-muted-foreground max-w-3xl mt-6">{frontmatter.description}</p>
        )}

        {/* Metadata Grid for Events/Courses */}
        {(type === "events" || type === "courses") && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-border/50">
            {frontmatter.location && (
              <div>
                <span className="flex items-center text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  <MapPin className="w-3 h-3 mr-1" /> Luogo
                </span>
                <span className="font-medium">{frontmatter.location}</span>
              </div>
            )}
            {frontmatter.duration && (
              <div>
                <span className="flex items-center text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  <Clock className="w-3 h-3 mr-1" /> Durata
                </span>
                <span className="font-medium">{frontmatter.duration}</span>
              </div>
            )}
            {frontmatter.instructor && (
              <div>
                <span className="flex items-center text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  <User className="w-3 h-3 mr-1" /> Istruttore
                </span>
                <span className="font-medium">{frontmatter.instructor}</span>
              </div>
            )}
            {frontmatter.price && (
              <div>
                <span className="flex items-center text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Costo
                </span>
                <span className="font-medium text-primary">{frontmatter.price}</span>
              </div>
            )}
          </div>
        )}
      </Section>

      {/* Content Body */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 lg:col-start-3">
            <article className="prose prose-lg prose-neutral max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
              <ReactMarkdown>{content}</ReactMarkdown>
            </article>

            {/* Registration CTA for events */}
            {(type === "events" || type === "courses") && frontmatter.link && (
              <div className="mt-16 p-8 bg-secondary border border-border flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold mb-4">Interessato a partecipare?</h3>
                <p className="text-muted-foreground mb-8">I posti sono limitati. Prenota il tuo posto oggi stesso.</p>
                <a 
                  href={frontmatter.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-wider hover:bg-primary/90 transition-transform hover:-translate-y-1"
                >
                  {frontmatter.linkText || "Iscriviti Ora"}
                </a>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
