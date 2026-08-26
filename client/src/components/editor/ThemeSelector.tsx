import React from 'react';
import { Palette } from 'lucide-react';

interface ThemeSelectorProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ theme, setTheme }) => {
  const themes = [
    { value: 'light', label: 'Light' },
    { value: 'vs-dark', label: 'Dark' },
    { value: 'hc-black', label: 'High Contrast' },
  ];

  return (
    <div className="flex items-center gap-2">
      <Palette className="w-4 h-4 text-slate-500" />
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors cursor-pointer"
      >
        {themes.map(t => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>
    </div>
  );
};
