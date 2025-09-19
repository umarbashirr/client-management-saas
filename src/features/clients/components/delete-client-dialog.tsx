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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircleIcon, AlertTriangle, Trash2 } from "lucide-react";
import { deleteClient } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ClientWithContacts } from "../types";
import { Alert } from "@/components/ui/alert";
import { AlertTitle } from "@/components/ui/alert";
import { AlertDescription } from "@/components/ui/alert";

interface DeleteClientDialogProps {
  client: ClientWithContacts;
  organizationId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function DeleteClientDialog({
  client,
  organizationId,
  isOpen,
  onClose,
  onSuccess,
}: DeleteClientDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [confirmationText, setConfirmationText] = useState("");
  const router = useRouter();

  const expectedConfirmationText = client.name;
  const isConfirmationValid = confirmationText === expectedConfirmationText;

  const handleDelete = async () => {
    if (!isConfirmationValid) {
      toast.error("Please type the client name to confirm deletion");
      return;
    }

    setIsDeleting(true);
    try {
      const { success, error } = await deleteClient(
        client.id,
        organizationId,
        deleteReason || undefined
      );

      if (!success) {
        throw new Error(error);
      }

      toast.success("Client deleted successfully");
      onClose();
      onSuccess?.();
      router.refresh();
    } catch (error) {
      console.error("Error deleting client:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (!isDeleting) {
      setDeleteReason("");
      setConfirmationText("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-500">
            <AlertTriangle className="h-5 w-5" />
            Delete Client
          </DialogTitle>
          <DialogDescription>
            This action will permanently delete the client and all associated
            data. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Client Info */}

          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Delete Client {client.name}</AlertTitle>
            <AlertDescription>
              <p>
                This action will permanently delete the client and all
                associated data. This action cannot be undone.
              </p>
              <ul className="list-inside list-disc text-sm">
                <li>All contacts will also be deactivated</li>
                <li>All data will be permanently deleted</li>
                <li>All associated data will be permanently deleted</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Delete Reason */}
          <div className="space-y-2">
            <Label htmlFor="deleteReason">Reason for deletion (optional)</Label>
            <Textarea
              id="deleteReason"
              placeholder="Enter reason for deletion..."
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
              rows={3}
              disabled={isDeleting}
            />
          </div>

          {/* Confirmation */}
          <div className="space-y-2">
            <Label htmlFor="confirmation">
              Type{" "}
              <span className="font-mono font-semibold">
                {expectedConfirmationText}
              </span>{" "}
              to confirm
            </Label>
            <Input
              id="confirmation"
              placeholder={expectedConfirmationText}
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              disabled={isDeleting}
              className={
                !isConfirmationValid && confirmationText ? "border-red-500" : ""
              }
            />
            {!isConfirmationValid && confirmationText && (
              <p className="text-sm text-red-600">
                Please type the exact client name to confirm
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!isConfirmationValid || isDeleting}
            className="gap-2"
          >
            {isDeleting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete Client
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
