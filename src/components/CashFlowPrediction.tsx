
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

interface CashFlowPredictionProps {
  currentIncome: number;
  currentExpenses: number;
  currentInvestments: number;
  selectedMonth: string;
}

const CashFlowPrediction: React.FC<CashFlowPredictionProps> = ({
  currentIncome,
  currentExpenses,
  currentInvestments,
  selectedMonth
}) => {
  // Get current date and selected month info
  const now = new Date();
  const currentDate = now.getDate();
  const selectedDate = new Date(selectedMonth + '-01');
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  
  // Check if selected month is current month
  const isCurrentMonth = selectedMonth === now.toISOString().slice(0, 7);
  
  // Calculate daily averages
  const dailyIncomeAvg = currentIncome / (isCurrentMonth ? currentDate : daysInMonth);
  const dailyExpenseAvg = currentExpenses / (isCurrentMonth ? currentDate : daysInMonth);
  const dailyInvestmentAvg = currentInvestments / (isCurrentMonth ? currentDate : daysInMonth);
  
  // Predict end-of-month totals
  const predictedIncome = dailyIncomeAvg * daysInMonth;
  const predictedExpenses = dailyExpenseAvg * daysInMonth;
  const predictedInvestments = dailyInvestmentAvg * daysInMonth;
  const predictedSavings = predictedIncome - predictedExpenses - predictedInvestments;
  
  // Calculate remaining days
  const remainingDays = isCurrentMonth ? daysInMonth - currentDate : 0;
  
  const getStatusColor = () => {
    if (predictedSavings > 0) return 'text-green-600 dark:text-green-400';
    if (predictedSavings < 0) return 'text-red-600 dark:text-red-400';
    return 'text-yellow-600 dark:text-yellow-400';
  };
  
  const getStatusIcon = () => {
    if (predictedSavings > 0) return <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />;
    if (predictedSavings < 0) return <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5" />;
    return <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />;
  };
  
  const getStatusText = () => {
    if (predictedSavings > 0) return 'Expected Savings';
    if (predictedSavings < 0) return 'Expected Overspend';
    return 'Break Even';
  };

  return (
    <Card className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm border-blue-200 dark:border-blue-700">
      <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
        <CardTitle className="text-gray-800 dark:text-gray-100 flex items-center gap-2 text-lg sm:text-xl">
          <div className={getStatusColor()}>
            {getStatusIcon()}
          </div>
          Cash Flow Prediction
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        {isCurrentMonth ? (
          <div className="space-y-3 sm:space-y-4">
            <div className="text-center">
              <div className={`text-2xl sm:text-3xl font-bold ${getStatusColor()}`}>
                {predictedSavings >= 0 ? '+' : ''}₹{Math.abs(predictedSavings).toFixed(0)}
              </div>
              <div className={`text-sm font-medium ${getStatusColor()}`}>
                {getStatusText()} by Month End
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
              <div className="p-2 sm:p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Days Remaining</div>
                <div className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">
                  {remainingDays}
                </div>
              </div>
              <div className="p-2 sm:p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Daily Avg Expense</div>
                <div className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">
                  ₹{dailyExpenseAvg.toFixed(0)}
                </div>
              </div>
            </div>
            
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center">
              Based on your current spending patterns for {selectedMonth}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-2">
            <div className={`text-2xl sm:text-3xl font-bold ${getStatusColor()}`}>
              {predictedSavings >= 0 ? '+' : ''}₹{Math.abs(predictedSavings).toFixed(0)}
            </div>
            <div className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()} for {selectedMonth}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Historical data for {selectedMonth}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CashFlowPrediction;
