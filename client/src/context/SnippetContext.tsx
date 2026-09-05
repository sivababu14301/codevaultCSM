import React, { createContext, useState, useEffect, useContext } from 'react';
import { Snippet, SearchFilters } from '../types';
import { snippetService } from '../services/snippetService';
import { favoriteService } from '../services/favoriteService';
import { AuthContext } from './AuthContext';

interface SnippetContextType {
  snippets: Snippet[];
  favoriteSnippetIds: string[];
  activeFilter: SearchFilters;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  toggleFavorite: (snippetId: string) => Promise<void>;
  addSnippet: (snippet: Partial<Snippet>) => Promise<Snippet>;
  deleteSnippet: (snippetId: string) => Promise<void>;
  fetchSnippets: (filters?: SearchFilters) => Promise<void>;
  restoreVersion: (snippetId: string, versionId: string) => Promise<void>;
  duplicateSnippet: (snippetId: string) => Promise<Snippet>;
}

export const SnippetContext = createContext<SnippetContextType | undefined>(undefined);

export const SnippetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [favoriteSnippetIds, setFavoriteSnippetIds] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<SearchFilters>({});
  
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  const fetchSnippets = React.useCallback(async (filters?: SearchFilters) => {
    try {
      const data = await snippetService.getAllSnippets(filters);
      setSnippets(data || []);
    } catch (error) {
      console.error('Error fetching snippets:', error);
      setSnippets([]);
    }
  }, []);

  const fetchFavorites = React.useCallback(async () => {
    try {
      const data = await favoriteService.getFavorites();
      setFavoriteSnippetIds(data.map(fav => typeof fav.snippetId === 'string' ? fav.snippetId : fav.snippetId._id));
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setFavoriteSnippetIds([]);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchSnippets();
      fetchFavorites();
    } else {
      setSnippets([]);
      setFavoriteSnippetIds([]);
    }
  }, [user, fetchSnippets, fetchFavorites]);

  const setSearchQuery = (query: string) => {
    setActiveFilter((prev) => ({ ...prev, query }));
  };

  const setCategoryFilter = (category: string) => {
    setActiveFilter((prev) => ({ ...prev, category }));
  };

  const toggleFavorite = async (snippetId: string) => {
    try {
      const isFavorite = favoriteSnippetIds.includes(snippetId);
      if (isFavorite) {
        await favoriteService.removeFavorite(snippetId);
        setFavoriteSnippetIds(prev => prev.filter(id => id !== snippetId));
        // Update favorites count on snippet locally
        setSnippets(prev => prev.map(s => s._id === snippetId ? { ...s, favoritesCount: Math.max(0, s.favoritesCount - 1) } : s));
      } else {
        await favoriteService.addFavorite(snippetId);
        setFavoriteSnippetIds(prev => [...prev, snippetId]);
        // Update favorites count on snippet locally
        setSnippets(prev => prev.map(s => s._id === snippetId ? { ...s, favoritesCount: s.favoritesCount + 1 } : s));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const addSnippet = async (snippetData: Partial<Snippet>): Promise<Snippet> => {
    try {
      const newSnippet = await snippetService.createSnippet(snippetData);
      setSnippets((prev) => [newSnippet, ...prev]);
      return newSnippet;
    } catch (error) {
      console.error('Error adding snippet:', error);
      throw error;
    }
  };

  const deleteSnippet = async (snippetId: string) => {
    try {
      await snippetService.deleteSnippet(snippetId);
      setSnippets((prev) => prev.filter((s) => s._id !== snippetId));
    } catch (error) {
      console.error('Error deleting snippet:', error);
      throw error;
    }
  };

  const restoreVersion = async (snippetId: string, versionId: string) => {
    try {
      const restoredSnippet = await snippetService.restoreSnippetVersion(snippetId, versionId);
      setSnippets((prev) =>
        prev.map((s) => (s._id === snippetId ? restoredSnippet : s))
      );
    } catch (error) {
      console.error('Error restoring snippet version:', error);
      throw error;
    }
  };

  const duplicateSnippet = async (snippetId: string): Promise<Snippet> => {
    try {
      const newSnippet = await snippetService.duplicateSnippet(snippetId);
      setSnippets((prev) => [newSnippet, ...prev]);
      return newSnippet;
    } catch (error) {
      console.error('Error duplicating snippet:', error);
      throw error;
    }
  };

  return (
    <SnippetContext.Provider
      value={{
        snippets,
        favoriteSnippetIds,
        activeFilter,
        setSearchQuery,
        setCategoryFilter,
        toggleFavorite,
        addSnippet,
        deleteSnippet,
        fetchSnippets,
        restoreVersion,
        duplicateSnippet
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};
