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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-900 p-3 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
        <p className="text-slate-500 dark:text-slate-400 mb-1">{label}</p>
        <p className="text-slate-900 dark:text-white font-medium">
          {payload[0].value} Users
        </p>
      </div>
    );
  }
  return null;
};

export const UserGrowthChart: React.FC = () => {
  const { data, isLoading } = useAdminAnalytics();
  if (isLoading || !data) return <div className="p-4">Loading chart...</div>;
  return (
    <Card className="h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
        User Growth
      </h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.userGrowth} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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
              content={<CustomTooltip />}
              cursor={{ stroke: '#94A3B8', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#6D5DF6"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6, stroke: '#6D5DF6', strokeWidth: 2, fill: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
