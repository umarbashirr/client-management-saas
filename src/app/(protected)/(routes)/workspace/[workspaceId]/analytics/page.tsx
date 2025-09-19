import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getClientOverviewMetrics,
  getStatusDistribution,
  getPriorityDistribution,
  getClientGrowthTrends,
  getIndustryAnalysis,
  getContactEngagementMetrics,
  getClientHealthScores,
} from "@/features/clients/analytics";
import { ClientOverviewMetricsComponent } from "@/features/clients/components/analytics/client-overview-metrics";
import { DistributionCharts } from "@/features/clients/components/analytics/distribution-charts";
import { EnhancedGrowthTrends } from "@/features/clients/components/analytics/enhanced-growth-trends";
import { IndustryAnalysisComponent } from "@/features/clients/components/analytics/industry-analysis";
import { ContactEngagementMetricsComponent } from "@/features/clients/components/analytics/contact-engagement-metrics";
import { ClientHealthScoresComponent } from "@/features/clients/components/analytics/client-health-scores";
import { BarChart3, TrendingUp, Users, Building2 } from "lucide-react";

interface AnalyticsPageProps {
  params: Promise<{
    workspaceId: string;
  }>;
}

async function AnalyticsContent({ workspaceId }: { workspaceId: string }) {
  const [
    overviewMetrics,
    statusDistribution,
    priorityDistribution,
    growthTrends,
    industryAnalysis,
    contactEngagementMetrics,
    healthScores,
  ] = await Promise.all([
    getClientOverviewMetrics(workspaceId),
    getStatusDistribution(workspaceId),
    getPriorityDistribution(workspaceId),
    getClientGrowthTrends(workspaceId, 12),
    getIndustryAnalysis(workspaceId),
    getContactEngagementMetrics(workspaceId),
    getClientHealthScores(workspaceId),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Client Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive insights into your client base and engagement metrics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <span className="text-sm text-muted-foreground">
            Analytics Dashboard
          </span>
        </div>
      </div>

      {/* Overview Metrics */}
      <ClientOverviewMetricsComponent metrics={overviewMetrics} />

      {/* Distribution Charts */}
      <DistributionCharts
        statusDistribution={statusDistribution}
        priorityDistribution={priorityDistribution}
      />

      {/* Growth Trends */}
      <EnhancedGrowthTrends growthData={growthTrends} />

      {/* Industry Analysis */}
      <IndustryAnalysisComponent industryData={industryAnalysis} />

      {/* Contact Engagement Metrics */}
      <ContactEngagementMetricsComponent metrics={contactEngagementMetrics} />

      {/* Client Health Scores */}
      <ClientHealthScoresComponent healthScores={healthScores} />

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <div className="font-medium">Add New Client</div>
                <div className="text-sm text-muted-foreground">
                  Create a new client record
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <div className="font-medium">Export Report</div>
                <div className="text-sm text-muted-foreground">
                  Download analytics data
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <Building2 className="h-8 w-8 text-purple-600" />
              <div>
                <div className="font-medium">Industry Insights</div>
                <div className="text-sm text-muted-foreground">
                  View detailed industry analysis
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96 mt-2" />
        </div>
        <Skeleton className="h-6 w-32" />
      </div>

      {/* Metrics Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default async function AnalyticsPage({ params }: AnalyticsPageProps) {
  const { workspaceId } = await params;
  return (
    <div className="container mx-auto py-6">
      <Suspense fallback={<AnalyticsSkeleton />}>
        <AnalyticsContent workspaceId={workspaceId} />
      </Suspense>
    </div>
  );
}
