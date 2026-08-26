import React from 'react';
import { Globe } from 'lucide-react';
import { SettingsCard } from './SettingsCard';
import { DropdownSelect } from '../ui/DropdownSelect';
import { LanguageOption } from '../../types/settings';

interface LanguageSettingsProps {
  language: LanguageOption;
  onChange: (language: LanguageOption) => void;
}

export const LanguageSettings: React.FC<LanguageSettingsProps> = ({ language, onChange }) => {
  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'ta', label: 'Tamil' },
    { value: 'hi', label: 'Hindi' },
    { value: 'es', label: 'Spanish' },
  ];

  return (
    <SettingsCard
      title="Language"
      description="Select your preferred language for the CodeVault interface."
      icon={<Globe className="w-6 h-6" />}
    >
      <DropdownSelect
        label="Display Language"
        description="This will change the language of all menus and options."
        options={languageOptions}
        value={language}
        onChange={(val) => onChange(val as LanguageOption)}
      />
    </SettingsCard>
  );
};
