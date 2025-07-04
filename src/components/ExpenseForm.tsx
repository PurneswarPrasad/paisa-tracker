
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ExpenseFormProps {
  needsCategories: string[];
  wantsCategories: string[];
  onAddExpense: (expense: {
    amount: number;
    description: string;
    category: string;
    type: 'needs' | 'wants';
  }) => void;
  onClose: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  needsCategories,
  wantsCategories,
  onAddExpense,
  onClose
}) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<'needs' | 'wants'>('needs');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description || !category) {
      alert('Please fill in all fields');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    onAddExpense({
      amount: numAmount,
      description: description.trim(),
      category,
      type
    });

    // Reset form
    setAmount('');
    setDescription('');
    setCategory('');
    setType('needs');
    onClose();
  };

  const currentCategories = type === 'needs' ? needsCategories : wantsCategories;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">Add New Expense</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                min="0"
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="What did you spend on?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Type</Label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="needs"
                    checked={type === 'needs'}
                    onChange={(e) => {
                      setType(e.target.value as 'needs' | 'wants');
                      setCategory(''); // Reset category when type changes
                    }}
                    className="text-green-600"
                  />
                  <span className="text-green-700 dark:text-green-400 font-medium">Needs</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="wants"
                    checked={type === 'wants'}
                    onChange={(e) => {
                      setType(e.target.value as 'needs' | 'wants');
                      setCategory(''); // Reset category when type changes
                    }}
                    className="text-orange-600"
                  />
                  <span className="text-orange-700 dark:text-orange-400 font-medium">Wants</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 z-50">
                  {currentCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                type="submit"
                className={`flex-1 ${
                  type === 'needs' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-orange-600 hover:bg-orange-700'
                }`}
              >
                Add Expense
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseForm;
