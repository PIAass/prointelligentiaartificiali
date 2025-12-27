import { useState, useEffect } from 'react';
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { Section } from "@/components/Section";
import { NeuralBackground } from "@/components/NeuralBackground";
import { Link } from "wouter";
import { ArrowRight, Shield, Briefcase, Bot, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

import heroImage1 from "@assets/stock_images/abstract_artificial__bee6d443.jpg";
import heroImage2 from "@assets/stock_images/abstract_artificial__44b027cc.jpg";
import heroImage3 from "@assets/stock_images/abstract_artificial__eb4e0755.jpg";

const heroImages = [heroImage1, heroImage2, heroImage3];

export default function Home() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const p = (path: string) => `/${language}${path}`;
  
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % heroImages.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden pt-16 md:pt-0">
        {/* Image Carousel */}
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt={`AI visualization ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        
        {/* Neural network effect overlay */}
        <div className="absolute inset-0 opacity-30">
          <NeuralBackground />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Pro Intelligentia Artificiali
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
              {t.home.heroSubtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={p("/services")}>
                <Button size="lg" className="text-lg px-8 py-6" data-testid="button-discover-services">
                  {t.home.servicesBtn}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href={p("/contact")}>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20" data-testid="button-contact">
                  {t.home.contactBtn}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={prevImage}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            aria-label="Previous image"
            data-testid="button-carousel-prev"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex gap-2">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  idx === currentImage ? 'bg-white' : 'bg-white/40'
                }`}
                aria-label={`Go to image ${idx + 1}`}
                data-testid={`button-carousel-dot-${idx}`}
              />
            ))}
          </div>
          <button
            onClick={nextImage}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            aria-label="Next image"
            data-testid="button-carousel-next"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </section>

      {/* Guide Download Banner */}
      <div className="bg-primary/10 py-3 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <span className="text-sm font-medium">{t.home.guide.title}</span>
          <a 
            href="/PIA_guida_AI_Locale_1766854839035.pdf" 
            download
            data-testid="button-download-guide"
          >
            <Button size="sm" variant="outline">
              <Download className="mr-2 w-4 h-4" />
              {t.home.guide.btn}
            </Button>
          </a>
        </div>
      </div>

      {/* Pillars Section */}
      <Section className="bg-secondary/30 relative">
        <div className="absolute inset-0 opacity-10">
          <NeuralBackground />
        </div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group p-8 bg-background border border-border hover:border-primary/50 transition-all duration-300 relative overflow-visible">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Shield className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">{t.home.pillars.privacy.title}</h3>
            <p className="text-muted-foreground">{t.home.pillars.privacy.desc}</p>
          </div>
          <div className="group p-8 bg-background border border-border hover:border-primary/50 transition-all duration-300 relative overflow-visible">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Briefcase className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">{t.home.pillars.work.title}</h3>
            <p className="text-muted-foreground">{t.home.pillars.work.desc}</p>
          </div>
          <div className="group p-8 bg-background border border-border hover:border-primary/50 transition-all duration-300 relative overflow-visible">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Bot className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">{t.home.pillars.ai.title}</h3>
            <p className="text-muted-foreground">{t.home.pillars.ai.desc}</p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section dark className="text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <NeuralBackground />
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">{t.home.cta.title}</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
            {t.home.cta.desc}
          </p>
          <Link href={p("/contact")}>
            <Button size="lg" className="text-lg px-10 py-6" data-testid="button-cta-contact">
              {t.home.cta.btn}
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
