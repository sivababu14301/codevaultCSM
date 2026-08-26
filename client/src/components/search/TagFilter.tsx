import React from 'react';
import FilterDropdown, { FilterOption } from './FilterDropdown';
import { Tag } from 'lucide-react';

const TAG_OPTIONS: FilterOption[] = [
  { id: 'api', label: 'API' },
  { id: 'auth', label: 'Authentication' },
  { id: 'ui', label: 'UI Components' },
  { id: 'hooks', label: 'Hooks' },
  { id: 'utils', label: 'Utilities' },
  { id: 'config', label: 'Configuration' },
  { id: 'algorithms', label: 'Algorithms' },
];

interface TagFilterProps {
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ selectedValues, onChange }) => {
  return (
    <FilterDropdown
      label="Tags"
      options={TAG_OPTIONS}
      selectedValues={selectedValues}
      onChange={onChange}
      icon={<Tag className="w-4 h-4" />}
    />
  );
};

export default TagFilter;
