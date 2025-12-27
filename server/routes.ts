import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getContentList, getContentItem } from "./content";
import { insertContactSchema } from "@shared/schema";
import { api } from "@shared/routes";
import { z } from "zod";
import { saveContactToNotion, saveNewsletterToNotion } from "./notion";

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
      
      // Log to storage/console as fallback
      await storage.logContactSubmission(input);
      
      // Save to Notion if database ID is configured
      const notionDbId = process.env.NOTION_CONTACTS_DATABASE_ID;
      if (notionDbId) {
        try {
          await saveContactToNotion({
            name: input.name,
            email: input.email,
            message: input.message,
            databaseId: notionDbId
          });
          console.log(`Contact saved to Notion: ${input.email}`);
        } catch (notionError) {
          console.error('Failed to save to Notion:', notionError);
        }
      }

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
        name: z.string().min(1),
        email: z.string().email(),
        consent: z.boolean(),
        source: z.string().optional(),
        language: z.string().optional()
      });
      const { name, email, consent, source, language } = schema.parse(req.body);
      
      console.log(`Newsletter subscription: ${email} (name: ${name}, lang: ${language || 'it'})`);
      
      // Save to Notion if database ID is configured
      const notionDbId = process.env.NOTION_NEWSLETTER_DATABASE_ID;
      if (notionDbId) {
        try {
          await saveNewsletterToNotion({
            name,
            email,
            consent,
            source: source || 'website',
            databaseId: notionDbId
          });
          console.log(`Newsletter saved to Notion: ${email}`);
        } catch (notionError) {
          console.error('Failed to save newsletter to Notion:', notionError);
        }
      }
      
      res.status(200).json({ success: true, message: "Iscrizione completata!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Dati non validi" });
      } else {
        res.status(500).json({ success: false, message: "Errore interno server" });
      }
    }
  });

  return httpServer;
}
