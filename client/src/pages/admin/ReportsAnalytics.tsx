import React from 'react';
import { Users, Code2, Share2, Eye } from 'lucide-react';
import { AdminAnalyticsProvider, useAdminAnalytics } from '../../context/AdminAnalyticsContext';

import { AnalyticsHeader } from '../../components/admin/reports/AnalyticsHeader';
import { DateFilter } from '../../components/admin/reports/DateFilter';
import { ExportReport } from '../../components/admin/reports/ExportReport';
import { ReportSummary } from '../../components/admin/reports/ReportSummary';
import { UserGrowthChart } from '../../components/admin/reports/UserGrowthChart';
import { TopLanguagesChart } from '../../components/admin/reports/TopLanguagesChart';
import { MostSharedChart } from '../../components/admin/reports/MostSharedChart';
import { MostViewedChart } from '../../components/admin/reports/MostViewedChart';

const ReportsAnalyticsContent: React.FC = () => {
  const { data, isLoading } = useAdminAnalytics();

  if (isLoading || !data) {
    return <div className="p-8 text-center text-slate-500">Loading analytics...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto w-full pb-12">
      
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <AnalyticsHeader />
        <div className="flex flex-wrap items-center gap-3">
          <DateFilter />
          <ExportReport />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <ReportSummary 
          title="Total Users" 
          value={data.stats.totalUsers.toLocaleString()} 
          trend="0%" 
          isPositive={true} 
          icon={Users} 
          colorClass="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
        />
        <ReportSummary 
          title="Total Snippets" 
          value={data.stats.totalSnippets.toLocaleString()} 
          trend="0%" 
          isPositive={true} 
          icon={Code2} 
          colorClass="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" 
        />
        <ReportSummary 
          title="Total Categories" 
          value={data.stats.totalCategories.toLocaleString()} 
          trend="0%" 
          isPositive={true} 
          icon={Share2} 
          colorClass="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" 
        />
        <ReportSummary 
          title="Active Reports" 
          value={data.stats.totalReports.toLocaleString()} 
          trend="0%" 
          isPositive={false} 
          icon={Eye} 
          colorClass="bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400" 
        />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <UserGrowthChart data={data.userGrowth} />
        <TopLanguagesChart data={data.categoryStats} />
      </div>

      {/* Secondary Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MostSharedChart />
        <MostViewedChart data={data.mostViewed} />
      </div>

    </div>
  );
};

export const ReportsAnalytics: React.FC = () => (
  <AdminAnalyticsProvider>
    <ReportsAnalyticsContent />
  </AdminAnalyticsProvider>
);
