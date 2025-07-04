
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { MonthlyData } from '@/pages/Index';

interface ExpenseChartProps {
  monthlyData: MonthlyData[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ monthlyData }) => {
  const chartConfig = {
    expenses: {
      label: "Expenses",
      color: "#f97316"
    }
  };

  const chartData = monthlyData.map(data => ({
    month: new Date(data.month + '-01').toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
    expenses: data.expenses
  }));

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-gray-800 dark:text-gray-100">Monthly Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
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
                  formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, "Expenses"]}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#f97316" 
                  strokeWidth={3}
                  dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
            <p>No expense data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
