
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import WaterTracker from '@/components/dashboard/WaterTracker';
import TodoList from '@/components/dashboard/TodoList';
import GoalsTracker from '@/components/dashboard/GoalsTracker';
import MoneyTracker from '@/components/dashboard/MoneyTracker';
import ThemeToggle from '@/components/dashboard/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Database, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
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

  const handleConnectDatabase = () => {
    toast({
      title: "Database connection",
      description: "To connect to a database, you'll need to set up Supabase integration.",
      variant: "default"
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
            <h1 className="text-3xl font-bold text-foreground">Daily Dashboard</h1>
            <p className="text-muted-foreground">Track your daily activities and progress</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/">
              <Button variant="ghost" size="icon">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </header>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            <WaterTracker />
          </motion.div>
          
          <motion.div 
            variants={itemVariants} 
            className="xl:col-span-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            <TodoList />
          </motion.div>
          
          <motion.div 
            variants={itemVariants} 
            className="md:col-span-2 xl:col-span-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            <GoalsTracker />
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            <MoneyTracker />
          </motion.div>
        </motion.div>
        
        <motion.footer 
          className="mt-8 text-center text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
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
