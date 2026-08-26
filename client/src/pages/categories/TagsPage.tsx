import React, { useState, useMemo } from 'react';
import { Search, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import TagList from '../../components/categories/TagList';
import TagInput from '../../components/categories/TagInput';
import { TagType } from '../../components/categories/TagList';

const INITIAL_TAGS: TagType[] = [
  { id: '1', name: 'frontend' },
  { id: '2', name: 'backend' },
  { id: '3', name: 'api' },
  { id: '4', name: 'hooks' },
  { id: '5', name: 'database' },
  { id: '6', name: 'authentication' },
  { id: '7', name: 'ui' },
  { id: '8', name: 'state-management' },
  { id: '9', name: 'testing' },
];

const TagsPage = () => {
  const [tags, setTags] = useState<TagType[]>(INITIAL_TAGS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTags = useMemo(() => {
    return tags.filter(tag => 
      tag.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tags, searchQuery]);

  const handleAddTag = (name: string) => {
    // Check if tag already exists (case-insensitive)
    if (tags.some(t => t.name.toLowerCase() === name.toLowerCase())) {
      return;
    }
    const newTag: TagType = {
      id: Date.now().toString(),
      name,
    };
    setTags(prev => [...prev, newTag]);
  };

  const handleRemoveTag = (id: string) => {
    setTags(prev => prev.filter(t => t.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-4xl mx-auto min-h-screen"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
          <Tag className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tags</h1>
          <p className="text-gray-500 mt-1">Manage tags to easily filter and find your snippets.</p>
        </div>
      </div>

      <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Tag</h2>
        <TagInput onAddTag={handleAddTag} placeholder="Type a tag name and press Enter..." />
      </div>

      <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 min-h-[400px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-lg font-semibold text-gray-900">All Tags ({tags.length})</h2>
          
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            />
          </div>
        </div>

        <TagList
          tags={filteredTags}
          onRemoveTag={handleRemoveTag}
          selectable={true}
        />
        
        {filteredTags.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No tags found matching "{searchQuery}"
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TagsPage;
