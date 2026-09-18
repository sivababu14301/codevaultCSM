import React from 'react';
import { Shield } from 'lucide-react';
import { ExportReport } from './reports/ExportReport';

export const AdminHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3 transition-colors duration-200">
          <Shield className="w-8 h-8 text-purple-600 dark:text-purple-500" />
          Admin Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          System overview, metrics, and management.
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="hidden sm:block">
          <ExportReport />
        </div>
      </div>
    </div>
  );
};
