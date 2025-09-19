"use client";

import { ClientWithContacts } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Globe,
  Mail,
  Phone,
  Calendar,
  Tag,
  DollarSign,
  Users,
  TrendingUp,
  MapPin,
} from "lucide-react";
import { format } from "date-fns";

interface ClientOverviewProps {
  client: ClientWithContacts;
  organizationId: string;
}

export function ClientOverview({
  client,
  organizationId,
}: ClientOverviewProps) {
  const formatDate = (date: Date | string) => {
    return format(new Date(date), "MMM d, yyyy");
  };

  const formatDateTime = (date: Date | string) => {
    return format(new Date(date), "MMM d, yyyy 'at' h:mm a");
  };

  return (
    <div className="space-y-6">
      {/* Key Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Basic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Company Name</p>
              <p className="text-sm">{client.companyName || "Not specified"}</p>
            </div>
            {client.industry && (
              <div>
                <p className="text-sm font-medium">Industry</p>
                <p className="text-sm">{client.industry}</p>
              </div>
            )}
            {client.companySize && (
              <div>
                <p className="text-sm font-medium">Company Size</p>
                <p className="text-sm">{client.companySize} employees</p>
              </div>
            )}
            {client.annualRevenue && (
              <div>
                <p className="text-sm font-medium">Annual Revenue</p>
                <p className="text-sm">{client.annualRevenue}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Contact Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {client.primaryEmail && (
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a href={`mailto:${client.primaryEmail}`} className="text-sm">
                    {client.primaryEmail}
                  </a>
                </div>
              </div>
            )}
            {client.primaryPhone && (
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <a href={`tel:${client.primaryPhone}`} className="text-sm">
                    {client.primaryPhone}
                  </a>
                </div>
              </div>
            )}
            {client.website && (
              <div className="flex items-center space-x-3">
                <Globe className="h-4 w-4" />
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
                    className="text-sm"
                  >
                    {client.website}
                  </a>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status & Classification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Status & Classification</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Status</p>
              <Badge variant="secondary" className="mt-1">
                {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium">Priority</p>
              <Badge variant="secondary" className="mt-1">
                {client.priority.charAt(0).toUpperCase() +
                  client.priority.slice(1)}
              </Badge>
            </div>
            {client.source && (
              <div>
                <p className="text-sm font-medium">Source</p>
                <p className="text-sm capitalize">
                  {client.source.replace("_", " ")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Description and Tags */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Description */}
        {client.description && (
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">
                {client.description}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Tags */}
        {client.tags && client.tags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Tag className="h-5 w-5" />
                <span>Tags</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {client.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Timeline Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Timeline</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium">Created</p>
              <p className="text-sm">{formatDateTime(client.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Last Updated</p>
              <p className="text-sm">{formatDateTime(client.updatedAt)}</p>
            </div>
            {client.lastContactAt && (
              <div>
                <p className="text-sm font-medium">Last Contact</p>
                <p className="text-sm">
                  {formatDateTime(client.lastContactAt)}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
          <CardDescription>
            Overview of client activity and engagement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{client.contacts.length}</div>
              <div className="text-sm">Contacts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm">Total Invoices</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm">Tasks</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
