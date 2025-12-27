import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { useTranslation } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

export function NewsletterForm({ variant = 'default' }: { variant?: 'default' | 'inline' }) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, language }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
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
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
        <Input
          type="email"
          placeholder={t.newsletter.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          required
          data-testid="input-newsletter-email"
        />
        <Button type="submit" disabled={status === 'loading'} data-testid="button-newsletter-subscribe">
          {status === 'loading' ? '...' : t.newsletter.subscribe}
        </Button>
      </form>
    );
  }

  return (
    <div className="bg-card border border-border p-8 rounded-md">
      <h3 className="text-xl font-bold mb-4">{t.newsletter.title}</h3>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder={t.newsletter.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          required
          data-testid="input-newsletter-email"
        />
        <Button type="submit" disabled={status === 'loading'} data-testid="button-newsletter-subscribe">
          {status === 'loading' ? '...' : t.newsletter.subscribe}
        </Button>
      </form>
      {status === 'error' && (
        <p className="text-destructive text-sm mt-2">{t.newsletter.error}</p>
      )}
    </div>
  );
}
