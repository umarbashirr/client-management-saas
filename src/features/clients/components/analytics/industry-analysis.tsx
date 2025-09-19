"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building2, Users, Target, AlertTriangle } from "lucide-react";
import { IndustryAnalysis } from "../../analytics";

interface IndustryAnalysisProps {
  industryData: IndustryAnalysis[];
}

export function IndustryAnalysisComponent({
  industryData,
}: IndustryAnalysisProps) {
  const totalClients = industryData.reduce(
    (sum, industry) => sum + industry.count,
    0
  );
  const topIndustry = industryData[0];
  const industriesWithMultipleClients = industryData.filter(
    (industry) => industry.count > 1
  );

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-muted text-muted-foreground",
      prospect: "bg-blue-100 text-muted-foreground",
      lead: "bg-yellow-100 text-yellow-800",
    };
    return colors[status] || "bg-muted text-muted-foreground";
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-orange-100 text-orange-800",
      critical: "bg-destructive/10 text-destructive",
    };
    return colors[priority] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      {/* Industry Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Industries
            </CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{industryData.length}</div>
            <p className="text-xs text-muted-foreground">
              Industries represented
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Top Industry
            </CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {topIndustry?.industry || "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              {topIndustry?.count || 0} clients ({topIndustry?.percentage || 0}
              %)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Diversified Industries
            </CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {industriesWithMultipleClients.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Industries with 2+ clients
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Industry Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Industry Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {industryData.slice(0, 10).map((industry, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-sm font-medium">
                      {industry.industry}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {industry.count} clients
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {industry.percentage}%
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${industry.percentage}%` }}
                  />
                </div>
              </div>
            ))}
            {industryData.length > 10 && (
              <div className="text-sm text-muted-foreground text-center pt-2">
                ... and {industryData.length - 10} more industries
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Industry Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Industry Analysis Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Industry</TableHead>
                <TableHead>Clients</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Avg Contacts</TableHead>
                <TableHead>Top Status</TableHead>
                <TableHead>Top Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {industryData.map((industry, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {industry.industry}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{industry.count}</span>
                      {industry.count === 1 && (
                        <Badge variant="outline" className="text-xs">
                          Single
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{industry.percentage}%</span>
                      <div className="w-16 bg-muted rounded-full h-1">
                        <div
                          className="h-1 rounded-full bg-primary"
                          style={{ width: `${industry.percentage}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span>{industry.averageContacts}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getStatusColor(industry.topStatus)}`}
                    >
                      {industry.topStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getPriorityColor(industry.topPriority)}`}
                    >
                      {industry.topPriority}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Industry Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <span>Industry Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topIndustry && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="text-sm font-medium text-foreground">
                  Top Performing Industry
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>{topIndustry.industry}</strong> leads with{" "}
                  {topIndustry.count} clients ({topIndustry.percentage}% of
                  total) and an average of {topIndustry.averageContacts}{" "}
                  contacts per client.
                </div>
              </div>
            )}

            {industriesWithMultipleClients.length > 0 && (
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-green-900">
                  Diversified Portfolio
                </div>
                <div className="text-sm text-green-800">
                  You have clients across {industriesWithMultipleClients.length}{" "}
                  different industries, showing good diversification in your
                  client base.
                </div>
              </div>
            )}

            {industryData.some((industry) => industry.averageContacts < 1) && (
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="text-sm font-medium text-yellow-900">
                  Contact Coverage Opportunity
                </div>
                <div className="text-sm text-yellow-800">
                  Some industries have low contact coverage. Consider reaching
                  out to clients in these industries to improve engagement.
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
