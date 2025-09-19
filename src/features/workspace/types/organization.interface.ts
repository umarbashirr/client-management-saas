export interface OrganizationWithMembersIdAndRole {
  id: string;
  name: string;
  slug: string | null;
  logo: string | null;
  createdAt: Date;
  metadata: string | null;
  members: {
    id: string;
    role: string;
  }[];
}
