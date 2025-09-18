import { z } from "zod";

export const forgotPasswordFormSchema = z.object({
  email: z.email("Invalid email address"),
});

export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>;
