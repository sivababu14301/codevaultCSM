import { api } from './api';
import { Favorite } from '../types';

export const favoriteService = {
  // Get current user's favorites
  getFavorites: async (): Promise<Favorite[]> => {
    const response = await api.get('/favorites');
    return response.data;
  },

  // Add a snippet to favorites
  addFavorite: async (snippetId: string): Promise<Favorite> => {
    const response = await api.post(`/favorites/${snippetId}`);
    return response.data;
  },

  // Remove a snippet from favorites
  removeFavorite: async (snippetId: string): Promise<{ message: string; snippetId: string }> => {
    const response = await api.delete(`/favorites/${snippetId}`);
    return response.data;
  }
};
