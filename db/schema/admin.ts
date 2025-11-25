import * as z from "zod";
import { relations, sql } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { company } from "@/db/schema/company";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

export const admin = pgTable("admin", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: varchar({ length: 255 }).notNull(),
  hashedPassword: varchar().notNull(),
});

export const adminRelations = relations(admin, ({ many }) => ({
  companys: many(company),
}));

export const adminSchema = createInsertSchema(admin);
export type AdminSchema = z.infer<typeof adminSchema>;
