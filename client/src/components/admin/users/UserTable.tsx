import React from 'react';
import { Eye, Ban, ShieldBan, Trash2 } from 'lucide-react';
import { AdminUser } from '../../../types/admin';
import { UserStatusBadge } from './UserStatusBadge';
import { Badge } from '../../ui/Badge';
import { EmptyUsers } from './EmptyUsers';

interface UserTableProps {
  users: AdminUser[];
  onView: (user: AdminUser) => void;
  onBlock: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onView, onBlock, onDelete }) => {
  if (users.length === 0) {
    return <EmptyUsers />;
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-slate-50 dark:bg-[#0B1120] border-y border-slate-100 dark:border-[#1F2937]">
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Avatar</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Role</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Joined</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-[#1F2937]">
          {users.map((user) => {
            const isSuspended = user.status === 'suspended';
            return (
              <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-[#0B1120]/50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm font-bold text-slate-500 dark:text-slate-400">
                        {user.name.charAt(0)}
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white">
                  {user.name}
                </td>
                <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">
                  {user.email}
                </td>
                <td className="py-4 px-6">
                  <Badge variant={user.role === 'admin' ? 'primary' : 'secondary'} className="capitalize">
                    {user.role}
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <UserStatusBadge status={user.status} />
                </td>
                <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300">
                  {formatDate(user.joinedAt)}
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button 
                      onClick={() => onView(user)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button 
                      onClick={() => onBlock(user)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                        isSuspended 
                          ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
                          : 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/40'
                      }`}
                    >
                      {isSuspended ? <ShieldBan className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                      {isSuspended ? 'Unblock' : 'Block'}
                    </button>
                    <button 
                      onClick={() => onDelete(user)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
