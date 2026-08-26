import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card } from '../../ui/Card';

interface CategoryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  colorClass: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ title, value, icon: Icon, colorClass }) => {
  return (
    <Card className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          {title}
        </p>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-slate-900 dark:text-white"
        >
          {value}
        </motion.p>
      </div>
    </Card>
  );
};
