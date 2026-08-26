import React from 'react';
import TagChip from './TagChip';
import { motion, AnimatePresence } from 'framer-motion';

export interface TagType {
  id: string;
  name: string;
}

interface TagListProps {
  tags: TagType[];
  onRemoveTag?: (id: string) => void;
  onTagClick?: (id: string) => void;
  selectable?: boolean;
  selectedTagIds?: string[];
}

const TagList: React.FC<TagListProps> = ({
  tags,
  onRemoveTag,
  onTagClick,
  selectable = false,
  selectedTagIds = [],
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <AnimatePresence>
        {tags.map((tag) => (
          <TagChip
            key={tag.id}
            id={tag.id}
            name={tag.name}
            onRemove={onRemoveTag}
            onClick={onTagClick}
            selectable={selectable}
            selected={selectedTagIds.includes(tag.id)}
          />
        ))}
      </AnimatePresence>
      {tags.length === 0 && (
        <p className="text-sm text-gray-500 italic">No tags available.</p>
      )}
    </div>
  );
};

export default TagList;
