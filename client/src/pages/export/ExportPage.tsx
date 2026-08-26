import React, { useState } from 'react';
import { DownloadCloud } from 'lucide-react';
import { useSnippets } from '../../hooks/useSnippets';
import { Snippet } from '../../types';
import { ExportCard } from '../../components/export/ExportCard';
import { EmptyExportState } from '../../components/export/EmptyExportState';
import { ExportDialog } from '../../components/export/ExportDialog';

export const ExportPage: React.FC = () => {
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const { snippets } = useSnippets();
  
  // Use real snippets for the export dashboard
  const exportableSnippets = snippets;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          Export Snippets
          <DownloadCloud className="h-6 w-6 text-[#6D5DF6]" />
        </h1>
        <p className="text-gray-500 mt-1">
          Download your code snippets in various formats for backup or sharing offline.
        </p>
      </div>

      {/* Grid or Empty State */}
      {exportableSnippets.length === 0 ? (
        <EmptyExportState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {exportableSnippets.map((snippet) => (
            <ExportCard 
              key={snippet._id} 
              snippet={snippet} 
              onExportClick={(s) => setSelectedSnippet(s)}
            />
          ))}
        </div>
      )}

      {/* Export Dialog */}
      <ExportDialog 
        isOpen={selectedSnippet !== null}
        onClose={() => setSelectedSnippet(null)}
        snippet={selectedSnippet}
      />
    </div>
  );
};
