import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card } from '../ui/Card';
import { dummyCategoryStats } from '../../data/dummyAdmin';

export const CategoryOverview: React.FC = () => {
  return (
    <Card className="h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
        Category Distribution
      </h3>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dummyCategoryStats}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={5}
              dataKey="count"
              nameKey="name"
            >
              {dummyCategoryStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--tw-colors-slate-900)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300 ml-1">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
