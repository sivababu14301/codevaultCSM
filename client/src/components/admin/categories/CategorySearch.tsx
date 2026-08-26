import React from 'react';
import { Search } from 'lucide-react';

interface CategorySearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const CategorySearch: React.FC<CategorySearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative flex-1 min-w-[260px] max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-slate-400" />
      </div>
      <input
        type="text"
        placeholder="Search categories by name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-[#111827] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all sm:text-sm"
      />
    </div>
  );
};
