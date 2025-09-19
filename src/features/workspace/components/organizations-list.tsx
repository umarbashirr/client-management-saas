"use client";

import { OrganizationWithMembersIdAndRole } from "@/features/workspace/types/organization.interface.interface";
import { OrganizationCard } from "./organization-card";

export const OrganizationsList = ({
  organizations,
}: {
  organizations: OrganizationWithMembersIdAndRole[];
}) => {
  return (
    <>
      {organizations.map((organization) => (
        <OrganizationCard key={organization.id} organization={organization} />
      ))}
    </>
  );
};
