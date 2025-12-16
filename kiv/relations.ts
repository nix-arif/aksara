// import { defineRelations } from "drizzle-orm";
// import * as userSchema from "./schema/users";
// import * as companySchema from "./schema/companies";
// import * as roleSchema from "./schema/roles";
// import * as departmentSchema from "./schema/departments";
// import * as positionSchema from "./schema/positions";
// import * as permissionSchema from "./schema/permissions";
// import * as rolePermissionSchema from "./schema/rolePermissions";
// import * as userCompanyAssignmentSchema from "./schema/userCompanyAssignments";
// import * as sessionSchema from "./schema/sessions";

// const allTables = {
//   ...userSchema,
//   ...companySchema,
//   ...roleSchema,
//   ...departmentSchema,
//   ...positionSchema,
//   ...permissionSchema,
//   ...rolePermissionSchema,
//   ...userCompanyAssignmentSchema,
//   ...sessionSchema,
// };

// export const schemaRelations = defineRelations(allTables, (r) => ({
//   //====================================================
//   // 1. USERS relations
//   //====================================================
//   users: {
//     // One-to-Many: User (SuperAdmin) ke Companies
//     superAdminCompanies: r.many.companies({
//       from: r.companies.superAdminId,
//       to: r.users.id,
//     }),
//     // One-to-Many: User ke Session
//     sessions: r.many.sessions({
//       from: r.sessions.userId,
//       to: r.users.id,
//     }),
//     // Many-to-Many: User ke Company
//     companyAssignments: r.many.userCompanyAssignments({
//       from: r.userCompanyAssignments.userId,
//       to: r.users.id,
//     }),
//   },
//   //====================================================
//   // 2. COMPANIES relations
//   //====================================================
//   companies: {
//     // Many-to-One: Company ke SuperAdmin (User)
//     superAdmin: r.one.users({
//       from: r.companies.superAdminId,
//       to: r.users.id,
//     }),
//     // Many-to-Many: Company ke Company
//     userAssignments: r.many.userCompanyAssignments({
//       from: r.userCompanyAssignments.companyId,
//       to: r.companies.id,
//     }),
//   },
//   //====================================================
//   // 3. JUNCTION TABLE Relations (userCompanyAssignments)
//   //====================================================
//   userCompanyAssignments: {
//     // Many-to-One: Assignment ke User
//     user: r.one.users({
//       from: r.userCompanyAssignments.userId,
//       to: r.users.id,
//     }),
//     // Many-to-One: Assignment ke Company
//     company: r.one.companies({
//       from: r.userCompanyAssignments.companyId,
//       to: r.companies.id,
//     }),
//     // Many-to-One: Assignment ke Role
//     role: r.one.roles({
//       from: r.userCompanyAssignments.roleId,
//       to: r.roles.id,
//     }),
//     // Many-to-One: Assignment to Position
//     position: r.one.positions({
//       from: r.userCompanyAssignments.positionId,
//       to: r.positions.id,
//     }),
//     // Many-to-One: Assignment ke Department
//     department: r.one.departments({
//       from: r.userCompanyAssignments.departmentId,
//       to: r.departments.id,
//     }),
//   },
//   //====================================================
//   // 4. RBAC Relations (Role, Permission, RolePermissions)
//   //====================================================
//   roles: {
//     // Many-to-Many: Role ke Permission
//     rolePermissions: r.many.rolePermissions({
//       from: r.rolePermissions.roleId,
//       to: r.roles.id,
//     }),
//     // One-to-Many: Role ke Assignment
//     userAssignments: r.many.userCompanyAssignments({
//       from: r.userCompanyAssignments.roleId,
//       to: r.roles.id,
//     }),
//   },

//   permissions: {
//     // Many-to-Many: Permission ke Role
//     rolePermissions: r.many.rolePermissions({
//       from: r.rolePermissions.permissionId,
//       to: r.permissions.id,
//     }),
//   },

//   rolePermissions: {
//     // Juction: Menghubungkan ke Role
//     role: r.one.roles({
//       from: r.rolePermissions.roleId,
//       to: r.roles.id,
//     }),
//     // Junction: Menghubungkan ke Permission
//     permission: r.one.permissions({
//       from: r.rolePermissions.permissionId,
//       to: r.permissions.id,
//     }),
//   },
//   //====================================================
//   // 5. LOOKUP TABLES & SESSION Relations
//   //====================================================
//   positions: {
//     userAssignments: r.many.userCompanyAssignments({
//       from: r.userCompanyAssignments.positionId,
//       to: r.positions.id,
//     }),
//   },
//   departments: {
//     userAssignments: r.many.userCompanyAssignments({
//       from: r.userCompanyAssignments.departmentId,
//       to: r.departments.id,
//     }),
//   },
//   sessions: {
//     user: r.one.users({
//       from: r.sessions.userId,
//       to: r.users.id,
//     }),
//   },
// }));

// export const schema = {
//   ...allTables,
//   ...schemaRelations,
// };
