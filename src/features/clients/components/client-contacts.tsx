"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Edit,
  Mail,
  MoreVertical,
  Phone,
  Plus,
  Star,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import { ClientWithContacts } from "../types";
import { AddContactForm } from "./add-contact-form";
import { EditContactForm } from "./edit-contact-form";
import { DeleteContactDialog } from "./delete-contact-dialog";
import { setPrimaryContact, deleteContact } from "../contact-actions";
import { toast } from "sonner";
import { ClientContact } from "@/lib/db/generated/prisma";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ClientContactsProps {
  client: ClientWithContacts;
  organizationId: string;
}

export function ClientContacts({
  client,
  organizationId,
}: ClientContactsProps) {
  const [showAddContactDialog, setShowAddContactDialog] = useState(false);
  const [editingContact, setEditingContact] = useState<ClientContact | null>(
    null
  );
  const [deletingContact, setDeletingContact] = useState<ClientContact | null>(
    null
  );

  const primaryContact = client.contacts.find((contact) => contact.isPrimary);
  const otherContacts = client.contacts.filter((contact) => !contact.isPrimary);

  const handleAddContact = () => {
    setShowAddContactDialog(true);
  };

  const handleEditContact = (contact: ClientContact) => {
    setEditingContact(contact);
  };

  const handleDeleteContact = (contact: ClientContact) => {
    setDeletingContact(contact);
  };

  const handleSetPrimary = async (contactId: string) => {
    try {
      const { success, error } = await setPrimaryContact(
        contactId,
        organizationId
      );

      if (!success) {
        throw new Error(error);
      }

      toast.success("Primary contact updated successfully");
      // Refresh the page to show updated data
      window.location.reload();
    } catch (error) {
      console.error("Error setting primary contact:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const handleContactSuccess = () => {
    // Close all dialogs
    setShowAddContactDialog(false);
    setEditingContact(null);
    setDeletingContact(null);
    // Refresh the page to show updated data
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Contacts</h2>
          <p className="text-muted-foreground">
            Manage contacts for {client.name}
          </p>
        </div>
        <Button
          onClick={handleAddContact}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Contact</span>
        </Button>
      </div>

      {/* Primary Contact */}
      {primaryContact && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 fill-yellow-500" />
              <span>Primary Contact</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {primaryContact.firstName.charAt(0)}
                    {primaryContact.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    {primaryContact.firstName} {primaryContact.lastName}
                  </h3>
                  {primaryContact.position && (
                    <p className="text-sm">{primaryContact.position}</p>
                  )}
                  {primaryContact.department && (
                    <p className="text-sm">{primaryContact.department}</p>
                  )}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleEditContact(primaryContact)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Contact
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleDeleteContact(primaryContact)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Contact
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {primaryContact.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <a
                      href={`mailto:${primaryContact.email}`}
                      className="text-sm"
                    >
                      {primaryContact.email}
                    </a>
                  </div>
                </div>
              )}
              {primaryContact.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <a href={`tel:${primaryContact.phone}`} className="text-sm">
                      {primaryContact.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {primaryContact.preferredContactMethod && (
              <div className="mt-4">
                <p className="text-sm font-medium">Preferred Contact Method</p>
                <Badge variant="outline" className="mt-1">
                  {primaryContact.preferredContactMethod}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Other Contacts */}
      {otherContacts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Other Contacts</CardTitle>
            <CardDescription>
              Additional contacts for this client
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {otherContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarFallback className="rounded-lg">
                            {contact.firstName.charAt(0)}
                            {contact.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {contact.firstName} {contact.lastName}
                          </p>
                          {contact.department && (
                            <p className="text-sm">{contact.department}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{contact.position || "—"}</TableCell>
                    <TableCell>
                      {contact.email ? (
                        <a href={`mailto:${contact.email}`} className="text-sm">
                          {contact.email}
                        </a>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      {contact.phone ? (
                        <a href={`tel:${contact.phone}`} className="text-sm">
                          {contact.phone}
                        </a>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={contact.isActive ? "default" : "secondary"}
                        className={
                          contact.isActive ? "bg-green-100 text-green-800" : ""
                        }
                      >
                        {contact.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleSetPrimary(contact.id)}
                          >
                            <Star className="h-4 w-4 mr-2" />
                            Set as Primary
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditContact(contact)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Contact
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteContact(contact)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Contact
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* No Contacts State */}
      {client.contacts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No contacts yet</h3>
            <p className="mb-4">
              Add contacts to manage communication with this client.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Dialogs */}
      {showAddContactDialog && (
        <AddContactForm
          clientId={client.id}
          organizationId={organizationId}
          onSuccess={handleContactSuccess}
          onCancel={() => setShowAddContactDialog(false)}
        />
      )}

      {editingContact && (
        <EditContactForm
          contact={editingContact}
          organizationId={organizationId}
          onSuccess={handleContactSuccess}
          onCancel={() => setEditingContact(null)}
        />
      )}

      {deletingContact && (
        <DeleteContactDialog
          contact={deletingContact}
          organizationId={organizationId}
          onSuccess={handleContactSuccess}
          onCancel={() => setDeletingContact(null)}
        />
      )}
    </div>
  );
}
