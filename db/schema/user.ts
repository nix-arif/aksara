import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import * as z from "zod";
import { genderEnum } from "./genderEnum";
import { maritalStatusEnum } from "./maritalStatusEnum";
import { employmentTypeEnum } from "./employmentTypeEnum";
import { highestEduEnum } from "./highestEduEnum";
import { relations, sql } from "drizzle-orm";
import { userCompany } from "./userCompany";
import { roleEnum } from "./roleEnum";

export const user = pgTable("user", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: varchar("email", { length: 255 }).notNull(),
  password_hash: varchar("password_hash").notNull(),
  username: varchar("username", { length: 10 }).notNull(),

  is_superadmin: boolean().default(false),
  fullname: varchar("fullname", { length: 255 }),
  role: roleEnum("role").default("notAssign").notNull(),
  gender: genderEnum("gender").default("male"),

  nric: varchar("nric", { length: 255 }),
  passport_no: varchar("passport_no", { length: 255 }),
  dob: timestamp("dob", { mode: "string" }),
  marital_status: maritalStatusEnum("marital_status"),
  nationality: varchar("nationality", { length: 64 })
    .default("malaysia")
    .notNull(),
  employment_type: employmentTypeEnum("employment_type")
    .notNull()
    .default("full-time"),

  bank_name: varchar("bank_name", { length: 64 }),
  bank_acc_no: varchar("bank_acc_no", { length: 64 }),
  acc_holder_ame: varchar("acc_holder_name", { length: 255 }),

  address_line_1: varchar("address_line_1", { length: 255 }),
  address_line_2: varchar("address_line_2", { length: 255 }),
  postcode: varchar("postcode", { length: 16 }),
  city: varchar("city", { length: 24 }),
  province: varchar("province", { length: 16 }),
  country: varchar("country", { length: 16 }),

  phone: varchar("phone", { length: 64 }),
  epf_no: varchar("epf_no", { length: 255 }),
  socso_no: varchar("socso_no", { length: 255 }),
  tin_no: varchar("tin_no", { length: 64 }),
  previous_employer: varchar("previous_employer", { length: 255 }),

  highest_edu: highestEduEnum("highest_edu"),
  field_of_study: varchar("field_of_study", { length: 64 }),
  institution: varchar("instituition", { length: 64 }),
  certificate: varchar("certificate", { length: 255 }),

  emergency_contact_name: varchar("emergency_contact_name", {
    length: 255,
  }),
  relationship: varchar("relationship", { length: 64 }),
  emergency_contact_phone: varchar("emergency_contact_phone", {
    length: 64,
  }),
  emergency_contact_address: varchar("emergency_contact_address", {
    length: 255,
  }),

  date_join: timestamp("date_join", { mode: "string" }),
  date_resign: timestamp("date_resign", { mode: "string" }),

  created_at: timestamp("created_at", { mode: "string" })
    .defaultNow()
    .notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  userCompany: many(userCompany),
}));

export const userSchema = createSelectSchema(user);
export type UserSchema = z.infer<typeof userSchema>;
