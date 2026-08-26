import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Share2, Eye, Flag, Copy, Check, Clock } from 'lucide-react';
import { Snippet } from '../../types';
import { snippetService } from '../../services/snippetService';
import { useToast } from '../ui/Toast';
import { LanguageBadge } from '../snippets/LanguageBadge';
import { TagChip } from '../snippets/TagChip';

interface PublicSnippetCardProps {
  snippet: Snippet;
}

export const PublicSnippetCard: React.FC<PublicSnippetCardProps> = ({ snippet: initialSnippet }) => {
  const navigate = useNavigate();
  const { toast: showToast } = useToast();
  const [snippet, setSnippet] = useState(initialSnippet);
  const [copied, setCopied] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showToast('Code copied to clipboard!', 'success');
    } catch (err) {
      showToast('Failed to copy code', 'error');
    }
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const updated = await snippetService.toggleFavorite(snippet._id);
      setSnippet(updated);
    } catch (err) {
      showToast('Failed to like snippet', 'error');
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await snippetService.incrementShare(snippet._id);
      setSnippet(prev => ({ ...prev, sharesCount: (prev.sharesCount || 0) + 1 }));
      await navigator.clipboard.writeText(`${window.location.origin}/snippets/${snippet._id}`);
      showToast('Link copied to clipboard!', 'success');
    } catch (err) {
      showToast('Failed to share snippet', 'error');
    }
  };

  const submitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportReason.trim()) return;
    
    setIsSubmitting(true);
    try {
      await snippetService.reportSnippet(snippet._id, reportReason);
      showToast('Report submitted successfully. Thank you.', 'success');
      setShowReport(false);
      setReportReason('');
    } catch (err) {
      showToast('Failed to submit report', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const viewSnippet = async () => {
    try {
      await snippetService.incrementView(snippet._id);
      navigate(`/snippets/${snippet._id}`);
    } catch (err) {
      navigate(`/snippets/${snippet._id}`);
    }
  };

  const authorName = typeof snippet.author === 'object' ? snippet.author.name : 'Unknown';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={viewSnippet}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all p-6 cursor-pointer group flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0 pr-4">
          <h3 className="text-lg font-bold text-slate-900 truncate group-hover:text-purple-600 transition-colors">
            {snippet.title}
          </h3>
          <p className="text-sm text-slate-500 mt-1 line-clamp-2">
            {snippet.description || 'No description provided.'}
          </p>
        </div>
        <LanguageBadge language={snippet.language} />
      </div>

      {/* Meta info */}
      <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
        <div 
          onClick={(e) => { 
            e.stopPropagation(); 
            if (snippet.author) {
              const authorId = typeof snippet.author === 'object' ? (snippet.author as any)._id : snippet.author;
              navigate(`/user/${authorId}`);
            }
          }}
          className="flex items-center gap-1.5 hover:text-purple-600 transition-colors cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-[10px] overflow-hidden">
            {snippet.author && typeof snippet.author === 'object' && (snippet.author as any).avatarUrl ? (
              <img src={(snippet.author as any).avatarUrl} alt={authorName} className="w-full h-full object-cover" />
            ) : (
              authorName.charAt(0).toUpperCase()
            )}
          </div>
          <span className="font-medium text-slate-700 hover:text-purple-600">{authorName}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {new Date(snippet.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Tags */}
      {snippet.tags && snippet.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {snippet.tags.slice(0, 3).map((tag, idx) => (
            <TagChip key={idx} tag={tag} />
          ))}
          {snippet.tags.length > 3 && (
            <span className="text-xs text-slate-400">+{snippet.tags.length - 3}</span>
          )}
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
        {/* Stats */}
        <div className="flex items-center gap-4 text-slate-500 text-sm">
          <div className="flex items-center gap-1.5" title="Views">
            <Eye className="w-4 h-4" />
            <span>{snippet.viewsCount || 0}</span>
          </div>
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1.5 transition-colors ${snippet.isFavorited ? 'text-amber-500' : 'hover:text-amber-500'}`}
            title="Like"
          >
            <Heart className={`w-4 h-4 ${snippet.isFavorited ? 'fill-amber-500' : ''}`} />
            <span>{snippet.favoritesCount || 0}</span>
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
            <span>{snippet.sharesCount || 0}</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
          
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setShowReport(!showReport); }}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              title="Report snippet"
            >
              <Flag className="w-4 h-4" />
            </button>
            
            {showReport && (
              <div 
                className="absolute right-0 bottom-full mb-2 w-64 p-4 bg-white rounded-xl shadow-xl border border-slate-200 z-10"
                onClick={e => e.stopPropagation()}
              >
                <h4 className="font-bold text-sm text-slate-900 mb-2">Report Snippet</h4>
                <form onSubmit={submitReport}>
                  <textarea
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    placeholder="Reason for reporting..."
                    className="w-full text-sm p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                    rows={3}
                    required
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowReport(false)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-3 py-1.5 text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg disabled:opacity-50"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
