import React from 'react';
import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  query?: string;
  onClear: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ query, onClear }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 bg-white rounded-[20px] border border-gray-100 shadow-sm text-center px-4"
    >
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-6">
        <SearchX className="w-10 h-10" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        No snippets found
      </h3>
      
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        {query 
          ? <>We couldn't find any snippets matching "<span className="font-medium text-gray-900">{query}</span>" with your current filters.</>
          : "We couldn't find any snippets with your current filters."
        }
      </p>

      <button
        onClick={onClear}
        className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:text-purple-600 transition-colors shadow-sm"
      >
        Clear All Filters
      </button>
    </motion.div>
  );
};

export default EmptyState;
