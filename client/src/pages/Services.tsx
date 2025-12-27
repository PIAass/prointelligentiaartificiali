import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Check, Server, User, MessageSquare, GraduationCap } from "lucide-react";

const categoryIcons = [Server, User, MessageSquare, GraduationCap];

export default function Services() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const p = (path: string) => `/${language}${path}`;

  return (
    <div className="min-h-screen">
      <PageHero title={t.services.title} subtitle={t.services.subtitle} />

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.services.categories.map((category, idx) => {
            const Icon = categoryIcons[idx] || Server;
            return (
              <Card key={idx} className="flex flex-col">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center text-primary rounded-md mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {category.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start text-sm">
                        <Check className="w-4 h-4 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Link href={p("/contact")}>
            <Button size="lg" data-testid="button-services-contact">
              {t.services.ctaContact}
            </Button>
          </Link>
          <Link href={p("/courses")}>
            <Button variant="outline" size="lg" data-testid="button-services-courses">
              {t.services.ctaCourses}
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
