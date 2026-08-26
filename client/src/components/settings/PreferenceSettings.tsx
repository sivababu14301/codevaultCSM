import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { SettingsCard } from './SettingsCard';
import { ToggleSwitch } from '../ui/ToggleSwitch';
import { DropdownSelect } from '../ui/DropdownSelect';
import { PreferenceSettings as PreferenceSettingsType } from '../../types/settings';

interface PreferenceSettingsProps {
  settings: PreferenceSettingsType;
  onChange: (key: keyof PreferenceSettingsType, value: any) => void;
}

export const PreferenceSettings: React.FC<PreferenceSettingsProps> = ({ settings, onChange }) => {
  const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
  ];

  return (
    <SettingsCard
      title="Preferences"
      description="General preferences for the application."
      icon={<SlidersHorizontal className="w-6 h-6" />}
    >
      <DropdownSelect
        label="Default Programming Language"
        description="The default language when creating a new snippet."
        options={languageOptions}
        value={settings.defaultLanguage}
        onChange={(val) => onChange('defaultLanguage', val)}
      />
      <ToggleSwitch
        label="Email Notifications"
        description="Receive updates and digests via email."
        checked={settings.emailNotifications}
        onChange={(val) => onChange('emailNotifications', val)}
      />
      <ToggleSwitch
        label="Sound Effects"
        description="Play a subtle sound when performing actions."
        checked={settings.soundEffects}
        onChange={(val) => onChange('soundEffects', val)}
      />
      <ToggleSwitch
        label="Animations"
        description="Enable smooth UI animations and transitions."
        checked={settings.animations}
        onChange={(val) => onChange('animations', val)}
      />
    </SettingsCard>
  );
};
