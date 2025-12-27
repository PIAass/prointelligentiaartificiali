import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContactSubmission } from "@shared/schema";
import { useSubmitContact } from "@/hooks/use-content";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";
import { SiInstagram, SiLinkedin, SiGithub } from "react-icons/si";

const INSTAGRAM_URL = "https://instagram.com/INSERISCI_PROFILO";

export default function Contact() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { toast } = useToast();
  const submitContact = useSubmitContact();
  
  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: InsertContactSubmission) => {
    submitContact.mutate(data, {
      onSuccess: () => {
        toast({
          title: t.contact.successTitle,
          description: t.contact.successDesc,
        });
        form.reset();
      },
      onError: (err) => {
        toast({
          title: "Errore",
          description: err.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="min-h-screen">
      <PageHero title={t.contact.title} subtitle={t.contact.subtitle} />

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <div className="mb-12">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">{t.contact.headquarters}</h3>
              <p className="text-xl font-medium">
                Via Maestri Comacini 7<br />
                6830 Chiasso<br />
                Svizzera
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">{t.contact.email}</h3>
              <a href="mailto:info@prointelligentiaartificiali.ch" className="text-xl font-medium hover:text-primary transition-colors">
                info@prointelligentiaartificiali.ch
              </a>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">{t.contact.social}</h3>
              <div className="flex items-center gap-4">
                <a 
                  href={INSTAGRAM_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                  data-testid="link-contact-instagram"
                >
                  <SiInstagram className="w-6 h-6" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                  data-testid="link-contact-linkedin"
                >
                  <SiLinkedin className="w-6 h-6" />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                  data-testid="link-contact-github"
                >
                  <SiGithub className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 border border-border shadow-sm rounded-md">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-wide mb-2">{t.contact.formName}</label>
                <input
                  {...form.register("name")}
                  className="w-full px-4 py-3 bg-secondary/30 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors rounded-md"
                  placeholder={t.contact.formPlaceholderName}
                  data-testid="input-contact-name"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-wide mb-2">{t.contact.formEmail}</label>
                <input
                  {...form.register("email")}
                  className="w-full px-4 py-3 bg-secondary/30 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors rounded-md"
                  placeholder={t.contact.formPlaceholderEmail}
                  data-testid="input-contact-email"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-wide mb-2">{t.contact.formMessage}</label>
                <textarea
                  {...form.register("message")}
                  rows={5}
                  className="w-full px-4 py-3 bg-secondary/30 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none rounded-md"
                  placeholder={t.contact.formPlaceholderMessage}
                  data-testid="input-contact-message"
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-destructive mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitContact.isPending}
                className="w-full px-8 py-4 bg-foreground text-background font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors flex items-center justify-center rounded-md"
                data-testid="button-contact-submit"
              >
                {submitContact.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <Send className="w-5 h-5 mr-2" />
                )}
                {submitContact.isPending ? t.contact.formSubmitting : t.contact.formSubmit}
              </button>
            </form>
          </div>
        </div>
      </Section>
    </div>
  );
}
