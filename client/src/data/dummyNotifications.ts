import { Notification, NotificationSettings } from '../types/notifications';

export const dummyNotifications: Notification[] = [
  {
    id: '1',
    title: 'Security Alert: New Login',
    message: 'We noticed a new login to your account from a new device in San Francisco, CA.',
    category: 'security',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
  },
  {
    id: '2',
    title: 'Snippet Updated: React Auth Hook',
    message: 'Your snippet "React Auth Hook" was successfully updated.',
    category: 'update',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: '3',
    title: 'New Feature: AI Snippet Generation',
    message: 'You can now generate code snippets using our new AI integration. Try it out now!',
    category: 'feature',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: '4',
    title: 'Security Policy Update',
    message: 'We have updated our security policies. Please review the changes in your account settings.',
    category: 'security',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
  },
  {
    id: '5',
    title: 'Snippet Shared',
    message: 'User "alex_dev" shared a snippet with you: "Tailwind UI Components".',
    category: 'update',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
  }
];

export const dummyNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  securityAlerts: true,
  snippetUpdates: true,
  newFeatures: false,
};
