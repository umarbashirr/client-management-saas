import { Client, ClientContact } from "@/lib/db/generated/prisma";

export type ClientWithContacts = Client & {
  contacts: ClientContact[];
};

export type ClientStatus = "active" | "inactive" | "prospect" | "lead";
export type ClientPriority = "low" | "medium" | "high" | "critical";
export type ClientSource =
  | "referral"
  | "website"
  | "social"
  | "cold_call"
  | "other";

export const CLIENT_STATUS_OPTIONS = [
  { value: "active", label: "Active", color: "green" },
  { value: "inactive", label: "Inactive", color: "gray" },
  { value: "prospect", label: "Prospect", color: "blue" },
  { value: "lead", label: "Lead", color: "yellow" },
] as const;

export const CLIENT_PRIORITY_OPTIONS = [
  { value: "low", label: "Low", color: "gray" },
  { value: "medium", label: "Medium", color: "blue" },
  { value: "high", label: "High", color: "orange" },
  { value: "critical", label: "Critical", color: "red" },
] as const;

export const CLIENT_SOURCE_OPTIONS = [
  { value: "referral", label: "Referral" },
  { value: "website", label: "Website" },
  { value: "social", label: "Social Media" },
  { value: "cold_call", label: "Cold Call" },
  { value: "other", label: "Other" },
] as const;
