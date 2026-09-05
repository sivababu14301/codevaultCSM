import React from 'react';
import { User, Eye, ThumbsUp, Calendar, Tag, FileCode2, ShieldAlert } from 'lucide-react';
import { Modal } from '../../ui/Modal';
import { AdminSnippet } from '../../../types/admin';
import { VisibilityBadge } from './VisibilityBadge';
import { Badge } from '../../ui/Badge';

interface SnippetDetailsModalProps {
  snippet: AdminSnippet | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SnippetDetailsModal: React.FC<SnippetDetailsModalProps> = ({ snippet, isOpen, onClose }) => {
  if (!snippet) return null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Snippet Details">
      <div className="flex flex-col gap-6 pt-2">
        {/* Header Section */}
        <div className="pb-6 border-b border-slate-100 dark:border-[#1F2937]">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            {snippet.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <VisibilityBadge status={snippet.status} />
            <Badge variant="secondary" className="flex items-center gap-1">
              <FileCode2 className="w-3 h-3" />
              {snippet.language}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {snippet.category}
            </Badge>
          </div>
        </div>

        {/* Description & Tags */}
        {(snippet.description || (snippet.tags && snippet.tags.length > 0)) && (
          <div className="space-y-3">
            {snippet.description && (
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {snippet.description}
              </p>
            )}
            {snippet.tags && snippet.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {snippet.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-100 dark:border-[#1F2937] bg-slate-50 dark:bg-[#0B1120]">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
              <Eye className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Total Views</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {snippet.views.toLocaleString()}
            </p>
          </div>
          
          <div className="p-4 rounded-xl border border-slate-100 dark:border-[#1F2937] bg-slate-50 dark:bg-[#0B1120]">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
              <ThumbsUp className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Total Likes</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {snippet.likes.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Info List */}
        <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-100 dark:border-[#1F2937] space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <User className="w-4 h-4" /> Owner
            </span>
            <div className="text-right">
              <span className="font-medium text-slate-900 dark:text-white block">{snippet.author}</span>
              {snippet.authorEmail && (
                <span className="text-xs text-slate-500 dark:text-slate-400 block">{snippet.authorEmail}</span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Created Date
            </span>
            <span className="font-medium text-slate-900 dark:text-white">{formatDate(snippet.createdAt)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <FileCode2 className="w-4 h-4" /> Snippet ID
            </span>
            <span className="font-mono text-xs text-slate-600 dark:text-slate-300">{snippet.id}</span>
          </div>
        </div>

        {/* Source Code */}
        {snippet.code && (
          <div className="rounded-xl border border-slate-100 dark:border-[#1F2937] bg-slate-50 dark:bg-[#0B1120] overflow-hidden">
            <div className="px-4 py-2 border-b border-slate-100 dark:border-[#1F2937] bg-slate-100 dark:bg-[#111827]">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Source Code</span>
            </div>
            <pre className="p-4 max-h-96 overflow-auto text-sm text-slate-800 dark:text-slate-300 font-mono">
              <code>{snippet.code}</code>
            </pre>
          </div>
        )}

        {snippet.status === 'flagged' && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-800/20">
            <h4 className="text-sm font-bold text-rose-900 dark:text-rose-300 flex items-center gap-2 mb-1">
              <ShieldAlert className="w-4 h-4" /> Moderation Alert
            </h4>
            <p className="text-sm text-rose-700 dark:text-rose-400/80">
              This snippet has been flagged by users and requires administrative review. Please use the moderation tools to approve or hide it.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};
