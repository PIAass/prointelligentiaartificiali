import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";

export default function Mission() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="min-h-screen">
      <PageHero title={t.mission.title} subtitle={t.mission.subtitle} />

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8 md:col-start-3 prose prose-lg prose-neutral dark:prose-invert max-w-none">
            <p className="lead text-2xl font-medium text-foreground">
              {t.mission.intro}
            </p>
            
            <hr className="my-12 border-primary w-24 border-2" />

            <h3>{t.mission.whyTitle}</h3>
            <p>{t.mission.whyText1}</p>
            <p>{t.mission.whyText2}</p>

            <ul className="list-none pl-0 space-y-6 mt-8">
              {t.mission.values.map((value, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-primary font-bold mr-4 text-xl">{value.num}.</span>
                  <div>
                    <strong className="block text-foreground text-lg mb-1">{value.title}</strong>
                    {value.desc}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
