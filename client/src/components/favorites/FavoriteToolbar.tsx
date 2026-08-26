import React from 'react';
import { Search, Filter as FilterIcon } from 'lucide-react';
import { SortDropdown, SortOption } from './SortDropdown';

interface FavoriteToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  activeFiltersCount: number;
}

export const FavoriteToolbar: React.FC<FavoriteToolbarProps> = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  isFilterOpen,
  setIsFilterOpen,
  activeFiltersCount
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center bg-white rounded-xl border border-gray-200 px-4 py-2 flex-grow sm:max-w-md shadow-sm focus-within:ring-2 focus-within:ring-[#6D5DF6]/20 focus-within:border-[#6D5DF6] transition-all">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search favorites..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent border-none focus:outline-none focus:ring-0 px-3 text-sm"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm border ${
            isFilterOpen 
              ? 'bg-[#6D5DF6] text-white border-[#6D5DF6]' 
              : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
          }`}
        >
          <FilterIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Filter</span>
          {activeFiltersCount > 0 && (
            <span className={`flex items-center justify-center h-5 w-5 rounded-full text-xs font-bold ${
              isFilterOpen ? 'bg-white text-[#6D5DF6]' : 'bg-[#6D5DF6] text-white'
            }`}>
              {activeFiltersCount}
            </span>
          )}
        </button>

        <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
      </div>
    </div>
  );
};
