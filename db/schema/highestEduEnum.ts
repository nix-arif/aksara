import { pgEnum } from "drizzle-orm/pg-core";

export const highestEduEnum = pgEnum("higest_edu", [
  "spm",
  "diploma",
  "degree",
  "master",
  "phd",
]);
