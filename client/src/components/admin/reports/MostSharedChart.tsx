import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card } from '../../ui/Card';
import { api } from '../../../services/api';

interface SharedSnippetData {
  title: string;
  shareCount: number;
}

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export const MostSharedChart: React.FC = () => {
  const [data, setData] = useState<SharedSnippetData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMostShared = async () => {
    try {
      const res = await api.get('/admin/reports/most-shared');
      setData(res.data);
    } catch (error) {
      console.error('Failed to fetch most shared snippets', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMostShared();
    const interval = setInterval(fetchMostShared, 10000);
    return () => clearInterval(interval);
  }, []);

  const chartData = data.map((d) => ({
    name: d.title,
    value: d.shareCount,
  }));

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Most Shared Snippets</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Snippets with the highest share count</p>
      </div>
      <div className="h-[300px] w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-slate-500">Loading...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-slate-500 font-medium">No shared snippets yet</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" className="dark:stroke-[#1F2937]" />
              <XAxis 
                type="number" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
                tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value}
              />
              <YAxis 
                dataKey="name" 
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748B', fontWeight: 500 }}
                width={120}
                tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
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
                formatter={(value: number) => [value, 'Shares']}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};
