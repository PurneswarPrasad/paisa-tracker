
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from 'lucide-react';
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
    <Card className="mb-4 sm:mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-gray-800 dark:text-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-lg sm:text-xl">Monthly Overview</span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Label htmlFor="month-select" className="text-sm whitespace-nowrap">Month:</Label>
            <div className="relative flex-1 sm:flex-none">
              <Input
                id="month-select"
                type="month"
                value={selectedMonth}
                onChange={(e) => onMonthChange(e.target.value)}
                className="w-full sm:w-40 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-center">
          <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">Total Income</div>
            <div className="text-lg sm:text-xl font-bold text-blue-800 dark:text-blue-300">
              ₹{(monthlyData.income / 1000).toFixed(0)}k
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400 sm:hidden">
              ₹{monthlyData.income.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-xs sm:text-sm text-red-600 dark:text-red-400 font-medium">Total Expenses</div>
            <div className="text-lg sm:text-xl font-bold text-red-800 dark:text-red-300">
              ₹{(monthlyData.expenses / 1000).toFixed(0)}k
            </div>
            <div className="text-xs text-red-600 dark:text-red-400 sm:hidden">
              ₹{monthlyData.expenses.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 font-medium">Investments</div>
            <div className="text-lg sm:text-xl font-bold text-purple-800 dark:text-purple-300">
              ₹{(monthlyData.investments / 1000).toFixed(0)}k
            </div>
            <div className="text-xs text-purple-600 dark:text-purple-400 sm:hidden">
              ₹{monthlyData.investments.toLocaleString('en-IN')}
            </div>
          </div>
          <div className={`p-3 sm:p-4 rounded-lg ${
            monthlyData.savings >= 0 
              ? 'bg-green-50 dark:bg-green-900/20' 
              : 'bg-red-50 dark:bg-red-900/20'
          }`}>
            <div className={`text-xs sm:text-sm font-medium ${
              monthlyData.savings >= 0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              Savings
            </div>
            <div className={`text-lg sm:text-xl font-bold ${
              monthlyData.savings >= 0 
                ? 'text-green-800 dark:text-green-300' 
                : 'text-red-800 dark:text-red-300'
            }`}>
              ₹{(Math.abs(monthlyData.savings) / 1000).toFixed(0)}k
            </div>
            <div className={`text-xs sm:hidden ${
              monthlyData.savings >= 0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
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
