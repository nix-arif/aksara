import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { genderEnum } from "./genderEnum";
import { maritalStatusEnum } from "./maritalStatusEnum";
import { employmentTypeEnum } from "./employmentTypeEnum";
import { highestEduEnum } from "./highestEduEnum";
import { relations } from "drizzle-orm";
import { companyUser } from "./companyUser";

export const user = pgTable("user", {
  id: uuid("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  hashedPassword: varchar("hashedpassword").notNull(),
  username: varchar("username", { length: 6 }).notNull(),
  fullname: varchar("fullname", { length: 255 }).notNull(),
  gender: genderEnum("gender").notNull(),
  nric: varchar("nric", { length: 255 }),
  position: varchar("position", { length: 64 }).notNull(),
  department: varchar("department", { length: 64 }).notNull(),
  employmentType: employmentTypeEnum("employment_type")
    .notNull()
    .default("full-time"),
  passportNo: varchar("passportNo", { length: 255 }),
  dob: timestamp("dob", { mode: "string" }).notNull(),
  maritalStatus: maritalStatusEnum("marital_status").notNull(),
  nationality: varchar("nationality", { length: 64 })
    .default("malaysia")
    .notNull(),
  bankName: varchar("bankName", { length: 64 }).notNull(),
  bankAccNo: varchar("bank_acc_no", { length: 64 }).notNull(),
  accountHolderName: varchar("acc_holder_name", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 64 }).notNull(),
  epfNo: varchar("epfNo", { length: 255 }),
  socsoNo: varchar("socsoNo", { length: 255 }),
  tinNo: varchar("tin_no", { length: 64 }).notNull(),
  previousEmployer: varchar("previous_employer", { length: 255 }).notNull(),

  highestEdu: highestEduEnum("highest_edu").notNull(),
  fieldOfStudy: varchar("field_of_study", { length: 64 }).notNull(),
  institution: varchar("instituition", { length: 64 }).notNull(),
  certificate: varchar("certificate", { length: 255 }),
  emergencyContactName: varchar("emergency_contact_name", {
    length: 255,
  }).notNull(),
  relationship: varchar("relationship", { length: 64 }).notNull(),
  emergencyContactPhone: varchar("emergency_contact_phone", {
    length: 64,
  }).notNull(),
  emergencyContactAddress: varchar("emergency_contact_address", {
    length: 255,
  }).notNull(),

  dateJoin: timestamp("dateJoin", { mode: "string" }).notNull(),
  dateResign: timestamp("dateResign", { mode: "string" }).notNull(),
});

export const userRelations = relations(user, ({ one, many }) => ({
  companyUser: many(companyUser),
}));
