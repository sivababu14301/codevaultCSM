import React, { useState } from 'react';
import { DownloadCloud, FileText, FileSpreadsheet } from 'lucide-react';
import { Button } from '../../ui/Button';

export const ExportReport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        variant="primary"
        className="px-4 py-2"
      >
        <DownloadCloud className="w-4 h-4 mr-2" />
        Export Report
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#111827] rounded-xl shadow-lg border border-slate-100 dark:border-[#1F2937] py-1 z-50">
          <button 
            className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <FileText className="w-4 h-4 text-rose-500" />
            Export as PDF
          </button>
          <button 
            className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
            Export as CSV
          </button>
        </div>
      )}
    </div>
  );
};
