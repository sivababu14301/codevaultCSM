import { api } from './api';
import { Snippet, SearchFilters } from '../types';

export const snippetService = {
  getAllSnippets: async (filters?: SearchFilters) => {
    // If 'query' is used in frontend but we need 'search' on backend, we can map it or just use 'search'
    const params = { ...filters };
    if (params.query) {
      params.search = params.query;
      delete params.query;
    }
    const response = await api.get('/snippets', { params });
    return response.data;
  },

  getSnippetById: async (id: string) => {
    const response = await api.get(`/snippets/${id}`);
    return response.data;
  },

  getSharedSnippet: async (id: string) => {
    const response = await api.get(`/snippets/shared/${id}`);
    return response.data;
  },

  createSnippet: async (snippetData: Partial<Snippet>) => {
    const response = await api.post('/snippets', snippetData);
    return response.data;
  },

  updateSnippet: async (id: string, snippetData: Partial<Snippet>) => {
    const response = await api.put(`/snippets/${id}`, snippetData);
    return response.data;
  },

  deleteSnippet: async (id: string) => {
    const response = await api.delete(`/snippets/${id}`);
    return response.data;
  },


  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  getCollections: async () => {
    const response = await api.get('/collections');
    return response.data;
  },

  getSnippetVersions: async (snippetId: string) => {
    const response = await api.get(`/snippets/${snippetId}/versions`);
    return response.data;
  },

  restoreSnippetVersion: async (id: string, versionId: string): Promise<Snippet> => {
    const response = await api.post(`/snippets/${id}/versions/${versionId}/restore`);
    return response.data;
  },

  duplicateSnippet: async (id: string): Promise<Snippet> => {
    const response = await api.post(`/snippets/${id}/duplicate`);
    return response.data;
  },

  getCommunitySnippets: async (filters?: { language?: string, category?: string, search?: string, sort?: string }) => {
    const response = await api.get('/community/snippets', { params: filters });
    return response.data;
  },

  incrementView: async (id: string) => {
    const response = await api.post(`/community/snippets/${id}/view`);
    return response.data;
  },

  incrementShare: async (id: string) => {
    const response = await api.post(`/community/snippets/${id}/share`);
    return response.data;
  },

  reportSnippet: async (id: string, reason: string) => {
    const response = await api.post(`/community/snippets/${id}/report`, { reason });
    return response.data;
  }
};
