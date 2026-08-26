import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';
import { AdminUser, AdminSnippet, CategoryStat } from '../types/admin';

interface AdminAnalyticsData {
  stats: {
    totalUsers: number;
    usersChange: number;
    totalSnippets: number;
    snippetsChange: number;
    totalCategories: number;
    categoriesChange: number;
    totalReports: number;
    reportsChange: number;
    publicSnippets: number;
    privateSnippets: number;
  };
  recentUsers: AdminUser[];
  recentSnippets: AdminSnippet[];
  userGrowth: { name: string; users: number }[];
  snippetGrowth: { name: string; snippets: number }[];
  categoryStats: CategoryStat[];
  reports: any[];
  activityTimeline: any[];
  mostShared: any[];
  mostViewed: any[];
}

interface AdminAnalyticsContextType {
  data: AdminAnalyticsData | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

const AdminAnalyticsContext = createContext<AdminAnalyticsContextType | undefined>(undefined);

export const AdminAnalyticsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AdminAnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/admin/analytics');
      
      // Merge with some empty defaults for mock data that backend doesn't provide yet
      setData({
        ...res.data,
        reports: res.data.reports || [],
        activityTimeline: res.data.activityTimeline || [],
        mostShared: res.data.mostShared || [],
        mostViewed: res.data.mostViewed || []
      });
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch analytics');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <AdminAnalyticsContext.Provider value={{ data, isLoading, error, refresh: fetchAnalytics }}>
      {children}
    </AdminAnalyticsContext.Provider>
  );
};

export const useAdminAnalytics = () => {
  const context = useContext(AdminAnalyticsContext);
  if (context === undefined) {
    throw new Error('useAdminAnalytics must be used within an AdminAnalyticsProvider');
  }
  return context;
};
