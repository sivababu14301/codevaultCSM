export type NotificationCategory = 'security' | 'update' | 'feature';

export interface Notification {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  securityAlerts: boolean;
  snippetUpdates: boolean;
  newFeatures: boolean;
}
