import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// For this MVP without a real DB, we can skip the connection check or make it optional.
// But strictly following the template:
// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
// }

// Helper to allow running without DB for file-based CMS parts
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL || "postgres://user:pass@localhost:5432/db" 
});
export const db = drizzle(pool, { schema });
