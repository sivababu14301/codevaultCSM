import React from 'react';
import { Snippet } from '../../types';
import { ExportFormat } from './ExportOptions';

interface ExportPreviewProps {
  snippet: Snippet | null;
  format: ExportFormat;
}

export const ExportPreview: React.FC<ExportPreviewProps> = ({ snippet, format }) => {
  if (!snippet) return null;

  const renderPreviewContent = () => {
    switch (format) {
      case 'json':
        return (
          <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">
            {JSON.stringify({
              title: snippet.title,
              language: snippet.language,
              code: snippet.code,
              tags: snippet.tags
            }, null, 2)}
          </pre>
        );
      case 'txt':
        return (
          <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap">
            {`Title: ${snippet.title}\nLanguage: ${snippet.language}\n\n---\n\n${snippet.code}`}
          </pre>
        );
      case 'pdf':
      default:
        return (
          <div className="bg-white rounded-md p-4 text-gray-800 h-full">
            <h1 className="text-lg font-bold border-b pb-2 mb-2">{snippet.title}</h1>
            <p className="text-xs text-gray-500 mb-4">Language: {snippet.language}</p>
            <div className="bg-gray-50 p-2 rounded border border-gray-200 font-mono text-[10px] whitespace-pre-wrap">
              {snippet.code}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
      <div className="bg-gray-900 rounded-xl p-4 h-48 overflow-y-auto border border-gray-800 shadow-inner custom-scrollbar">
        {renderPreviewContent()}
      </div>
    </div>
  );
};
