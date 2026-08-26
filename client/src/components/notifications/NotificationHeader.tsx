import React from 'react';
import { Settings, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface NotificationHeaderProps {
  unreadCount: number;
  onMarkAllRead: () => void;
  onToggleSettings: () => void;
  showSettings: boolean;
}

export const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  unreadCount,
  onMarkAllRead,
  onToggleSettings,
  showSettings,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          Notifications
          {unreadCount > 0 && (
            <span className="flex items-center justify-center bg-purple-100 text-purple-700 text-sm font-bold px-2.5 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </h1>
        <p className="text-slate-500 mt-1">
          Stay updated with alerts, snippet activity, and new features.
        </p>
      </div>

      <div className="flex items-center gap-3">
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            onClick={onMarkAllRead}
            className="text-slate-600 hover:text-purple-600 hover:bg-purple-50 flex items-center gap-2 transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="hidden sm:inline">Mark all as read</span>
          </Button>
        )}
        
        <Button
          variant={showSettings ? 'primary' : 'ghost'}
          onClick={onToggleSettings}
          className={`flex items-center gap-2 transition-all ${
            showSettings 
              ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Settings className={`w-4 h-4 ${showSettings ? 'animate-spin-slow' : ''}`} />
          <span className="hidden sm:inline">Settings</span>
        </Button>
      </div>
    </div>
  );
};
