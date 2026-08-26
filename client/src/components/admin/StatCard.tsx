import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { AdminStat } from '../../types/admin';
import { Card } from '../ui/Card';

interface StatCardProps {
  stat: AdminStat;
  index: number;
}

export const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  const Icon = stat.icon;

  const getTrendIcon = () => {
    switch (stat.trend) {
      case 'up': return <ArrowUpRight className="w-3 h-3" />;
      case 'down': return <ArrowDownRight className="w-3 h-3" />;
      default: return <Minus className="w-3 h-3" />;
    }
  };

  const getTrendColor = () => {
    switch (stat.trend) {
      case 'up': return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20';
      case 'down': return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20';
      default: return 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors"
            style={{ 
              backgroundColor: `${stat.color}15`, // 15% opacity
              borderColor: `${stat.color}30`, // 30% opacity
              color: stat.color
            }}
          >
            <Icon className="w-6 h-6" />
          </div>
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${getTrendColor()}`}>
            {getTrendIcon()}
            <span>{Math.abs(stat.change)}%</span>
          </div>
        </div>
        
        <div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
          </h3>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            {stat.title}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};
