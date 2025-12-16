import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { userCompanyAssignments } from "./userCompanyAssignments";

export const departments = pgTable("departments", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
});

export const departmentsRelations = relations(departments, ({ many }) => ({
  userAssignments: many(userCompanyAssignments),
}));
