
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MonthlyData } from '@/pages/Index';

interface MonthlyTrackerProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  monthlyData: MonthlyData;
}

const MonthlyTracker: React.FC<MonthlyTrackerProps> = ({
  selectedMonth,
  onMonthChange,
  monthlyData
}) => {
  return (
    <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-gray-800 dark:text-gray-100 flex items-center justify-between">
          <span>Monthly Overview</span>
          <div className="flex items-center gap-2">
            <Label htmlFor="month-select" className="text-sm">Month:</Label>
            <Input
              id="month-select"
              type="month"
              value={selectedMonth}
              onChange={(e) => onMonthChange(e.target.value)}
              className="w-40"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">Total Income</div>
            <div className="text-xl font-bold text-blue-800 dark:text-blue-300">
              ₹{monthlyData.income.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-sm text-red-600 dark:text-red-400 font-medium">Total Expenses</div>
            <div className="text-xl font-bold text-red-800 dark:text-red-300">
              ₹{monthlyData.expenses.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">Investments</div>
            <div className="text-xl font-bold text-purple-800 dark:text-purple-300">
              ₹{monthlyData.investments.toLocaleString('en-IN')}
            </div>
          </div>
          <div className={`p-4 rounded-lg ${
            monthlyData.savings >= 0 
              ? 'bg-green-50 dark:bg-green-900/20' 
              : 'bg-red-50 dark:bg-red-900/20'
          }`}>
            <div className={`text-sm font-medium ${
              monthlyData.savings >= 0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              Savings
            </div>
            <div className={`text-xl font-bold ${
              monthlyData.savings >= 0 
                ? 'text-green-800 dark:text-green-300' 
                : 'text-red-800 dark:text-red-300'
            }`}>
              ₹{monthlyData.savings.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyTracker;
