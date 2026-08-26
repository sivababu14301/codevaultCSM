import React from 'react';
import { Search } from 'lucide-react';

interface SnippetSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const SnippetSearch: React.FC<SnippetSearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative flex-1 min-w-[260px]">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-slate-400" />
      </div>
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-[#111827] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all sm:text-sm"
      />
    </div>
  );
};
