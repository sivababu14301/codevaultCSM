import { useContext } from 'react';
import { CollectionContext } from '../context/CollectionContext';

export const useCollections = () => {
  const context = useContext(CollectionContext);
  if (context === undefined) {
    throw new Error('useCollections must be used within a CollectionProvider');
  }
  return context;
};
