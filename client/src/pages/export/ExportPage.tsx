import React, { useState } from 'react';
import { DownloadCloud } from 'lucide-react';
import { useSnippets } from '../../hooks/useSnippets';
import { Snippet } from '../../types';
import { ExportCard } from '../../components/export/ExportCard';
import { EmptyExportState } from '../../components/export/EmptyExportState';
import { ExportDialog } from '../../components/export/ExportDialog';
import { SearchWithButton } from '../../components/ui/SearchWithButton';

export const ExportPage: React.FC = () => {
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const { snippets } = useSnippets();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use real snippets for the export dashboard
  const exportableSnippets = snippets;

  const filteredExportableSnippets = exportableSnippets.filter(s => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      s.title.toLowerCase().includes(term) ||
      s.language.toLowerCase().includes(term) ||
      s.description.toLowerCase().includes(term) ||
      s.tags.some(tag => tag.toLowerCase().includes(term))
    );
  });

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

      {exportableSnippets.length > 0 && (
        <SearchWithButton 
          placeholder="Search snippets..." 
          onSearch={setSearchTerm} 
          onClear={() => setSearchTerm('')} 
        />
      )}

      {/* Grid or Empty State */}
      {filteredExportableSnippets.length === 0 ? (
        searchTerm ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">No snippets found.</h3>
          </div>
        ) : (
          <EmptyExportState />
        )
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExportableSnippets.map((snippet) => (
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
