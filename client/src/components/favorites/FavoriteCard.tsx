import React, { useState } from 'react';
import { Star, Eye, Copy, Check, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Snippet } from '../../types';

interface FavoriteCardProps {
  snippet: Snippet;
  onRemoveFavorite: (snippetId: string) => void;
}

export const FavoriteCard: React.FC<FavoriteCardProps> = ({ snippet, onRemoveFavorite }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDate = new Date(snippet.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 hover:shadow-md flex flex-col h-full group relative overflow-hidden"
    >
      {/* Top Banner / Color Accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-[#6D5DF6]" />

      <div className="flex items-start justify-between mb-4 mt-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
          </div>
          <div>
            <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg uppercase tracking-wider">
              {snippet.language}
            </span>
          </div>
        </div>
        
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemoveFavorite(snippet._id);
          }}
          className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors"
          title="Remove from favorites"
        >
          <Star className="h-5 w-5 fill-current" />
        </button>
      </div>

      <div className="mb-4 flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1" title={snippet.title}>
          {snippet.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2" title={snippet.description}>
          {snippet.description || 'No description provided.'}
        </p>
      </div>
      
      {/* Tags */}
      {snippet.tags && snippet.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {snippet.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md border border-gray-100">
              #{tag}
            </span>
          ))}
          {snippet.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md border border-gray-100">
              +{snippet.tags.length - 3}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
          <Clock className="h-3.5 w-3.5" />
          <span>Updated {formattedDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleCopy}
            className="flex items-center justify-center p-2 text-gray-400 hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 rounded-lg transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
          <Link 
            to={`/snippets/${snippet._id}`}
            className="flex items-center gap-1 text-sm font-medium text-[#6D5DF6] hover:text-[#5b4be2] transition-colors p-2 hover:bg-[#6D5DF6]/5 rounded-lg"
          >
            <Eye className="h-4 w-4" />
            <span>View</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
