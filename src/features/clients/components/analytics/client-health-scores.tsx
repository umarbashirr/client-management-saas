"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Heart,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Users,
  Calendar,
  FileText,
  Star,
  Activity,
} from "lucide-react";
import { ClientHealthScore } from "../../analytics";

interface ClientHealthScoresProps {
  healthScores: ClientHealthScore[];
}

export function ClientHealthScoresComponent({
  healthScores,
}: ClientHealthScoresProps) {
  const averageHealthScore =
    healthScores.length > 0
      ? Math.round(
          healthScores.reduce((sum, client) => sum + client.healthScore, 0) /
            healthScores.length
        )
      : 0;

  const healthyClients = healthScores.filter(
    (client) => client.healthScore >= 80
  ).length;
  const atRiskClients = healthScores.filter(
    (client) => client.healthScore < 60
  ).length;
  const needsAttentionClients = healthScores.filter(
    (client) => client.healthScore < 40
  ).length;

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    if (score >= 40) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-destructive bg-destructive/10 border-destructive";
  };

  const getHealthScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Poor";
  };

  const getHealthScoreIcon = (score: number) => {
    if (score >= 80) return CheckCircle;
    if (score >= 60) return TrendingUp;
    if (score >= 40) return AlertTriangle;
    return XCircle;
  };

  const getFactorIcon = (factor: string) => {
    const icons: Record<string, any> = {
      hasContacts: Users,
      hasRecentActivity: Calendar,
      hasCompleteProfile: FileText,
      hasHighPriority: Star,
      hasActiveStatus: Activity,
    };
    return icons[factor] || CheckCircle;
  };

  const getFactorLabel = (factor: string) => {
    const labels: Record<string, string> = {
      hasContacts: "Has Contacts",
      hasRecentActivity: "Recent Activity",
      hasCompleteProfile: "Complete Profile",
      hasHighPriority: "High Priority",
      hasActiveStatus: "Active Status",
    };
    return labels[factor] || factor;
  };

  return (
    <div className="space-y-6">
      {/* Health Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Health Score
            </CardTitle>
            <Heart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {averageHealthScore}%
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Progress value={averageHealthScore} className="flex-1 h-2" />
              <Badge
                variant="outline"
                className={`text-xs ${getHealthScoreColor(averageHealthScore)}`}
              >
                {getHealthScoreLabel(averageHealthScore)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Healthy Clients
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {healthyClients}
            </div>
            <div className="text-xs text-muted-foreground">
              {healthScores.length > 0
                ? Math.round((healthyClients / healthScores.length) * 100)
                : 0}
              % of total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              At Risk
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {atRiskClients}
            </div>
            <div className="text-xs text-muted-foreground">
              {healthScores.length > 0
                ? Math.round((atRiskClients / healthScores.length) * 100)
                : 0}
              % of total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Needs Attention
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {needsAttentionClients}
            </div>
            <div className="text-xs text-muted-foreground">
              {healthScores.length > 0
                ? Math.round(
                    (needsAttentionClients / healthScores.length) * 100
                  )
                : 0}
              % of total
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Score Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Health Score Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                range: "80-100%",
                label: "Excellent",
                count: healthyClients,
                color: "bg-green-500",
              },
              {
                range: "60-79%",
                label: "Good",
                count: healthScores.filter(
                  (c) => c.healthScore >= 60 && c.healthScore < 80
                ).length,
                color: "bg-yellow-500",
              },
              {
                range: "40-59%",
                label: "Fair",
                count: healthScores.filter(
                  (c) => c.healthScore >= 40 && c.healthScore < 60
                ).length,
                color: "bg-orange-500",
              },
              {
                range: "0-39%",
                label: "Poor",
                count: needsAttentionClients,
                color: "bg-red-500",
              },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-xs text-muted-foreground">
                      ({item.range})
                    </span>
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    {item.count}
                  </span>
                </div>
                <Progress
                  value={
                    healthScores.length > 0
                      ? (item.count / healthScores.length) * 100
                      : 0
                  }
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Client Health Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Client Health Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Health Score</TableHead>
                <TableHead>Factors</TableHead>
                <TableHead>Recommendations</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {healthScores.slice(0, 10).map((client, index) => {
                const HealthIcon = getHealthScoreIcon(client.healthScore);
                const factorEntries = Object.entries(client.factors);

                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {client.clientName}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <HealthIcon
                          className={`h-4 w-4 ${
                            client.healthScore >= 80
                              ? "text-green-500"
                              : client.healthScore >= 60
                                ? "text-yellow-500"
                                : client.healthScore >= 40
                                  ? "text-orange-500"
                                  : "text-red-500"
                          }`}
                        />
                        <span className="font-bold">{client.healthScore}%</span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getHealthScoreColor(client.healthScore)}`}
                        >
                          {getHealthScoreLabel(client.healthScore)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {factorEntries.map(([factor, value]) => {
                          const FactorIcon = getFactorIcon(factor);
                          return (
                            <div
                              key={factor}
                              className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                                value
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              <FactorIcon className="h-3 w-3" />
                              <span>{getFactorLabel(factor)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {client.recommendations
                          .slice(0, 2)
                          .map((rec, recIndex) => (
                            <div
                              key={recIndex}
                              className="text-xs text-muted-foreground"
                            >
                              • {rec}
                            </div>
                          ))}
                        {client.recommendations.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{client.recommendations.length - 2} more
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Health Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span>Health Insights & Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {needsAttentionClients > 0 && (
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="text-sm font-medium text-red-900">
                  Immediate Attention Required
                </div>
                <div className="text-sm text-red-800">
                  {needsAttentionClients} clients have health scores below 40%.
                  These clients need immediate attention to prevent churn.
                </div>
              </div>
            )}

            {atRiskClients > 0 && (
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="text-sm font-medium text-yellow-900">
                  At-Risk Clients
                </div>
                <div className="text-sm text-yellow-800">
                  {atRiskClients} clients have health scores between 40-60%.
                  Consider proactive outreach to improve their health scores.
                </div>
              </div>
            )}

            {healthyClients > 0 && (
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-green-900">
                  Healthy Client Base
                </div>
                <div className="text-sm text-green-800">
                  {healthyClients} clients have excellent health scores (80%+).
                  Maintain these relationships and use them as references.
                </div>
              </div>
            )}

            {averageHealthScore < 60 && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-900">
                  Overall Health Improvement
                </div>
                <div className="text-sm text-blue-800">
                  Your average client health score is {averageHealthScore}%.
                  Focus on improving contact information, recent activity, and
                  profile completeness.
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
