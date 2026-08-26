import React from 'react';
import { Mail, Calendar, Code2, Shield, Activity } from 'lucide-react';
import { Modal } from '../../ui/Modal';
import { AdminUser } from '../../../types/admin';
import { UserStatusBadge } from './UserStatusBadge';
import { Badge } from '../../ui/Badge';

interface UserDetailsModalProps {
  user: AdminUser | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user, isOpen, onClose }) => {
  if (!user) return null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Profile">
      <div className="flex flex-col gap-6 pt-2">
        {/* Header Profile Section */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-[#1F2937]">
          <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0 border-4 border-white dark:border-[#0B1120] shadow-sm">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-slate-500 dark:text-slate-400">
                {user.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              {user.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4" /> {user.email}
            </p>
            <div className="flex gap-2">
              <UserStatusBadge status={user.status} />
              <Badge variant={user.role === 'admin' ? 'primary' : 'secondary'} className="capitalize flex items-center gap-1">
                <Shield className="w-3 h-3" />
                {user.role}
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-100 dark:border-[#1F2937] bg-slate-50 dark:bg-[#0B1120]">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
              <Code2 className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Total Snippets</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {user.snippets}
            </p>
          </div>
          
          <div className="p-4 rounded-xl border border-slate-100 dark:border-[#1F2937] bg-slate-50 dark:bg-[#0B1120]">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Member Since</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-2">
              {formatDate(user.joinedAt)}
            </p>
          </div>
        </div>

        {/* System Info */}
        <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/20">
          <h4 className="text-sm font-bold text-purple-900 dark:text-purple-300 flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4" /> System Information
          </h4>
          <div className="space-y-2 text-sm text-purple-700 dark:text-purple-400/80">
            <p><strong>User ID:</strong> {user.id}</p>
            <p><strong>Last Active:</strong> Today, just now</p>
            <p><strong>Account Status:</strong> {user.status.charAt(0).toUpperCase() + user.status.slice(1)}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
