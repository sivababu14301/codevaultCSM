import React, { useState, useRef, useEffect } from 'react';
import { ArrowDownUp, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type SortOption = 'newest' | 'oldest' | 'a-z' | 'z-a' | 'recently-updated';

interface SortDropdownProps {
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ sortBy, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'recently-updated', label: 'Recently Updated' },
    { value: 'a-z', label: 'Name (A-Z)' },
    { value: 'z-a', label: 'Name (Z-A)' },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeOption = options.find(opt => opt.value === sortBy);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 transition-colors shadow-sm"
      >
        <ArrowDownUp className="h-4 w-4 text-gray-400" />
        <span className="hidden sm:inline">Sort: </span>
        <span>{activeOption?.label}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-1"
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setSortBy(option.value);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
              >
                <span>{option.label}</span>
                {sortBy === option.value && <Check className="h-4 w-4 text-[#6D5DF6]" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
