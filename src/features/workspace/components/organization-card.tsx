"use client";

import { OrganizationWithMembersIdAndRole } from "@/features/workspace/types/organization.interface";
import { ArrowRight } from "lucide-react";
import { selectWorkspace } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const OrganizationCard = ({
  organization,
}: {
  organization: OrganizationWithMembersIdAndRole;
}) => {
  const router = useRouter();
  const handleSelectOrganization = async () => {
    try {
      const { success, error } = await selectWorkspace(organization.id);
      if (!success) {
        throw new Error(error);
      }
      toast.success("Workspace selected successfully");
      router.push(`/workspace/${organization.id}/dashboard`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <div
      className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 cursor-pointer transition-colors"
      onClick={handleSelectOrganization}
    >
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-medium">
            {organization.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <div className="font-medium">{organization.name}</div>
          <div className="text-sm text-muted-foreground">
            {organization.members.length} member
            {organization.members.length !== 1 ? "s" : ""} •{" "}
            {organization.members[0]?.role}
          </div>
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground" />
    </div>
  );
};
