import React from 'react';
import LanguageFilter from './LanguageFilter';
import CategoryFilter from './CategoryFilter';
import TagFilter from './TagFilter';
import SortDropdown from './SortDropdown';
import { X, Heart, Globe, Lock } from 'lucide-react';

export interface FilterState {
  languages: string[];
  categories: string[];
  tags: string[];
  sort: 'newest' | 'oldest' | 'a-z' | 'z-a';
  favoritesOnly: boolean;
  visibility: 'all' | 'public' | 'private';
}

interface SearchFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onClearFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, setFilters, onClearFilters }) => {
  
  const hasActiveFilters = 
    filters.languages.length > 0 || 
    filters.categories.length > 0 || 
    filters.tags.length > 0 || 
    filters.favoritesOnly || 
    filters.visibility !== 'all' || 
    filters.sort !== 'newest';

  return (
    <div className="flex flex-col gap-4 mb-6 bg-white p-4 rounded-[20px] border border-gray-100 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <LanguageFilter 
          selectedValues={filters.languages} 
          onChange={(langs) => setFilters(prev => ({ ...prev, languages: langs }))} 
        />
        <CategoryFilter 
          selectedValues={filters.categories} 
          onChange={(cats) => setFilters(prev => ({ ...prev, categories: cats }))} 
        />
        <TagFilter 
          selectedValues={filters.tags} 
          onChange={(tags) => setFilters(prev => ({ ...prev, tags: tags }))} 
        />
        
        <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block"></div>

        <button
          onClick={() => setFilters(prev => ({ ...prev, favoritesOnly: !prev.favoritesOnly }))}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
            filters.favoritesOnly
              ? 'border-red-200 bg-red-50 text-red-600'
              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Heart className={`w-4 h-4 ${filters.favoritesOnly ? 'fill-red-600 text-red-600' : 'text-gray-400'}`} />
          Favorites
        </button>

        <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
          <button
            onClick={() => setFilters(prev => ({ ...prev, visibility: 'all' }))}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filters.visibility === 'all' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilters(prev => ({ ...prev, visibility: 'public' }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filters.visibility === 'public' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Public
          </button>
          <button
            onClick={() => setFilters(prev => ({ ...prev, visibility: 'private' }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filters.visibility === 'private' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Private
          </button>
        </div>

        <div className="flex-grow"></div>
        
        <SortDropdown 
          value={filters.sort} 
          onChange={(val) => setFilters(prev => ({ ...prev, sort: val }))} 
        />
      </div>

      {hasActiveFilters && (
        <div className="flex items-center pt-3 mt-1 border-t border-gray-100">
          <span className="text-sm text-gray-500 mr-4">Active Filters:</span>
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded-md transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
