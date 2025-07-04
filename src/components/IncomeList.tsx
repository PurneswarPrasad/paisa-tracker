
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Income } from '@/pages/Index';

interface IncomeListProps {
  income: Income[];
  onDelete: (id: string) => void;
}

const IncomeList: React.FC<IncomeListProps> = ({ income, onDelete }) => {
  if (income.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p className="text-lg">No income recorded yet</p>
        <p className="text-sm">Add your income sources!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {income.map((inc) => (
        <div 
          key={inc.id}
          className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{inc.description}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{inc.source}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{inc.date}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-bold text-lg text-blue-600 dark:text-blue-400">
                +₹{inc.amount.toLocaleString('en-IN')}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(inc.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IncomeList;
