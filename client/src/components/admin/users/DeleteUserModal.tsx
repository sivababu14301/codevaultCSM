import React from 'react';
import { Trash2 } from 'lucide-react';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { AdminUser } from '../../../types/admin';

interface DeleteUserModalProps {
  user: AdminUser | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (userId: string) => void;
}

export const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ user, isOpen, onClose, onConfirm }) => {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete User">
      <div className="flex flex-col items-center text-center py-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center mb-4 text-rose-500">
          <Trash2 className="w-8 h-8" />
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Delete Account?
        </h3>
        
        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
          Are you completely sure you want to delete <span className="font-semibold text-slate-700 dark:text-slate-300">{user.name}</span>? 
          This action is permanent and will remove all their snippets and data.
        </p>

        <div className="flex w-full gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="flex-1 bg-rose-500 hover:bg-rose-600 text-white border-transparent"
            onClick={() => {
              onConfirm(user.id);
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
