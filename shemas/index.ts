import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    error: "Minimum 6 characters required.",
  }),
});

export const ResetSchema = z.object({
  email: z.email({
    pattern: z.regexes.unicodeEmail,
    error: "Email is required.",
  }),
});

export const LoginSchema = z.object({
  email: z.email({
    error: "Email is required",
  }),
  password: z.string().min(1, {
    error: "Password is required",
  }),
});

export const RegisterSchema = z
  .object({
    email: z.email({ error: "Email is required" }),
    password: z.string().min(6, { error: "Minimum 6 characters required" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });
