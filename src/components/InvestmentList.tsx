
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Investment } from '@/pages/Index';

interface InvestmentListProps {
  investments: Investment[];
  onDelete: (id: string) => void;
}

const InvestmentList: React.FC<InvestmentListProps> = ({ investments, onDelete }) => {
  if (investments.length === 0) {
    return (
      <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400">
        <p className="text-base sm:text-lg">No investments yet</p>
        <p className="text-xs sm:text-sm">Start investing for your future!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      {investments.map((investment) => (
        <div 
          key={investment.id}
          className="flex items-center justify-between p-3 sm:p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-purple-500" />
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base truncate">
                  {investment.description}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">
                  {investment.type}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{investment.date}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 ml-2">
            <div className="text-right">
              <div className="font-bold text-sm sm:text-lg text-purple-600 dark:text-purple-400">
                ₹{investment.amount.toLocaleString('en-IN')}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(investment.id)}
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

export default InvestmentList;
