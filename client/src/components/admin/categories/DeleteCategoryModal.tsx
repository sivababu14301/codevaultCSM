import React from 'react';
import { Trash2 } from 'lucide-react';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { AdminCategory } from '../../../types/admin';

interface DeleteCategoryModalProps {
  category: AdminCategory | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (categoryId: string) => void;
}

export const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({ category, isOpen, onClose, onConfirm }) => {
  if (!category) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Category">
      <div className="flex flex-col items-center text-center py-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center mb-4 text-rose-500">
          <Trash2 className="w-8 h-8" />
        </div>
        
        {category.isDefault ? (
          <>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Cannot Delete Category
            </h3>
            
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
              <span className="font-semibold text-slate-700 dark:text-slate-300">"{category.name}"</span> is a default CodeVault category. It cannot be permanently deleted.
            </p>

            <div className="flex w-full gap-3">
              <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white border-transparent" onClick={onClose}>
                Close
              </Button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Delete Category?
            </h3>
            
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
              Are you completely sure you want to delete <span className="font-semibold text-slate-700 dark:text-slate-300">"{category.name}"</span>? 
              This action will permanently remove it from the platform. Snippets associated with this category will become uncategorized.
            </p>

            <div className="flex w-full gap-3">
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white border-transparent"
                onClick={() => {
                  onConfirm(category.id);
                  onClose();
                }}
              >
                Yes, Delete
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
