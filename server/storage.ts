import { ContactSubmission, InsertContactSubmission } from "@shared/schema";

export interface IStorage {
  // Contact logs
  logContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
}

export class MemStorage implements IStorage {
  private contactSubmissions: Map<number, ContactSubmission>;
  private contactIdCounter: number;

  constructor() {
    this.contactSubmissions = new Map();
    this.contactIdCounter = 1;
  }

  async logContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.contactIdCounter++;
    const newSubmission: ContactSubmission = {
      ...submission,
      id,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, newSubmission);
    console.log("New Contact Submission:", newSubmission); // "Log to console" as requested fallback
    return newSubmission;
  }
}

export const storage = new MemStorage();
