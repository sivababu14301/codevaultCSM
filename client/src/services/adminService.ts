import { api } from './api';

export const adminService = {
  // Users
  getUsers: async () => {
    const res = await api.get('/admin/users');
    return res.data;
  },
  blockUser: async (id: string) => {
    const res = await api.put(`/admin/users/${id}/block`);
    return res.data;
  },
  deleteUser: async (id: string) => {
    const res = await api.delete(`/admin/users/${id}`);
    return res.data;
  },

  // Snippets
  getSnippets: async () => {
    const res = await api.get('/admin/snippets');
    return res.data;
  },
  moderateSnippet: async (id: string, status: string) => {
    const res = await api.put(`/admin/snippets/${id}/status`, { status });
    return res.data;
  },
  deleteSnippet: async (id: string) => {
    const res = await api.delete(`/admin/snippets/${id}`);
    return res.data;
  },

  // Categories
  getCategories: async () => {
    const res = await api.get('/admin/categories');
    return res.data;
  },
  createCategory: async (categoryData: any) => {
    const res = await api.post('/admin/categories', categoryData);
    return res.data;
  },
  updateCategory: async (id: string, categoryData: any) => {
    const res = await api.put(`/admin/categories/${id}`, categoryData);
    return res.data;
  },
  deleteCategory: async (id: string) => {
    const res = await api.delete(`/admin/categories/${id}`);
    return res.data;
  },

  // Analytics
  getAnalytics: async () => {
    const res = await api.get('/admin/analytics');
    return res.data;
  },

  // Settings
  getSettings: async () => {
    const res = await api.get('/admin/settings');
    return res.data;
  },
  updateSettings: async (settings: any) => {
    const res = await api.put('/admin/settings', settings);
    return res.data;
  }
};
