"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import {
  ArrowLeft,
  Building2,
  Edit,
  Globe,
  Mail,
  MoreVertical,
  Phone,
  Tag,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CLIENT_PRIORITY_OPTIONS,
  CLIENT_STATUS_OPTIONS,
  ClientWithContacts,
} from "../types";
import { EditClientForm } from "./edit-client-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ClientDetailHeaderProps {
  client: ClientWithContacts;
  organizationId: string;
  onClientUpdate: () => void;
}

export function ClientDetailHeader({
  client,
  organizationId,
  onClientUpdate,
}: ClientDetailHeaderProps) {
  const router = useRouter();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const statusOption = CLIENT_STATUS_OPTIONS.find(
    (opt) => opt.value === client.status
  );
  const priorityOption = CLIENT_PRIORITY_OPTIONS.find(
    (opt) => opt.value === client.priority
  );

  const primaryContact =
    client.contacts.find((contact) => contact.isPrimary) || client.contacts[0];

  const handleBack = () => {
    router.push(`/workspace/${organizationId}/clients`);
  };

  const handleEdit = () => {
    setShowEditDialog(true);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    // TODO: Implement delete functionality
    console.log("Delete client:", client.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Clients</span>
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Client
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Client
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Client Basic Info */}
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                {client.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{client.name}</h1>
                {client.companyName && (
                  <p className="text-lg flex items-center space-x-2">
                    <Building2 className="h-4 w-4" />
                    <span>{client.companyName}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Status and Priority Badges */}
            <div className="flex items-center space-x-3">
              {statusOption && (
                <Badge
                  variant="secondary"
                  className={`bg-${statusOption.color}-100 text-${statusOption.color}-800 border-${statusOption.color}-200`}
                >
                  {statusOption.label}
                </Badge>
              )}
              {priorityOption && (
                <Badge
                  variant="secondary"
                  className={`bg-${priorityOption.color}-100 text-${priorityOption.color}-800 border-${priorityOption.color}-200`}
                >
                  {priorityOption.label} Priority
                </Badge>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="text-right space-y-2">
            <div className="text-sm">
              Created {format(new Date(client.createdAt), "MMM d, yyyy")}
            </div>
            <div className="text-sm">
              {client.contacts.length} contact
              {client.contacts.length !== 1 ? "s" : ""}
            </div>
            {client.lastContactAt && (
              <div className="text-sm">
                Last contact{" "}
                {format(new Date(client.lastContactAt), "MMM d, yyyy")}
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {client.primaryEmail && (
            <div className="flex items-center space-x-3 p-4  rounded-lg border">
              <Mail className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Primary Email</p>
                <p className="text-sm">{client.primaryEmail}</p>
              </div>
            </div>
          )}

          {client.primaryPhone && (
            <div className="flex items-center space-x-3 p-4  rounded-lg border">
              <Phone className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Primary Phone</p>
                <p className="text-sm">{client.primaryPhone}</p>
              </div>
            </div>
          )}

          {client.website && (
            <div className="flex items-center space-x-3 p-4  rounded-lg border">
              <Globe className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Website</p>
                <a
                  href={
                    client.website.startsWith("http")
                      ? client.website
                      : `https://${client.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm "
                >
                  {client.website}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Primary Contact */}
        {primaryContact && (
          <div className="p-4 rounded-lg border">
            <h3 className="text-sm font-medium mb-2">Primary Contact</h3>
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {primaryContact.firstName.charAt(0)}
                  {primaryContact.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {primaryContact.firstName} {primaryContact.lastName}
                </p>
                {primaryContact.position && (
                  <p className="text-sm">{primaryContact.position}</p>
                )}
                {primaryContact.email && (
                  <p className="text-sm">{primaryContact.email}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        {client.tags && client.tags.length > 0 && (
          <div className="flex items-center space-x-2">
            <Tag className="h-4 w-4" />
            <div className="flex flex-wrap gap-2">
              {client.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit Client Dialog */}
      <Sheet open={showEditDialog} onOpenChange={setShowEditDialog}>
        <SheetContent className="w-full lg:min-w-2xl">
          <SheetHeader>
            <SheetTitle>Edit Client</SheetTitle>
            <SheetDescription>
              Update the client information below.
            </SheetDescription>
          </SheetHeader>
          <div className="p-4 overflow-y-auto">
            <EditClientForm
              client={client}
              organizationId={organizationId}
              onSuccess={() => {
                setShowEditDialog(false);
                onClientUpdate();
              }}
              onCancel={() => setShowEditDialog(false)}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Client</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{client.name}"? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
