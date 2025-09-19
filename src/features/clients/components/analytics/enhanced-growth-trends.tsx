"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ClientGrowthData } from "../../analytics";

interface EnhancedGrowthTrendsProps {
  growthData: ClientGrowthData[];
}

const chartConfig = {
  newClients: {
    label: "New Clients",
    color: "hsl(var(--chart-1))",
  },
  totalClients: {
    label: "Total Clients",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function EnhancedGrowthTrends({
  growthData,
}: EnhancedGrowthTrendsProps) {
  const totalGrowth =
    growthData.length > 0
      ? growthData[growthData.length - 1].totalClients -
        growthData[0].totalClients
      : 0;

  const averageMonthlyGrowth =
    growthData.length > 1
      ? Math.round(totalGrowth / (growthData.length - 1))
      : 0;

  const currentMonth = growthData[growthData.length - 1];
  const previousMonth = growthData[growthData.length - 2];

  const monthOverMonthGrowth = previousMonth ? currentMonth.growthRate : 0;

  // Prepare data for the chart
  const chartData = growthData.map((month) => ({
    month: month.month,
    newClients: month.newClients,
    totalClients: month.totalClients,
    growthRate: month.growthRate,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Client Growth Trends</CardTitle>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4" />
            <span>Total Growth: +{totalGrowth}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Minus className="h-4 w-4" />
            <span>Avg Monthly: +{averageMonthlyGrowth}</span>
          </div>
          <Badge
            variant={monthOverMonthGrowth >= 0 ? "default" : "destructive"}
            className="text-xs"
          >
            {monthOverMonthGrowth >= 0 ? "+" : ""}
            {monthOverMonthGrowth}% MoM
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Enhanced Chart */}
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={10} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="newClients"
                fill="var(--color-newClients)"
                radius={[4, 4, 0, 0]}
                name="New Clients"
              />
              <Bar
                dataKey="totalClients"
                fill="var(--color-totalClients)"
                radius={[4, 4, 0, 0]}
                name="Total Clients"
              />
            </BarChart>
          </ChartContainer>

          {/* Monthly Breakdown */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Monthly Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {growthData.slice(-6).map((month, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                >
                  <div className="text-sm font-medium">{month.month}</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {month.totalClients}
                    </span>
                    <div className="flex items-center space-x-1">
                      {month.growthRate > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : month.growthRate < 0 ? (
                        <TrendingDown className="h-3 w-3 text-destructive" />
                      ) : (
                        <Minus className="h-3 w-3 text-muted-foreground" />
                      )}
                      <span
                        className={`text-xs ${
                          month.growthRate > 0
                            ? "text-green-600"
                            : month.growthRate < 0
                              ? "text-destructive"
                              : "text-muted-foreground"
                        }`}
                      >
                        {month.growthRate > 0 ? "+" : ""}
                        {month.growthRate}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Key Insights</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>
                • Total clients grew by {totalGrowth} over {growthData.length}{" "}
                months
              </div>
              <div>
                • Average monthly growth: {averageMonthlyGrowth} clients
              </div>
              <div>
                • Current month: {currentMonth?.newClients || 0} new clients
              </div>
              {monthOverMonthGrowth > 0 && (
                <div>
                  • Growth is accelerating (+{monthOverMonthGrowth}%
                  month-over-month)
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
