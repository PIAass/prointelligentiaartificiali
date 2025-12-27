import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getContentList, getContentItem } from "./content";
import { insertContactSchema } from "@shared/schema";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // === Content API ===
  app.get('/api/content/:lang/:type', async (req, res) => {
    const { lang, type } = req.params;
    try {
      const items = await getContentList(lang, type);
      res.json({ items });
    } catch (error) {
      res.status(500).json({ message: "Error fetching content list" });
    }
  });

  app.get('/api/content/:lang/:type/:slug', async (req, res) => {
    const { lang, type, slug } = req.params;
    try {
      const item = await getContentItem(lang, type, slug);
      if (!item) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Error fetching content item" });
    }
  });

  // === Contact Form API ===
  app.post('/api/contact', async (req, res) => {
    try {
      const input = insertContactSchema.parse(req.body);
      
      // Log to storage/console as fallback (simulating SMTP)
      await storage.logContactSubmission(input);
      
      // Here you would implement actual email sending with Resend/SMTP
      // e.g. await sendEmail(input);

      res.status(200).json({ success: true, message: "Messaggio inviato con successo!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dati non validi", field: error.errors[0].path.join('.') });
      } else {
        res.status(500).json({ message: "Errore interno server" });
      }
    }
  });

  // === Newsletter API ===
  app.post('/api/newsletter', async (req, res) => {
    try {
      const schema = z.object({
        email: z.string().email(),
        language: z.string().optional()
      });
      const { email, language } = schema.parse(req.body);
      
      // Log subscription (in production, integrate with Brevo/Mailchimp)
      console.log(`Newsletter subscription: ${email} (lang: ${language || 'it'})`);
      
      res.status(200).json({ success: true, message: "Iscrizione completata!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Email non valida" });
      } else {
        res.status(500).json({ success: false, message: "Errore interno server" });
      }
    }
  });

  return httpServer;
}
