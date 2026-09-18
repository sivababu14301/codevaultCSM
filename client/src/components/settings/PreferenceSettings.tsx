import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { SettingsCard } from './SettingsCard';
import { ToggleSwitch } from '../ui/ToggleSwitch';
import { DropdownSelect } from '../ui/DropdownSelect';
import { PreferenceSettings as PreferenceSettingsType } from '../../types/settings';
import { api } from '../../services/api';

interface PreferenceSettingsProps {
  settings: PreferenceSettingsType;
  onChange: (key: keyof PreferenceSettingsType, value: any) => void;
}

export const PreferenceSettings: React.FC<PreferenceSettingsProps> = ({ settings, onChange }) => {
  const [languageOptions, setLanguageOptions] = React.useState<{value: string, label: string}[]>([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        if (res.data && Array.isArray(res.data)) {
          // Normal users hit /categories which returns only active categories
          const options = res.data.map((cat: any) => ({
            value: cat.name.toLowerCase(),
            label: cat.name
          }));
          setLanguageOptions(options);
        }
      } catch (error) {
        console.error('Failed to fetch categories for preferences', error);
      }
    };
    fetchCategories();
  }, []);

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
