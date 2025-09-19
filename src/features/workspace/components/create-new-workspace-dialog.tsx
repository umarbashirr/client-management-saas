"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CreateWorkspaceForm } from "./create-workspace-form";

export const CreateNewWorkspaceDialog = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  return (
    <>
      {" "}
      <div className="text-center">
        <Button
          variant="outline"
          onClick={() => setShowCreateDialog(true)}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Workspace
        </Button>
      </div>
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Workspace</DialogTitle>
            <DialogDescription>
              Create a new workspace to organize your projects and collaborate
              with your team.
            </DialogDescription>
          </DialogHeader>
          <CreateWorkspaceForm />
        </DialogContent>
      </Dialog>
    </>
  );
};
