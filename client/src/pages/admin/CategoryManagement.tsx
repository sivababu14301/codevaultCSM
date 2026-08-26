import React, { useState, useMemo } from 'react';
import { FolderKanban, CheckCircle2, XCircle, Code2, Plus } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AdminCategory } from '../../types/admin';
import { api } from '../../services/api';
import { useToast } from '../../components/ui/Toast';

import { CategoryCard } from '../../components/admin/categories/CategoryCard';
import { CategorySearch } from '../../components/admin/categories/CategorySearch';
import { CategoryTable } from '../../components/admin/categories/CategoryTable';

import { AddCategoryModal } from '../../components/admin/categories/AddCategoryModal';
import { EditCategoryModal } from '../../components/admin/categories/EditCategoryModal';
import { DeleteCategoryModal } from '../../components/admin/categories/DeleteCategoryModal';

export const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/admin/categories');
      setCategories(res.data);
    } catch (error) {
      toast('Failed to fetch categories', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  // Modals state
  const [selectedCategory, setSelectedCategory] = useState<AdminCategory | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Derived Stats
  const totalCategories = categories.length;
  const activeCategories = categories.filter(c => c.status === 'active').length;
  const inactiveCategories = categories.filter(c => c.status === 'inactive').length;
  const totalSnippets = categories.reduce((sum, c) => sum + c.totalSnippets, 0);

  // Filter Logic
  const filteredCategories = useMemo(() => {
    return categories.filter(category => {
      const searchLower = searchTerm.toLowerCase();
      return (
        category.name.toLowerCase().includes(searchLower) || 
        category.description.toLowerCase().includes(searchLower)
      );
    });
  }, [categories, searchTerm]);

  // Actions
  const handleAdd = async (newCategoryData: Omit<AdminCategory, 'id' | 'totalSnippets' | 'createdAt'>) => {
    try {
      const res = await api.post('/admin/categories', newCategoryData);
      const newCategory: AdminCategory = {
        ...res.data,
        id: res.data._id,
        totalSnippets: 0
      };
      setCategories(prev => [newCategory, ...prev]);
      toast('Category added successfully', 'success');
      setIsAddModalOpen(false);
    } catch (error: any) {
      console.error('Error adding category:', error.response?.data || error);
      const msg = error.response?.data?.message || 'Failed to add category';
      toast(msg, 'error');
    }
  };

  const handleEdit = async (id: string, updates: Partial<AdminCategory>) => {
    try {
      await api.put(`/admin/categories/${id}`, updates);
      setCategories(prev => prev.map(c => {
        if (c.id === id) {
          return { ...c, ...updates };
        }
        return c;
      }));
      toast('Category updated successfully', 'success');
      setIsEditModalOpen(false);
    } catch (error: any) {
      console.error('Error updating category:', error.response?.data || error);
      const msg = error.response?.data?.message || 'Failed to update category';
      toast(msg, 'error');
    }
  };

  const handleDelete = async (categoryId: string) => {
    try {
      await api.delete(`/admin/categories/${categoryId}`);
      setCategories(prev => prev.filter(c => c.id !== categoryId));
      toast('Category deleted successfully', 'success');
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast('Failed to delete category', 'error');
    }
  };

  const openEditModal = (category: AdminCategory) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (category: AdminCategory) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto w-full pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Category Management
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage programming languages and frameworks used across the platform.
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="w-full md:w-auto shrink-0">
          <Plus className="w-5 h-5 mr-2" /> Add Category
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <CategoryCard title="Total Categories" value={totalCategories} icon={FolderKanban} colorClass="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" />
        <CategoryCard title="Active Categories" value={activeCategories} icon={CheckCircle2} colorClass="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" />
        <CategoryCard title="Inactive Categories" value={inactiveCategories} icon={XCircle} colorClass="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400" />
        <CategoryCard title="Total Snippets" value={totalSnippets.toLocaleString()} icon={Code2} colorClass="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" />
      </div>

      <Card className="flex flex-col border border-slate-100 dark:border-[#1F2937]">
        {/* Header / Controls */}
        <div className="p-6 border-b border-slate-100 dark:border-[#1F2937] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#111827] rounded-t-2xl z-10 sticky top-0">
          <CategorySearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        {/* Data Table */}
        <CategoryTable 
          categories={filteredCategories} 
          onEdit={openEditModal} 
          onDelete={openDeleteModal} 
        />
        
        {/* Pagination placeholder (dummy) */}
        {filteredCategories.length > 0 && (
          <div className="p-4 border-t border-slate-100 dark:border-[#1F2937] flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>Showing 1 to {filteredCategories.length} of {filteredCategories.length} entries</span>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1F2937] disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 bg-purple-600 text-white rounded-lg">1</button>
              <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1F2937] disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        )}
      </Card>

      {/* Modals */}
      <AddCategoryModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAdd} 
      />
      <EditCategoryModal 
        category={selectedCategory} 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        onEdit={handleEdit} 
      />
      <DeleteCategoryModal 
        category={selectedCategory} 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={handleDelete} 
      />
    </div>
  );
};
