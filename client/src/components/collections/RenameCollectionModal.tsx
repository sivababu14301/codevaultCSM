import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CollectionForm, CollectionFormData } from './CollectionForm';
import { Collection } from '../../types';

interface RenameCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CollectionFormData) => Promise<void>;
  collection: Collection | null;
  isLoading?: boolean;
}

export const RenameCollectionModal: React.FC<RenameCollectionModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  collection, 
  isLoading 
}) => {
  return (
    <AnimatePresence>
      {isOpen && collection && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-white rounded-[24px] shadow-2xl overflow-hidden pointer-events-auto"
            >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Rename Collection</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-xl transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 bg-gray-50/50">
              <CollectionForm 
                initialData={{
                  name: collection.name,
                  description: collection.description,
                  isPublic: collection.isPublic,
                }}
                onSubmit={onSubmit} 
                isLoading={isLoading} 
                submitLabel="Save Changes" 
              />
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
