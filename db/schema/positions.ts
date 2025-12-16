import { relations } from "drizzle-orm";
import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { userCompanyAssignments } from "./userCompanyAssignments";

export const positions = pgTable("positions", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  description: text("description"),
});

export const positionsRelations = relations(positions, ({ many }) => ({
  userAssignments: many(userCompanyAssignments),
}));
