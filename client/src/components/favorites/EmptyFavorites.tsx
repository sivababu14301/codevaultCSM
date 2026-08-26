import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface EmptyFavoritesProps {
  title?: string;
  description?: string;
  showAction?: boolean;
}

export const EmptyFavorites: React.FC<EmptyFavoritesProps> = ({ 
  title = "No favorites yet", 
  description = "Start exploring snippets and star the ones you want to keep handy.",
  showAction = true
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[24px] p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center max-w-2xl mx-auto my-12"
    >
      <div className="w-20 h-20 bg-yellow-50 rounded-[20px] flex items-center justify-center mb-6 rotate-3">
        <Star className="h-10 w-10 text-yellow-400 fill-yellow-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg">
        {description}
      </p>
      
      {showAction && (
        <Link 
          to="/search"
          className="bg-[#6D5DF6] hover:bg-[#5b4be2] text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm shadow-[#6D5DF6]/20"
        >
          Explore Snippets
        </Link>
      )}
    </motion.div>
  );
};
