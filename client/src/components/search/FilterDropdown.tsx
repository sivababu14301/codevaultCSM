import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export interface FilterOption {
  id: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  icon?: React.ReactNode;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  icon
}) => {
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

  const toggleOption = (id: string) => {
    const newValues = selectedValues.includes(id)
      ? selectedValues.filter(val => val !== id)
      : [...selectedValues, id];
    onChange(newValues);
  };

  const isActive = selectedValues.length > 0;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
          isActive 
            ? 'border-purple-500 bg-purple-50 text-purple-700'
            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        {icon && <span className={isActive ? 'text-purple-600' : 'text-gray-400'}>{icon}</span>}
        <span>{label}</span>
        {isActive && (
          <span className="bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {selectedValues.length}
          </span>
        )}
        <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-lg z-50 py-2 max-h-64 overflow-y-auto"
          >
            {options.map((option) => {
              const isSelected = selectedValues.includes(option.id);
              return (
                <button
                  key={option.id}
                  onClick={() => toggleOption(option.id)}
                  className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50 transition-colors text-left"
                >
                  <span className={isSelected ? 'text-purple-700 font-medium' : 'text-gray-700'}>
                    {option.label}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-purple-600" />}
                </button>
              );
            })}
            
            {options.length === 0 && (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No options available
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterDropdown;
