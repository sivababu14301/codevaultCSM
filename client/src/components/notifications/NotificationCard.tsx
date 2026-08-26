import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, RefreshCw, Zap, Check, Trash2 } from 'lucide-react';
import { Notification } from '../../types/notifications';

interface NotificationCardProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onMarkRead, onDelete }) => {
  const getIcon = () => {
    switch (notification.category) {
      case 'security':
        return <ShieldAlert className="w-5 h-5 text-rose-500" />;
      case 'update':
        return <RefreshCw className="w-5 h-5 text-blue-500" />;
      case 'feature':
        return <Zap className="w-5 h-5 text-purple-500" />;
      default:
        return <Zap className="w-5 h-5 text-purple-500" />;
    }
  };

  const getBackground = () => {
    if (notification.isRead) return 'bg-white';
    return 'bg-purple-50/50';
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`relative p-5 rounded-[20px] border border-slate-100 shadow-sm hover:shadow-md transition-all group ${getBackground()}`}
    >
      {!notification.isRead && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-500 rounded-r-full" />
      )}
      
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className={`text-sm font-semibold truncate ${notification.isRead ? 'text-slate-700' : 'text-slate-900'}`}>
              {notification.title}
            </h4>
            <span className="text-xs text-slate-400 whitespace-nowrap">
              {getTimeAgo(notification.createdAt)}
            </span>
          </div>
          <p className="text-sm text-slate-500 line-clamp-2">
            {notification.message}
          </p>
        </div>
        
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {!notification.isRead && (
            <button
              onClick={() => onMarkRead(notification.id)}
              className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              title="Mark as read"
            >
              <Check className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onDelete(notification.id)}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Delete notification"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
