import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Notification } from '../../types/notifications';
import { NotificationCard } from './NotificationCard';
import { EmptyNotifications } from './EmptyNotifications';

interface NotificationListProps {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onMarkRead,
  onDelete
}) => {
  if (notifications.length === 0) {
    return <EmptyNotifications />;
  }

  return (
    <div className="flex flex-col gap-3">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onMarkRead={onMarkRead}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
