import { pgTable, serial, text, varchar, timestamp, uuid, jsonb, integer } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from 'postgres'

const queryClient = postgres(process.env.DATABASE_URL as string);

export const db = drizzle(queryClient);

export const visitTable = pgTable("visit", {
  id: uuid("id").primaryKey().defaultRandom(),
  license_plate: text("license_plate").notNull(),
  image: text("image"),
  amount_money: integer("amount_money"),
  metadata: jsonb("metadata"),
  created_at: timestamp("created_at").defaultNow(),
});
