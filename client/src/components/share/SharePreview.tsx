import React from 'react';
import { Snippet } from '../../types';

interface SharePreviewProps {
  snippet: Snippet | null;
}

export const SharePreview: React.FC<SharePreviewProps> = ({ snippet }) => {
  if (!snippet) return null;

  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Link Preview</h4>
      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
        <h5 className="font-semibold text-gray-900 text-sm mb-1 truncate">{snippet.title}</h5>
        <p className="text-xs text-gray-500 line-clamp-2 mb-2">
          {snippet.description || 'View this code snippet on CodeVault.'}
        </p>
        <div className="text-[10px] text-gray-400 font-mono bg-gray-50 px-2 py-1 rounded inline-block">
          {window.location.origin}/s/...
        </div>
      </div>
    </div>
  );
};
