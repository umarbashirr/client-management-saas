"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
} from "lucide-react";
import {
  ClientWithContacts,
  CLIENT_STATUS_OPTIONS,
  CLIENT_PRIORITY_OPTIONS,
} from "../types";
import { format } from "date-fns";

export const clientTableColumns: ColumnDef<ClientWithContacts>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:-ml-4"
        >
          Client Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const client = row.original;
      return (
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {client.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="font-medium">{client.name}</div>
            {client.companyName && (
              <div className="text-sm text-muted-foreground">
                {client.companyName}
              </div>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "primaryEmail",
    header: "Contact",
    cell: ({ row }) => {
      const client = row.original;
      const primaryContact = client.contacts.find(
        (contact) => contact.isPrimary
      );

      return (
        <div className="flex flex-col space-y-1">
          {primaryContact ? (
            <>
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm">
                  {primaryContact.email || client.primaryEmail}
                </span>
              </div>
              {primaryContact.phone && (
                <div className="flex items-center space-x-1">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {primaryContact.phone}
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center space-x-1">
              <Mail className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {client.primaryEmail || "No contact info"}
              </span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusOption = CLIENT_STATUS_OPTIONS.find(
        (option) => option.value === status
      );

      return (
        <Badge
          variant="outline"
          className={`${
            statusOption?.color === "green"
              ? "bg-green-50 text-green-700 border-green-200"
              : statusOption?.color === "blue"
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : statusOption?.color === "yellow"
                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                  : "bg-gray-50 text-gray-700 border-gray-200"
          }`}
        >
          {statusOption?.label || status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string;
      const priorityOption = CLIENT_PRIORITY_OPTIONS.find(
        (option) => option.value === priority
      );

      return (
        <Badge
          variant="outline"
          className={`${
            priorityOption?.color === "red"
              ? "bg-red-50 text-red-700 border-red-200"
              : priorityOption?.color === "orange"
                ? "bg-orange-50 text-orange-700 border-orange-200"
                : priorityOption?.color === "blue"
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-gray-50 text-gray-700 border-gray-200"
          }`}
        >
          {priorityOption?.label || priority}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "industry",
    header: "Industry",
    cell: ({ row }) => {
      const industry = row.getValue("industry") as string;
      return <div className="text-sm">{industry || "—"}</div>;
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[];
      return (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{tags.length - 2}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:-ml-4"
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return (
        <div className="text-sm text-muted-foreground">
          {format(new Date(date), "MMM dd, yyyy")}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const client = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(client.id)}
            >
              Copy client ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit client
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete client
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
