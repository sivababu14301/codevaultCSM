import React from 'react';
import { Badge } from '../../ui/Badge';
import { AdminCategory } from '../../../types/admin';

interface StatusBadgeProps {
  status: AdminCategory['status'];
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  if (status === 'active') {
    return (
      <Badge variant="success" className="flex items-center gap-1.5 px-2.5 py-1 w-fit">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        Active
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="flex items-center gap-1.5 px-2.5 py-1 w-fit">
      <div className="w-2 h-2 rounded-full bg-slate-400"></div>
      Inactive
    </Badge>
  );
};
