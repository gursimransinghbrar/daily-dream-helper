
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, CheckSquare, Droplet, Target, DollarSign } from 'lucide-react';

const Index = () => {
  const features = [
    { 
      title: 'Water Tracker', 
      description: 'Track your daily water intake', 
      icon: <Droplet className="h-6 w-6 text-blue-500" />,
      color: 'bg-blue-50 border-blue-200'
    },
    { 
      title: 'To-Do List', 
      description: 'Manage your daily tasks', 
      icon: <CheckSquare className="h-6 w-6 text-purple-500" />,
      color: 'bg-purple-50 border-purple-200'
    },
    { 
      title: 'Goals Tracker', 
      description: 'Set and achieve your goals', 
      icon: <Target className="h-6 w-6 text-orange-500" />,
      color: 'bg-orange-50 border-orange-200'
    },
    { 
      title: 'Money Tracker', 
      description: 'Monitor your finances', 
      icon: <DollarSign className="h-6 w-6 text-green-500" />,
      color: 'bg-green-50 border-green-200'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Daily Activity Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Track your habits, manage tasks, set goals, and monitor finances - all in one place.
          </p>
          
          <Link to="/dashboard">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <BarChart className="mr-2 h-5 w-5" /> Go to Dashboard
            </Button>
          </Link>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card className={`h-full border ${feature.color} hover:shadow-md transition-shadow`}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-full bg-white shadow-sm">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-4">
            Start tracking your daily habits and activities today
          </p>
          <Link to="/dashboard">
            <Button variant="outline" size="lg">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
