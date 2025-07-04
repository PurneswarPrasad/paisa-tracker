
import React, { useState, useEffect } from 'react';
import { Plus, TrendingUp, TrendingDown, FileText, DollarSign, PiggyBank } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import CategorySummary from '@/components/CategorySummary';
import IncomeForm from '@/components/IncomeForm';
import IncomeList from '@/components/IncomeList';
import InvestmentForm from '@/components/InvestmentForm';
import InvestmentList from '@/components/InvestmentList';
import MonthlyTracker from '@/components/MonthlyTracker';
import ExpenseChart from '@/components/ExpenseChart';
import SavingsChart from '@/components/SavingsChart';
import PRDModal from '@/components/PRDModal';
import { ThemeToggle } from '@/components/ThemeToggle';

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  type: 'needs' | 'wants';
  date: string;
  month: string;
}

export interface Income {
  id: string;
  amount: number;
  source: string;
  description: string;
  date: string;
  month: string;
}

export interface Investment {
  id: string;
  amount: number;
  type: string;
  description: string;
  date: string;
  month: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  investments: number;
  savings: number;
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

const INITIAL_INCOME_SOURCES = [
  'Salary',
  'Freelance',
  'Business Income',
  'Rental Income',
  'Interest/Dividends',
  'Other Income'
];

const INITIAL_INVESTMENT_TYPES = [
  'Fixed Deposit (FD)',
  'Recurring Deposit (RD)',
  'Mutual Funds',
  'Stocks',
  'PPF',
  'ELSS',
  'Gold',
  'Real Estate',
  'Crypto',
  'Other Investment'
];

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [income, setIncome] = useState<Income[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showInvestmentForm, setShowInvestmentForm] = useState(false);
  const [showPRD, setShowPRD] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString().slice(0, 7));

  // Load data from localStorage
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    const savedIncome = localStorage.getItem('income');
    const savedInvestments = localStorage.getItem('investments');
    
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    if (savedIncome) setIncome(JSON.parse(savedIncome));
    if (savedInvestments) setInvestments(JSON.parse(savedInvestments));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('income', JSON.stringify(income));
  }, [income]);

  useEffect(() => {
    localStorage.setItem('investments', JSON.stringify(investments));
  }, [investments]);

  const addExpense = (expense: Omit<Expense, 'id' | 'date' | 'month'>) => {
    const date = new Date().toISOString().split('T')[0];
    const month = date.slice(0, 7);
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      date,
      month
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const addIncome = (incomeData: Omit<Income, 'id' | 'date' | 'month'>) => {
    const date = new Date().toISOString().split('T')[0];
    const month = date.slice(0, 7);
    const newIncome: Income = {
      ...incomeData,
      id: Date.now().toString(),
      date,
      month
    };
    setIncome(prev => [newIncome, ...prev]);
  };

  const addInvestment = (investmentData: Omit<Investment, 'id' | 'date' | 'month'>) => {
    const date = new Date().toISOString().split('T')[0];
    const month = date.slice(0, 7);
    const newInvestment: Investment = {
      ...investmentData,
      id: Date.now().toString(),
      date,
      month
    };
    setInvestments(prev => [newInvestment, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const deleteIncome = (id: string) => {
    setIncome(prev => prev.filter(inc => inc.id !== id));
  };

  const deleteInvestment = (id: string) => {
    setInvestments(prev => prev.filter(inv => inv.id !== id));
  };

  // Calculate current month totals
  const currentMonthExpenses = expenses.filter(expense => expense.month === selectedMonth);
  const currentMonthIncome = income.filter(inc => inc.month === selectedMonth);
  const currentMonthInvestments = investments.filter(inv => inv.month === selectedMonth);

  const needsExpenses = currentMonthExpenses.filter(expense => expense.type === 'needs');
  const wantsExpenses = currentMonthExpenses.filter(expense => expense.type === 'wants');
  
  const totalNeeds = needsExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalWants = wantsExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalExpenses = totalNeeds + totalWants;
  const totalIncome = currentMonthIncome.reduce((sum, inc) => sum + inc.amount, 0);
  const totalInvestments = currentMonthInvestments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalSavings = totalIncome - totalExpenses - totalInvestments;

  // Generate monthly data for charts
  const generateMonthlyData = (): MonthlyData[] => {
    const monthlyMap = new Map<string, MonthlyData>();

    // Initialize months
    [...expenses, ...income, ...investments].forEach(item => {
      if (!monthlyMap.has(item.month)) {
        monthlyMap.set(item.month, {
          month: item.month,
          income: 0,
          expenses: 0,
          investments: 0,
          savings: 0
        });
      }
    });

    // Calculate totals for each month
    income.forEach(inc => {
      const data = monthlyMap.get(inc.month);
      if (data) data.income += inc.amount;
    });

    expenses.forEach(exp => {
      const data = monthlyMap.get(exp.month);
      if (data) data.expenses += exp.amount;
    });

    investments.forEach(inv => {
      const data = monthlyMap.get(inv.month);
      if (data) data.investments += inv.amount;
    });

    // Calculate savings
    monthlyMap.forEach(data => {
      data.savings = data.income - data.expenses - data.investments;
    });

    return Array.from(monthlyMap.values())
      .sort((a, b) => a.month.localeCompare(b.month));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-start mb-4">
            <div></div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                पैसा Tracker
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Track every penny, achieve every dream
              </p>
            </div>
            <ThemeToggle />
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <Button onClick={() => setShowPRD(true)} variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              View PRD
            </Button>
          </div>
        </div>

        {/* Month Selector */}
        <MonthlyTracker 
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
          monthlyData={{
            month: selectedMonth,
            income: totalIncome,
            expenses: totalExpenses,
            investments: totalInvestments,
            savings: totalSavings
          }}
        />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200 dark:border-blue-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-700 dark:text-blue-400 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Income
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-300">
                ₹{totalIncome.toLocaleString('en-IN')}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-green-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-700 dark:text-green-400 flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                Needs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800 dark:text-green-300">
                ₹{totalNeeds.toLocaleString('en-IN')}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-orange-200 dark:border-orange-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-orange-700 dark:text-orange-400 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Wants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800 dark:text-orange-300">
                ₹{totalWants.toLocaleString('en-IN')}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-purple-200 dark:border-purple-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-700 dark:text-purple-400 flex items-center gap-2">
                <PiggyBank className="w-5 h-5" />
                Investments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800 dark:text-purple-300">
                ₹{totalInvestments.toLocaleString('en-IN')}
              </div>
            </CardContent>
          </Card>

          <Card className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm ${
            totalSavings >= 0 
              ? 'border-emerald-200 dark:border-emerald-700' 
              : 'border-red-200 dark:border-red-700'
          }`}>
            <CardHeader className="pb-3">
              <CardTitle className={`flex items-center gap-2 ${
                totalSavings >= 0 
                  ? 'text-emerald-700 dark:text-emerald-400' 
                  : 'text-red-700 dark:text-red-400'
              }`}>
                Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${
                totalSavings >= 0 
                  ? 'text-emerald-800 dark:text-emerald-300' 
                  : 'text-red-800 dark:text-red-300'
              }`}>
                ₹{totalSavings.toLocaleString('en-IN')}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button onClick={() => setShowIncomeForm(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Income
          </Button>
          <Button onClick={() => setShowExpenseForm(true)} className="bg-orange-600 hover:bg-orange-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
          <Button onClick={() => setShowInvestmentForm(true)} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Investment
          </Button>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ExpenseChart monthlyData={generateMonthlyData()} />
          <SavingsChart monthlyData={generateMonthlyData()} />
        </div>

        {/* Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-100">Income Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <IncomeList income={currentMonthIncome} onDelete={deleteIncome} />
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-100">Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseList expenses={currentMonthExpenses.slice(0, 5)} onDelete={deleteExpense} />
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-100">Investments</CardTitle>
            </CardHeader>
            <CardContent>
              <InvestmentList investments={currentMonthInvestments} onDelete={deleteInvestment} />
            </CardContent>
          </Card>
        </div>

        {/* Category Summaries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

        {/* Modals */}
        {showIncomeForm && (
          <IncomeForm
            incomeSources={INITIAL_INCOME_SOURCES}
            onAddIncome={addIncome}
            onClose={() => setShowIncomeForm(false)}
          />
        )}

        {showExpenseForm && (
          <ExpenseForm
            needsCategories={INITIAL_NEEDS_CATEGORIES}
            wantsCategories={INITIAL_WANTS_CATEGORIES}
            onAddExpense={addExpense}
            onClose={() => setShowExpenseForm(false)}
          />
        )}

        {showInvestmentForm && (
          <InvestmentForm
            investmentTypes={INITIAL_INVESTMENT_TYPES}
            onAddInvestment={addInvestment}
            onClose={() => setShowInvestmentForm(false)}
          />
        )}

        {showPRD && (
          <PRDModal onClose={() => setShowPRD(false)} />
        )}
      </div>
    </div>
  );
};

export default Index;
