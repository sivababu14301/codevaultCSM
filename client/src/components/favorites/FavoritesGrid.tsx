import React from 'react';
import { Snippet } from '../../types';
import { FavoriteCard } from './FavoriteCard';
import { motion, AnimatePresence } from 'framer-motion';

interface FavoritesGridProps {
  favorites: Snippet[];
  onRemoveFavorite: (snippetId: string) => void;
}

export const FavoritesGrid: React.FC<FavoritesGridProps> = ({ favorites, onRemoveFavorite }) => {
  return (
    <motion.div 
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <AnimatePresence>
        {favorites.map((snippet) => (
          <FavoriteCard 
            key={snippet._id} 
            snippet={snippet} 
            onRemoveFavorite={onRemoveFavorite} 
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
