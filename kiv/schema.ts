// import { defineRelations } from "drizzle-orm";
// import {
//   boolean,
//   pgEnum,
//   pgTable,
//   primaryKey,
//   text,
//   timestamp,
//   uuid,
//   varchar,
// } from "drizzle-orm/pg-core";

// export const employmentTypeEnum = pgEnum("employmentType", [
//   "full-time",
//   "part-time",
//   "contract",
//   "intership",
// ]);

// export const genderEnum = pgEnum("gender", ["male", "female"]);

// export const highestEduEnum = pgEnum("higest_edu", [
//   "spm",
//   "diploma",
//   "degree",
//   "master",
//   "phd",
// ]);

// export const maritalStatusEnum = pgEnum("marital_status", [
//   "single",
//   "married",
// ]);

// export const companies = pgTable("companies", {
//   id: uuid("id").defaultRandom().primaryKey(),
//   name: varchar("name", { length: 100 }).notNull(),
//   addressLine1: varchar("address_line_1", { length: 255 }).notNull(),
//   addressLine2: varchar("address_line_2", { length: 255 }),
//   postcode: varchar("postcode", { length: 16 }).notNull(),
//   city: varchar("city", { length: 24 }).notNull(),
//   province: varchar("province", { length: 16 }).notNull(),
//   country: varchar("country", { length: 16 }).notNull(),
//   oldSsmNo: varchar("old_ssm_no", { length: 255 }).unique().notNull(),
//   newSsmNo: varchar("new_ssm_no", { length: 255 }).unique().notNull(),

//   superAdminId: uuid("superadmin_id").notNull(),
// });

// export const departments = pgTable("departments", {
//   id: uuid("id").defaultRandom().primaryKey(),
//   name: varchar("name", { length: 100 }).notNull(),
// });

// export const permissions = pgTable("permissions", {
//   id: uuid("id").defaultRandom().primaryKey(),
//   name: text("name").unique().notNull(),
//   description: text("description"),
// });

// export const positions = pgTable("positions", {
//   id: uuid("id").defaultRandom().primaryKey(),
//   name: varchar("name", { length: 50 }).notNull(),
//   description: text("description"),
// });

// export const rolePermissions = pgTable(
//   "role_permissions",
//   {
//     roleId: uuid("role_id").notNull(),
//     permissionId: uuid("permission_id").notNull(),
//   },
//   (table) => [primaryKey({ columns: [table.roleId, table.permissionId] })]
// );

// export const roles = pgTable("roles", {
//   id: uuid("id").defaultRandom().primaryKey(),
//   name: text("name").unique().notNull(),
//   description: text("description"),
// });

// export const sessions = pgTable("sessions", {
//   id: uuid("id").defaultRandom().primaryKey(),
//   userId: uuid("user_id").notNull(),
//   expiresAt: timestamp("expires_at", {
//     withTimezone: true,
//     mode: "date",
//   }).notNull(),
// });

// export const userCompanyAssignments = pgTable(
//   "user_company_assignments",
//   {
//     userId: uuid("user_id").notNull(),
//     companyId: uuid("company_id").notNull(),
//     roleId: uuid("role_id").notNull(),
//     positionId: uuid("position_id").notNull(),
//     departmentId: uuid("department_id").notNull(),

//     created_at: timestamp("created_at").defaultNow().notNull(),
//   },
//   (table) => [primaryKey({ columns: [table.userId, table.companyId] })]
// );

// export const users = pgTable("users", {
//   id: uuid("id").defaultRandom().primaryKey(),
//   email: text("email").notNull(),
//   hashedPassword: text("hashed_password").notNull(),
//   username: varchar("username", { length: 10 }).notNull(),
//   isSuperAdmin: boolean().default(false),

//   fullname: varchar("fullname", { length: 255 }),
//   gender: genderEnum("gender").default("male"),
//   nric: varchar("nric", { length: 255 }),
//   passportNo: varchar("passport_no", { length: 255 }),
//   dob: timestamp("dob", { mode: "string" }),
//   maritalStatus: maritalStatusEnum("marital_status"),
//   nationality: varchar("nationality", { length: 64 })
//     .default("malaysia")
//     .notNull(),

//   employmentType: employmentTypeEnum("employment_type")
//     .notNull()
//     .default("full-time"),

//   bankName: varchar("bank_name", { length: 64 }),
//   bankAccNo: varchar("bank_acc_no", { length: 64 }),
//   accHolderName: varchar("acc_holder_name", { length: 255 }),

//   addressLine1: varchar("address_line_1", { length: 255 }),
//   addressLine2: varchar("address_line_2", { length: 255 }),
//   postcode: varchar("postcode", { length: 16 }),
//   city: varchar("city", { length: 24 }),
//   province: varchar("province", { length: 16 }),
//   country: varchar("country", { length: 16 }),

//   phone: varchar("phone", { length: 64 }),
//   epfNo: varchar("epf_no", { length: 255 }),
//   socsoNo: varchar("socso_no", { length: 255 }),
//   tinNo: varchar("tin_no", { length: 64 }),
//   previousEmployer: varchar("previous_employer", { length: 255 }),

//   highestEdu: highestEduEnum("highest_edu"),
//   fieldOfStudy: varchar("field_of_study", { length: 64 }),
//   institution: varchar("instituition", { length: 64 }),
//   certificate: varchar("certificate", { length: 255 }),

//   emergencyContactName: varchar("emergency_contact_name", {
//     length: 255,
//   }),
//   relationship: varchar("relationship", { length: 64 }),
//   emergencyContactPhone: varchar("emergency_contact_phone", {
//     length: 64,
//   }),
//   emergencyContactAddress: varchar("emergency_contact_address", {
//     length: 255,
//   }),

//   dateJoin: timestamp("date_join", { mode: "string" }),
//   dateResign: timestamp("date_resign", { mode: "string" }),

//   createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
// });

// export const schemaRelations = defineRelations(
//   {
//     companies,
//     departments,
//     permissions,
//     positions,
//     rolePermissions,
//     roles,
//     sessions,
//     userCompanyAssignments,
//     users,
//   },
//   (r) => ({
//     //====================================================
//     // 1. USERS relations
//     //====================================================
//     users: {
//       // One-to-Many: User (SuperAdmin) ke Companies
//       superAdminCompanies: r.many.companies({
//         from: r.companies.superAdminId,
//         to: r.users.id,
//       }),
//       // One-to-Many: User ke Session
//       sessions: r.many.sessions({
//         from: r.sessions.userId,
//         to: r.users.id,
//       }),
//       // Many-to-Many: User ke Company
//       companyAssignments: r.many.userCompanyAssignments({
//         from: r.userCompanyAssignments.userId,
//         to: r.users.id,
//       }),
//     },
//     //====================================================
//     // 2. COMPANIES relations
//     //====================================================
//     companies: {
//       // Many-to-One: Company ke SuperAdmin (User)
//       superAdmin: r.one.users({
//         from: r.companies.superAdminId,
//         to: r.users.id,
//       }),
//       // Many-to-Many: Company ke Company
//       userAssignments: r.many.userCompanyAssignments({
//         from: r.userCompanyAssignments.companyId,
//         to: r.companies.id,
//       }),
//     },
//     //====================================================
//     // 3. JUNCTION TABLE Relations (userCompanyAssignments)
//     //====================================================
//     userCompanyAssignments: {
//       // Many-to-One: Assignment ke User
//       user: r.one.users({
//         from: r.userCompanyAssignments.userId,
//         to: r.users.id,
//       }),
//       // Many-to-One: Assignment ke Company
//       company: r.one.companies({
//         from: r.userCompanyAssignments.companyId,
//         to: r.companies.id,
//       }),
//       // Many-to-One: Assignment ke Role
//       role: r.one.roles({
//         from: r.userCompanyAssignments.roleId,
//         to: r.roles.id,
//       }),
//       // Many-to-One: Assignment to Position
//       position: r.one.positions({
//         from: r.userCompanyAssignments.positionId,
//         to: r.positions.id,
//       }),
//       // Many-to-One: Assignment ke Department
//       department: r.one.departments({
//         from: r.userCompanyAssignments.departmentId,
//         to: r.departments.id,
//       }),
//     },
//     //====================================================
//     // 4. RBAC Relations (Role, Permission, RolePermissions)
//     //====================================================
//     roles: {
//       // Many-to-Many: Role ke Permission
//       rolePermissions: r.many.rolePermissions({
//         from: r.rolePermissions.roleId,
//         to: r.roles.id,
//       }),
//       // One-to-Many: Role ke Assignment
//       userAssignments: r.many.userCompanyAssignments({
//         from: r.userCompanyAssignments.roleId,
//         to: r.roles.id,
//       }),
//     },

//     permissions: {
//       // Many-to-Many: Permission ke Role
//       rolePermissions: r.many.rolePermissions({
//         from: r.rolePermissions.permissionId,
//         to: r.permissions.id,
//       }),
//     },

//     rolePermissions: {
//       // Juction: Menghubungkan ke Role
//       role: r.one.roles({
//         from: r.rolePermissions.roleId,
//         to: r.roles.id,
//       }),
//       // Junction: Menghubungkan ke Permission
//       permission: r.one.permissions({
//         from: r.rolePermissions.permissionId,
//         to: r.permissions.id,
//       }),
//     },
//     //====================================================
//     // 5. LOOKUP TABLES & SESSION Relations
//     //====================================================
//     positions: {
//       userAssignments: r.many.userCompanyAssignments({
//         from: r.userCompanyAssignments.positionId,
//         to: r.positions.id,
//       }),
//     },
//     departments: {
//       userAssignments: r.many.userCompanyAssignments({
//         from: r.userCompanyAssignments.departmentId,
//         to: r.departments.id,
//       }),
//     },
//     sessions: {
//       user: r.one.users({
//         from: r.sessions.userId,
//         to: r.users.id,
//       }),
//     },
//   })
// );

// export const schema = {
//   ...companies,
//   ...departments,
//   ...permissions,
//   ...positions,
//   ...rolePermissions,
//   ...roles,
//   ...sessions,
//   ...userCompanyAssignments,
//   ...users,
//   ...schemaRelations,
// };
