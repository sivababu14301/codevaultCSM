import React from 'react';
import { Palette, Sun, Moon, Monitor } from 'lucide-react';
import { SettingsCard } from './SettingsCard';
import { ThemeOption } from '../../types/settings';

interface ThemeSettingsProps {
  theme: ThemeOption;
  onChange: (theme: ThemeOption) => void;
}

export const ThemeSettings: React.FC<ThemeSettingsProps> = ({ theme, onChange }) => {
  const options = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
  ] as const;

  return (
    <SettingsCard
      title="Appearance"
      description="Customize how CodeVault looks on your device."
      icon={<Palette className="w-6 h-6" />}
    >
      <div className="py-2">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Theme Preference</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {options.map((option) => {
            const Icon = option.icon;
            const isActive = theme === option.id;
            return (
              <button
                key={option.id}
                onClick={() => onChange(option.id)}
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 ${
                  isActive
                    ? 'border-purple-600 dark:border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                    : 'border-slate-100 dark:border-[#1F2937] bg-white dark:bg-[#0B1120] text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-[#111827]'
                }`}
              >
                <Icon className={`w-8 h-8 ${isActive ? 'text-purple-600' : 'text-slate-400'}`} />
                <span className="font-semibold text-sm">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </SettingsCard>
  );
};
