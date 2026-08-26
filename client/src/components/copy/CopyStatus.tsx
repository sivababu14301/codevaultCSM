import React from 'react';
import { Clock, MousePointer2 } from 'lucide-react';

interface CopyStatusProps {
  copyCount: number;
  lastCopied?: Date | string | null;
}

export const CopyStatus: React.FC<CopyStatusProps> = ({ copyCount, lastCopied }) => {
  return (
    <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
      <div className="flex items-center gap-1.5" title="Total times copied">
        <MousePointer2 className="h-3.5 w-3.5 text-gray-400" />
        <span>Copied {copyCount} times</span>
      </div>
      
      {lastCopied && (
        <>
          <span className="text-gray-300">•</span>
          <div className="flex items-center gap-1.5" title="Last copied">
            <Clock className="h-3.5 w-3.5 text-gray-400" />
            <span>
              {new Date(lastCopied).toLocaleDateString(undefined, { 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </>
      )}
    </div>
  );
};
