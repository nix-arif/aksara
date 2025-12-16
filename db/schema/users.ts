import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  text,
} from "drizzle-orm/pg-core";
import { genderEnum } from "./genderEnum";
import { maritalStatusEnum } from "./maritalStatusEnum";
import { employmentTypeEnum } from "./employmentTypeEnum";
import { highestEduEnum } from "./highestEduEnum";
import { relations } from "drizzle-orm";
import { userCompanyAssignments } from "./userCompanyAssignments";
import { companies } from "./companies";
import { sessions } from "./sessions";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  hashedPassword: text("hashed_password").notNull(),
  username: varchar("username", { length: 10 }).notNull(),
  isSuperAdmin: boolean().default(false),

  fullname: varchar("fullname", { length: 255 }),
  gender: genderEnum("gender").default("male"),
  nric: varchar("nric", { length: 255 }),
  passportNo: varchar("passport_no", { length: 255 }),
  dob: timestamp("dob", { mode: "string" }),
  maritalStatus: maritalStatusEnum("marital_status"),
  nationality: varchar("nationality", { length: 64 })
    .default("malaysia")
    .notNull(),

  employmentType: employmentTypeEnum("employment_type")
    .notNull()
    .default("full-time"),

  bankName: varchar("bank_name", { length: 64 }),
  bankAccNo: varchar("bank_acc_no", { length: 64 }),
  accHolderName: varchar("acc_holder_name", { length: 255 }),

  addressLine1: varchar("address_line_1", { length: 255 }),
  addressLine2: varchar("address_line_2", { length: 255 }),
  postcode: varchar("postcode", { length: 16 }),
  city: varchar("city", { length: 24 }),
  province: varchar("province", { length: 16 }),
  country: varchar("country", { length: 16 }),

  phone: varchar("phone", { length: 64 }),
  epfNo: varchar("epf_no", { length: 255 }),
  socsoNo: varchar("socso_no", { length: 255 }),
  tinNo: varchar("tin_no", { length: 64 }),
  previousEmployer: varchar("previous_employer", { length: 255 }),

  highestEdu: highestEduEnum("highest_edu"),
  fieldOfStudy: varchar("field_of_study", { length: 64 }),
  institution: varchar("instituition", { length: 64 }),
  certificate: varchar("certificate", { length: 255 }),

  emergencyContactName: varchar("emergency_contact_name", {
    length: 255,
  }),
  relationship: varchar("relationship", { length: 64 }),
  emergencyContactPhone: varchar("emergency_contact_phone", {
    length: 64,
  }),
  emergencyContactAddress: varchar("emergency_contact_address", {
    length: 255,
  }),

  dateJoin: timestamp("date_join", { mode: "string" }),
  dateResign: timestamp("date_resign", { mode: "string" }),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  companyAssignments: many(userCompanyAssignments),
  superAdminCompanies: many(companies),
  sessions: many(sessions),
}));
