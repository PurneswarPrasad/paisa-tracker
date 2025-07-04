
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
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg">No expenses recorded yet</p>
        <p className="text-sm">Start tracking by adding your first expense!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <div 
          key={expense.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                expense.type === 'needs' ? 'bg-green-500' : 'bg-orange-500'
              }`} />
              <div>
                <h4 className="font-medium text-gray-900">{expense.description}</h4>
                <p className="text-sm text-gray-600">{expense.category}</p>
                <p className="text-xs text-gray-400">{expense.date}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-bold text-lg">
                ₹{expense.amount.toLocaleString('en-IN')}
              </div>
              <div className={`text-xs font-medium ${
                expense.type === 'needs' ? 'text-green-600' : 'text-orange-600'
              }`}>
                {expense.type.toUpperCase()}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(expense.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
