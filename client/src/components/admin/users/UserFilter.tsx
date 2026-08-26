import React from 'react';
import { Filter } from 'lucide-react';

interface UserFilterProps {
  roleFilter: string;
  statusFilter: string;
  onRoleChange: (role: string) => void;
  onStatusChange: (status: string) => void;
}

export const UserFilter: React.FC<UserFilterProps> = ({ roleFilter, statusFilter, onRoleChange, onStatusChange }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <Filter className="w-4 h-4" />
        <span className="hidden sm:inline">Filters:</span>
      </div>
      
      <select
        value={roleFilter}
        onChange={(e) => onRoleChange(e.target.value)}
        className="block pl-3 pr-8 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-[#111827] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
      >
        <option value="all">All Roles</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="block pl-3 pr-8 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-[#111827] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="suspended">Suspended</option>
      </select>
    </div>
  );
};
