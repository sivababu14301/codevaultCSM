import React from 'react';
import { Collection } from '../../types';
import { CollectionCard } from './CollectionCard';

interface CollectionGridProps {
  collections: Collection[];
  onRename: (collection: Collection) => void;
  onDelete: (collection: Collection) => void;
}

export const CollectionGrid: React.FC<CollectionGridProps> = ({ collections, onRename, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {collections.map((collection) => (
        <CollectionCard 
          key={collection._id} 
          collection={collection} 
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
