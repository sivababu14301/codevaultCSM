import { api } from './api';
import { Collection } from '../types';

export const collectionService = {
  getCollections: async () => {
    const response = await api.get('/collections');
    return response.data;
  },
  createCollection: async (data: Omit<Collection, '_id' | 'createdAt' | 'updatedAt' | 'snippets' | 'user'>) => {
    const response = await api.post('/collections', data);
    return response.data;
  },
  updateCollection: async (id: string, data: Partial<Collection>) => {
    const response = await api.put(`/collections/${id}`, data);
    return response.data;
  },
  deleteCollection: async (id: string) => {
    const response = await api.delete(`/collections/${id}`);
    return response.data;
  },
  addSnippetToCollection: async (collectionId: string, snippetId: string) => {
    const response = await api.post(`/collections/${collectionId}/snippets/${snippetId}`);
    return response.data;
  },
  removeSnippetFromCollection: async (collectionId: string, snippetId: string) => {
    const response = await api.delete(`/collections/${collectionId}/snippets/${snippetId}`);
    return response.data;
  }
};
