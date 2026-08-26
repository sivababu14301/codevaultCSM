import React, { useState } from 'react';
import { X, Folder, Plus, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCollections } from '../../hooks/useCollections';
import { Snippet } from '../../types';
import { useToast } from '../ui/Toast';

interface AddToCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  snippet: Snippet | null;
}

export const AddToCollectionModal: React.FC<AddToCollectionModalProps> = ({ 
  isOpen, 
  onClose, 
  snippet 
}) => {
  const { collections, addSnippetToCollection, addCollection } = useCollections();
  const { showToast } = useToast();
  const [selectedId, setSelectedId] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const handleAdd = () => {
    if (!selectedId || !snippet) return;
    
    const targetCollection = collections.find(c => c._id === selectedId);
    if (!targetCollection) return;

    // Find if the snippet is already in any collection
    const currentCollection = collections.find(c => {
      const snips = Array.isArray(c.snippets) ? c.snippets : [];
      return snips.some(s => typeof s === 'object' && s._id === snippet._id);
    });

    if (currentCollection && currentCollection._id === selectedId) {
      // It's in this collection already -> Remove it
      removeSnippetFromCollection(selectedId, snippet._id);
      showToast('Snippet removed from collection.', 'info');
    } else {
      // Add to new collection (and remove from old if it existed)
      if (currentCollection) {
        removeSnippetFromCollection(currentCollection._id, snippet._id);
      }
      addSnippetToCollection(selectedId, snippet);
      showToast('Snippet saved to collection successfully.', 'success');
    }
    
    setSelectedId('');
    onClose();
  };

  const handleCreateAndAdd = () => {
    if (!newCollectionName.trim() || !snippet) return;
    
    const newId = `col_${Date.now()}`;
    addCollection({
      name: newCollectionName.trim(),
      description: '',
      isPublic: false
    });
    
    // Add to the newly created collection
    setTimeout(() => {
      // Remove from old if it existed
      const currentCollection = collections.find(c => {
        const snips = Array.isArray(c.snippets) ? c.snippets : [];
        return snips.some(s => typeof s === 'object' && s._id === snippet._id);
      });
      if (currentCollection) {
        removeSnippetFromCollection(currentCollection._id, snippet._id);
      }
      
      addSnippetToCollection(newId, snippet);
      showToast('Snippet added to new collection successfully.', 'success');
      setNewCollectionName('');
      setIsCreating(false);
      onClose();
    }, 100); // small delay to allow context to update
  };

  return (
    <AnimatePresence>
      {isOpen && snippet && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-white rounded-[24px] shadow-2xl overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Add to Collection</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-xl transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Snippet to save:</p>
                <p className="font-semibold text-gray-900 truncate">{snippet.title}</p>
              </div>

              {!isCreating ? (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Select collection
                    </label>
                    <button 
                      onClick={() => setIsCreating(true)}
                      className="text-xs font-semibold text-[#6D5DF6] flex items-center gap-1 hover:underline"
                    >
                      <Plus className="w-3 h-3" /> New
                    </button>
                  </div>
                  
                  {collections.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No collections available. Create one!</p>
                  ) : (
                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                      {collections.map((col) => {
                        const isCurrentCollection = (() => {
                          const snips = Array.isArray(col.snippets) ? col.snippets : [];
                          return snips.some(s => typeof s === 'object' && s._id === snippet._id);
                        })();

                        return (
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
                                {col.name} {isCurrentCollection && <span className="text-xs text-gray-400 font-normal ml-1">(Current)</span>}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    New Collection Name
                  </label>
                  <input
                    type="text"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    placeholder="e.g. React Projects"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D5DF6] focus:border-transparent outline-none"
                    autoFocus
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (isCreating) {
                      setIsCreating(false);
                      setNewCollectionName('');
                    } else {
                      onClose();
                    }
                  }}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {isCreating ? 'Back' : 'Cancel'}
                </button>
                {isCreating ? (
                  <button
                    type="button"
                    onClick={handleCreateAndAdd}
                    disabled={!newCollectionName.trim()}
                    className="px-5 py-2.5 text-sm font-medium text-white bg-[#6D5DF6] hover:bg-[#5b4be2] rounded-lg transition-colors disabled:opacity-70"
                  >
                    Create & Add
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleAdd}
                    disabled={!selectedId}
                    className="px-5 py-2.5 text-sm font-medium text-white bg-[#6D5DF6] hover:bg-[#5b4be2] rounded-lg transition-colors disabled:opacity-70"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
