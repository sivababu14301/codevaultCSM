import React, { useState } from 'react';
import { DownloadCloud, FileText, FileSpreadsheet } from 'lucide-react';
import { Button } from '../../ui/Button';
import { useAdminAnalytics } from '../../../context/AdminAnalyticsContext';

export const ExportReport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useAdminAnalytics();

  const handleExportPDF = () => {
    setIsOpen(false);
    window.print();
  };

  const handleExportCSV = () => {
    setIsOpen(false);
    if (!data) return;

    let csvContent = "CodeVault Analytics Report\n\n";
    
    // Overview Stats
    csvContent += "--- Overview Stats ---\n";
    csvContent += "Metric,Value\n";
    csvContent += `Total Users,${data.stats.totalUsers}\n`;
    csvContent += `Total Snippets,${data.stats.totalSnippets}\n`;
    csvContent += `Public Snippets,${data.stats.publicSnippets}\n`;
    csvContent += `Private Snippets,${data.stats.privateSnippets}\n`;
    csvContent += `Total Categories,${data.stats.totalCategories}\n`;
    csvContent += `Total Reports,${data.stats.totalReports}\n\n`;

    // Category Stats
    csvContent += "--- Language & Category Stats ---\n";
    csvContent += "Category/Language,Count\n";
    data.categoryStats.forEach(stat => {
      csvContent += `"${stat._id}",${stat.count}\n`;
    });

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `codevault-analytics-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            onClick={handleExportPDF}
          >
            <FileText className="w-4 h-4 text-rose-500" />
            Export as PDF
          </button>
          <button 
            className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors"
            onClick={handleExportCSV}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
            Export as CSV
          </button>
        </div>
      )}
    </div>
  );
};
