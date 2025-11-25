"use server";

import { RegisterSchema } from "@/shemas";
import { genSaltSync, hashSync } from "bcrypt-ts";
