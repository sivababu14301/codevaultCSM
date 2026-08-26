import React, { createContext, useState, useEffect } from 'react';
import { Collection, Snippet } from '../types';
import { collectionService } from '../services/collectionService';
import { useAuth } from '../hooks/useAuth';

interface CollectionContextType {
  collections: Collection[];
  addCollection: (collection: Omit<Collection, '_id' | 'createdAt' | 'updatedAt' | 'snippets' | 'user'>) => Promise<void>;
  updateCollection: (id: string, data: Partial<Collection>) => Promise<void>;
  deleteCollection: (id: string) => Promise<void>;
  addSnippetToCollection: (collectionId: string, snippet: Snippet) => Promise<void>;
  removeSnippetFromCollection: (collectionId: string, snippetId: string) => Promise<void>;
  isLoading: boolean;
}

export const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export const CollectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCollections();
    } else {
      setCollections([]);
    }
  }, [user]);

  const fetchCollections = async () => {
    setIsLoading(true);
    try {
      const data = await collectionService.getCollections();
      setCollections(data);
    } catch (error) {
      console.error('Failed to fetch collections', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addCollection = async (collectionData: Omit<Collection, '_id' | 'createdAt' | 'updatedAt' | 'snippets' | 'user'>) => {
    try {
      const newCollection = await collectionService.createCollection(collectionData);
      setCollections((prev) => [newCollection, ...prev]);
    } catch (error) {
      console.error('Failed to create collection', error);
      throw error;
    }
  };

  const updateCollection = async (id: string, data: Partial<Collection>) => {
    try {
      const updatedCollection = await collectionService.updateCollection(id, data);
      setCollections((prev) => prev.map((c) => c._id === id ? updatedCollection : c));
    } catch (error) {
      console.error('Failed to update collection', error);
      throw error;
    }
  };

  const deleteCollection = async (id: string) => {
    try {
      await collectionService.deleteCollection(id);
      setCollections((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error('Failed to delete collection', error);
      throw error;
    }
  };

  const addSnippetToCollection = async (collectionId: string, snippet: Snippet) => {
    try {
      await collectionService.addSnippetToCollection(collectionId, snippet._id);
      setCollections((prev) => prev.map((c) => {
        if (c._id === collectionId) {
          const currentSnippets = Array.isArray(c.snippets) ? c.snippets as Snippet[] : [];
          if (!currentSnippets.find(s => typeof s === 'object' && s._id === snippet._id)) {
            return { ...c, snippets: [snippet, ...currentSnippets] };
          }
        }
        return c;
      }));
    } catch (error) {
      console.error('Failed to add snippet to collection', error);
      throw error;
    }
  };

  const removeSnippetFromCollection = async (collectionId: string, snippetId: string) => {
    try {
      await collectionService.removeSnippetFromCollection(collectionId, snippetId);
      setCollections((prev) => prev.map((c) => {
        if (c._id === collectionId) {
          const currentSnippets = Array.isArray(c.snippets) ? c.snippets as Snippet[] : [];
          return { ...c, snippets: currentSnippets.filter(s => typeof s === 'object' && s._id !== snippetId) };
        }
        return c;
      }));
    } catch (error) {
      console.error('Failed to remove snippet from collection', error);
      throw error;
    }
  };

  return (
    <CollectionContext.Provider value={{ collections, addCollection, updateCollection, deleteCollection, addSnippetToCollection, removeSnippetFromCollection, isLoading }}>
      {children}
    </CollectionContext.Provider>
  );
};
