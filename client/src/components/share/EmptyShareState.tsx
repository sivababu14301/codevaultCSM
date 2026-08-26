import React from 'react';
import { Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyShareStateProps {
  onShareClick?: () => void;
}

export const EmptyShareState: React.FC<EmptyShareStateProps> = ({ onShareClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[24px] p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center max-w-2xl mx-auto my-12"
    >
      <div className="w-20 h-20 bg-blue-50 rounded-[20px] flex items-center justify-center mb-6">
        <Share2 className="h-10 w-10 text-[#3B82F6]" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">No shared snippets yet</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg">
        Generate public or private links to share your code snippets with others. Shared snippets will appear here.
      </p>
      
      {onShareClick && (
        <button 
          onClick={onShareClick}
          className="bg-[#6D5DF6] hover:bg-[#5b4be2] text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm shadow-[#6D5DF6]/20 flex items-center gap-2"
        >
          <Share2 className="h-5 w-5" />
          Share a Snippet
        </button>
      )}
    </motion.div>
  );
};
