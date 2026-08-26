import React, { useState } from 'react';
import { Search, Filter, Plus, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSnippets } from '../../hooks/useSnippets';
import { SnippetCard } from '../../components/snippets/SnippetCard';
import { Button } from '../../components/ui/Button';

export const SnippetsListPage: React.FC = () => {
  const { snippets } = useSnippets();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const filteredSnippets = snippets.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLang = selectedLanguage === 'all' || s.language.toLowerCase() === selectedLanguage.toLowerCase();
    return matchesSearch && matchesLang;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Code className="w-6 h-6 text-indigo-400" /> Snippets Vault
          </h1>
          <p className="text-sm text-gray-400">Browse, filter, and manage all your code snippets</p>
        </div>
        <Link to="/snippets/new">
          <Button icon={<Plus className="w-4 h-4" />}>New Snippet</Button>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Filter snippets by title, description or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400 hidden sm:block" />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Languages</option>
            <option value="typescript">TypeScript</option>
            <option value="javascript">JavaScript</option>
            <option value="css">CSS</option>
            <option value="python">Python</option>
          </select>
        </div>
      </div>

      {/* Snippet Grid */}
      {filteredSnippets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSnippets.map((snippet) => (
            <SnippetCard key={snippet._id} snippet={snippet} />
          ))}
        </div>
      ) : (
        <div className="glass-card p-12 text-center rounded-2xl border border-gray-800">
          <Code className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white">No Snippets Found</h3>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search filters or create a new snippet.</p>
        </div>
      )}
    </div>
  );
};
