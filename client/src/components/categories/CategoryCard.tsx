import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Folder } from 'lucide-react';

export interface CategoryType {
  id: string;
  name: string;
  description?: string;
  snippetCount: number;
  color?: string;
}

interface CategoryCardProps {
  category: CategoryType;
  onEdit: (category: CategoryType) => void;
  onDelete: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onEdit, onDelete }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all relative group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm"
            style={{ backgroundColor: category.color || '#6D5DF6' }}
          >
            <Folder className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
            <p className="text-sm text-gray-500">{category.snippetCount} Snippets</p>
          </div>
        </div>
        
        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-2">
          <button
            onClick={() => onEdit(category)}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none"
            aria-label="Edit category"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(category.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors focus:outline-none"
            aria-label="Delete category"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {category.description && (
        <p className="text-sm text-gray-600 line-clamp-2 mt-2">
          {category.description}
        </p>
      )}
    </motion.div>
  );
};

export default CategoryCard;
