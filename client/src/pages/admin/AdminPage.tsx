import React from 'react';
import { Shield, Users, Code, Server, CheckCircle, AlertTriangle } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const AdminPage: React.FC = () => {
  const users = [
    { id: '1', name: 'alex_dev', email: 'alex@codevault.dev', role: 'admin', snippets: 12, status: 'active' },
    { id: '2', name: 'sarah_m', email: 'sarah@codevault.dev', role: 'user', snippets: 8, status: 'active' },
    { id: '3', name: 'mike_code', email: 'mike@codevault.dev', role: 'user', snippets: 4, status: 'pending' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Shield className="w-6 h-6 text-amber-400" /> Admin Control Center
        </h1>
        <p className="text-sm text-gray-400">System management, metrics, and user moderation</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-xl border border-gray-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 uppercase font-medium">Registered Users</span>
            <p className="text-2xl font-bold text-white mt-1">1,420</p>
          </div>
          <Users className="w-6 h-6 text-indigo-400" />
        </div>
        <div className="glass-card p-5 rounded-xl border border-gray-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 uppercase font-medium">Total Snippets</span>
            <p className="text-2xl font-bold text-white mt-1">8,950</p>
          </div>
          <Code className="w-6 h-6 text-purple-400" />
        </div>
        <div className="glass-card p-5 rounded-xl border border-gray-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 uppercase font-medium">Server Uptime</span>
            <p className="text-2xl font-bold text-emerald-400 mt-1">99.98%</p>
          </div>
          <Server className="w-6 h-6 text-emerald-400" />
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-gray-800 space-y-4">
        <h3 className="text-base font-semibold text-white">User Accounts Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-900 text-xs uppercase text-gray-400 border-b border-gray-800">
              <tr>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Snippets</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-900/50">
                  <td className="px-4 py-3 font-medium text-white">{u.name}</td>
                  <td className="px-4 py-3 text-gray-400">{u.email}</td>
                  <td className="px-4 py-3">
                    <Badge variant={u.role === 'admin' ? 'warning' : 'primary'}>{u.role}</Badge>
                  </td>
                  <td className="px-4 py-3">{u.snippets}</td>
                  <td className="px-4 py-3">
                    <Badge variant={u.status === 'active' ? 'success' : 'warning'}>{u.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm">
                      Manage
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
