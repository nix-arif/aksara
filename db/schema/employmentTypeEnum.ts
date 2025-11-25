import { pgEnum } from "drizzle-orm/pg-core";

export const employmentTypeEnum = pgEnum("employmentType", [
  "full-time",
  "part-time",
  "contract",
  "intership",
]);
