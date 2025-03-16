
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, BookOpen, Code, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

type Activity = 'exercise' | 'productCourse' | 'leetcode';

interface HabitData {
  lastUpdated: string;
  completed: {
    exercise: boolean;
    productCourse: boolean;
    leetcode: boolean;
  };
}

const DailyHabitTracker = () => {
  const [habits, setHabits] = useState<HabitData>({
    lastUpdated: new Date().toISOString().split('T')[0],
    completed: {
      exercise: false,
      productCourse: false,
      leetcode: false,
    },
  });

  // Load habits from localStorage on component mount
  useEffect(() => {
    const savedHabits = localStorage.getItem('daily-habits');
    if (savedHabits) {
      const parsedHabits = JSON.parse(savedHabits) as HabitData;
      
      // Check if it's a new day
      const today = new Date().toISOString().split('T')[0];
      if (parsedHabits.lastUpdated !== today) {
        // Reset habits for the new day
        setHabits({
          lastUpdated: today,
          completed: {
            exercise: false,
            productCourse: false,
            leetcode: false,
          },
        });
      } else {
        setHabits(parsedHabits);
      }
    }
  }, []);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('daily-habits', JSON.stringify(habits));
  }, [habits]);

  const toggleActivity = (activity: Activity) => {
    setHabits(prev => {
      const newState = {
        ...prev,
        completed: {
          ...prev.completed,
          [activity]: !prev.completed[activity],
        },
      };
      
      // Show toast on completion
      if (!prev.completed[activity]) {
        toast({
          title: "Activity completed!",
          description: `You've completed ${getActivityName(activity)} for today.`,
        });
      }
      
      return newState;
    });
  };

  const getActivityName = (activity: Activity): string => {
    switch (activity) {
      case 'exercise': return 'Exercise';
      case 'productCourse': return 'Product Course';
      case 'leetcode': return 'LeetCode';
      default: return '';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">Daily Habit Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <ActivityButton 
            icon={<Dumbbell className="h-8 w-8" />}
            label="Exercise"
            isCompleted={habits.completed.exercise}
            onClick={() => toggleActivity('exercise')}
          />
          
          <ActivityButton 
            icon={<BookOpen className="h-8 w-8" />}
            label="Product Course"
            isCompleted={habits.completed.productCourse}
            onClick={() => toggleActivity('productCourse')}
          />
          
          <ActivityButton 
            icon={<Code className="h-8 w-8" />}
            label="LeetCode"
            isCompleted={habits.completed.leetcode}
            onClick={() => toggleActivity('leetcode')}
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface ActivityButtonProps {
  icon: React.ReactNode;
  label: string;
  isCompleted: boolean;
  onClick: () => void;
}

const ActivityButton: React.FC<ActivityButtonProps> = ({ 
  icon, 
  label, 
  isCompleted, 
  onClick 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-colors",
        "border-2 shadow-sm",
        isCompleted 
          ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-700" 
          : "bg-card border-muted hover:border-muted-foreground/50"
      )}
      onClick={onClick}
    >
      <div className={cn(
        "mb-2 rounded-full p-2 transition-colors",
        isCompleted 
          ? "text-green-700 dark:text-green-400" 
          : "text-muted-foreground"
      )}>
        {icon}
        {isCompleted && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1 right-1"
          >
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          </motion.div>
        )}
      </div>
      <span className={cn(
        "text-sm font-medium text-center",
        isCompleted 
          ? "text-green-700 dark:text-green-400" 
          : "text-foreground"
      )}>
        {label}
      </span>
    </motion.div>
  );
};

export default DailyHabitTracker;
