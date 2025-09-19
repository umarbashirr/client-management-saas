import { Building2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CreateWorkspaceForm } from "@/features/workspace/components/create-workspace-form";
import { OrganizationsList } from "@/features/workspace/components/organizations-list";
import { getOrganizations } from "@/features/workspace/data";
import { CreateNewWorkspaceDialog } from "@/features/workspace/components/create-new-workspace-dialog";

const WorkspacesPage = async () => {
  const organizations = await getOrganizations();

  // If no organizations, show only the create form
  if (organizations.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Welcome!</h1>
            <p className="text-muted-foreground">
              Create your first workspace to get started
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Create Workspace</CardTitle>
              <CardDescription>
                Set up your organization to start managing projects and
                collaborating with your team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateWorkspaceForm />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // If organizations exist, show workspace selection with auto-redirect
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Select Workspace</h1>
          <p className="text-muted-foreground">
            Choose a workspace to continue
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Available Workspaces</CardTitle>
            <CardDescription>
              You have access to {organizations.length} workspace
              {organizations.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <OrganizationsList organizations={organizations} />
          </CardContent>
        </Card>

        <CreateNewWorkspaceDialog />
      </div>
    </div>
  );
};

export default WorkspacesPage;
