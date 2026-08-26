import React from 'react';
import { Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FilterState {
  language: string;
  category: string;
}

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  availableLanguages: string[];
  availableCategories: string[];
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  availableLanguages,
  availableCategories
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden mb-6"
        >
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex items-center gap-2 mb-4 text-gray-900 font-semibold">
              <Filter className="h-5 w-5 text-[#6D5DF6]" />
              <h3>Filter Favorites</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Language Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select 
                  value={filters.language}
                  onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-[#6D5DF6] focus:border-[#6D5DF6] block p-2.5"
                >
                  <option value="">All Languages</option>
                  {availableLanguages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select 
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-[#6D5DF6] focus:border-[#6D5DF6] block p-2.5"
                >
                  <option value="">All Categories</option>
                  {availableCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button 
                onClick={() => {
                  setFilters({ language: '', category: '' });
                }}
                className="text-sm font-medium text-[#6D5DF6] hover:text-[#5b4be2]"
              >
                Clear all filters
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
