import React from 'react';
import { Shield, EyeOff, CheckCircle, AlertTriangle } from 'lucide-react';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { AdminSnippet } from '../../../types/admin';

interface ModerateSnippetModalProps {
  snippet: AdminSnippet | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (snippetId: string, newStatus: AdminSnippet['status']) => void;
}

export const ModerateSnippetModal: React.FC<ModerateSnippetModalProps> = ({ snippet, isOpen, onClose, onUpdateStatus }) => {
  if (!snippet) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Moderate Snippet">
      <div className="flex flex-col py-4">
        <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-slate-50 dark:bg-[#0B1120] border border-slate-100 dark:border-[#1F2937]">
          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">{snippet.title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Current Status: <span className="font-semibold capitalize">{snippet.status}</span></p>
          </div>
        </div>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Choose an action to moderate this snippet. This will immediately update its visibility across the platform.
        </p>

        <div className="flex flex-col gap-3">
          <Button 
            variant="outline" 
            className="w-full justify-start text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/30"
            onClick={() => { onUpdateStatus(snippet.id, 'approved'); onClose(); }}
          >
            <CheckCircle className="w-4 h-4 mr-2" /> Approve & Make Public
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 border-amber-200 dark:border-amber-800/30"
            onClick={() => { onUpdateStatus(snippet.id, 'hidden'); onClose(); }}
          >
            <EyeOff className="w-4 h-4 mr-2" /> Hide from Public (Keep Private)
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 border-rose-200 dark:border-rose-800/30"
            onClick={() => { onUpdateStatus(snippet.id, 'flagged'); onClose(); }}
          >
            <AlertTriangle className="w-4 h-4 mr-2" /> Flag as Inappropriate
          </Button>
        </div>
      </div>
    </Modal>
  );
};
