import React from 'react';
import { Badge } from '../../ui/Badge';
import { AdminUser } from '../../../types/admin';

interface UserStatusBadgeProps {
  status: AdminUser['status'];
}

export const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'active':
      return (
        <Badge variant="success" className="flex items-center gap-1.5 px-2.5 py-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          Active
        </Badge>
      );
    case 'pending':
      return (
        <Badge variant="warning" className="flex items-center gap-1.5 px-2.5 py-1">
          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
          Pending
        </Badge>
      );
    case 'suspended':
      return (
        <Badge variant="danger" className="flex items-center gap-1.5 px-2.5 py-1">
          <div className="w-2 h-2 rounded-full bg-rose-500"></div>
          Suspended
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className="flex items-center gap-1.5 px-2.5 py-1 capitalize">
          <div className="w-2 h-2 rounded-full bg-slate-400"></div>
          {status}
        </Badge>
      );
  }
};
