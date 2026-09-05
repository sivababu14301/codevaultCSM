import React, { useState, useMemo } from 'react';
import { Star } from 'lucide-react';
import { useSnippets } from '../../hooks/useSnippets';
import { FavoriteStats } from '../../components/favorites/FavoriteStats';
import { FavoriteToolbar } from '../../components/favorites/FavoriteToolbar';
import { SortOption } from '../../components/favorites/SortDropdown';
import { FilterPanel, FilterState } from '../../components/favorites/FilterPanel';
import { FavoritesGrid } from '../../components/favorites/FavoritesGrid';
import { EmptyFavorites } from '../../components/favorites/EmptyFavorites';

export const FavoritesPage: React.FC = () => {
  const { snippets, favoriteSnippetIds, toggleFavorite } = useSnippets();
  
  // Initialize state with only favorited snippets
  const favorites = useMemo(() => snippets.filter(s => favoriteSnippetIds?.includes(s._id)), [snippets, favoriteSnippetIds]);
  
  // Toolbar state
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ language: '', category: '' });

  // Handle removing a favorite
  const handleRemoveFavorite = async (snippetId: string) => {
    try {
      await toggleFavorite(snippetId);
    } catch (err) {
      console.error(err);
    }
  };

  // Extract unique languages and categories for the filter panel
  const availableLanguages = useMemo(() => {
    const langs = new Set(favorites.map(f => f.language));
    return Array.from(langs).filter(Boolean).sort();
  }, [favorites]);

  const availableCategories = useMemo(() => {
    const cats = new Set(favorites.map(f => f.category));
    return Array.from(cats).filter(Boolean).sort();
  }, [favorites]);

  // Derived stats
  const totalFavorites = favorites.length;
  const topLanguage = useMemo(() => {
    if (favorites.length === 0) return 'N/A';
    const counts = favorites.reduce((acc, curr) => {
      acc[curr.language] = (acc[curr.language] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  }, [favorites]);
  
  const recentlyAdded = favorites.filter(f => {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    return new Date(f.updatedAt) >= twoDaysAgo;
  }).length;
  
  const totalCategories = availableCategories.length;

  const activeFiltersCount = (filters.language ? 1 : 0) + (filters.category ? 1 : 0);

  // Apply filters, search, and sort
  const filteredAndSortedFavorites = useMemo(() => {
    let result = [...favorites];

    // 1. Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(f => 
        f.title.toLowerCase().includes(q) || 
        (f.description && f.description.toLowerCase().includes(q)) ||
        (f.tags && f.tags.some(tag => tag.toLowerCase().includes(q)))
      );
    }

    // 2. Filter
    if (filters.language) {
      result = result.filter(f => f.language === filters.language);
    }
    if (filters.category) {
      result = result.filter(f => f.category === filters.category);
    }

    // 3. Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'recently-updated':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'a-z':
          return a.title.localeCompare(b.title);
        case 'z-a':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  }, [favorites, searchQuery, filters, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            Favorites
            <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
          </h1>
          <p className="text-gray-500 mt-1">Your most used and starred code snippets.</p>
        </div>
      </div>

      {/* Stats */}
      <FavoriteStats 
        totalFavorites={totalFavorites}
        topLanguage={topLanguage}
        recentlyAdded={recentlyAdded}
        totalCategories={totalCategories}
      />

      {/* Toolbar */}
      <FavoriteToolbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        activeFiltersCount={activeFiltersCount}
      />

      {/* Filter Panel */}
      <FilterPanel 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        availableLanguages={availableLanguages}
        availableCategories={availableCategories}
      />

      {/* Grid or Empty State */}
      {favorites.length === 0 ? (
        <EmptyFavorites />
      ) : filteredAndSortedFavorites.length === 0 ? (
        <EmptyFavorites 
          title="No matching favorites"
          description="Try adjusting your search query or removing some filters."
          showAction={false}
        />
      ) : (
        <FavoritesGrid 
          favorites={filteredAndSortedFavorites} 
          onRemoveFavorite={handleRemoveFavorite} 
        />
      )}
    </div>
  );
};
