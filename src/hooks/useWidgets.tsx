
import { useState, useEffect } from 'react';
import WaterTracker from '@/components/dashboard/WaterTracker';
import TodoList from '@/components/dashboard/TodoList';
import GoalsTracker from '@/components/dashboard/GoalsTracker';
import MoneyTracker from '@/components/dashboard/MoneyTracker';
import DailyHabitTracker from '@/components/dashboard/DailyHabitTracker';
import { useToast } from '@/components/ui/use-toast';

// Define the widget types for reordering
export type WidgetType = 'water' | 'todo' | 'goals' | 'money' | 'habits';

export interface WidgetItem {
  id: WidgetType;
  component: React.ReactNode;
}

export const useWidgets = () => {
  const { toast } = useToast();
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Initial widget order
  const [widgets, setWidgets] = useState<WidgetItem[]>([
    { id: 'water', component: <WaterTracker /> },
    { id: 'habits', component: <DailyHabitTracker /> },
    { id: 'todo', component: <TodoList /> },
    { id: 'goals', component: <GoalsTracker /> },
    { id: 'money', component: <MoneyTracker /> },
  ]);

  useEffect(() => {
    // Try to load saved order from localStorage
    const savedOrder = localStorage.getItem('dashboard-widget-order');
    if (savedOrder) {
      try {
        const orderIds = JSON.parse(savedOrder) as WidgetType[];
        const newWidgets = orderIds.map(id => 
          widgets.find(w => w.id === id) || 
          { id, component: getComponentById(id) }
        );
        setWidgets(newWidgets);
      } catch (e) {
        console.error('Failed to load saved widget order', e);
      }
    }
  }, []);

  // Helper function to get component by ID
  const getComponentById = (id: WidgetType): React.ReactNode => {
    switch (id) {
      case 'water': return <WaterTracker />;
      case 'todo': return <TodoList />;
      case 'goals': return <GoalsTracker />;
      case 'money': return <MoneyTracker />;
      case 'habits': return <DailyHabitTracker />;
    }
  };

  const toggleEditMode = () => {
    const newMode = !isEditMode;
    setIsEditMode(newMode);
    
    if (!newMode) {
      // Save order to localStorage when exiting edit mode
      const orderIds = widgets.map(w => w.id);
      localStorage.setItem('dashboard-widget-order', JSON.stringify(orderIds));
      
      toast({
        title: "Layout saved",
        description: "Your custom dashboard layout has been saved.",
      });
    }
  };

  return {
    widgets,
    setWidgets,
    isEditMode,
    toggleEditMode
  };
};
