import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Trash2, Copy, Check, Star, Pin, Globe, Lock, User, Calendar, Eye, Clock, CopyPlus } from 'lucide-react';
import { SyntaxViewer } from '../../components/syntax/SyntaxViewer';
import { LanguageBadge } from '../../components/snippets/LanguageBadge';
import { TagChip } from '../../components/snippets/TagChip';
import { DeleteModal } from '../../components/snippets/DeleteModal';
import { VersionHistoryModal } from '../../components/snippets/VersionHistoryModal';
import { useAuth } from '../../hooks/useAuth';
import { useSnippets } from '../../hooks/useSnippets';
import { snippetService } from '../../services/snippetService';
import { Snippet } from '../../types';
import { useToast } from '../../components/ui/Toast';
import { userService } from '../../services/userService';

export const ViewSnippetPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user, updateUser } = useAuth();
  const { deleteSnippet, duplicateSnippet } = useSnippets();
  const { toast } = useToast();
  
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [copied, setCopied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDuplicating, setIsDuplicating] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  useEffect(() => {
    const fetchSnippet = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const data = await snippetService.getSnippetById(id);
        setSnippet(data);
        setIsFavorited(data.isFavorited || false);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load snippet');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSnippet();
  }, [id]);

  const handleRestoreVersion = async (versionId: string) => {
    if (!id) return;
    try {
      const updatedSnippet = await snippetService.restoreSnippetVersion(id, versionId);
      setSnippet(updatedSnippet);
    } catch (err) {
      throw err;
    }
  };

  const handleCopy = async () => {
    if (!snippet) return;
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {}
  };

  const handleDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    try {
      await deleteSnippet(id);
      setShowDeleteModal(false);
      navigate('/snippets');
    } catch (err) {
      console.error('Failed to delete snippet', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePin = async () => {
    if (!id || !user) return;
    try {
      const response = await userService.togglePinSnippet(id);
      updateUser({ pinnedSnippets: response.pinnedSnippets });
      const isNowPinned = response.pinnedSnippets.includes(id);
      toast(isNowPinned ? 'Snippet pinned' : 'Snippet unpinned', 'success');
    } catch (err) {
      toast('Failed to toggle pin', 'error');
    }
  };

  const handleDuplicate = async () => {
    if (!id || isDuplicating) return;
    setIsDuplicating(true);
    try {
      const newSnippet = await duplicateSnippet(id);
      toast('Snippet duplicated successfully!', 'success');
      navigate(`/snippets/${newSnippet._id}`);
    } catch (err) {
      toast('Failed to duplicate snippet', 'error');
    } finally {
      setIsDuplicating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !snippet) {
    return (
      <div className="text-center py-12">
        <p className="text-rose-500 font-medium mb-4">{error || 'Snippet not found'}</p>
        <button 
          onClick={() => navigate('/snippets')}
          className="text-purple-600 hover:underline"
        >
          Return to Snippets
        </button>
      </div>
    );
  }

  const authorObj = typeof snippet.author === 'object' ? snippet.author : null;
  const authorId = authorObj ? authorObj._id : snippet.author;
  const isOwner = user && authorId === user._id;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-6"
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/snippets')}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                {snippet.title}
                {snippet.isPublic ? (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 uppercase tracking-wider">
                    <Globe className="w-3 h-3" /> Public
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md border border-slate-200 uppercase tracking-wider">
                    <Lock className="w-3 h-3" /> Private
                  </span>
                )}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFavorited(!isFavorited)}
              className={`p-2.5 rounded-xl border transition-colors shadow-sm ${isFavorited ? 'bg-amber-50 border-amber-200 text-amber-500' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
              title="Favorite"
            >
              <Star className={`w-4 h-4 ${isFavorited ? 'fill-amber-500' : ''}`} />
            </button>
            {isOwner && (
              <button 
                onClick={handleDuplicate}
                disabled={isDuplicating}
                className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl font-semibold text-sm transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50"
                title="Duplicate / Save as Copy"
              >
                <CopyPlus className="w-4 h-4" /> Duplicate
              </button>
            )}
            {user && (
              <button 
                onClick={handleTogglePin}
                className={`p-2.5 rounded-xl border transition-colors shadow-sm ${user?.pinnedSnippets?.includes(snippet._id) ? 'bg-purple-50 border-purple-200 text-purple-600' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                title={user?.pinnedSnippets?.includes(snippet._id) ? "Unpin snippet" : "Pin snippet"}
              >
                <Pin className={`w-4 h-4 ${user?.pinnedSnippets?.includes(snippet._id) ? 'fill-purple-600' : ''}`} />
              </button>
            )}
            {isOwner && (
              <>
                <button 
                  onClick={() => setShowVersionHistory(true)}
                  className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-semibold text-sm transition-colors shadow-sm flex items-center gap-2"
                >
                  <Clock className="w-4 h-4" /> History
                </button>
                <Link to={`/snippets/edit/${id}`}>
                  <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-semibold text-sm transition-colors shadow-sm flex items-center gap-2">
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                </Link>
                <button 
                  onClick={() => setShowDeleteModal(true)}
                  className="px-4 py-2.5 bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 rounded-xl font-semibold text-sm transition-colors shadow-sm flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-6 justify-between items-start">
            <div className="space-y-4 max-w-2xl">
              <p className="text-slate-600 text-sm leading-relaxed">{snippet.description || 'No description provided.'}</p>
              <div className="flex flex-wrap gap-2">
                <LanguageBadge language={snippet.language} />
                <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-md text-xs font-semibold text-slate-600">
                  {snippet.category}
                </span>
                {snippet.tags?.map(tag => (
                  <TagChip key={tag} tag={tag} />
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-3 text-xs font-medium text-slate-500 bg-white p-4 rounded-xl border border-slate-100 shadow-sm shrink-0">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-purple-500" />
                <span className="text-slate-700">Author:</span> 
                {authorObj ? (
                  <Link to={`/user/${authorObj._id}`} className="hover:text-purple-600 hover:underline transition-colors">
                    {authorObj.username || authorObj.name}
                  </Link>
                ) : 'Unknown'}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="text-slate-700">Created:</span> {new Date(snippet.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-500" />
                <span className="text-slate-700">Views:</span> {snippet.viewsCount || 0}
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                <span className="text-slate-700">Favorites:</span> {snippet.favoritesCount || 0}
              </div>
            </div>
          </div>

          <div className="p-0 border-t border-slate-100 relative group/code">
            <button
              onClick={handleCopy}
              className="absolute right-4 top-4 p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors opacity-0 group-hover/code:opacity-100 focus:opacity-100 z-10 shadow-sm"
              title="Copy code"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <SyntaxViewer code={snippet.code} language={snippet.language} filename={snippet.title} />
          </div>
        </div>
      </motion.div>

      <DeleteModal 
        isOpen={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)} 
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        title="Delete Snippet"
        description={`Are you sure you want to delete "${snippet.title}"? This action cannot be undone.`}
      />

      <VersionHistoryModal 
        isOpen={showVersionHistory}
        onClose={() => setShowVersionHistory(false)}
        snippet={snippet}
        onRestore={handleRestoreVersion}
      />
    </>
  );
};
