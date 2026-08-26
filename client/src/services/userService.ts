import { api } from './api';
import { PublicProfile, Snippet } from '../types';

export const userService = {
  getAuthorProfile: async (id: string): Promise<PublicProfile> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  
  getAuthorSnippets: async (id: string): Promise<Snippet[]> => {
    const response = await api.get(`/users/${id}/snippets`);
    return response.data;
  },

  togglePinSnippet: async (id: string): Promise<{ pinnedSnippets: string[] }> => {
    const response = await api.post(`/users/pin/${id}`);
    return response.data;
  }
};
