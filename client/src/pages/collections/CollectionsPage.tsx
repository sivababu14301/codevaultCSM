import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { CollectionStats } from '../../components/collections/CollectionStats';
import { CollectionGrid } from '../../components/collections/CollectionGrid';
import { EmptyCollection } from '../../components/collections/EmptyCollection';
import { CreateCollectionModal } from '../../components/collections/CreateCollectionModal';
import { RenameCollectionModal } from '../../components/collections/RenameCollectionModal';
import { DeleteCollectionModal } from '../../components/collections/DeleteCollectionModal';
import { Collection } from '../../types';
import { CollectionFormData } from '../../components/collections/CollectionForm';
import { useCollections } from '../../hooks/useCollections';

export const CollectionsPage: React.FC = () => {
  const { collections, addCollection, updateCollection, deleteCollection } = useCollections();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [renameModalData, setRenameModalData] = useState<Collection | null>(null);
  const [deleteModalData, setDeleteModalData] = useState<Collection | null>(null);

  // Derived stats
  const totalSnippets = collections.reduce((acc, col) => acc + (Array.isArray(col.snippets) ? col.snippets.length : 0), 0);
  
  // Filtered collections
  const filteredCollections = collections.filter(col => 
    col.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (col.description && col.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Handlers
  const handleCreate = async (data: CollectionFormData) => {
    addCollection({
      name: data.name,
      description: data.description,
      isPublic: data.isPublic,
    });
    setIsCreateModalOpen(false);
  };

  const handleRename = async (data: CollectionFormData) => {
    if (!renameModalData) return;
    updateCollection(renameModalData._id, {
      name: data.name,
      description: data.description,
      isPublic: data.isPublic,
    });
    setRenameModalData(null);
  };

  const handleDelete = async () => {
    if (!deleteModalData) return;
    deleteCollection(deleteModalData._id);
    setDeleteModalData(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Collections</h1>
          <p className="text-gray-500 mt-1">Organize your snippets into custom folders.</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-[#6D5DF6] hover:bg-[#5b4be2] text-white px-5 py-2.5 rounded-[12px] font-medium flex items-center gap-2 transition-colors shadow-sm shadow-[#6D5DF6]/20"
        >
          <Plus className="h-5 w-5" />
          Create Collection
        </button>
      </div>

      {/* Stats */}
      <CollectionStats totalCollections={collections.length} totalSnippets={totalSnippets} />

      {/* Controls */}
      <div className="mb-6 flex items-center bg-white rounded-xl border border-gray-200 px-4 py-2 w-full max-w-md shadow-sm focus-within:ring-2 focus-within:ring-[#6D5DF6]/20 focus-within:border-[#6D5DF6] transition-all">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search collections..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent border-none focus:outline-none focus:ring-0 px-3 text-sm"
        />
      </div>

      {/* Content */}
      {filteredCollections.length > 0 ? (
        <CollectionGrid 
          collections={filteredCollections} 
          onRename={setRenameModalData} 
          onDelete={setDeleteModalData} 
        />
      ) : (
        <EmptyCollection 
          title={searchQuery ? "No results found" : "No collections yet"}
          description={searchQuery ? "Try adjusting your search query." : "Create your first collection to start organizing your snippets."}
          action={!searchQuery && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="text-[#6D5DF6] font-medium hover:underline"
            >
              Create one now
            </button>
          )}
        />
      )}

      {/* Modals */}
      <CreateCollectionModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSubmit={handleCreate} 
      />
      <RenameCollectionModal 
        isOpen={!!renameModalData} 
        onClose={() => setRenameModalData(null)} 
        onSubmit={handleRename} 
        collection={renameModalData} 
      />
      <DeleteCollectionModal 
        isOpen={!!deleteModalData} 
        onClose={() => setDeleteModalData(null)} 
        onConfirm={handleDelete} 
        collection={deleteModalData} 
      />
    </div>
  );
};
