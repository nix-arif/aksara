import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { company } from "@/db/schema/company";

export const admin = pgTable("admin", {
  id: uuid("id").primaryKey(),
  email: varchar({ length: 255 }).notNull(),
  hashedPassword: varchar().notNull(),
});

export const adminRelations = relations(admin, ({ many }) => ({
  companys: many(company),
}));
