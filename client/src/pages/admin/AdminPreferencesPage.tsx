import React, { useState, useEffect } from 'react';
import { SettingsCard } from '../../components/settings/SettingsCard';
import { DropdownSelect } from '../../components/ui/DropdownSelect';
import { Button } from '../../components/ui/Button';
import { adminService } from '../../services/adminService';
import { useToast } from '../../components/ui/Toast';
import { SlidersHorizontal, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const AdminPreferencesPage: React.FC = () => {
  const [defaultLanguage, setDefaultLanguage] = useState<string>('javascript');
  const [defaultTheme, setDefaultTheme] = useState<string>('light');
  const [languageOptions, setLanguageOptions] = useState<{value: string, label: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();
  const { setTheme } = useTheme();


  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' }
  ];

  useEffect(() => {
    fetchSettingsAndCategories();
  }, []);

  const fetchSettingsAndCategories = async () => {
    try {
      setLoading(true);
      
      const [settingsRes, categoriesRes] = await Promise.all([
        adminService.getSettings(),
        adminService.getCategories() // Using getCategories since we are in Admin
      ]);

      if (settingsRes.defaultProgrammingLanguage) {
        setDefaultLanguage(settingsRes.defaultProgrammingLanguage);
      }
      if (settingsRes.defaultTheme) {
        setDefaultTheme(settingsRes.defaultTheme);
      }

      if (categoriesRes && Array.isArray(categoriesRes)) {
        const activeCategories = categoriesRes.filter((c: any) => c.status === 'active');
        const options = activeCategories.map((cat: any) => ({
          value: cat.name.toLowerCase(),
          label: cat.name
        }));
        setLanguageOptions(options);
      }
    } catch (error) {
      console.error('Failed to fetch admin settings or categories', error);
      showToast('Failed to load settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await adminService.updateSettings({
        defaultProgrammingLanguage: defaultLanguage,
        defaultTheme: defaultTheme
      });
      showToast('Preferences saved successfully.', 'success');
    } catch (error) {
      console.error('Failed to save admin settings', error);
      showToast('Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading settings...</div>;

  return (
    <div className="max-w-4xl mx-auto w-full pb-12">
      <div className="flex flex-col gap-6">
        <SettingsCard
          title="Preferences"
          description="General preferences for the application."
          icon={<SlidersHorizontal className="w-6 h-6" />}
        >
          <DropdownSelect
            label="Default Programming Language"
            description="The default language assigned to new users when they register."
            options={languageOptions}
            value={defaultLanguage}
            onChange={(val) => setDefaultLanguage(val)}
          />
          
          <div className="h-px bg-slate-100 dark:bg-[#1F2937] my-2" />

          <div className="py-2">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Theme Preference</h4>
            <p className="text-sm text-slate-500 mb-4">Choose the global default theme for the application.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'light', label: 'Light', icon: Sun },
                { id: 'dark', label: 'Dark', icon: Moon }
              ].map((option) => {
                const Icon = option.icon;
                const isActive = defaultTheme === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setDefaultTheme(option.id);
                      setTheme(option.id as 'light' | 'dark');
                    }}
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

          <div className="pt-4 flex justify-end">
            <Button 
              onClick={handleSave} 
              disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {saving ? 'Saving...' : 'Save Preferences'}
            </Button>
          </div>
        </SettingsCard>
      </div>
    </div>
  );
};
