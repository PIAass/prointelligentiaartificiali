import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { Shield, MessageSquare, GraduationCap, Handshake, Users, Eye } from "lucide-react";

const areaIcons = [Shield, MessageSquare, GraduationCap, Handshake, Users, Eye];

export default function Areas() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="min-h-screen">
      <PageHero title={t.areas.title} subtitle={t.areas.subtitle} />

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.areas.items.map((area, idx) => {
            const Icon = areaIcons[idx] || Shield;
            return (
              <div key={idx} className="flex flex-col gap-4 p-6 border border-border bg-card rounded-md">
                <div className="w-14 h-14 bg-primary/10 flex items-center justify-center text-primary rounded-md">
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{area.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{area.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
