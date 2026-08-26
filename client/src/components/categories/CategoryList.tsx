import React from 'react';
import CategoryCard, { CategoryType } from './CategoryCard';
import { motion, AnimatePresence } from 'framer-motion';

interface CategoryListProps {
  categories: CategoryType[];
  onEditCategory: (category: CategoryType) => void;
  onDeleteCategory: (id: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onEditCategory, onDeleteCategory }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence>
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <CategoryCard
              category={category}
              onEdit={onEditCategory}
              onDelete={onDeleteCategory}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      {categories.length === 0 && (
        <div className="col-span-full text-center py-12 bg-white rounded-[20px] shadow-sm border border-gray-100">
          <p className="text-gray-500">No categories found.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
