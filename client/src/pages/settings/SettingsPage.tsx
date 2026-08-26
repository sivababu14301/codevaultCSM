import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { ThemeSettings } from '../../components/settings/ThemeSettings';
import { LanguageSettings } from '../../components/settings/LanguageSettings';
import { EditorSettings } from '../../components/settings/EditorSettings';
import { PreferenceSettings } from '../../components/settings/PreferenceSettings';
import { ResetSettingsModal } from '../../components/settings/ResetSettingsModal';
import { dummySettings, defaultSettings } from '../../data/dummySettings';
import { UserSettings } from '../../types/settings';
import { useTheme } from '../../context/ThemeContext';

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>(dummySettings);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleUpdateEditor = (key: keyof UserSettings['editor'], value: any) => {
    setSettings(prev => ({
      ...prev,
      editor: { ...prev.editor, [key]: value }
    }));
  };

  const handleUpdatePreference = (key: keyof UserSettings['preferences'], value: any) => {
    setSettings(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value }
    }));
  };

  const handleResetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <div className="max-w-4xl mx-auto w-full pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors duration-200">
            Settings
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage your account settings and preferences.
          </p>
        </div>
        
        <Button
          variant="ghost"
          onClick={() => setIsResetModalOpen(true)}
          className="text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center gap-2 transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset to Default</span>
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        <ThemeSettings
          theme={theme}
          onChange={(val) => setTheme(val)}
        />
        
        <LanguageSettings
          language={settings.language}
          onChange={(val) => setSettings(prev => ({ ...prev, language: val }))}
        />
        
        <EditorSettings
          settings={settings.editor}
          onChange={handleUpdateEditor}
        />
        
        <PreferenceSettings
          settings={settings.preferences}
          onChange={handleUpdatePreference}
        />
      </div>

      <ResetSettingsModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetSettings}
      />
    </div>
  );
};
