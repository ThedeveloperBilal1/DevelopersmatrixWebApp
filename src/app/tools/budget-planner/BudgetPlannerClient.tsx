'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Trash2, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PiggyBank,
  CreditCard,
  Wallet
} from 'lucide-react';

interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

const expenseCategories = [
  'Housing', 'Transportation', 'Food', 'Utilities', 'Insurance',
  'Healthcare', 'Entertainment', 'Personal', 'Debt', 'Savings', 'Other'
];

const incomeCategories = [
  'Salary', 'Freelance', 'Investments', 'Side Business', 'Other'
];

export default function BudgetPlannerClient() {
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [newItem, setNewItem] = useState({
    name: '',
    amount: '',
    category: '',
    type: 'expense' as 'income' | 'expense'
  });
  const [savingsGoal, setSavingsGoal] = useState(1000);

  const totalIncome = items
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = items
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpenses;
  const savingsProgress = balance >= 0 ? Math.min((balance / savingsGoal) * 100, 100) : 0;

  const addItem = () => {
    if (newItem.name && newItem.amount && newItem.category) {
      setItems([
        ...items,
        {
          id: Date.now().toString(),
          name: newItem.name,
          amount: parseFloat(newItem.amount),
          category: newItem.category,
          type: newItem.type
        }
      ]);
      setNewItem({ name: '', amount: '', category: '', type: 'expense' });
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const expensesByCategory = expenseCategories.map(category => ({
    category,
    amount: items
      .filter(item => item.type === 'expense' && item.category === category)
      .reduce((sum, item) => sum + item.amount, 0)
  })).filter(item => item.amount > 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Income</p>
                <p className="text-xl font-bold text-green-500">${totalIncome.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-xl font-bold text-red-500">${totalExpenses.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className={`text-xl font-bold ${balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ${balance.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                <PiggyBank className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Savings Goal</p>
                <p className="text-xl font-bold">${savingsGoal.toLocaleString()}</p>
                <Progress value={savingsProgress} className="h-1.5 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Add Item Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm sm:text-base">Add Item</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="flex gap-2">
              <Button
                variant={newItem.type === 'income' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setNewItem({ ...newItem, type: 'income', category: '' })}
                className={newItem.type === 'income' ? 'bg-green-500 hover:bg-green-600' : ''}
              >
                Income
              </Button>
              <Button
                variant={newItem.type === 'expense' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setNewItem({ ...newItem, type: 'expense', category: '' })}
                className={newItem.type === 'expense' ? 'bg-red-500 hover:bg-red-600' : ''}
              >
                Expense
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                placeholder="e.g., Monthly Rent"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Amount ($)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={newItem.amount}
                onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <select
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              >
                <option value="">Select category</option>
                {(newItem.type === 'income' ? incomeCategories : expenseCategories).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <Button onClick={addItem} className="w-full min-h-[44px]">
              <Plus className="w-4 h-4 mr-2" />
              Add {newItem.type === 'income' ? 'Income' : 'Expense'}
            </Button>

            <div className="space-y-2">
              <Label>Savings Goal ($)</Label>
              <Input
                type="number"
                placeholder="1000"
                value={savingsGoal}
                onChange={(e) => setSavingsGoal(parseFloat(e.target.value) || 0)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Items List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm sm:text-base">Budget Items</CardTitle>
          </CardHeader>
          <CardContent>
            {items.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No items added yet</p>
                <p className="text-sm">Add your income and expenses to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${item.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-bold ${item.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                        {item.type === 'income' ? '+' : '-'}${item.amount.toLocaleString()}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 text-muted-foreground hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Expense Breakdown */}
            {expensesByCategory.length > 0 && (
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium mb-3">Expense Breakdown</h4>
                <div className="space-y-2">
                  {expensesByCategory.map(({ category, amount }) => (
                    <div key={category} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{category}</span>
                          <span>${amount.toLocaleString()}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-violet-500 rounded-full"
                            style={{ width: `${(amount / totalExpenses) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
