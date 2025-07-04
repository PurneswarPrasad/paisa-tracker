
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { MonthlyData } from '@/pages/Index';

interface SavingsChartProps {
  monthlyData: MonthlyData[];
}

const SavingsChart: React.FC<SavingsChartProps> = ({ monthlyData }) => {
  const chartConfig = {
    savings: {
      label: "Savings",
      color: "#10b981"
    }
  };

  const chartData = monthlyData.map(data => ({
    month: new Date(data.month + '-01').toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
    savings: data.savings
  }));

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-gray-800 dark:text-gray-100">Monthly Savings</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <XAxis 
                  dataKey="month" 
                  className="text-xs fill-gray-600 dark:fill-gray-400"
                />
                <YAxis 
                  className="text-xs fill-gray-600 dark:fill-gray-400"
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, "Savings"]}
                />
                <Area 
                  type="monotone" 
                  dataKey="savings" 
                  stroke="#10b981" 
                  fill="#10b981"
                  fillOpacity={0.3}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
            <p>No savings data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavingsChart;
