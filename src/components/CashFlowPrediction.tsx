
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, CheckCircle, AlertTriangle } from 'lucide-react';

interface CashFlowPredictionProps {
  currentIncome: number;
  currentExpenses: number;
  currentInvestments: number;
  selectedMonth: string;
}

const CashFlowPrediction: React.FC<CashFlowPredictionProps> = ({
  currentIncome,
  currentExpenses,
  selectedMonth
}) => {
  // Get current date and selected month info
  const now = new Date();
  const currentDate = now.getDate();
  const selectedDate = new Date(selectedMonth + '-01');
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  
  // Check if selected month is current month
  const isCurrentMonth = selectedMonth === now.toISOString().slice(0, 7);
  
  // Only show prediction for current month
  if (!isCurrentMonth) {
    return null;
  }
  
  // Calculate average daily spending = ₹X / Y (where X is current expenses, Y is current date)
  const averageDailySpending = currentExpenses / currentDate;
  
  // Multiply by total days in month to get projected total spending
  const projectedTotalSpending = averageDailySpending * daysInMonth;
  
  // Projected Savings = Income - Projected Spending
  const projectedSavings = currentIncome - projectedTotalSpending;
  
  const isPositive = projectedSavings >= 0;
  
  console.log('Cash Flow Debug:', {
    currentIncome,
    currentExpenses,
    currentDate,
    daysInMonth,
    averageDailySpending,
    projectedTotalSpending,
    projectedSavings,
    isPositive
  });
  
  return (
    <Card className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm border-blue-200 dark:border-blue-700">
      <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
        <CardTitle className="text-gray-800 dark:text-gray-100 flex items-center gap-2 text-lg sm:text-xl">
          <div className={isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
            {isPositive ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> : <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />}
          </div>
          Cash Flow Prediction
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="text-center space-y-3 sm:space-y-4">
          <div className={`text-lg sm:text-xl font-medium ${
            isPositive ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
          }`}>
            {isPositive ? '✅ You\'re on track to save' : '⚠️ You\'re on track to overspend'}
          </div>
          
          <div className={`text-2xl sm:text-3xl font-bold ${
            isPositive ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
          }`}>
            ₹{Math.abs(projectedSavings).toLocaleString('en-IN')}
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center mt-4">
            <div className="p-2 sm:p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Days Passed</div>
              <div className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">
                {currentDate}
              </div>
            </div>
            <div className="p-2 sm:p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Daily Avg Spending</div>
              <div className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">
                ₹{averageDailySpending.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>
          
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Based on your spending pattern for {currentDate} days this month
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CashFlowPrediction;
