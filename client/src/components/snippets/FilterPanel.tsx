import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { api } from '../../services/api';

interface FilterPanelProps {
  languageFilter: string;
  setLanguageFilter: (lang: string) => void;
  categoryFilter: string;
  setCategoryFilter: (cat: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  dbCategories: any[];
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  languageFilter,
  setLanguageFilter,
  categoryFilter,
  setCategoryFilter,
  sortBy,
  setSortBy,
  dbCategories
}) => {
  

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
        <Filter className="w-4 h-4 text-purple-600" />
        <h3 className="text-sm font-bold text-slate-800">Filters</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Language</label>
          <select 
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors cursor-pointer"
          >
            <option value="All">All</option>
            {Array.from(new Map(dbCategories.map(c => [c.name.toLowerCase(), c.name])).values()).map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Category</label>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors cursor-pointer"
          >
            <option value="All">All</option>
            {dbCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Sort By</label>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="a-z">Title (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
