import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../../components/search/SearchBar';
import SearchFilters, { FilterState } from '../../components/search/SearchFilters';
import SearchResults from '../../components/search/SearchResults';
import EmptyState from '../../components/search/EmptyState';
import { SnippetResult } from '../../components/search/SnippetResultCard';

// Dummy snippets removed

const INITIAL_FILTERS: FilterState = {
  languages: [],
  categories: [],
  tags: [],
  sort: 'newest',
  favoritesOnly: false,
  visibility: 'all',
};

import { useSearchParams } from 'react-router-dom';
import { useSnippets } from '../../hooks/useSnippets';
import { snippetService } from '../../services/snippetService';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [realSnippets, setRealSnippets] = useState<any[]>([]);
  const { favoriteSnippetIds } = useSnippets();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch real snippets based on search query
  React.useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const data = await snippetService.getAllSnippets(searchQuery ? { search: searchQuery } : undefined);
        setRealSnippets(data || []);
      } catch (err) {
        console.error('Failed to search snippets', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    const timeoutId = setTimeout(() => {
      fetchResults();
      // Update URL query string
      if (searchQuery) {
        setSearchParams({ q: searchQuery });
      } else {
        setSearchParams({});
      }
    }, 500); // debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery, setSearchParams]);

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const filteredSnippets = useMemo(() => {
    let result = realSnippets.map((s: any): SnippetResult => ({
      id: s._id,
      title: s.title,
      language: s.language,
      category: s.category,
      tags: s.tags || [],
      isFavorite: favoriteSnippetIds?.includes(s._id) || false,
      visibility: s.isPublic ? 'public' : 'private',
      updatedAt: new Date(s.updatedAt || s.createdAt).toLocaleDateString()
    }));

    // Search query filter (local fallback just in case)
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
      if (filters.sort === 'newest') return -1; 
      if (filters.sort === 'oldest') return 1;
      return 0;
    });

    return result;
  }, [searchQuery, filters, realSnippets, favoriteSnippetIds]);

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
