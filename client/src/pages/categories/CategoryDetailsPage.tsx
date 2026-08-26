import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Search, ArrowLeft, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { SnippetCard } from '../../components/snippets/SnippetCard';
import { Snippet } from '../../types';
import { api } from '../../services/api';

// Helper to safely render icons from string name
const IconByName = ({ name, color, className = '' }: { name: string; color?: string; className?: string }) => {
  const IconComponent = (Icons as any)[name] || Icons.Code;
  return <IconComponent color={color} className={className} />;
};



export const CategoryDetailsPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [category, setCategory] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch all categories to find the matching one
        const catRes = await api.get('/categories');
        const found = catRes.data.find((c: any) => c.slug === categoryName);
        setCategory(found);

        if (found) {
          // Attempt to fetch snippets for this category
          const snipRes = await api.get('/snippets');
          // Filter on frontend if backend doesn't support category query param
          const catSnippets = snipRes.data.filter((s: any) => s.category === found.name);
          setSnippets(catSnippets);
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [categoryName]);

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Loading category...</div>;
  }

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Category Not Found</h2>
        <p className="text-slate-500 mb-6">The category "{categoryName}" does not exist.</p>
        <button 
          onClick={() => navigate('/categories')}
          className="px-6 py-2 bg-[#6D5DF6] hover:bg-[#5b4be4] text-white rounded-xl transition-colors font-medium"
        >
          Back to Categories
        </button>
      </div>
    );
  }

  const filteredSnippets = snippets.filter(snippet => 
    snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    snippet.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Breadcrumb / Back Navigation */}
      <Link 
        to="/categories" 
        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-[#6D5DF6] transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Categories
      </Link>

      {/* Category Header */}
      <div className="bg-white dark:bg-[#111827] rounded-[24px] p-8 md:p-10 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
        {/* Abstract Background Element */}
        <div 
          className="absolute -right-10 -top-10 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: category.color }}
        />
        
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10">
          <div 
            className="w-20 h-20 rounded-[20px] flex items-center justify-center shadow-md flex-shrink-0"
            style={{ backgroundColor: category.bgColor }}
          >
            <IconByName name={category.iconName} color={category.color} className="w-10 h-10" />
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {category.name}
              </h1>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-bold px-3 py-1 rounded-full">
                {category.snippetCount} Snippets
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Browse {category.name} Snippets</h2>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search in this category..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6D5DF6]/20 focus:border-[#6D5DF6] transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Snippets Grid */}
      {filteredSnippets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSnippets.map((snippet) => (
            <SnippetCard key={snippet._id} snippet={snippet} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#111827] rounded-[24px] border border-slate-100 dark:border-slate-800 py-20 flex flex-col items-center justify-center text-center px-4">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No snippets found</h3>
          <p className="text-slate-500 max-w-sm mb-6">We couldn't find any snippets matching your search criteria in the {category.name} category.</p>
          <button 
            onClick={() => setSearchQuery('')}
            className="text-[#6D5DF6] font-semibold hover:underline"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Pagination Placeholder */}
      {filteredSnippets.length > 0 && (
        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
          <span className="text-sm text-slate-500">Showing 1 to {filteredSnippets.length} of {category.snippetCount} results</span>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-slate-200 text-slate-400 disabled:opacity-50" disabled>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-lg bg-[#6D5DF6] text-white font-semibold flex items-center justify-center shadow-md shadow-[#6D5DF6]/20">
              1
            </button>
            <button className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-600 font-semibold flex items-center justify-center hover:bg-slate-50 transition-colors">
              2
            </button>
            <button className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-600 font-semibold flex items-center justify-center hover:bg-slate-50 transition-colors">
              3
            </button>
            <button className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
