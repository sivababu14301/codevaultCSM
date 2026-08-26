import React, { useState, useEffect } from 'react';
import { Share2, Plus } from 'lucide-react';
import { useSnippets } from '../../hooks/useSnippets';
import { SharedSnippetInfo, ShareCard } from '../../components/share/ShareCard';
import { EmptyShareState } from '../../components/share/EmptyShareState';
import { ShareDialog } from '../../components/share/ShareDialog';

export const SharePage: React.FC = () => {
  const { snippets } = useSnippets();
  const [sharedSnippets, setSharedSnippets] = useState<SharedSnippetInfo[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Treat all snippets as shared for this view as requested
    const allSnippets: SharedSnippetInfo[] = snippets
      .map(s => ({
        snippet: s,
        link: `${window.location.origin}/s/${s._id}`,
        isActive: true,
        visibility: s.isPublic ? 'public' : 'private'
      }));
    setSharedSnippets(allSnippets);
  }, [snippets]);

  // Handle Revoke Link (Mock)
  const handleRevoke = (snippetId: string) => {
    setSharedSnippets(prev => 
      prev.map(s => 
        s.snippet._id === snippetId 
          ? { ...s, isActive: false } 
          : s
      )
    );
  };

  // Mock function to open the link (just opens in a new tab)
  const handleOpenLink = (link: string) => {
    window.open(link, '_blank');
  };

  // Handle Generating a New Link (Mock)
  const handleGenerateLink = (visibility: 'public' | 'private') => {
    // If there are no snippets, we can't mock sharing
    if (snippets.length === 0) return;
    
    // Grab a random snippet to share mock
    const newSnippetToShare = snippets[0]; 
    
    // Check if it's already shared in our mock state
    if (sharedSnippets.some(s => s.snippet._id === newSnippetToShare._id)) {
      alert("This snippet is already shared.");
      return;
    }

    const newShared: SharedSnippetInfo = {
      snippet: newSnippetToShare,
      link: `${window.location.origin}/s/${newSnippetToShare._id}-${visibility.substring(0,3)}`,
      isActive: true,
      visibility
    };

    setSharedSnippets([newShared, ...sharedSnippets]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            Shared Links
            <Share2 className="h-6 w-6 text-[#3B82F6]" />
          </h1>
          <p className="text-gray-500 mt-1">Manage public and private links for your snippets.</p>
        </div>
        
        {sharedSnippets.length > 0 && (
          <button
            onClick={() => setIsDialogOpen(true)}
            className="bg-[#6D5DF6] hover:bg-[#5b4be2] text-white px-5 py-2.5 rounded-[12px] font-medium flex items-center gap-2 transition-colors shadow-sm shadow-[#6D5DF6]/20"
          >
            <Plus className="h-5 w-5" />
            Share New Snippet
          </button>
        )}
      </div>

      {/* Grid or Empty State */}
      {sharedSnippets.length === 0 ? (
        <EmptyShareState onShareClick={() => setIsDialogOpen(true)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sharedSnippets.map((shared) => (
            <ShareCard 
              key={shared.snippet._id} 
              sharedSnippet={shared} 
              onRevoke={handleRevoke}
              onOpenLink={handleOpenLink}
            />
          ))}
        </div>
      )}

      {/* Share Dialog */}
      <ShareDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        snippet={snippets[0]} // Mocking the snippet to share
        onGenerateLink={handleGenerateLink}
      />
    </div>
  );
};
