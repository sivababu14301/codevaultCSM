import React, { useState } from 'react';
import { X, Folder, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Collection, Snippet } from '../../types';

interface MoveSnippetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMove: (collectionId: string) => Promise<void>;
  snippet: Snippet | null;
  collections: Collection[];
  currentCollectionId?: string;
  isLoading?: boolean;
}

export const MoveSnippetModal: React.FC<MoveSnippetModalProps> = ({ 
  isOpen, 
  onClose, 
  onMove, 
  snippet, 
  collections,
  currentCollectionId,
  isLoading 
}) => {
  const [selectedId, setSelectedId] = useState<string>('');

  const handleMove = async () => {
    if (!selectedId) return;
    await onMove(selectedId);
    setSelectedId('');
  };

  const availableCollections = collections.filter(c => c._id !== currentCollectionId);

  return (
    <AnimatePresence>
      {isOpen && snippet && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-[24px] shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Move Snippet</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-xl transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Snippet to move:</p>
                <p className="font-semibold text-gray-900 truncate">{snippet.title}</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select destination collection
                </label>
                {availableCollections.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No other collections available.</p>
                ) : (
                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                    {availableCollections.map((col) => (
                      <button
                        key={col._id}
                        onClick={() => setSelectedId(col._id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                          selectedId === col._id 
                            ? 'border-[#6D5DF6] bg-[#6D5DF6]/5' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Folder className={`h-5 w-5 ${selectedId === col._id ? 'text-[#6D5DF6]' : 'text-gray-400'}`} />
                          <span className={`font-medium ${selectedId === col._id ? 'text-[#6D5DF6]' : 'text-gray-700'}`}>
                            {col.name}
                          </span>
                        </div>
                        {selectedId === col._id && (
                          <ArrowRight className="h-5 w-5 text-[#6D5DF6]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleMove}
                  disabled={!selectedId || isLoading}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-[#6D5DF6] hover:bg-[#5b4be2] rounded-lg transition-colors flex items-center disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Moving...
                    </>
                  ) : (
                    'Move Snippet'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
