
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Expense } from '@/pages/Index';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400">
        <p className="text-base sm:text-lg">No expenses recorded yet</p>
        <p className="text-xs sm:text-sm">Start tracking by adding your first expense!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      {expenses.map((expense) => (
        <div 
          key={expense.id}
          className="flex items-center justify-between p-3 sm:p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                expense.type === 'needs' ? 'bg-green-500' : 'bg-orange-500'
              }`} />
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base truncate">
                  {expense.description}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">
                  {expense.category}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{expense.date}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 ml-2">
            <div className="text-right">
              <div className="font-bold text-sm sm:text-lg dark:text-gray-100">
                ₹{expense.amount.toLocaleString('en-IN')}
              </div>
              <div className={`text-xs font-medium ${
                expense.type === 'needs' ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'
              }`}>
                {expense.type.toUpperCase()}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(expense.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 p-1 sm:p-2"
            >
              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
