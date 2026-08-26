import React from 'react';
import { AdminAnalyticsProvider } from '../../context/AdminAnalyticsContext';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { DashboardStats } from '../../components/admin/DashboardStats';
import { UserGrowthChart } from '../../components/admin/UserGrowthChart';
import { LanguageDistributionChart } from '../../components/admin/LanguageDistributionChart';
import { SnippetGrowthChart } from '../../components/admin/SnippetGrowthChart';
import { RecentUsersTable } from '../../components/admin/RecentUsersTable';
import { RecentSnippetsTable } from '../../components/admin/RecentSnippetsTable';
import { QuickActions } from '../../components/admin/QuickActions';
import { ReportsOverview } from '../../components/admin/ReportsOverview';
import { ActivityTimeline } from '../../components/admin/ActivityTimeline';

export const AdminDashboardPage: React.FC = () => {
  return (
    <AdminAnalyticsProvider>
      <div className="max-w-7xl mx-auto w-full pb-12">
        <AdminHeader />
      
      <div className="flex flex-col gap-8">
        {/* 1. Statistics Cards */}
        <DashboardStats />
        
        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 2. User Growth Chart */}
          <UserGrowthChart />
          {/* 3. Programming Languages Chart */}
          <LanguageDistributionChart />
        </div>

        {/* 4. Monthly Snippet Growth Chart */}
        <div className="w-full">
          <SnippetGrowthChart />
        </div>

        {/* Quick Actions inserted as a utility row */}
        <QuickActions />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* 5. Recent Users Table */}
            <RecentUsersTable />
            {/* 6. Recent Snippets Table */}
            <RecentSnippetsTable />
          </div>
          <div className="flex flex-col gap-6">
            {/* Other existing module 17 components */}
            <ReportsOverview />
            <ActivityTimeline />
          </div>
        </div>
      </div>
      </div>
    </AdminAnalyticsProvider>
  );
};
