import React from 'react';
import { Code2 } from 'lucide-react';

interface EmptySnippetsProps {
  searchTerm?: string;
  onClearFilters?: () => void;
}

export const EmptySnippets: React.FC<EmptySnippetsProps> = ({ searchTerm, onClearFilters }) => {
  return (
    <div className="py-12 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-[#0B1120] border border-slate-100 dark:border-[#1F2937] flex items-center justify-center mb-4">
        <Code2 className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
        No snippets found
      </h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
        {searchTerm 
          ? `We couldn't find any snippets matching "${searchTerm}". Try adjusting your search or filters.`
          : 'There are currently no snippets to display matching your criteria.'}
      </p>
      {onClearFilters && (
        <button 
          onClick={onClearFilters}
          className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
};
