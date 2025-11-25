import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { company } from "./company";
import { user } from "./user";

export const companyUser = pgTable(
  "company_user",
  {
    companyId: uuid("company_id")
      .notNull()
      .references(() => company.id),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id),
  },
  (table) => ({ pk: primaryKey({ columns: [table.companyId, table.userId] }) })
);
