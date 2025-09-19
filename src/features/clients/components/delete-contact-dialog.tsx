"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteContact } from "../contact-actions";
import { ClientContact } from "@/lib/db/generated/prisma";
import { toast } from "sonner";

interface DeleteContactDialogProps {
  contact: ClientContact;
  organizationId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function DeleteContactDialog({
  contact,
  organizationId,
  onSuccess,
  onCancel,
}: DeleteContactDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const { success, error } = await deleteContact(
        contact.id,
        organizationId
      );

      if (!success) {
        throw new Error(error);
      }

      toast.success("Contact deleted successfully");
      onSuccess();
    } catch (error) {
      console.error("Error deleting contact:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Contact</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold">
              {contact.firstName} {contact.lastName}
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Contact"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
