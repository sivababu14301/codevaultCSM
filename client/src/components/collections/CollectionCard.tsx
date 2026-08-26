import React from 'react';
import { Folder, Eye, Edit2, Trash2, Calendar, Hash } from 'lucide-react';
import { motion } from 'framer-motion';
import { Collection } from '../../types';
import { Link } from 'react-router-dom';

interface CollectionCardProps {
  collection: Collection;
  onRename: (collection: Collection) => void;
  onDelete: (collection: Collection) => void;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({ collection, onRename, onDelete }) => {
  const snippetCount = Array.isArray(collection.snippets) ? collection.snippets.length : 0;
  
  // Format the date (e.g., "Oct 24, 2023")
  const formattedDate = new Date(collection.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 hover:shadow-md flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-[#6D5DF6]/10 rounded-[14px] flex items-center justify-center">
          <Folder className="h-6 w-6 text-[#6D5DF6]" />
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => onRename(collection)}
            className="p-2 text-gray-400 hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 rounded-lg transition-colors"
            title="Rename Collection"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button 
            onClick={() => onDelete(collection)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
            title="Delete Collection"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-4 flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-1 truncate" title={collection.name}>
          {collection.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2" title={collection.description}>
          {collection.description || 'No description provided.'}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
          <div className="flex items-center gap-1" title="Total snippets">
            <Hash className="h-3.5 w-3.5" />
            <span>{snippetCount}</span>
          </div>
          <div className="flex items-center gap-1" title="Last updated">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <Link 
          to={`/collections/${collection._id}`}
          className="flex items-center gap-1 text-sm font-medium text-[#6D5DF6] hover:text-[#5b4be2] transition-colors"
        >
          <Eye className="h-4 w-4" />
          <span>View</span>
        </Link>
      </div>
    </motion.div>
  );
};
