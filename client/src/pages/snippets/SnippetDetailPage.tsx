import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Copy, Trash2, Eye, User, Calendar } from 'lucide-react';
import { useSnippets } from '../../hooks/useSnippets';
import { CodeEditor } from '../../components/snippets/CodeEditor';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { formatDate, getLanguageBadgeColor } from '../../utils/formatters';
import { copyToClipboard } from '../../utils/copyToClipboard';

export const SnippetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { snippets, favoriteSnippetIds, toggleFavorite, deleteSnippet } = useSnippets();
  const [copied, setCopied] = useState(false);

  const snippet = snippets.find((s) => s._id === id);

  if (!snippet) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-2xl font-bold text-white">Snippet Not Found</h2>
        <Button onClick={() => navigate('/snippets')}>Back to Snippets</Button>
      </div>
    );
  }

  const isFavorited = favoriteSnippetIds?.includes(snippet._id) ?? false;

  const handleCopy = async () => {
    const ok = await copyToClipboard(snippet.code);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDelete = () => {
    deleteSnippet(snippet._id);
    navigate('/snippets');
  };

  const authorName = typeof snippet.author === 'object' ? snippet.author.username : snippet.author;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/snippets')}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Snippets
        </button>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleFavorite(snippet._id)}
            icon={<Star className={`w-4 h-4 ${isFavorited ? 'fill-amber-400 text-amber-400' : ''}`} />}
          >
            {isFavorited ? 'Favorited' : 'Favorite'}
          </Button>
          <Button variant="outline" size="sm" icon={<Copy className="w-4 h-4" />} onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy Code'}
          </Button>
          <Button variant="danger" size="sm" icon={<Trash2 className="w-4 h-4" />} onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-gray-800 space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-white">{snippet.title}</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-medium border ${getLanguageBadgeColor(snippet.language)}`}>
              {snippet.language}
            </span>
          </div>
          <p className="text-gray-400 text-sm">{snippet.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 py-3 border-y border-gray-800">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-indigo-400" /> Created by <span className="text-white font-medium">{authorName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-purple-400" /> {formatDate(snippet.createdAt)}
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-emerald-400" /> {snippet.viewsCount} Views
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-400" /> {snippet.favoritesCount} Favorites
          </div>
        </div>

        <CodeEditor value={snippet.code} onChange={() => {}} language={snippet.language} readOnly />

        <div className="flex flex-wrap gap-2 pt-2">
          {snippet.tags.map((tag) => (
            <Badge key={tag} variant="primary" className="text-xs uppercase font-mono">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
