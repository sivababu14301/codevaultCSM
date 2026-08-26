import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useAdminAnalytics } from '../../context/AdminAnalyticsContext';

export const RecentUsersTable: React.FC = () => {
  const { data, isLoading } = useAdminAnalytics();

  if (isLoading || !data) return <div className="p-4">Loading...</div>;

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-[#1F2937]">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Users</h3>
        <Button variant="ghost" size="sm" className="text-purple-600 dark:text-purple-400">
          View All
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-[#0B1120] border-b border-slate-100 dark:border-[#1F2937]">
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">User</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Role</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Snippets</th>
              <th className="py-3 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-[#1F2937]">
            {data.recentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-[#0B1120] transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400">
                          {user.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <Badge variant={user.role === 'admin' ? 'primary' : 'secondary'} className="capitalize">
                    {user.role}
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <Badge 
                    variant={user.status === 'active' ? 'success' : user.status === 'pending' ? 'warning' : 'danger'}
                    className="capitalize"
                  >
                    {user.status}
                  </Badge>
                </td>
                <td className="py-4 px-6 text-sm text-slate-700 dark:text-slate-300">
                  {user.snippets}
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 transition-colors">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
