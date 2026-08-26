import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { api } from '../../services/api';

// Helper to safely render icons from string name
const IconByName = ({ name, color, className = '' }: { name: string; color?: string; className?: string }) => {
  const IconComponent = (Icons as any)[name] || Icons.Code;
  return <IconComponent color={color} className={className} />;
};

export const CategoriesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await api.get('/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError('Unable to load categories. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Loading categories...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-rose-500 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6]">
            Categories
          </h1>
          <p className="text-slate-500 mt-1">Browse snippets by programming language and technology.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1120] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6D5DF6]/20 focus:border-[#6D5DF6] transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/snippets?category=${category.id}`)}
              className="group cursor-pointer bg-white dark:bg-[#111827] rounded-[20px] p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-[#6D5DF6]/10 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-2"
                  style={{ backgroundColor: category.bgColor }}
                >
                  <IconByName name={category.iconName} color={category.color} className="w-6 h-6" />
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center">
                  {category.snippetCount} snippets
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#6D5DF6] transition-colors">
                {category.name}
              </h3>
              
              <p className="text-slate-500 text-sm line-clamp-2 flex-grow mb-6">
                {category.description}
              </p>

              <div className="flex items-center text-sm font-semibold text-[#6D5DF6] opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                Browse Snippets <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No categories found</h3>
          <p className="text-slate-500">We couldn't find any categories matching "{searchQuery}".</p>
          <button 
            onClick={() => setSearchQuery('')}
            className="mt-4 text-[#6D5DF6] font-medium hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};
