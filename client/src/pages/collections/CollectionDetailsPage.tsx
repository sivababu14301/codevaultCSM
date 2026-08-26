import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Hash, Calendar } from 'lucide-react';
import { SnippetCard } from '../../components/snippets/SnippetCard';
import { MoveSnippetModal } from '../../components/collections/MoveSnippetModal';
import { EmptyCollection } from '../../components/collections/EmptyCollection';
import { Snippet } from '../../types';
import { useCollections } from '../../hooks/useCollections';

export const CollectionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { collections, addSnippetToCollection, removeSnippetFromCollection } = useCollections();
  
  // Find collection
  const collection = collections.find(c => c._id === id);
  
  // State
  const [snippetToMove, setSnippetToMove] = useState<Snippet | null>(null);

  if (!collection) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Collection not found</h2>
        <Link to="/collections" className="text-[#6D5DF6] hover:underline">
          &larr; Back to Collections
        </Link>
      </div>
    );
  }

  const snippets = Array.isArray(collection.snippets) ? collection.snippets as Snippet[] : [];
  
  const formattedDate = new Date(collection.updatedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const handleMoveSnippet = async (targetCollectionId: string) => {
    if (snippetToMove && collection) {
      addSnippetToCollection(targetCollectionId, snippetToMove);
      removeSnippetFromCollection(collection._id, snippetToMove._id);
    }
    setSnippetToMove(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link */}
      <Link 
        to="/collections" 
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Collections
      </Link>

      {/* Header */}
      <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{collection.name}</h1>
              {collection.isPublic && (
                <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  Public
                </span>
              )}
            </div>
            <p className="text-gray-500 text-lg max-w-2xl">
              {collection.description || 'No description provided.'}
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2.5 text-gray-400 hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 rounded-xl transition-colors">
              <Edit2 className="h-5 w-5" />
            </button>
            <button className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-gray-100 text-sm font-medium text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#6D5DF6]/10 flex items-center justify-center">
              <Hash className="h-4 w-4 text-[#6D5DF6]" />
            </div>
            <span>{snippets.length} Snippets</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#3B82F6]/10 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-[#3B82F6]" />
            </div>
            <span>Updated {formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Snippets Grid */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Snippets</h2>
        {snippets.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {snippets.map((snippet) => (
              <div key={snippet._id} className="relative group">
                <SnippetCard snippet={snippet} />
                {/* Overlay actions on hover for moving */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setSnippetToMove(snippet);
                    }}
                    className="bg-white/90 backdrop-blur border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm hover:bg-gray-50 flex items-center gap-1"
                  >
                    Move
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyCollection 
            title="No snippets in this collection"
            description="Add snippets to this collection to see them here."
          />
        )}
      </div>

      {/* Move Modal */}
      <MoveSnippetModal
        isOpen={!!snippetToMove}
        onClose={() => setSnippetToMove(null)}
        onMove={handleMoveSnippet}
        snippet={snippetToMove}
        collections={collections}
        currentCollectionId={collection._id}
      />
    </div>
  );
};
