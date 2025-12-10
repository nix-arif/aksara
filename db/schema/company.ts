import * as z from "zod";
import { relations, sql } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { userCompany } from "./userCompany";
import { createSelectSchema } from "drizzle-zod";
import { user } from "./user";

export const company = pgTable("company", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 100 }).notNull(),
  address_line_1: varchar("address_line_1", { length: 255 }).notNull(),
  address_line_2: varchar("address_line_2", { length: 255 }),
  postcode: varchar("postcode", { length: 16 }).notNull(),
  city: varchar("city", { length: 24 }).notNull(),
  province: varchar("province", { length: 16 }).notNull(),
  country: varchar("country", { length: 16 }).notNull(),
  old_ssm_no: varchar("old_ssm_no", { length: 255 }).unique().notNull(),
  new_ssm_no: varchar("new_ssm_no", { length: 255 }).unique().notNull(),

  superadmin_id: uuid("superadmin_id")
    .notNull()
    .references(() => user.id),
});

export const companyRelations = relations(company, ({ one, many }) => ({
  superadmin: one(user, {
    fields: [company.superadmin_id],
    references: [user.id],
  }),
  userCompany: many(userCompany),
}));

export const companySchema = createSelectSchema(company);
export type CompanySchema = z.infer<typeof companySchema>;
