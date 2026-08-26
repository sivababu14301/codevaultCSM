import React from 'react';
import { Edit2, Trash2, Tag } from 'lucide-react';
import { AdminCategory } from '../../../types/admin';
import { StatusBadge } from './StatusBadge';
import { EmptyCategories } from './EmptyCategories';

interface CategoryTableProps {
  categories: AdminCategory[];
  onEdit: (category: AdminCategory) => void;
  onDelete: (category: AdminCategory) => void;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({ categories, onEdit, onDelete }) => {
  if (categories.length === 0) {
    return <EmptyCategories />;
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-slate-50 dark:bg-[#0B1120] border-y border-slate-100 dark:border-[#1F2937]">
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Description</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Snippets</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Created</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-[#1F2937]">
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-slate-50/50 dark:hover:bg-[#0B1120]/50 transition-colors group">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-500 flex items-center justify-center shrink-0">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{category.name}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400 max-w-[250px] truncate">
                {category.description || 'No description provided.'}
              </td>
              <td className="py-4 px-6 font-medium text-sm text-slate-700 dark:text-slate-300">
                {category.totalSnippets.toLocaleString()}
              </td>
              <td className="py-4 px-6">
                <StatusBadge status={category.status} />
              </td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">
                {formatDate(category.createdAt)}
              </td>
              <td className="py-4 px-6 text-right">
                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onEdit(category)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(category)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
