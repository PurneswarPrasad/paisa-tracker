import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Expense } from '@/pages/Index';

interface CategorySummaryProps {
  title: string;
  expenses: Expense[];
  type: 'needs' | 'wants';
  color: 'green' | 'orange';
}

const CategorySummary: React.FC<CategorySummaryProps> = ({ 
  title, 
  expenses, 
  type, 
  color 
}) => {
  // Group expenses by category and calculate totals
  const categoryTotals = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a);

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const colorClasses = {
    green: {
      border: 'border-green-200 dark:border-green-700',
      header: 'text-green-700 dark:text-green-400',
      bar: 'bg-green-500',
      amount: 'text-green-800 dark:text-green-300'
    },
    orange: {
      border: 'border-orange-200 dark:border-orange-700',
      header: 'text-orange-700 dark:text-orange-400', 
      bar: 'bg-orange-500',
      amount: 'text-orange-800 dark:text-orange-300'
    }
  };

  const classes = colorClasses[color];

  if (sortedCategories.length === 0) {
    return (
      <Card className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm ${classes.border}`}>
        <CardHeader>
          <CardTitle className={classes.header}>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            <p>No {type} expenses yet</p>
            <p className="text-sm">Add some expenses to see the breakdown</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm ${classes.border}`}>
      <CardHeader>
        <CardTitle className={classes.header}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedCategories.map(([category, amount]) => {
            const percentage = totalAmount > 0 ? (amount / totalAmount) * 100 : 0;
            
            return (
              <div key={category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                    {category}
                  </span>
                  <span className={`text-sm font-bold ${classes.amount}`}>
                    ₹{amount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`${classes.bar} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                  {percentage.toFixed(1)}% of {type}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategorySummary;
