import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === CONTACT FORM ===
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({ 
  id: true, 
  createdAt: true 
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSchema>;

// === CONTENT TYPES (File-based, so these are just TS types, not DB tables) ===

export const ContentType = z.enum(["blog", "events", "courses", "projects", "pages"]);
export type ContentType = z.infer<typeof ContentType>;

export const Language = z.enum(["it", "de", "fr", "en"]);
export type Language = z.infer<typeof Language>;

// Common Frontmatter Schema
export const BaseFrontmatter = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string().optional(), // ISO string
  slug: z.string().optional(), // Inferred from filename usually
});

// Event Frontmatter
export const EventFrontmatter = BaseFrontmatter.extend({
  type: z.enum(["webinar", "workshop", "course", "event", "partner_event"]),
  location: z.string().optional(),
  price: z.string().optional(),
  link: z.string().optional(), // External registration link
  linkText: z.string().default("Iscriviti"),
  tags: z.array(z.string()).optional(),
});

// Course Frontmatter
export const CourseFrontmatter = BaseFrontmatter.extend({
  level: z.string(),
  prerequisites: z.string().optional(),
  duration: z.string(),
  instructor: z.string(),
  price: z.string().optional(),
});

// Project Frontmatter
export const ProjectFrontmatter = BaseFrontmatter.extend({
  status: z.string().optional(), // e.g. "In corso", "Completato"
  beneficiaries: z.string().optional(),
  results: z.string().optional(), // Short summary of impact
});

// Generic Content Item
export interface ContentItem {
  slug: string;
  lang: Language;
  type: ContentType;
  frontmatter: Record<string, any>;
  content: string; // The markdown body
}

export type EventItem = ContentItem & { frontmatter: z.infer<typeof EventFrontmatter> };
export type CourseItem = ContentItem & { frontmatter: z.infer<typeof CourseFrontmatter> };
export type ProjectItem = ContentItem & { frontmatter: z.infer<typeof ProjectFrontmatter> };

// Response Types
export type ContentListResponse = {
  items: ContentItem[];
};

export type ContentDetailResponse = ContentItem;
