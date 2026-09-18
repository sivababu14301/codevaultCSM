import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Search, Filter, Hash, Layers } from 'lucide-react';
import { snippetService } from '../../services/snippetService';
import { Snippet } from '../../types';
import { PublicSnippetCard } from '../../components/community/PublicSnippetCard';
import { api } from '../../services/api';

export const CommunityPage: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest');

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchCommunitySnippets();
  }, [debouncedSearch, language, category, sort]);

  const fetchCommunitySnippets = async () => {
    setLoading(true);
    try {
      const data = await snippetService.getCommunitySnippets({
        search: debouncedSearch,
        language,
        category,
        sort
      });
      setSnippets(data);
    } catch (error) {
      console.error('Failed to fetch community snippets', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const [dbLanguages, setDbLanguages] = useState<{name: string, original: string}[]>([]);
  const [languagesLoading, setLanguagesLoading] = useState(true);
  const [languagesError, setLanguagesError] = useState(false);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setLanguagesLoading(true);
        const res = await api.get('/categories');
        
        const langCats = res.data;
        
        // Deduplicate ignoring casing
        const uniqueLangs = new Map<string, string>();
        langCats.forEach((c: any) => {
          const lower = c.name.toLowerCase();
          if (!uniqueLangs.has(lower)) {
            uniqueLangs.set(lower, c.name);
          }
        });
        
        setDbLanguages(Array.from(uniqueLangs.entries()).map(([lower, original]) => ({
          name: lower,
          original
        })));
        setLanguagesError(false);
      } catch (error) {
        console.error('Failed to fetch languages', error);
        setLanguagesError(true);
      } finally {
        setLanguagesLoading(false);
      }
    };
    
    fetchLanguages();
  }, []);



  const categories = ['General', 'Frontend', 'Backend', 'Database', 'DevOps', 'Security', 'Testing', 'Algorithm'];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl overflow-hidden relative"
      >
        {/* Background decorations */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl mix-blend-overlay"></div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
              <Globe className="w-8 h-8 text-purple-200" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">Community</h1>
          </div>
          <p className="text-purple-200 text-lg mb-8 leading-relaxed">
            Discover, reuse, and learn from thousands of public code snippets created by developers around the world.
          </p>
          
          {/* Search bar */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search by title, description, or tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-0 focus:ring-4 focus:ring-purple-500/30 text-slate-900 placeholder-slate-400 shadow-lg transition-all"
            />
          </div>
        </div>
      </motion.div>

      {/* Filters section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all">
          <Hash className="w-4 h-4 text-slate-400" />
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-transparent border-0 focus:ring-0 text-sm text-slate-700 font-medium py-1"
            disabled={languagesLoading || languagesError}
          >
            <option value="">{languagesLoading ? 'Loading languages...' : 'All Languages'}</option>
            {languagesError ? (
              <option value="" disabled>Unable to load languages.</option>
            ) : (
              dbLanguages.map(l => (
                <option key={l.name} value={l.name}>{l.original}</option>
              ))
            )}
          </select>
        </div>

        <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all">
          <Layers className="w-4 h-4 text-slate-400" />
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-transparent border-0 focus:ring-0 text-sm text-slate-700 font-medium py-1"
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all">
          <Filter className="w-4 h-4 text-slate-400" />
          <select 
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full bg-transparent border-0 focus:ring-0 text-sm text-slate-700 font-medium py-1"
          >
            <option value="newest">Newest First</option>
            <option value="views">Most Viewed</option>
            <option value="likes">Most Liked</option>
            <option value="shares">Most Shared</option>
          </select>
        </div>
      </motion.div>

      {/* Snippets Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      ) : snippets.length > 0 ? (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {snippets.map((snippet) => (
            <PublicSnippetCard key={snippet._id} snippet={snippet} />
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm p-16 text-center"
        >
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No snippets found</h3>
          <p className="text-slate-500 max-w-md mx-auto">
            We couldn't find any public snippets matching your current filters. Try adjusting your search or clearing the filters.
          </p>
          {(search || language || category) && (
            <button
              onClick={() => {
                setSearch('');
                setLanguage('');
                setCategory('');
              }}
              className="mt-6 px-6 py-2.5 bg-purple-50 text-purple-700 hover:bg-purple-100 font-semibold rounded-xl transition-colors"
            >
              Clear all filters
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
};
