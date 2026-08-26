import React from 'react';
import { Calendar } from 'lucide-react';

export const DateFilter: React.FC = () => {
  return (
    <div className="relative inline-block">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Calendar className="w-4 h-4 text-slate-400" />
      </div>
      <select
        className="block pl-9 pr-8 py-2 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-[#111827] text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
      >
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
        <option value="90">Last 90 Days</option>
        <option value="year">This Year</option>
        <option value="all">All Time</option>
      </select>
    </div>
  );
};
