import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { useTranslation } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail } from 'lucide-react';
import { apiUrl } from '@/lib/api';

export function NewsletterForm({ variant = 'default', source = 'website' }: { variant?: 'default' | 'inline', source?: string }) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;

    const name = email.split('@')[0];
    setStatus('loading');
    
    try {
      const res = await fetch(apiUrl('/api/newsletter'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, consent, source, language }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        setConsent(false);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
        <Mail className="w-5 h-5" />
        <span>{t.newsletter.success}</span>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <Input
          type="email"
          placeholder={t.newsletter.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          data-testid="input-newsletter-email"
        />
        <div className="flex items-start gap-2">
          <Checkbox 
            id="consent-inline" 
            checked={consent} 
            onCheckedChange={(checked) => setConsent(checked === true)}
            data-testid="checkbox-newsletter-consent"
          />
          <label htmlFor="consent-inline" className="text-xs text-muted-foreground leading-tight cursor-pointer">
            {t.newsletter.privacyConsent}
          </label>
        </div>
        <Button type="submit" disabled={status === 'loading' || !consent} className="w-full" data-testid="button-newsletter-subscribe">
          {status === 'loading' ? '...' : t.newsletter.subscribe}
        </Button>
      </form>
    );
  }

  return (
    <div className="bg-card border border-border p-8 rounded-md">
      <h3 className="text-xl font-bold mb-4">{t.newsletter.title}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder={t.newsletter.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          data-testid="input-newsletter-email"
        />
        <div className="flex items-start gap-2">
          <Checkbox 
            id="consent-default" 
            checked={consent} 
            onCheckedChange={(checked) => setConsent(checked === true)}
            data-testid="checkbox-newsletter-consent"
          />
          <label htmlFor="consent-default" className="text-sm text-muted-foreground leading-tight cursor-pointer">
            {t.newsletter.privacyConsent}
          </label>
        </div>
        <Button type="submit" disabled={status === 'loading' || !consent} className="w-full sm:w-auto" data-testid="button-newsletter-subscribe">
          {status === 'loading' ? '...' : t.newsletter.subscribe}
        </Button>
        {status === 'error' && (
          <p className="text-destructive text-sm">{t.newsletter.error}</p>
        )}
      </form>
    </div>
  );
}
