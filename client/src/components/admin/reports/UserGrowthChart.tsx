import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../../ui/Card';
import { UserGrowthStat } from '../../../types/admin';

interface UserGrowthChartProps {
  data: UserGrowthStat[];
}

export const UserGrowthChart: React.FC<UserGrowthChartProps> = ({ data }) => {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">User Growth</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Total registered users over time</p>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6D5DF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6D5DF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-[#1F2937]" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748B' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748B' }}
              tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                color: '#0F172A'
              }}
              itemStyle={{ color: '#6D5DF6', fontWeight: 600 }}
            />
            <Area 
              type="monotone" 
              dataKey="users" 
              stroke="#6D5DF6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorUsers)" 
              activeDot={{ r: 6, fill: '#6D5DF6', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
