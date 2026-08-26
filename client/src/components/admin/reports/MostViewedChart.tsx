import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card } from '../../ui/Card';
import { MostViewedStat } from '../../../types/admin';

interface MostViewedChartProps {
  data: MostViewedStat[];
}

export const MostViewedChart: React.FC<MostViewedChartProps> = ({ data }) => {
  const colors = ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#D1FAE5'];

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Most Viewed Snippets</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Snippets driving the most traffic</p>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" className="dark:stroke-[#1F2937]" />
            <XAxis 
              type="number" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748B' }}
              tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value}
            />
            <YAxis 
              dataKey="title" 
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#64748B', fontWeight: 500 }}
              width={120}
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
            <Bar dataKey="views" radius={[0, 4, 4, 0]} barSize={24}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
