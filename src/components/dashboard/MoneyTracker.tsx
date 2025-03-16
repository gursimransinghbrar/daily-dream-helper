
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign, TrendingUp, TrendingDown, Plus, Minus } from "lucide-react";
import { cn } from '@/lib/utils';

interface Transaction {
  id: string;
  amount: number;
  description: string;
  type: 'income' | 'expense';
  date: Date;
}

const MoneyTracker = () => {
  const [balance, setBalance] = useState(1250);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { 
      id: '1', 
      amount: 1500, 
      description: 'Salary', 
      type: 'income', 
      date: new Date(Date.now() - 86400000 * 5) 
    },
    { 
      id: '2', 
      amount: 250, 
      description: 'Groceries', 
      type: 'expense', 
      date: new Date(Date.now() - 86400000 * 2) 
    },
  ]);
  
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');

  const addTransaction = () => {
    if (!amount || parseFloat(amount) <= 0 || !description) return;
    
    const amountNum = parseFloat(amount);
    const transaction: Transaction = {
      id: Date.now().toString(),
      amount: amountNum,
      description: description.trim(),
      type: transactionType,
      date: new Date()
    };
    
    setTransactions([transaction, ...transactions]);
    
    if (transactionType === 'income') {
      setBalance(prev => prev + amountNum);
    } else {
      setBalance(prev => prev - amountNum);
    }
    
    setAmount('');
    setDescription('');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-dashboard-money">
          <DollarSign className="h-5 w-5" /> Money Tracker
        </CardTitle>
        <CardDescription>Track your income and expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <p className="text-sm font-medium text-gray-500">Current Balance</p>
          <h3 className="text-3xl font-bold text-dashboard-money">{formatCurrency(balance)}</h3>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex gap-2">
            <Button
              variant={transactionType === 'income' ? 'default' : 'outline'}
              size="sm"
              className={cn("flex-1", transactionType === 'income' && "bg-green-600 hover:bg-green-700")}
              onClick={() => setTransactionType('income')}
            >
              <TrendingUp className="h-4 w-4 mr-1" /> Income
            </Button>
            <Button
              variant={transactionType === 'expense' ? 'default' : 'outline'}
              size="sm"
              className={cn("flex-1", transactionType === 'expense' && "bg-red-600 hover:bg-red-700")}
              onClick={() => setTransactionType('expense')}
            >
              <TrendingDown className="h-4 w-4 mr-1" /> Expense
            </Button>
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-2"
            />
            <Input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-2"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={addTransaction}
              className={cn(
                "col-span-1",
                transactionType === 'income' ? "text-green-600" : "text-red-600"
              )}
            >
              {transactionType === 'income' ? 
                <Plus className="h-4 w-4" /> : 
                <Minus className="h-4 w-4" />
              }
            </Button>
          </div>
        </div>
        
        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
          <h4 className="text-sm font-medium text-gray-500 mb-1">Recent Transactions</h4>
          
          {transactions.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-3">No transactions yet.</p>
          ) : (
            transactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={cn(
                  "flex items-center justify-between p-2 rounded-md animate-scale-in",
                  transaction.type === 'income' ? 'bg-green-50' : 'bg-red-50'
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center space-x-2">
                  <div 
                    className={cn(
                      "flex items-center justify-center h-8 w-8 rounded-full",
                      transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    )}
                  >
                    {transaction.type === 'income' ? 
                      <TrendingUp className="h-4 w-4" /> : 
                      <TrendingDown className="h-4 w-4" />
                    }
                  </div>
                  <div>
                    <p className="text-sm font-medium">{transaction.description}</p>
                    <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                  </div>
                </div>
                <span className={cn(
                  "font-medium",
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                )}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoneyTracker;
