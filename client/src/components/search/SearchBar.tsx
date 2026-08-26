import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  placeholder = "Search by title, category, tags or language..." 
}) => {
  return (
    <div className="relative w-full mb-6 group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500 transition-colors">
        <Search className="h-6 w-6" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-[20px] leading-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-lg transition-all shadow-sm hover:shadow-md focus:shadow-md"
        placeholder={placeholder}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <X className="h-5 w-5 bg-gray-100 rounded-full p-0.5 hover:bg-gray-200 transition-colors" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
