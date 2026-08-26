import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
      <div className="h-[300px] w-full flex items-center justify-center">
        {loading ? (
          <p className="text-slate-500">Loading...</p>
        ) : data.length === 0 ? (
          <p className="text-slate-500 font-medium">No snippets available</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                formatter={(value) => <span className="text-slate-700 dark:text-slate-300">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};
