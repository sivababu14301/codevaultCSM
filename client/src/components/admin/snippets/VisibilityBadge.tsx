import React from 'react';
import { Badge } from '../../ui/Badge';
import { AdminSnippet } from '../../../types/admin';

interface VisibilityBadgeProps {
  status: AdminSnippet['status'];
}

export const VisibilityBadge: React.FC<VisibilityBadgeProps> = ({ status }) => {
  switch (status) {
    case 'public':
      return (
        <Badge variant="primary" className="flex items-center gap-1.5 px-2.5 py-1">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          Public
        </Badge>
      );
    case 'private':
      return (
        <Badge variant="secondary" className="flex items-center gap-1.5 px-2.5 py-1">
          <div className="w-2 h-2 rounded-full bg-slate-500"></div>
          Private
        </Badge>
      );
    case 'flagged':
      return (
        <Badge variant="danger" className="flex items-center gap-1.5 px-2.5 py-1">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
          Flagged
        </Badge>
      );
    case 'hidden':
      return (
        <Badge variant="warning" className="flex items-center gap-1.5 px-2.5 py-1">
          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
          Hidden
        </Badge>
      );
    case 'approved':
      return (
        <Badge variant="success" className="flex items-center gap-1.5 px-2.5 py-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          Approved
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
