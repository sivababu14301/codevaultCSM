import React from 'react';
import { AlertTriangle, ShieldBan } from 'lucide-react';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { AdminUser } from '../../../types/admin';

interface BlockUserModalProps {
  user: AdminUser | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (user: AdminUser) => void;
}

export const BlockUserModal: React.FC<BlockUserModalProps> = ({ user, isOpen, onClose, onConfirm }) => {
  if (!user) return null;

  const isBlocked = user.status === 'suspended';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isBlocked ? "Unblock User" : "Suspend User"}>
      <div className="flex flex-col items-center text-center py-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
          isBlocked 
            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500'
            : 'bg-amber-50 dark:bg-amber-900/20 text-amber-500'
        }`}>
          {isBlocked ? <ShieldBan className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {isBlocked ? 'Restore Access?' : 'Suspend Account?'}
        </h3>
        
        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
          {isBlocked 
            ? `Are you sure you want to restore access for ${user.name}? They will be able to log in and create snippets again.`
            : `Are you sure you want to suspend ${user.name}? They will no longer be able to log in or interact with the platform.`
          }
        </p>

        <div className="flex w-full gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className={`flex-1 text-white ${
              isBlocked 
                ? 'bg-emerald-600 hover:bg-emerald-700' 
                : 'bg-amber-500 hover:bg-amber-600'
            }`}
            onClick={() => {
              onConfirm(user);
              onClose();
            }}
          >
            {isBlocked ? 'Yes, Unblock' : 'Yes, Suspend'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
