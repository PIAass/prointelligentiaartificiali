import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { Section } from "@/components/Section";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PageHero } from "@/components/PageHero";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar } from "lucide-react";

export default function Courses() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="min-h-screen">
      <PageHero title={t.courses.title} subtitle={t.courses.subtitle} />

      <Section>
        <h2 className="text-2xl font-bold mb-6">{t.courses.pastTitle}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {t.courses.pastCourses.map((course, idx) => (
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
                  <Badge variant="outline">{course.level}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-2">{course.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-primary/5">
        <div className="max-w-2xl mx-auto text-center">
          <GraduationCap className="w-16 h-16 text-primary mx-auto mb-6" strokeWidth={1.5} />
          <h2 className="text-2xl font-bold mb-4">{t.courses.placeholder}</h2>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
      </Section>
    </div>
  );
}
