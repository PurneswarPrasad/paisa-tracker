
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
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p className="text-lg">No investments yet</p>
        <p className="text-sm">Start investing for your future!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {investments.map((investment) => (
        <div 
          key={investment.id}
          className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{investment.description}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{investment.type}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{investment.date}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-bold text-lg text-purple-600 dark:text-purple-400">
                ₹{investment.amount.toLocaleString('en-IN')}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(investment.id)}
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

export default InvestmentList;
