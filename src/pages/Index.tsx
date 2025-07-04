
import React, { useState, useEffect } from 'react';
import { Plus, TrendingUp, TrendingDown, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import CategorySummary from '@/components/CategorySummary';
import PRDModal from '@/components/PRDModal';

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  type: 'needs' | 'wants';
  date: string;
}

const INITIAL_NEEDS_CATEGORIES = [
  'Rent/EMI',
  'Utilities (Electricity, Water, Gas)',
  'Groceries & Essential Food',
  'Transportation (Commute)',
  'Mobile/Internet Bills',
  'Insurance Premiums',
  'Medical/Healthcare',
  'Children Education',
  'Loan Payments',
  'Essential Clothing'
];

const INITIAL_WANTS_CATEGORIES = [
  'Dining Out',
  'Entertainment',
  'Shopping (Non-essential)',
  'Travel/Vacation',
  'Hobbies',
  'Gadgets/Electronics',
  'Beauty/Personal Care',
  'Gifts',
  'Subscriptions (OTT, etc.)',
  'Other Wants'
];

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showPRD, setShowPRD] = useState(false);

  // Load expenses from localStorage on component mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id' | 'date'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setExpenses(prev => [newExpense, ...prev]);
    console.log('Added new expense:', newExpense);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
    console.log('Deleted expense with id:', id);
  };

  const needsExpenses = expenses.filter(expense => expense.type === 'needs');
  const wantsExpenses = expenses.filter(expense => expense.type === 'wants');
  
  const totalNeeds = needsExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalWants = wantsExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalExpenses = totalNeeds + totalWants;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            पैसा Tracker
          </h1>
          <p className="text-gray-600 text-lg">
            Track every penny, achieve every dream
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Button 
              onClick={() => setShowPRD(true)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              View PRD
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-700 flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                Needs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">
                ₹{totalNeeds.toLocaleString('en-IN')}
              </div>
              <p className="text-sm text-gray-600">Essential expenses</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-orange-700 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Wants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">
                ₹{totalWants.toLocaleString('en-IN')}
              </div>
              <p className="text-sm text-gray-600">Lifestyle expenses</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-700">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">
                ₹{totalExpenses.toLocaleString('en-IN')}
              </div>
              <p className="text-sm text-gray-600">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Expense Button */}
        <div className="text-center mb-8">
          <Button 
            onClick={() => setShowExpenseForm(true)}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Expense
          </Button>
        </div>

        {/* Category Summaries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CategorySummary 
            title="Needs Breakdown"
            expenses={needsExpenses}
            type="needs"
            color="green"
          />
          <CategorySummary 
            title="Wants Breakdown"
            expenses={wantsExpenses}
            type="wants"
            color="orange"
          />
        </div>

        {/* Recent Expenses */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-gray-800">Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseList 
              expenses={expenses.slice(0, 10)} 
              onDelete={deleteExpense}
            />
          </CardContent>
        </Card>

        {/* Expense Form Modal */}
        {showExpenseForm && (
          <ExpenseForm
            needsCategories={INITIAL_NEEDS_CATEGORIES}
            wantsCategories={INITIAL_WANTS_CATEGORIES}
            onAddExpense={addExpense}
            onClose={() => setShowExpenseForm(false)}
          />
        )}

        {/* PRD Modal */}
        {showPRD && (
          <PRDModal onClose={() => setShowPRD(false)} />
        )}
      </div>
    </div>
  );
};

export default Index;
