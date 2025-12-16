import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const companies = pgTable("companies", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  addressLine1: varchar("address_line_1", { length: 255 }).notNull(),
  addressLine2: varchar("address_line_2", { length: 255 }),
  postcode: varchar("postcode", { length: 16 }).notNull(),
  city: varchar("city", { length: 24 }).notNull(),
  province: varchar("province", { length: 16 }).notNull(),
  country: varchar("country", { length: 16 }).notNull(),
  oldSsmNo: varchar("old_ssm_no", { length: 255 }).unique().notNull(),
  newSsmNo: varchar("new_ssm_no", { length: 255 }).unique().notNull(),
  tinNo: varchar("tin_no", { length: 255 }).unique(),

  superAdminId: uuid("superadmin_id").notNull(),
});

export const companiesRelations = relations(companies, ({ one }) => ({
  superAdmin: one(users, {
    fields: [companies.superAdminId],
    references: [users.id],
  }),
}));
