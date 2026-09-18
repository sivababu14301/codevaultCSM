import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchWithButtonProps {
  placeholder?: string;
  onSearch: (term: string) => void;
  onClear: () => void;
}

export const SearchWithButton: React.FC<SearchWithButtonProps> = ({ 
  placeholder = "Search...", 
  onSearch, 
  onClear 
}) => {
  const [term, setTerm] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleSearch = () => {
    const trimmed = term.trim();
    if (trimmed) {
      setIsActive(true);
      onSearch(trimmed);
    } else {
      handleClear();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setTerm('');
    setIsActive(false);
    onClear();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl mb-6">
      <div className="relative w-full flex-1">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="block w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6D5DF6]/20 focus:border-[#6D5DF6] transition-all shadow-sm"
          placeholder={placeholder}
        />
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button
          onClick={handleSearch}
          className="px-5 py-2.5 bg-[#6D5DF6] hover:bg-[#5b4be2] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm w-full sm:w-auto whitespace-nowrap"
        >
          Search
        </button>
        {isActive && (
          <button
            onClick={handleClear}
            className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors shadow-sm w-full sm:w-auto whitespace-nowrap"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};
