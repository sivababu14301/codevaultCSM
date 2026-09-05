import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Plus } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { SnippetCard } from '../../components/snippets/SnippetCard';
import { SearchBar } from '../../components/snippets/SearchBar';
import { FilterPanel } from '../../components/snippets/FilterPanel';
import { useSnippets } from '../../hooks/useSnippets';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

export const AllSnippetsPage: React.FC = () => {
  const { snippets, toggleFavorite, fetchSnippets } = useSnippets();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [language, setLanguage] = useState('All');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [visibility, setVisibility] = useState<'all' | 'public' | 'private'>('all');
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);
  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const { user } = useAuth();

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setDbCategories(res.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Sync state with URL when URL changes
  React.useEffect(() => {
    setSearch(searchParams.get('q') || '');
    const urlCategory = searchParams.get('category');
    if (urlCategory) {
      setCategory(urlCategory);
    }
  }, [searchParams]);

  React.useEffect(() => {
    // Add a small delay/debounce for API calls when typing
    const timeoutId = setTimeout(() => {
      fetchSnippets({ visibility, query: search });
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [visibility, search, fetchSnippets]);

  // Sync URL when state changes
  const handleSearchChange = (val: string) => {
    setSearch(val);
    if (val) {
      navigate(`/search?q=${encodeURIComponent(val)}`, { replace: true });
    } else {
      navigate(`/search`, { replace: true });
    }
  };

  const filteredSnippets = React.useMemo(() => {
    return snippets
      .filter(snippet => {
        const matchesLanguage = language === 'All' || snippet.language === language;
        
        const categoryObj = dbCategories.find(c => c.id === category);
        const categoryName = categoryObj ? categoryObj.name : category;
        const matchesCategory = category === 'All' || 
                                snippet.categoryId === category || 
                                snippet.category === categoryName || 
                                snippet.language?.toLowerCase() === categoryName?.toLowerCase();
                                
        const matchesPinned = !showPinnedOnly || user?.pinnedSnippets?.includes(snippet._id);
        
        return matchesLanguage && matchesCategory && matchesPinned;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        if (sortBy === 'a-z') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [snippets, search, language, category, sortBy, showPinnedOnly, user?.pinnedSnippets]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <Code className="w-8 h-8 text-purple-600" /> Snippet Vault
          </h1>
          <p className="text-sm text-slate-500 mt-1">Explore, filter, and manage your saved code snippets.</p>
        </div>
        <Link to="/snippets/new">
          <button className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 rounded-xl shadow-md shadow-purple-500/25 transition-all duration-200 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>New Snippet</span>
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Filters */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Quick Filters</h3>
              <div className="flex flex-col gap-2 mb-4">
                <button
                  onClick={() => setShowPinnedOnly(!showPinnedOnly)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg text-left transition-colors flex items-center gap-2 ${
                    showPinnedOnly
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>📌</span> Pinned Snippets
                </button>
              </div>

              <h3 className="text-sm font-semibold text-slate-800 mb-3">Visibility</h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setVisibility('all')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg text-left transition-colors ${
                    visibility === 'all'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setVisibility('public')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg text-left transition-colors flex items-center gap-2 ${
                    visibility === 'public'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>🌐</span> Public
                </button>
                <button
                  onClick={() => setVisibility('private')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg text-left transition-colors flex items-center gap-2 ${
                    visibility === 'private'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>🔒</span> Private
                </button>
              </div>
            </div>

            <SearchBar value={search} onChange={handleSearchChange} />
            <FilterPanel 
              languageFilter={language} setLanguageFilter={setLanguage}
              categoryFilter={category} setCategoryFilter={setCategory}
              sortBy={sortBy} setSortBy={setSortBy}
              dbCategories={dbCategories}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSnippets.map(snippet => (
              <SnippetCard 
                key={snippet._id} 
                snippet={snippet} 
                onToggleFavorite={toggleFavorite} 
              />
            ))}
          </div>
          
          {filteredSnippets.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
              <Code className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">No snippets found</h3>
              <p className="text-slate-500 text-sm">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
