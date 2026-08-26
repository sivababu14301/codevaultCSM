import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderPlus, Users, Code, Settings, FileText } from 'lucide-react';
import { Card } from '../ui/Card';

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  const actions = [
    { title: 'Add Category', route: '/admin/categories', icon: FolderPlus, color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/30' },
    { title: 'Manage Users', route: '/admin/users', icon: Users, color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-800/30' },
    { title: 'Manage Snippets', route: '/admin/snippets', icon: Code, color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800/30' },
    { title: 'View Reports', route: '/admin/reports', icon: FileText, color: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-800/30' },
    { title: 'Settings', route: '/admin/settings', icon: Settings, color: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700' },
  ];

  return (
    <Card>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.title}
              onClick={() => navigate(action.route)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border transition-all duration-200 hover:shadow-md ${action.color}`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-semibold whitespace-nowrap">{action.title}</span>
            </motion.button>
          );
        })}
      </div>
    </Card>
  );
};
