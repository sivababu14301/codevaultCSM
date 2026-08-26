import React, { useState, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import CategoryList from '../../components/categories/CategoryList';
import CategoryModal from '../../components/categories/CategoryModal';
import CategoryForm from '../../components/categories/CategoryForm';
import DeleteCategoryModal from '../../components/categories/DeleteCategoryModal';
import { CategoryType } from '../../components/categories/CategoryCard';

const INITIAL_CATEGORIES: CategoryType[] = [
  { id: '1', name: 'JavaScript', description: 'Vanilla JS snippets, utility functions, and DOM manipulation.', snippetCount: 15, color: '#F59E0B' },
  { id: '2', name: 'React', description: 'React hooks, components, and context setups.', snippetCount: 12, color: '#3B82F6' },
  { id: '3', name: 'Node.js', description: 'Express servers, file system operations, and API templates.', snippetCount: 8, color: '#10B981' },
  { id: '4', name: 'Python', description: 'Python scripts, data processing, and automation.', snippetCount: 20, color: '#6D5DF6' },
  { id: '5', name: 'Java', description: 'Spring Boot, algorithms, and class templates.', snippetCount: 5, color: '#EF4444' },
  { id: '6', name: 'SQL', description: 'Complex queries, table creation, and triggers.', snippetCount: 7, color: '#8B5CF6' },
  { id: '7', name: 'HTML/CSS', description: 'Layouts, animations, and responsive designs.', snippetCount: 10, color: '#EC4899' },
  { id: '8', name: 'C++', description: 'Standard template library, memory management.', snippetCount: 4, color: '#6366F1' },
  { id: '9', name: 'TypeScript', description: 'Type definitions, generic interfaces, and config files.', snippetCount: 18, color: '#3B82F6' },
];

const CategoryPage = () => {
  const [categories, setCategories] = useState<CategoryType[]>(INITIAL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryType | undefined>();
  const [deletingCategory, setDeletingCategory] = useState<CategoryType | undefined>();

  const filteredCategories = useMemo(() => {
    return categories.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  const handleOpenCreate = () => {
    setEditingCategory(undefined);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (category: CategoryType) => {
    setEditingCategory(category);
    setIsFormModalOpen(true);
  };

  const handleOpenDelete = (id: string) => {
    const cat = categories.find(c => c.id === id);
    if (cat) {
      setDeletingCategory(cat);
      setIsDeleteModalOpen(true);
    }
  };

  const handleFormSubmit = (data: Partial<CategoryType>) => {
    if (editingCategory) {
      // Edit
      setCategories(prev => prev.map(c => c.id === editingCategory.id ? { ...c, ...data } as CategoryType : c));
    } else {
      // Create
      setCategories(prev => [...prev, data as CategoryType]);
    }
    setIsFormModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deletingCategory) {
      setCategories(prev => prev.filter(c => c.id !== deletingCategory.id));
      setIsDeleteModalOpen(false);
      setDeletingCategory(undefined);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-7xl mx-auto min-h-screen"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 mt-1">Manage and organize your code snippets.</p>
        </div>
        
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl hover:bg-purple-700 transition-colors shadow-sm font-medium"
        >
          <Plus className="w-5 h-5" />
          Create Category
        </button>
      </div>

      <div className="mb-8 relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
        />
      </div>

      <CategoryList
        categories={filteredCategories}
        onEditCategory={handleOpenEdit}
        onDeleteCategory={handleOpenDelete}
      />

      <CategoryModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingCategory ? "Edit Category" : "Create New Category"}
      >
        <CategoryForm
          initialData={editingCategory}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormModalOpen(false)}
        />
      </CategoryModal>

      <DeleteCategoryModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        categoryName={deletingCategory?.name || ''}
      />
    </motion.div>
  );
};

export default CategoryPage;
