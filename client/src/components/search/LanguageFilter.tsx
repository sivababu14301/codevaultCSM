import React from 'react';
import FilterDropdown, { FilterOption } from './FilterDropdown';
import { Code2 } from 'lucide-react';

const LANGUAGE_OPTIONS: FilterOption[] = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'cpp', label: 'C++' },
  { id: 'csharp', label: 'C#' },
  { id: 'go', label: 'Go' },
  { id: 'rust', label: 'Rust' },
  { id: 'html', label: 'HTML/CSS' },
  { id: 'sql', label: 'SQL' },
];

interface LanguageFilterProps {
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const LanguageFilter: React.FC<LanguageFilterProps> = ({ selectedValues, onChange }) => {
  return (
    <FilterDropdown
      label="Language"
      options={LANGUAGE_OPTIONS}
      selectedValues={selectedValues}
      onChange={onChange}
      icon={<Code2 className="w-4 h-4" />}
    />
  );
};

export default LanguageFilter;
