import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { NotificationHeader } from '../../components/notifications/NotificationHeader';
import { NotificationFilter, FilterOption } from '../../components/notifications/NotificationFilter';
import { NotificationSettings } from '../../components/notifications/NotificationSettings';
import { NotificationList } from '../../components/notifications/NotificationList';
import { dummyNotificationSettings } from '../../data/dummyNotifications';
import { NotificationSettings as SettingsType } from '../../types/notifications';
import { api } from '../../services/api';

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [settings, setSettings] = useState<SettingsType>(dummyNotificationSettings);
  const [filter, setFilter] = useState<FilterOption>('all');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      // map the real notifications to the UI format expected by NotificationList
      const mapped = res.data.map((n: any) => ({
        id: n._id,
        title: n.title,
        message: n.message,
        category: n.type || 'system',
        isRead: n.isRead,
        timestamp: n.createdAt,
        author: {
          name: 'CodeVault Admin',
          avatar: undefined
        }
      }));
      setNotifications(mapped);
    } catch (error) {
      console.error('Failed to fetch notifications', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification => {
      if (filter === 'all') return true;
      if (filter === 'unread') return !notification.isRead;
      return notification.category === filter;
    });
  }, [notifications, filter]);

  const handleMarkRead = async (id: string) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(prev => 
        prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error('Failed to mark notification as read', error);
    }
  };

  const handleMarkAllRead = async () => {
    // We could optimize this by creating a markAllRead endpoint, 
    // but for now we update UI and silently attempt to update server.
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    
    // Attempt to update unread on server
    const unreadIds = notifications.filter(n => !n.isRead).map(n => n.id);
    for (const id of unreadIds) {
      try {
        await api.put(`/notifications/${id}/read`);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    // Optional: implement real deletion on backend if required. 
    // Usually for broadcast messages we don't delete them, just hide them.
  };

  const handleUpdateSetting = (key: keyof SettingsType, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto w-full pb-12">
      <NotificationHeader
        unreadCount={unreadCount}
        onMarkAllRead={handleMarkAllRead}
        onToggleSettings={() => setShowSettings(!showSettings)}
        showSettings={showSettings}
      />

      <AnimatePresence>
        {showSettings && (
          <NotificationSettings
            settings={settings}
            onUpdate={handleUpdateSetting}
          />
        )}
      </AnimatePresence>

      <div className="bg-white dark:bg-[#111827] rounded-[24px] p-6 border border-slate-200 dark:border-[#1F2937] shadow-sm min-h-[500px]">
        <NotificationFilter
          currentFilter={filter}
          onFilterChange={setFilter}
        />
        
        <div className="mt-6">
          <NotificationList
            notifications={filteredNotifications}
            onMarkRead={handleMarkRead}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};
