import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Lock, Copy, Eye, Folder, Tag as TagIcon } from 'lucide-react';
import TagChip from '../categories/TagChip';

export interface SnippetResult {
  id: string;
  title: string;
  language: string;
  category: string;
  tags: string[];
  isFavorite: boolean;
  visibility: 'public' | 'private';
  updatedAt: string;
}

interface SnippetResultCardProps {
  snippet: SnippetResult;
}

const SnippetResultCard: React.FC<SnippetResultCardProps> = ({ snippet }) => {
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Dummy copy action
    console.log('Copied snippet id:', snippet.id);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-1">
          {snippet.title}
        </h3>
        <button className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none">
          <Heart className={`w-5 h-5 ${snippet.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
          {snippet.language}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-medium">
          <Folder className="w-3 h-3" />
          {snippet.category}
        </span>
        {snippet.visibility === 'public' ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-xs font-medium">
            <Globe className="w-3 h-3" />
            Public
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
            <Lock className="w-3 h-3" />
            Private
          </span>
        )}
      </div>

      <div className="flex-grow">
        {snippet.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <TagIcon className="w-4 h-4 text-gray-400" />
            {snippet.tags.slice(0, 3).map((tag, idx) => (
              <TagChip key={idx} id={tag} name={tag} size="sm" />
            ))}
            {snippet.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{snippet.tags.length - 3} more</span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <span className="text-xs text-gray-500">Updated {snippet.updatedAt}</span>
        
        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-2">
          <button 
            onClick={handleCopy}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none"
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button 
            className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors focus:outline-none"
            title="View details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SnippetResultCard;
