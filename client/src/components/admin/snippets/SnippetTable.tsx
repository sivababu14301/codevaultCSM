import React from 'react';
import { Eye, Shield, Trash2, FileCode2 } from 'lucide-react';
import { AdminSnippet } from '../../../types/admin';
import { VisibilityBadge } from './VisibilityBadge';
import { EmptySnippets } from './EmptySnippets';

interface SnippetTableProps {
  snippets: AdminSnippet[];
  onView: (snippet: AdminSnippet) => void;
  onDelete?: (snippet: AdminSnippet) => void;
}

export const SnippetTable: React.FC<SnippetTableProps> = ({ snippets, onView, onDelete }) => {
  if (snippets.length === 0) {
    return <EmptySnippets />;
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr className="bg-slate-50 dark:bg-[#0B1120] border-y border-slate-100 dark:border-[#1F2937]">
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Title</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Language</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Owner</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Visibility</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Created</th>
            <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-[#1F2937]">
          {snippets.map((snippet) => (
            <tr key={snippet.id} className="hover:bg-slate-50/50 dark:hover:bg-[#0B1120]/50 transition-colors group">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center shrink-0">
                    <FileCode2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{snippet.title}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 font-medium text-sm text-slate-700 dark:text-slate-300">
                {snippet.language}
              </td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">
                {snippet.category}
              </td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">
                {snippet.author}
              </td>
              <td className="py-4 px-6">
                <VisibilityBadge status={snippet.status} />
              </td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">
                {formatDate(snippet.createdAt)}
              </td>
              <td className="py-4 px-6 text-right">
                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onView(snippet)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  {onDelete && (
                    <button 
                      onClick={() => onDelete(snippet)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 bg-slate-100 dark:bg-slate-800/50 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
