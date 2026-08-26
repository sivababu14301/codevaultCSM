import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import { useSnippets } from '../../hooks/useSnippets';
import { CopyCard } from '../../components/copy/CopyCard';
import { EmptyCopyState } from '../../components/copy/EmptyCopyState';
import { CopyToast } from '../../components/copy/CopyToast';

export const CopyCodePage: React.FC = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const { snippets } = useSnippets();
  
  // Use real snippets for the copy dashboard
  const copyableSnippets = snippets;

  const handleGlobalCopySuccess = () => {
    setToastVisible(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          Copy Snippets
          <Copy className="h-6 w-6 text-[#3B82F6]" />
        </h1>
        <p className="text-gray-500 mt-1">
          Quickly access and copy your most frequently used code snippets.
        </p>
      </div>

      {/* Grid or Empty State */}
      {copyableSnippets.length === 0 ? (
        <EmptyCopyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {copyableSnippets.map((snippet) => (
            <CopyCard 
              key={snippet._id} 
              snippet={snippet} 
              onCopySuccess={handleGlobalCopySuccess}
            />
          ))}
        </div>
      )}

      {/* Global Success Toast */}
      <CopyToast 
        isVisible={toastVisible} 
        onClose={() => setToastVisible(false)} 
        message="Code snippet copied to clipboard!"
      />
    </div>
  );
};
