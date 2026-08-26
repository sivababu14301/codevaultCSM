import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import { Card } from '../ui/Card';
import { useAdminAnalytics } from '../../context/AdminAnalyticsContext';

export const LanguageDistributionChart: React.FC = () => {
  const { data, isLoading } = useAdminAnalytics();
  if (isLoading || !data) return <div className="p-4">Loading chart...</div>;
  return (
    <Card className="h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
        Languages Distribution
      </h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data.categoryStats} 
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-700/50" horizontal={false} />
            <XAxis 
              type="number"
              stroke="currentColor" 
              className="text-slate-400 text-xs font-medium"
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              dataKey="name" 
              type="category"
              stroke="currentColor" 
              className="text-slate-400 text-xs font-medium"
              tickLine={false}
              axisLine={false}
              dx={-10}
            />
            <Tooltip
              cursor={{ fill: 'currentColor', className: 'text-slate-100 dark:text-slate-800' }}
              contentStyle={{
                backgroundColor: 'var(--tw-colors-slate-900)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ color: '#fff', fontWeight: 500 }}
              labelStyle={{ color: '#94A3B8', marginBottom: '4px' }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
              {data.categoryStats.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
