import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../../ui/Card';

interface ReportSummaryProps {
  title: string;
  value: string | number;
  trend: string;
  isPositive: boolean;
  icon: LucideIcon;
  colorClass: string;
}

export const ReportSummary: React.FC<ReportSummaryProps> = ({ title, value, trend, isPositive, icon: Icon, colorClass }) => {
  return (
    <Card className="flex flex-col p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium px-2.5 py-1 rounded-full ${
          isPositive 
            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' 
            : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400'
        }`}>
          {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          {trend}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          {title}
        </h3>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1"
        >
          {value}
        </motion.p>
      </div>
    </Card>
  );
};
