import React from 'react';
import { Tag, X } from 'lucide-react';

interface TagChipProps {
  tag: string;
  onRemove?: () => void;
  className?: string;
}

export const TagChip: React.FC<TagChipProps> = ({ tag, onRemove, className = '' }) => {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100 ${className}`}>
      <Tag className="w-3 h-3" />
      {tag}
      {onRemove && (
        <button 
          onClick={onRemove}
          className="ml-0.5 p-0.5 rounded-full hover:bg-purple-200 transition-colors focus:outline-none"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};
