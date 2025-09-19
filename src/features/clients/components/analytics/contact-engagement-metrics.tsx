"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  UserCheck,
  Mail,
  Phone,
  Target,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { ContactEngagementMetrics } from "../../analytics";

interface ContactEngagementMetricsProps {
  metrics: ContactEngagementMetrics;
}

export function ContactEngagementMetricsComponent({
  metrics,
}: ContactEngagementMetricsProps) {
  const {
    totalContacts,
    activeContacts,
    primaryContacts,
    contactsWithEmail,
    contactsWithPhone,
    averageContactsPerClient,
    clientsWithMultipleContacts,
  } = metrics;

  const activeContactPercentage =
    totalContacts > 0 ? Math.round((activeContacts / totalContacts) * 100) : 0;

  const emailCoveragePercentage =
    activeContacts > 0
      ? Math.round((contactsWithEmail / activeContacts) * 100)
      : 0;

  const phoneCoveragePercentage =
    activeContacts > 0
      ? Math.round((contactsWithPhone / activeContacts) * 100)
      : 0;

  const primaryContactPercentage =
    activeContacts > 0
      ? Math.round((primaryContacts / activeContacts) * 100)
      : 0;

  const engagementScore = Math.round(
    (activeContactPercentage +
      emailCoveragePercentage +
      phoneCoveragePercentage +
      primaryContactPercentage) /
      4
  );

  const metricsData = [
    {
      title: "Total Contacts",
      value: totalContacts.toLocaleString(),
      icon: Users,
    },
    {
      title: "Active Contacts",
      value: `${activeContacts.toLocaleString()} (${activeContactPercentage}%)`,
      icon: UserCheck,
    },
    {
      title: "Primary Contacts",
      value: `${primaryContacts.toLocaleString()} (${primaryContactPercentage}%)`,
      icon: Target,
    },
    {
      title: "Avg per Client",
      value: averageContactsPerClient.toString(),
      icon: TrendingUp,
    },
  ];

  const coverageData = [
    {
      title: "Email Coverage",
      value: contactsWithEmail,
      total: activeContacts,
      percentage: emailCoveragePercentage,
      icon: Mail,
    },
    {
      title: "Phone Coverage",
      value: contactsWithPhone,
      total: activeContacts,
      percentage: phoneCoveragePercentage,
      icon: Phone,
    },
  ];

  const getEngagementScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    if (score >= 40) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-destructive bg-destructive/10 border-destructive";
  };

  const getEngagementScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  return (
    <div className="space-y-6">
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsData.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Engagement Score */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Contact Engagement Score</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{engagementScore}%</div>
              <Badge
                variant="outline"
                className={`${getEngagementScoreColor(engagementScore)}`}
              >
                {getEngagementScoreLabel(engagementScore)}
              </Badge>
            </div>
            <Progress value={engagementScore} className="h-2" />
            <div className="text-sm text-muted-foreground">
              Based on active contacts, email coverage, phone coverage, and
              primary contact assignment
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coverage Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coverageData.map((coverage, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {coverage.title}
              </CardTitle>
              <coverage.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  {coverage.value} / {coverage.total}
                </div>
                <div className="flex items-center space-x-2">
                  <Progress
                    value={coverage.percentage}
                    className="flex-1 h-2"
                  />
                  <span className="text-sm font-medium text-muted-foreground">
                    {coverage.percentage}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Contact Engagement Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Active Contacts
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {activeContacts} / {totalContacts}
                  </span>
                </div>
                <Progress value={activeContactPercentage} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {activeContactPercentage}% of total contacts are active
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Primary Contacts
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {primaryContacts} / {activeContacts}
                  </span>
                </div>
                <Progress value={primaryContactPercentage} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {primaryContactPercentage}% of active contacts are primary
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Clients with Multiple Contacts
                </span>
                <span className="text-sm font-bold text-foreground">
                  {clientsWithMultipleContacts}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Clients with more than one contact for better coverage
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <span>Engagement Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {emailCoveragePercentage < 80 && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-900">
                  Improve Email Coverage
                </div>
                <div className="text-sm text-blue-800">
                  Only {emailCoveragePercentage}% of contacts have email
                  addresses. Consider reaching out to collect email information
                  for better communication.
                </div>
              </div>
            )}

            {phoneCoveragePercentage < 80 && (
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-green-900">
                  Improve Phone Coverage
                </div>
                <div className="text-sm text-green-800">
                  Only {phoneCoveragePercentage}% of contacts have phone
                  numbers. Phone numbers are essential for urgent
                  communications.
                </div>
              </div>
            )}

            {primaryContactPercentage < 50 && (
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-sm font-medium text-purple-900">
                  Assign Primary Contacts
                </div>
                <div className="text-sm text-purple-800">
                  Only {primaryContactPercentage}% of contacts are marked as
                  primary. Ensure each client has a designated primary contact
                  person.
                </div>
              </div>
            )}

            {engagementScore >= 80 && (
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-green-900">
                  Excellent Engagement
                </div>
                <div className="text-sm text-green-800">
                  Your contact engagement is excellent! Keep up the good work
                  maintaining comprehensive contact information and
                  relationships.
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
