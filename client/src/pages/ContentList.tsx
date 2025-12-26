import { useLanguage } from "@/hooks/use-language";
import { useContentList } from "@/hooks/use-content";
import { ContentType } from "@shared/schema";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Loader2 } from "lucide-react";

interface ContentListProps {
  type: ContentType;
  title: string;
  description: string;
}

export default function ContentList({ type, title, description }: ContentListProps) {
  const { language } = useLanguage();
  const { data, isLoading, error } = useContentList(language, type);
  const p = (path: string) => `/${language}${path}`;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-destructive">
        Error loading content
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Section className="pt-32 pb-16 border-b border-border bg-secondary/20">
        <h1 className="capitalize">{title}</h1>
        <p className="max-w-2xl text-xl">{description}</p>
      </Section>

      <Section>
        {data?.items && data.items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.items.map((item: any) => (
              <Card
                key={item.slug}
                title={item.frontmatter.title}
                subtitle={item.frontmatter.type || type} // Fallback to list type
                description={item.frontmatter.description || "Nessuna descrizione disponibile."}
                date={item.frontmatter.date}
                link={p(`/${type}/${item.slug}`)}
                linkText={type === "courses" ? "Dettagli Corso" : "Leggi Tutto"}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground border border-dashed border-border">
            <p className="text-xl">Nessun contenuto disponibile al momento.</p>
          </div>
        )}
      </Section>
    </div>
  );
}
