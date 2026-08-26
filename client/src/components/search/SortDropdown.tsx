import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownUp, Check } from 'lucide-react';

type SortOption = 'newest' | 'oldest' | 'a-z' | 'z-a';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'newest', label: 'Newest First' },
  { id: 'oldest', label: 'Oldest First' },
  { id: 'a-z', label: 'A-Z' },
  { id: 'z-a', label: 'Z-A' },
];

const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id: SortOption) => {
    onChange(id);
    setIsOpen(false);
  };

  const selectedLabel = SORT_OPTIONS.find(opt => opt.id === value)?.label || 'Sort By';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors"
      >
        <ArrowDownUp className="w-4 h-4 text-gray-400" />
        <span>{selectedLabel}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-50 py-2"
          >
            {SORT_OPTIONS.map((option) => {
              const isSelected = value === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50 transition-colors text-left"
                >
                  <span className={isSelected ? 'text-purple-700 font-medium' : 'text-gray-700'}>
                    {option.label}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-purple-600" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortDropdown;
