import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FileCode2, Globe, Lock, Trash2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { AdminSnippet } from '../../types/admin';
import { api } from '../../services/api';
import { useToast } from '../../components/ui/Toast';

import { SnippetCard } from '../../components/admin/snippets/SnippetCard';
import { SnippetSearch } from '../../components/admin/snippets/SnippetSearch';
import { SnippetFilter } from '../../components/admin/snippets/SnippetFilter';
import { SnippetTable } from '../../components/admin/snippets/SnippetTable';

import { SnippetDetailsModal } from '../../components/admin/snippets/SnippetDetailsModal';
import { ModerateSnippetModal } from '../../components/admin/snippets/ModerateSnippetModal';
import { DeleteSnippetModal } from '../../components/admin/snippets/DeleteSnippetModal';

export const SnippetManagement: React.FC = () => {
  const [snippets, setSnippets] = useState<AdminSnippet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const fetchSnippets = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/admin/snippets');
      setSnippets(res.data);
    } catch (error) {
      toast('Failed to fetch snippets', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSnippets();
  }, []);

  // Modals state
  const [selectedSnippet, setSelectedSnippet] = useState<AdminSnippet | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Check for auto-open review modal
  const [searchParams] = useSearchParams();
  const reviewId = searchParams.get('review');
  React.useEffect(() => {
    if (reviewId && snippets.length > 0) {
      const target = snippets.find(s => s.id === reviewId);
      if (target) {
        setSelectedSnippet(target);
        setIsViewModalOpen(true);
      }
    }
  }, [reviewId, snippets]);

  // Derived Stats
  const totalSnippets = snippets.length;
  const publicSnippets = snippets.filter(s => s.status === 'public' || s.status === 'approved').length;
  const privateSnippets = snippets.filter(s => s.status === 'private').length;
  const deletedToday = 0; // Dummy value

  // Filter and Search Logic
  const filteredSnippets = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();
    return snippets.filter(snippet => {
      const matchesSearch = 
        !search ||
        snippet.title.toLowerCase().includes(search) || 
        snippet.author.toLowerCase().includes(search) ||
        (snippet.authorEmail && snippet.authorEmail.toLowerCase().includes(search));
      
      const matchesLanguage = languageFilter === 'all' || snippet.language === languageFilter;
      const matchesVisibility = visibilityFilter === 'all' || snippet.status === visibilityFilter;
      const matchesCategory = categoryFilter === 'all' || snippet.category === categoryFilter;

      return matchesSearch && matchesLanguage && matchesVisibility && matchesCategory;
    });
  }, [snippets, searchTerm, languageFilter, visibilityFilter, categoryFilter]);

  const openViewModal = (snippet: AdminSnippet) => {
    setSelectedSnippet(snippet);
    setIsViewModalOpen(true);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLanguageFilter('all');
    setVisibilityFilter('all');
    setCategoryFilter('all');
  };

  return (
    <div className="max-w-7xl mx-auto w-full pb-12">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Snippet Management
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Monitor, filter, and moderate snippets across the platform.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SnippetCard title="Total Snippets" value={totalSnippets} icon={FileCode2} colorClass="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" />
        <SnippetCard title="Public Snippets" value={publicSnippets} icon={Globe} colorClass="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" />
        <SnippetCard title="Private Snippets" value={privateSnippets} icon={Lock} colorClass="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400" />
        <SnippetCard title="Deleted Today" value={deletedToday} icon={Trash2} colorClass="bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400" />
      </div>

      <Card className="flex flex-col border border-slate-100 dark:border-[#1F2937]">
        {/* Header / Controls */}
        <div className="p-6 border-b border-slate-100 dark:border-[#1F2937] flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white dark:bg-[#111827] rounded-t-2xl z-10 sticky top-0">
          <SnippetSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <SnippetFilter 
            languageFilter={languageFilter}
            visibilityFilter={visibilityFilter}
            categoryFilter={categoryFilter}
            onLanguageChange={setLanguageFilter}
            onVisibilityChange={setVisibilityFilter}
            onCategoryChange={setCategoryFilter}
          />
        </div>

        {/* Data Table */}
        {filteredSnippets.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-[#0B1120] border border-slate-100 dark:border-[#1F2937] flex items-center justify-center mb-4">
              <FileCode2 className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              No snippets found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
              {searchTerm || languageFilter !== 'all' || visibilityFilter !== 'all' || categoryFilter !== 'all'
                ? 'Try adjusting your search or filters to find what you are looking for.'
                : 'There are currently no snippets.'}
            </p>
            {(searchTerm || languageFilter !== 'all' || visibilityFilter !== 'all' || categoryFilter !== 'all') && (
              <button 
                onClick={clearFilters}
                className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <SnippetTable 
            snippets={filteredSnippets} 
            onView={openViewModal} 
          />
        )}
        
        {/* Pagination placeholder (dummy) */}
        {filteredSnippets.length > 0 && (
          <div className="p-4 border-t border-slate-100 dark:border-[#1F2937] flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>Showing 1 to {filteredSnippets.length} of {filteredSnippets.length} entries</span>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1F2937] disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 bg-purple-600 text-white rounded-lg">1</button>
              <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1F2937] disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        )}
      </Card>

      {/* Modals */}
      <SnippetDetailsModal 
        snippet={selectedSnippet} 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
      />
    </div>
  );
};
