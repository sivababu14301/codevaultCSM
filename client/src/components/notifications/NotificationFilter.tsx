import React from 'react';

export type FilterOption = 'all' | 'unread' | 'security' | 'update' | 'feature';

interface NotificationFilterProps {
  currentFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

export const NotificationFilter: React.FC<NotificationFilterProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  const filters: { id: FilterOption; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'security', label: 'Security' },
    { id: 'update', label: 'Updates' },
    { id: 'feature', label: 'Features' },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            currentFilter === filter.id
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};
