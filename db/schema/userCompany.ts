import * as z from "zod";
import { createSelectSchema } from "drizzle-zod";
import {
  pgTable,
  primaryKey,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { company } from "./company";
import { user } from "./user";
import { roleEnum } from "./roleEnum";
import { relations } from "drizzle-orm";

export const userCompany = pgTable(
  "user_company",
  {
    company_id: uuid("company_id").notNull(),
    user_id: uuid("user_id").notNull(),

    user_role: roleEnum("user_role").default("notAssign"),
    position_id: uuid("position_id").notNull(),
    department_id: uuid("department_id").notNull(),

    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.company_id, table.user_id] })]
);

export const userCompanyRelations = relations(userCompany, ({ one }) => ({
  user: one(user, { fields: [userCompany.user_id], references: [user.id] }),
  company: one(company, {
    fields: [userCompany.company_id],
    references: [company.id],
  }),
}));

export const userCompanySchema = createSelectSchema(userCompany);
export type UserCompanySchema = z.infer<typeof userCompanySchema>;
