import { pgEnum } from "drizzle-orm/pg-core";

export const maritalStatusEnum = pgEnum("marital_status", [
  "single",
  "married",
]);
