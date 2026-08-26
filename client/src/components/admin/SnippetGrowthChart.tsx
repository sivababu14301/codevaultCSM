import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Card } from '../ui/Card';
import { useAdminAnalytics } from '../../context/AdminAnalyticsContext';

export const SnippetGrowthChart: React.FC = () => {
  const { data, isLoading } = useAdminAnalytics();
  if (isLoading || !data) return <div className="p-4">Loading chart...</div>;
  return (
    <Card className="h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
        Snippet Growth
      </h3>
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.snippetGrowth} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-700/50" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="currentColor" 
              className="text-slate-400 text-xs font-medium"
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="currentColor" 
              className="text-slate-400 text-xs font-medium"
              tickLine={false}
              axisLine={false}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--tw-colors-slate-900)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ color: '#fff', fontWeight: 500 }}
              labelStyle={{ color: '#94A3B8', marginBottom: '4px' }}
              cursor={{ stroke: '#94A3B8', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Line
              type="monotone"
              dataKey="snippets"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2, fill: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
