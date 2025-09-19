import { z } from "zod";

export const createClientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  companyName: z.string().optional(),
  website: z.string().optional(),
  description: z.string().optional(),
  primaryEmail: z.string().optional(),
  primaryPhone: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  annualRevenue: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  source: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type CreateClientSchema = z.infer<typeof createClientSchema>;
