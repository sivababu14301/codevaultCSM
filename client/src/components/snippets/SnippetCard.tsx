import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Copy, Check, Eye, User, Calendar, Lock, Globe, Share2, DownloadCloud, FolderPlus, Folder, Pin } from 'lucide-react';
import { Snippet } from '../../types';
import { useToast } from '../ui/Toast';
import { useSnippets } from '../../hooks/useSnippets';
import { LanguageBadge } from './LanguageBadge';
import { TagChip } from './TagChip';
import { AddToCollectionModal } from '../collections/AddToCollectionModal';
import { useCollections } from '../../hooks/useCollections';
import { useAuth } from '../../hooks/useAuth';
import { userService } from '../../services/userService';

interface SnippetCardProps {
  snippet: Snippet;
  onToggleFavorite?: (id: string) => void;
}

export const SnippetCard: React.FC<SnippetCardProps> = ({ snippet, onToggleFavorite }) => {
  const [copied, setCopied] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const { collections } = useCollections();
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const { favoriteSnippetIds } = useSnippets();

  const snippetCollection = collections.find(c => {
    const snips = Array.isArray(c.snippets) ? c.snippets : [];
    return snips.some(s => typeof s === 'object' && s._id === snippet._id);
  });

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleTogglePin = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    try {
      const response = await userService.togglePinSnippet(snippet._id);
      updateUser({ pinnedSnippets: response.pinnedSnippets });
      const isNowPinned = response.pinnedSnippets.includes(snippet._id);
      toast(isNowPinned ? 'Snippet pinned' : 'Snippet unpinned', 'success');
    } catch (err) {
      toast('Failed to toggle pin', 'error');
    }
  };

  const authorName = typeof snippet.author === 'object' ? snippet.author.username : snippet.author;
  const isFavorited = favoriteSnippetIds?.includes(snippet._id) ?? false;

  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col justify-between h-full border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 group">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <Link to={`/snippets/${snippet._id}`} className="hover:underline decoration-purple-400">
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-purple-700 transition-colors truncate">
                {snippet.title}
              </h3>
            </Link>
            <div className="flex items-center gap-2 flex-wrap">
              <LanguageBadge language={snippet.language} />
              {snippet.isPublic ? (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 shrink-0">
                  <Globe className="w-3 h-3" /> Public
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 shrink-0">
                  <Lock className="w-3 h-3" /> Private
                </span>
              )}
              {snippetCollection && (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-[#6D5DF6] bg-[#6D5DF6]/10 px-2 py-0.5 rounded-md border border-[#6D5DF6]/20 shrink-0 truncate max-w-[100px]" title={`In Collection: ${snippetCollection.name}`}>
                  <Folder className="w-3 h-3 shrink-0" /> <span className="truncate">{snippetCollection.name}</span>
                </span>
              )}
              {user?.pinnedSnippets?.includes(snippet._id) && (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200 shrink-0" title="Pinned">
                  <Pin className="w-3 h-3 fill-purple-600" />
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsCollectionModalOpen(true);
              }}
              className={`p-2 rounded-xl transition-colors ${
                snippetCollection 
                  ? 'bg-[#6D5DF6]/10 text-[#6D5DF6] hover:bg-[#6D5DF6]/20' 
                  : 'bg-slate-50 text-slate-400 hover:text-[#6D5DF6] hover:bg-[#6D5DF6]/10'
              }`}
              title={snippetCollection ? "Change Collection" : "Add to Collection"}
            >
              {snippetCollection ? <Folder className="w-4 h-4 fill-[#6D5DF6]/20" /> : <FolderPlus className="w-4 h-4" />}
            </button>
            <Link
              to="/export"
              className="p-2 rounded-xl transition-colors bg-slate-50 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50"
              title="Export Snippet"
              onClick={(e) => e.stopPropagation()}
            >
              <DownloadCloud className="w-4 h-4" />
            </Link>
            <Link
              to="/share"
              className="p-2 rounded-xl transition-colors bg-slate-50 text-slate-400 hover:text-[#6D5DF6] hover:bg-[#6D5DF6]/10"
              title="Share Snippet"
              onClick={(e) => e.stopPropagation()}
            >
              <Share2 className="w-4 h-4" />
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                if(onToggleFavorite) onToggleFavorite(snippet._id);
              }}
              className={`p-2 rounded-xl transition-colors ${
                isFavorited ? 'bg-amber-50 text-amber-500' : 'bg-slate-50 text-slate-400 hover:text-amber-500 hover:bg-amber-50'
              }`}
              title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
            >
              <Star className={`w-4 h-4 ${isFavorited ? 'fill-amber-500' : ''}`} />
            </button>
            {user && (
              <button
                onClick={handleTogglePin}
                className={`p-2 rounded-xl transition-colors ${
                  user.pinnedSnippets?.includes(snippet._id) 
                    ? 'bg-purple-50 text-purple-600' 
                    : 'bg-slate-50 text-slate-400 hover:text-purple-600 hover:bg-purple-50'
                }`}
                title={user.pinnedSnippets?.includes(snippet._id) ? "Unpin Snippet" : "Pin Snippet"}
              >
                <Pin className={`w-4 h-4 ${user.pinnedSnippets?.includes(snippet._id) ? 'fill-purple-600' : ''}`} />
              </button>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
          {snippet.description || "No description provided."}
        </p>

        {/* Code Snippet Preview */}
        <div className="relative bg-slate-900 rounded-xl p-4 mb-4 border border-slate-800 font-mono text-xs text-slate-300 overflow-hidden max-h-32 shadow-inner group/code">
          <button
            onClick={handleCopy}
            className="absolute right-2 top-2 p-1.5 rounded-md bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors opacity-0 group-hover/code:opacity-100 focus:opacity-100"
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <pre className="overflow-x-auto whitespace-pre">
            <code>{snippet.code}</code>
          </pre>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {snippet.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-slate-400" />
          <span>{authorName}</span>
          <span className="text-slate-300">•</span>
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>{new Date(snippet.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center gap-1 text-slate-500">
          <Eye className="w-4 h-4" />
          <span>{snippet.viewsCount || 0}</span>
        </div>
      </div>

      <AddToCollectionModal 
        isOpen={isCollectionModalOpen} 
        onClose={() => setIsCollectionModalOpen(false)} 
        snippet={snippet} 
      />
    </div>
  );
};
