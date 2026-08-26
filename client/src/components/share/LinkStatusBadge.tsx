import React from 'react';
import { Link2, Link2Off } from 'lucide-react';

interface LinkStatusBadgeProps {
  isActive: boolean;
}

export const LinkStatusBadge: React.FC<LinkStatusBadgeProps> = ({ isActive }) => {
  if (isActive) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-lg">
        <Link2 className="h-3.5 w-3.5" />
        <span>Active</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-600 text-xs font-semibold rounded-lg">
      <Link2Off className="h-3.5 w-3.5" />
      <span>Revoked</span>
    </div>
  );
};
