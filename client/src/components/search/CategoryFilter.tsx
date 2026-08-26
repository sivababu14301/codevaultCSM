import React from 'react';
import FilterDropdown, { FilterOption } from './FilterDropdown';
import { Folder } from 'lucide-react';

const CATEGORY_OPTIONS: FilterOption[] = [
  { id: 'react', label: 'React' },
  { id: 'nodejs', label: 'Node.js' },
  { id: 'frontend', label: 'Frontend Utilities' },
  { id: 'backend', label: 'Backend Architecture' },
  { id: 'database', label: 'Database Queries' },
  { id: 'devops', label: 'DevOps & CI/CD' },
  { id: 'testing', label: 'Testing Setup' },
];

interface CategoryFilterProps {
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedValues, onChange }) => {
  return (
    <FilterDropdown
      label="Category"
      options={CATEGORY_OPTIONS}
      selectedValues={selectedValues}
      onChange={onChange}
      icon={<Folder className="w-4 h-4" />}
    />
  );
};

export default CategoryFilter;
