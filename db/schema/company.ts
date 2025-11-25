import * as z from "zod";
import { relations, sql } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { admin } from "./admin";
import { companyUser } from "./companyUser";
import { createSelectSchema } from "drizzle-zod";

export const company = pgTable("company", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  oldSsmNo: varchar({ length: 255 }).unique().notNull(),
  newSsmNo: varchar({ length: 255 }).unique().notNull(),
  adminId: uuid("adminId")
    .notNull()
    .references(() => admin.id),
});

export const companyRelations = relations(company, ({ one, many }) => ({
  admin: one(admin, { fields: [company.adminId], references: [admin.id] }),
  companyUser: many(companyUser),
}));

export const companySchema = createSelectSchema(company);
export type CompanySchema = z.infer<typeof companySchema>;
