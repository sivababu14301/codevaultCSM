import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Eye, RotateCcw } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { SnippetVersion, Snippet } from '../../types';
import { snippetService } from '../../services/snippetService';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../ui/Toast';

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  snippet: Snippet;
  onRestore: (versionId: string) => Promise<void>;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({ isOpen, onClose, snippet, onRestore }) => {
  const [versions, setVersions] = useState<SnippetVersion[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewingVersion, setViewingVersion] = useState<SnippetVersion | null>(null);
  const { } = useAuth();
  const { toast: showToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchVersions();
    } else {
      setViewingVersion(null);
    }
  }, [isOpen]);

  const fetchVersions = async () => {
    setLoading(true);
    try {
      const data = await snippetService.getSnippetVersions(snippet._id);
      setVersions(data);
    } catch (error) {
      console.error('Failed to load version history', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (version: SnippetVersion) => {
    if (window.confirm(`Restore this version (v${version.versionNumber})?`)) {
      try {
        await onRestore(version._id);
        showToast('Version restored successfully', 'success');
        onClose();
      } catch (error) {
        showToast('Failed to restore version', 'error');
      }
    }
  };

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Version History</h2>
                  <p className="text-sm text-slate-500 truncate max-w-[300px]">{snippet.title}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              ) : viewingVersion ? (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-slate-900">Viewing Version {viewingVersion.versionNumber}</h3>
                      <p className="text-sm text-slate-500">
                        {new Date(viewingVersion.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button 
                      onClick={() => setViewingVersion(null)}
                      className="text-sm text-purple-600 font-medium hover:underline"
                    >
                      &larr; Back to History
                    </button>
                  </div>
                  <div className="flex-1 rounded-xl overflow-hidden border border-slate-200">
                    <Editor
                      height="100%"
                      language={viewingVersion.language}
                      value={viewingVersion.code}
                      theme="vs-light"
                      options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        fontSize: 14,
                        padding: { top: 16 }
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-6 bottom-6 w-px bg-slate-200" />
                  
                  {versions.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                      No version history found.
                    </div>
                  )}

                  {versions.map((version, index) => {
                    const isLatest = index === 0;
                    return (
                      <div key={version._id} className="relative pl-14">
                        {/* Timeline dot */}
                        <div className={`absolute left-[21px] top-5 w-3 h-3 rounded-full border-2 border-white shadow-sm ${isLatest ? 'bg-purple-600' : 'bg-slate-300'}`} />
                        
                        <div className={`bg-white p-5 rounded-xl border ${isLatest ? 'border-purple-200 shadow-sm' : 'border-slate-200'} transition-all hover:shadow-md`}>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900">v{version.versionNumber}</span>
                              <span className="text-sm text-slate-500">
                                — {new Date(version.createdAt).toLocaleString(undefined, {
                                  weekday: 'short', month: 'short', day: 'numeric',
                                  hour: 'numeric', minute: 'numeric'
                                })}
                              </span>
                            </div>
                            {isLatest && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          
                          <p className="text-slate-700 mb-2">{version.changeDescription}</p>
                          
                          <div className="text-xs text-slate-500 mb-4">
                            Updated by: {(typeof version.updatedBy === 'object' ? version.updatedBy.name : 'Unknown')}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setViewingVersion(version)}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </button>
                            
                            {!isLatest && (
                              <button
                                onClick={() => handleRestore(version)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                              >
                                <RotateCcw className="w-4 h-4" />
                                Restore
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
