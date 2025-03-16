
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Plus, Minus } from "lucide-react";
import { cn } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";

const WaterTracker = () => {
  const [glasses, setGlasses] = useState<number>(0);
  const { toast } = useToast();
  const goal = 8;

  const addGlass = () => {
    setGlasses(prev => {
      const newValue = prev + 1;
      if (newValue === goal) {
        toast({
          title: "Goal reached! 🎉",
          description: "You've reached your daily water intake goal!",
        });
      }
      return newValue;
    });
  };

  const removeGlass = () => {
    setGlasses(prev => Math.max(0, prev - 1));
  };

  const getProgressColor = () => {
    const percentage = (glasses / goal) * 100;
    if (percentage < 25) return 'bg-blue-200';
    if (percentage < 50) return 'bg-blue-300';
    if (percentage < 75) return 'bg-blue-400';
    return 'bg-blue-500';
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-dashboard-water">
          <Droplet className="h-5 w-5" /> Water Intake
        </CardTitle>
        <CardDescription>Track your daily water consumption</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium">{glasses} of {goal} glasses</span>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={removeGlass} 
              disabled={glasses <= 0}
              className="h-8 w-8"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={addGlass}
              className="h-8 w-8" 
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="w-full bg-gray-100 rounded-full h-4 dark:bg-gray-700">
          <div 
            className={cn("h-4 rounded-full transition-all duration-300", getProgressColor())}
            style={{ width: `${Math.min(100, (glasses / goal) * 100)}%` }}
          />
        </div>
        
        <div className="mt-3 flex justify-center">
          {Array.from({ length: goal }).map((_, i) => (
            <Droplet 
              key={i} 
              className={cn(
                "h-5 w-5 mx-1 transition-all duration-300",
                i < glasses 
                  ? "text-dashboard-water animate-wave fill-dashboard-water" 
                  : "text-gray-300",
                // Stagger animation
                { 'animation-delay-100': i % 4 === 1 },
                { 'animation-delay-200': i % 4 === 2 },
                { 'animation-delay-300': i % 4 === 3 }
              )}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterTracker;
