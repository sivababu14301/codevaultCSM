import React from 'react';
import { Users, Code2, FolderTree, AlertOctagon } from 'lucide-react';
import { StatCard } from './StatCard';
import { useAdminAnalytics } from '../../context/AdminAnalyticsContext';
import { AdminStat } from '../../types/admin';

export const DashboardStats: React.FC = () => {
  const { data, isLoading } = useAdminAnalytics();
  
  if (isLoading || !data) {
    return <div className="p-4 text-center">Loading stats...</div>;
  }

  const stats: AdminStat[] = [
    {
      title: 'Total Users',
      value: data.stats.totalUsers,
      change: data.stats.usersChange,
      trend: data.stats.usersChange >= 0 ? 'up' : 'down',
      icon: Users,
      color: '#8B5CF6',
    },
    {
      title: 'Total Snippets',
      value: data.stats.totalSnippets,
      change: data.stats.snippetsChange,
      trend: data.stats.snippetsChange >= 0 ? 'up' : 'down',
      icon: Code2,
      color: '#3B82F6',
    },
    {
      title: 'Categories',
      value: data.stats.totalCategories,
      change: data.stats.categoriesChange,
      trend: data.stats.categoriesChange > 0 ? 'up' : data.stats.categoriesChange < 0 ? 'down' : 'neutral',
      icon: FolderTree,
      color: '#10B981',
    },
    {
      title: 'Active Reports',
      value: data.stats.totalReports,
      change: data.stats.reportsChange,
      trend: data.stats.reportsChange > 0 ? 'down' : 'up',
      icon: AlertOctagon,
      color: '#F43F5E',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={stat.title} stat={stat} index={index} />
      ))}
    </div>
  );
};
