import React from 'react';
import CategoryModal from './CategoryModal';
import { AlertTriangle } from 'lucide-react';

interface DeleteCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  categoryName: string;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  categoryName,
}) => {
  return (
    <CategoryModal isOpen={isOpen} onClose={onClose} title="Delete Category">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-8 h-8" />
        </div>
        
        <h3 className="text-lg font-medium text-gray-900">
          Delete "{categoryName}"?
        </h3>
        
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this category? All snippets currently assigned to this category will be uncategorized. This action cannot be undone.
        </p>

        <div className="flex w-full gap-3 pt-4 mt-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </CategoryModal>
  );
};

export default DeleteCategoryModal;
