import React from 'react';
import { motion } from 'framer-motion';
import { NotificationSettings as SettingsType } from '../../types/notifications';

interface NotificationSettingsProps {
  settings: SettingsType;
  onUpdate: (key: keyof SettingsType, value: boolean) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  settings,
  onUpdate,
}) => {
  const Toggle = ({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: () => void }) => (
    <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
      <div>
        <h4 className="text-sm font-semibold text-slate-900">{label}</h4>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
          checked ? 'bg-purple-600' : 'bg-slate-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-white rounded-[20px] p-6 border border-slate-200 shadow-sm mb-6 overflow-hidden"
    >
      <h3 className="text-lg font-bold text-slate-900 mb-4">Notification Preferences</h3>
      
      <div className="flex flex-col">
        <Toggle
          label="Email Notifications"
          description="Receive daily summaries and important alerts via email."
          checked={settings.emailNotifications}
          onChange={() => onUpdate('emailNotifications', !settings.emailNotifications)}
        />
        <Toggle
          label="Security Alerts"
          description="Get notified about new logins and security updates."
          checked={settings.securityAlerts}
          onChange={() => onUpdate('securityAlerts', !settings.securityAlerts)}
        />
        <Toggle
          label="Snippet Updates"
          description="Notifications when someone updates or comments on your snippets."
          checked={settings.snippetUpdates}
          onChange={() => onUpdate('snippetUpdates', !settings.snippetUpdates)}
        />
        <Toggle
          label="New Features"
          description="Stay in the loop about our latest product updates."
          checked={settings.newFeatures}
          onChange={() => onUpdate('newFeatures', !settings.newFeatures)}
        />
      </div>
    </motion.div>
  );
};
