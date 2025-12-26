import { Section } from "@/components/Section";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContactSubmission } from "@shared/schema";
import { useSubmitContact } from "@/hooks/use-content";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";

export default function Contact() {
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
          title: "Messaggio inviato!",
          description: "Grazie per averci contattato. Ti risponderemo presto.",
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
      <Section className="pt-32 pb-16 border-b border-border">
        <h1 className="max-w-4xl">Parliamo.</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mt-6">
          Hai domande sui nostri corsi, vuoi collaborare o semplicemente saperne di più? Compila il modulo qui sotto.
        </p>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <div className="mb-12">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Sede</h3>
              <p className="text-xl font-medium">
                Via della Posta 12<br />
                6900 Lugano<br />
                Svizzera
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Email</h3>
              <a href="mailto:info@autonomiadigitale.ch" className="text-xl font-medium hover:text-primary transition-colors">
                info@autonomiadigitale.ch
              </a>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Social</h3>
              <div className="flex flex-col space-y-2">
                <a href="#" className="text-lg hover:underline">Mastodon</a>
                <a href="#" className="text-lg hover:underline">LinkedIn</a>
                <a href="#" className="text-lg hover:underline">GitHub</a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 border border-border shadow-sm">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-wide mb-2">Nome</label>
                <input
                  {...form.register("name")}
                  className="w-full px-4 py-3 bg-secondary/30 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="Il tuo nome"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-wide mb-2">Email</label>
                <input
                  {...form.register("email")}
                  className="w-full px-4 py-3 bg-secondary/30 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="tua@email.com"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-wide mb-2">Messaggio</label>
                <textarea
                  {...form.register("message")}
                  rows={5}
                  className="w-full px-4 py-3 bg-secondary/30 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                  placeholder="Come possiamo aiutarti?"
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-destructive mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitContact.isPending}
                className="w-full px-8 py-4 bg-foreground text-background font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
              >
                {submitContact.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <Send className="w-5 h-5 mr-2" />
                )}
                {submitContact.isPending ? "Invio in corso..." : "Invia Messaggio"}
              </button>
            </form>
          </div>
        </div>
      </Section>
    </div>
  );
}
