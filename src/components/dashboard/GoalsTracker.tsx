
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Target, Mountain, Plus, Trash2, Check } from "lucide-react";
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

const GoalsTracker = () => {
  const [shortGoals, setShortGoals] = useState<Goal[]>([
    { id: '1', text: 'Learn React basics', completed: true },
    { id: '2', text: 'Create personal dashboard', completed: false },
  ]);
  
  const [longGoals, setLongGoals] = useState<Goal[]>([
    { id: '1', text: 'Launch first web app', completed: false },
    { id: '2', text: 'Get developer certification', completed: false },
  ]);
  
  const [newGoal, setNewGoal] = useState('');
  const [activeTab, setActiveTab] = useState('short');

  const addGoal = () => {
    if (newGoal.trim() === '') return;
    const goal: Goal = {
      id: Date.now().toString(),
      text: newGoal.trim(),
      completed: false
    };
    
    if (activeTab === 'short') {
      setShortGoals([...shortGoals, goal]);
    } else {
      setLongGoals([...longGoals, goal]);
    }
    
    setNewGoal('');
  };

  const toggleGoal = (id: string) => {
    if (activeTab === 'short') {
      setShortGoals(shortGoals.map(goal => 
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      ));
    } else {
      setLongGoals(longGoals.map(goal => 
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      ));
    }
  };

  const deleteGoal = (id: string) => {
    if (activeTab === 'short') {
      setShortGoals(shortGoals.filter(goal => goal.id !== id));
    } else {
      setLongGoals(longGoals.filter(goal => goal.id !== id));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addGoal();
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-dashboard-shortGoal">
          <Target className="h-5 w-5" /> Goals Tracker
        </CardTitle>
        <CardDescription>Keep track of your goals and aspirations</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="short" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger 
              value="short" 
              className={activeTab === 'short' ? 'text-dashboard-shortGoal' : ''}
            >
              <div className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                <span>Short Term</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="long"
              className={activeTab === 'long' ? 'text-dashboard-longGoal' : ''}
            >
              <div className="flex items-center gap-1">
                <Mountain className="h-4 w-4" />
                <span>Long Term</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="Add a new goal..."
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyDown={handleKeyDown}
              className={cn(
                "border-2",
                activeTab === 'short' 
                  ? "focus-visible:ring-dashboard-shortGoal border-dashboard-shortGoal/20" 
                  : "focus-visible:ring-dashboard-longGoal border-dashboard-longGoal/20"
              )}
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={addGoal}
              className={cn(
                activeTab === 'short' 
                  ? "text-dashboard-shortGoal hover:text-dashboard-shortGoal/80" 
                  : "text-dashboard-longGoal hover:text-dashboard-longGoal/80"
              )}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <TabsContent value="short" className="mt-0 space-y-2">
            {shortGoals.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-3">No short-term goals yet. Add one above!</p>
            ) : (
              shortGoals.map((goal, index) => (
                <div
                  key={goal.id}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-md animate-scale-in border-l-4",
                    goal.completed 
                      ? "bg-muted border-dashboard-shortGoal/50" 
                      : "bg-card border border-l-dashboard-shortGoal"
                  )}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleGoal(goal.id)}
                      className={cn(
                        "h-8 w-8", 
                        goal.completed 
                          ? "text-green-500" 
                          : "text-dashboard-shortGoal opacity-60 hover:opacity-100"
                      )}
                    >
                      {goal.completed ? <Check className="h-4 w-4" /> : <Target className="h-4 w-4" />}
                    </Button>
                    <span className={cn(
                      "text-sm font-medium",
                      goal.completed && "line-through text-muted-foreground"
                    )}>
                      {goal.text}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteGoal(goal.id)}
                    className="h-8 w-8 text-red-500 opacity-60 hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="long" className="mt-0 space-y-2">
            {longGoals.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-3">No long-term goals yet. Add one above!</p>
            ) : (
              longGoals.map((goal, index) => (
                <div
                  key={goal.id}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-md animate-scale-in border-l-4",
                    goal.completed 
                      ? "bg-muted border-dashboard-longGoal/50" 
                      : "bg-card border border-l-dashboard-longGoal"
                  )}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleGoal(goal.id)}
                      className={cn(
                        "h-8 w-8", 
                        goal.completed 
                          ? "text-green-500" 
                          : "text-dashboard-longGoal opacity-60 hover:opacity-100"
                      )}
                    >
                      {goal.completed ? <Check className="h-4 w-4" /> : <Mountain className="h-4 w-4" />}
                    </Button>
                    <span className={cn(
                      "text-sm font-medium",
                      goal.completed && "line-through text-muted-foreground"
                    )}>
                      {goal.text}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteGoal(goal.id)}
                    className="h-8 w-8 text-red-500 opacity-60 hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GoalsTracker;
