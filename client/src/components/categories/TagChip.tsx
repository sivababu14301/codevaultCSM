import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface TagChipProps {
  id: string;
  name: string;
  onRemove?: (id: string) => void;
  onClick?: (id: string) => void;
  selectable?: boolean;
  selected?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const TagChip: React.FC<TagChipProps> = ({
  id,
  name,
  onRemove,
  onClick,
  selectable = false,
  selected = false,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  const baseClasses = `inline-flex items-center gap-1.5 rounded-full font-medium transition-colors ${sizeClasses[size]}`;
  
  const selectableClasses = selectable
    ? selected
      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
    : 'bg-gray-100 text-gray-700';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`${baseClasses} ${selectableClasses}`}
      onClick={() => selectable && onClick && onClick(id)}
    >
      <span>{name}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(id);
          }}
          className="rounded-full p-0.5 hover:bg-gray-200/50 hover:text-red-500 transition-colors focus:outline-none"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </motion.div>
  );
};

export default TagChip;
