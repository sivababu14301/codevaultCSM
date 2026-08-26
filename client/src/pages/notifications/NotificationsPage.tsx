import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { NotificationHeader } from '../../components/notifications/NotificationHeader';
import { NotificationFilter, FilterOption } from '../../components/notifications/NotificationFilter';
import { NotificationSettings } from '../../components/notifications/NotificationSettings';
import { NotificationList } from '../../components/notifications/NotificationList';
import { dummyNotifications, dummyNotificationSettings } from '../../data/dummyNotifications';
import { NotificationSettings as SettingsType } from '../../types/notifications';

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [settings, setSettings] = useState<SettingsType>(dummyNotificationSettings);
  const [filter, setFilter] = useState<FilterOption>('all');
  const [showSettings, setShowSettings] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification => {
      if (filter === 'all') return true;
      if (filter === 'unread') return !notification.isRead;
      return notification.category === filter;
    });
  }, [notifications, filter]);

  const handleMarkRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
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

      <div className="bg-white rounded-[24px] p-6 border border-slate-200 shadow-sm min-h-[500px]">
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
