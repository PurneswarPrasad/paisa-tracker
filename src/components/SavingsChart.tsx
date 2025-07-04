
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MonthlyData } from '@/pages/Index';

interface SavingsChartProps {
  monthlyData: MonthlyData[];
}

const SavingsChart: React.FC<SavingsChartProps> = ({ monthlyData }) => {
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const chartConfig = {
    savings: {
      label: "Savings",
      color: "#10b981"
    }
  };

  // Get unique years from the data
  const availableYears = [...new Set(monthlyData.map(data => data.month.split('-')[0]))].sort();
  
  // Filter data based on selected year
  const filteredData = selectedYear === 'all' 
    ? monthlyData 
    : monthlyData.filter(data => data.month.startsWith(selectedYear));

  const chartData = filteredData.map(data => ({
    month: new Date(data.month + '-01').toLocaleDateString('en-IN', { 
      month: 'short', 
      year: selectedYear === 'all' ? '2-digit' : undefined 
    }),
    savings: data.savings
  }));

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-gray-800 dark:text-gray-100">Monthly Savings</CardTitle>
          {availableYears.length > 1 && (
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 z-50">
                <SelectItem value="all">All Years</SelectItem>
                {availableYears.map(year => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="month" 
                  className="text-xs fill-gray-600 dark:fill-gray-400"
                  tick={{ fontSize: 12 }}
                  interval={chartData.length > 12 ? 'preserveStartEnd' : 0}
                />
                <YAxis 
                  className="text-xs fill-gray-600 dark:fill-gray-400"
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 12 }}
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
