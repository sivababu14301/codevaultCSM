import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card } from '../../ui/Card';
import { CategoryStat } from '../../../types/admin';

interface TopLanguagesChartProps {
  data: CategoryStat[];
}

export const TopLanguagesChart: React.FC<TopLanguagesChartProps> = ({ data }) => {
  // Take top 5 for better visibility in a smaller chart
  const topData = [...data].sort((a, b) => b.count - a.count).slice(0, 5);
  const colors = ['#6D5DF6', '#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE'];

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Top Languages</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Most popular languages by snippet count</p>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" className="dark:stroke-[#1F2937]" />
            <XAxis 
              type="number" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748B' }}
            />
            <YAxis 
              dataKey="name" 
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748B', fontWeight: 500 }}
              width={80}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ 
                backgroundColor: '#fff', 
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                color: '#0F172A'
              }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
              {topData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
