import { z } from "zod";

export const createContactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional(),
  position: z.string().optional(),
  department: z.string().optional(),
  isPrimary: z.boolean(),
  preferredContactMethod: z.enum(["email", "phone", "sms"]).optional(),
  timezone: z.string().optional(),
  isActive: z.boolean(),
});

export const updateContactSchema = createContactSchema.partial().extend({
  id: z.string(),
});

export type CreateContactSchema = z.infer<typeof createContactSchema>;
export type UpdateContactSchema = z.infer<typeof updateContactSchema>;
