import { relations } from "drizzle-orm";
import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { companies } from "./companies";
import { roles } from "./roles";
import { positions } from "./positions";
import { departments } from "./departments";

export const userCompanyAssignments = pgTable(
  "user_company_assignments",
  {
    userId: uuid("user_id").notNull(),
    companyId: uuid("company_id").notNull(),
    roleId: uuid("role_id").notNull(),
    positionId: uuid("position_id").notNull(),
    departmentId: uuid("department_id").notNull(),

    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.companyId] })]
);

export const userCompanyAssignmentsRelations = relations(
  userCompanyAssignments,
  ({ one }) => ({
    user: one(users, {
      fields: [userCompanyAssignments.userId],
      references: [users.id],
    }),
    company: one(companies, {
      fields: [userCompanyAssignments.companyId],
      references: [companies.id],
    }),
    role: one(roles, {
      fields: [userCompanyAssignments.roleId],
      references: [roles.id],
    }),
    position: one(positions, {
      fields: [userCompanyAssignments.positionId],
      references: [positions.id],
    }),
    department: one(departments, {
      fields: [userCompanyAssignments.departmentId],
      references: [departments.id],
    }),
  })
);
