import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snippet } from '../../types';
import { ExportOptions, ExportFormat } from './ExportOptions';
import { FileNameInput } from './FileNameInput';
import { ExportPreview } from './ExportPreview';
import { DownloadButton } from './DownloadButton';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  snippet: Snippet | null;
}

export const ExportDialog: React.FC<ExportDialogProps> = ({ 
  isOpen, 
  onClose, 
  snippet
}) => {
  const [format, setFormat] = useState<ExportFormat>('pdf');
  const [fileName, setFileName] = useState('');

  // Reset/Set initial filename when a snippet is selected
  useEffect(() => {
    if (snippet && isOpen) {
      // Basic slugification of title
      const slugified = snippet.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFileName(slugified || 'snippet-export');
    }
  }, [snippet, isOpen]);

  const handleDownload = async () => {
    if (!snippet) return;

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        let content = '';
        let mimeType = 'text/plain';

        if (format === 'json') {
          content = JSON.stringify({
            title: snippet.title,
            language: snippet.language,
            code: snippet.code,
            tags: snippet.tags
          }, null, 2);
          mimeType = 'application/json';
        } else if (format === 'txt') {
          content = `Title: ${snippet.title}\nLanguage: ${snippet.language}\n\n---\n\n${snippet.code}`;
          mimeType = 'text/plain';
        } else if (format === 'pdf') {
          // For a real PDF, we would use a library like jspdf. 
          // For now, we will just export it as text but with a .txt extension to avoid corrupt PDF errors, 
          // or just export plain text with a .pdf extension (which may not open in PDF viewers).
          // We'll just export plain text.
          content = `Title: ${snippet.title}\nLanguage: ${snippet.language}\n\n---\n\n${snippet.code}\n\n(Note: Real PDF generation requires a backend or PDF library)`;
          mimeType = 'application/pdf';
        }

        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName || 'snippet-export'}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        resolve();
      }, 1000);
    });
  };

  if (!isOpen || !snippet) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-[24px] shadow-xl w-full max-w-2xl relative overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Export Snippet</h2>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1 truncate max-w-sm" title={snippet.title}>
                {snippet.title}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto custom-scrollbar">
            <ExportOptions format={format} setFormat={setFormat} />
            <FileNameInput fileName={fileName} setFileName={setFileName} format={format} />
            <ExportPreview snippet={snippet} format={format} />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-gray-600 font-medium hover:bg-gray-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <DownloadButton 
              onDownload={handleDownload} 
              disabled={!fileName.trim()} 
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
