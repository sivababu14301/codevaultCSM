import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../../components/search/SearchBar';
import SearchFilters, { FilterState } from '../../components/search/SearchFilters';
import SearchResults from '../../components/search/SearchResults';
import EmptyState from '../../components/search/EmptyState';
import { SnippetResult } from '../../components/search/SnippetResultCard';

const DUMMY_SNIPPETS: SnippetResult[] = [
  {
    id: '1',
    title: 'React Custom Hook for LocalStorage',
    language: 'TypeScript',
    category: 'React',
    tags: ['hooks', 'utils'],
    isFavorite: true,
    visibility: 'public',
    updatedAt: '2 days ago',
  },
  {
    id: '2',
    title: 'Express JWT Authentication Middleware',
    language: 'JavaScript',
    category: 'Node.js',
    tags: ['auth', 'api'],
    isFavorite: false,
    visibility: 'private',
    updatedAt: '1 week ago',
  },
  {
    id: '3',
    title: 'CSS Grid Responsive Layout',
    language: 'HTML/CSS',
    category: 'Frontend Utilities',
    tags: ['ui'],
    isFavorite: true,
    visibility: 'public',
    updatedAt: '3 weeks ago',
  },
  {
    id: '4',
    title: 'Python Data Cleaning Script',
    language: 'Python',
    category: 'Backend Architecture',
    tags: ['utils', 'algorithms'],
    isFavorite: false,
    visibility: 'private',
    updatedAt: '1 month ago',
  },
  {
    id: '5',
    title: 'SQL Join Types Cheat Sheet',
    language: 'SQL',
    category: 'Database Queries',
    tags: ['database'],
    isFavorite: true,
    visibility: 'public',
    updatedAt: '2 months ago',
  },
];

const INITIAL_FILTERS: FilterState = {
  languages: [],
  categories: [],
  tags: [],
  sort: 'newest',
  favoritesOnly: false,
  visibility: 'all',
};

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const filteredSnippets = useMemo(() => {
    let result = DUMMY_SNIPPETS;

    // Search query filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.title.toLowerCase().includes(q) || 
        s.language.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Language filter
    if (filters.languages.length > 0) {
      result = result.filter(s => 
        filters.languages.some(lang => s.language.toLowerCase().replace(/\s|\//g, '') === lang.replace(/\s|\//g, ''))
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter(s => 
        filters.categories.some(cat => s.category.toLowerCase().replace(/\s|\.|\&/g, '') === cat.replace(/\s|\.|\&/g, ''))
      );
    }

    // Tags filter
    if (filters.tags.length > 0) {
      result = result.filter(s => 
        filters.tags.some(tag => s.tags.includes(tag))
      );
    }

    // Favorites filter
    if (filters.favoritesOnly) {
      result = result.filter(s => s.isFavorite);
    }

    // Visibility filter
    if (filters.visibility !== 'all') {
      result = result.filter(s => s.visibility === filters.visibility);
    }

    // Sorting
    result = [...result].sort((a, b) => {
      if (filters.sort === 'a-z') return a.title.localeCompare(b.title);
      if (filters.sort === 'z-a') return b.title.localeCompare(a.title);
      // Mocking newest/oldest for dummy data
      if (filters.sort === 'newest') return -1; 
      if (filters.sort === 'oldest') return 1;
      return 0;
    });

    return result;
  }, [searchQuery, filters]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-7xl mx-auto min-h-screen"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Snippets</h1>
        <p className="text-gray-500">Find exactly what you're looking for across your entire code vault.</p>
      </div>

      <SearchBar 
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <SearchFilters 
        filters={filters}
        setFilters={setFilters}
        onClearFilters={handleClearFilters}
      />

      <div className="mt-8">
        <div className="mb-4 text-sm font-medium text-gray-500">
          Showing {filteredSnippets.length} {filteredSnippets.length === 1 ? 'result' : 'results'}
        </div>

        {filteredSnippets.length > 0 ? (
          <SearchResults results={filteredSnippets} />
        ) : (
          <EmptyState query={searchQuery} onClear={handleClearFilters} />
        )}
      </div>
    </motion.div>
  );
};

export default SearchPage;
