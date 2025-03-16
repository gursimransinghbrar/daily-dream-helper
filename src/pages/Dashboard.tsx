
import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import WaterTracker from '@/components/dashboard/WaterTracker';
import TodoList from '@/components/dashboard/TodoList';
import GoalsTracker from '@/components/dashboard/GoalsTracker';
import MoneyTracker from '@/components/dashboard/MoneyTracker';
import ThemeToggle from '@/components/dashboard/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Database, Home, Settings, Grip } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

// Define the widget types for reordering
type WidgetType = 'water' | 'todo' | 'goals' | 'money';

interface WidgetItem {
  id: WidgetType;
  component: React.ReactNode;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Initial widget order
  const [widgets, setWidgets] = useState<WidgetItem[]>([
    { id: 'water', component: <WaterTracker /> },
    { id: 'todo', component: <TodoList /> },
    { id: 'goals', component: <GoalsTracker /> },
    { id: 'money', component: <MoneyTracker /> },
  ]);

  useEffect(() => {
    setMounted(true);
    
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
    
    // Show a toast about database connection
    toast({
      title: "Local data only",
      description: "Currently using local storage. Connect to a database for persistent data.",
      action: (
        <Button variant="outline" size="sm" onClick={handleConnectDatabase}>
          <Database className="h-4 w-4 mr-1" /> Connect
        </Button>
      )
    });
  }, []);

  // Helper function to get component by ID
  const getComponentById = (id: WidgetType): React.ReactNode => {
    switch (id) {
      case 'water': return <WaterTracker />;
      case 'todo': return <TodoList />;
      case 'goals': return <GoalsTracker />;
      case 'money': return <MoneyTracker />;
    }
  };

  const handleConnectDatabase = () => {
    toast({
      title: "Database connection",
      description: "To connect to a database, you'll need to set up Supabase integration.",
      variant: "default"
    });
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Daily Dashboard</h1>
            <p className="text-muted-foreground mt-1">Track your daily activities and progress</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant={isEditMode ? "default" : "ghost"} 
              size="sm"
              onClick={toggleEditMode}
              className={isEditMode ? "bg-primary text-primary-foreground" : ""}
            >
              {isEditMode ? (
                <>
                  <Grip className="h-4 w-4 mr-1" /> Done
                </>
              ) : (
                <>
                  <Settings className="h-4 w-4 mr-1" /> Customize
                </>
              )}
            </Button>
            <ThemeToggle />
            <Link to="/">
              <Button variant="ghost" size="icon">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </header>
        
        {isEditMode ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
            <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-4 text-center">
              <p className="text-secondary-foreground font-medium flex items-center justify-center">
                <Grip className="h-4 w-4 mr-2" /> Drag widgets to rearrange your dashboard
              </p>
            </div>
          </motion.div>
        ) : null}
        
        <Reorder.Group 
          axis="y"
          values={widgets} 
          onReorder={setWidgets}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          as="div"
          layoutScroll
        >
          {widgets.map((widget) => (
            <Reorder.Item
              key={widget.id}
              value={widget}
              as="div"
              className={`${
                widget.id === 'todo' || widget.id === 'goals' ? 'md:col-span-2' : ''
              } transition-all duration-300 ${
                isEditMode ? 'cursor-grab active:cursor-grabbing' : ''
              }`}
              dragListener={isEditMode}
              dragControls={undefined}
            >
              <div className={isEditMode ? 'relative' : ''}>
                {isEditMode && (
                  <div className="absolute -top-2 -left-2 z-10 bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center shadow-lg">
                    <Grip className="h-4 w-4" />
                  </div>
                )}
                <motion.div 
                  className={`card-hover rounded-xl overflow-hidden border bg-card text-card-foreground shadow-sm ${
                    isEditMode ? 'ring-2 ring-primary/20' : ''
                  }`}
                  whileHover={{ scale: isEditMode ? 1 : 1.02 }}
                  variants={itemVariants}
                >
                  {widget.component}
                </motion.div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
        
        <motion.footer 
          className="mt-8 text-center text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>All data is currently stored locally. Connect to a database for persistent storage.</p>
          <Button 
            variant="link" 
            className="text-primary p-0 h-auto mt-1"
            onClick={handleConnectDatabase}
          >
            <Database className="h-4 w-4 mr-1" /> Connect to Database
          </Button>
        </motion.footer>
      </div>
    </div>
  );
};

export default Dashboard;
