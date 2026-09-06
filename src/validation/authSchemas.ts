import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, { message: "Email address is required" })
  .email();

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters longs" })
  .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, {
    message: "Password should contain at least 1 special character",
  });

export type EmailSchema = z.infer<typeof emailSchema>;
export type PasswordSchema = z.infer<typeof passwordSchema>;
