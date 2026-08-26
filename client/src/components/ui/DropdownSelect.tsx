import React from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string | number;
  label: string;
}

interface DropdownSelectProps {
  label?: string;
  description?: string;
  options: Option[];
  value: string | number;
  onChange: (value: any) => void;
  className?: string;
}

export const DropdownSelect: React.FC<DropdownSelectProps> = ({
  label,
  description,
  options,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-4 ${className}`}>
      {(label || description) && (
        <div className="flex-1">
          {label && <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{label}</h4>}
          {description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>}
        </div>
      )}
      <div className="relative min-w-[140px]">
        <select
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            // Attempt to parse as number if the options contain numbers
            const parsed = isNaN(Number(val)) ? val : Number(val);
            onChange(parsed);
          }}
          className="w-full appearance-none bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-[#1F2937] text-slate-700 dark:text-slate-300 text-sm rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer font-medium hover:bg-slate-100 dark:hover:bg-[#111827]"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
};
