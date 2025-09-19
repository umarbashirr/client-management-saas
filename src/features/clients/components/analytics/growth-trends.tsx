"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ClientGrowthData } from "../../analytics";

interface GrowthTrendsProps {
  growthData: ClientGrowthData[];
}

export function GrowthTrends({ growthData }: GrowthTrendsProps) {
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
          {/* Growth Chart */}
          <div className="h-64 flex items-end space-x-2">
            {growthData.map((month, index) => {
              const maxClients = Math.max(
                ...growthData.map((m) => m.totalClients)
              );
              const height = (month.totalClients / maxClients) * 100;

              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center space-y-2"
                >
                  <div className="w-full bg-muted rounded-t-lg relative">
                    <div
                      className="bg-primary rounded-t-lg transition-all duration-300 hover:bg-primary/80"
                      style={{ height: `${height}%` }}
                    />
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-muted-foreground">
                      {month.totalClients}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                    {month.month}
                  </div>
                  <div className="text-xs text-muted-foreground/70 text-center">
                    +{month.newClients}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Monthly Breakdown */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Monthly Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {growthData.slice(-6).map((month, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-muted/50 rounded-lg"
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
