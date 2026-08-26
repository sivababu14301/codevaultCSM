import React from 'react';
import { Trash2 } from 'lucide-react';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { AdminSnippet } from '../../../types/admin';

interface DeleteSnippetModalProps {
  snippet: AdminSnippet | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (snippetId: string) => void;
}

export const DeleteSnippetModal: React.FC<DeleteSnippetModalProps> = ({ snippet, isOpen, onClose, onConfirm }) => {
  if (!snippet) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Snippet">
      <div className="flex flex-col items-center text-center py-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center mb-4 text-rose-500">
          <Trash2 className="w-8 h-8" />
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Delete Snippet?
        </h3>
        
        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
          Are you completely sure you want to delete <span className="font-semibold text-slate-700 dark:text-slate-300">"{snippet.title}"</span>? 
          This action is permanent and cannot be undone.
        </p>

        <div className="flex w-full gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="flex-1 bg-rose-500 hover:bg-rose-600 text-white border-transparent"
            onClick={() => {
              onConfirm(snippet.id);
              onClose();
            }}
          >
            Yes, Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
