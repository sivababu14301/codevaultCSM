import React from 'react';
import { Code2 } from 'lucide-react';
import { SettingsCard } from './SettingsCard';
import { ToggleSwitch } from '../ui/ToggleSwitch';
import { DropdownSelect } from '../ui/DropdownSelect';
import { EditorSettings as EditorSettingsType } from '../../types/settings';

interface EditorSettingsProps {
  settings: EditorSettingsType;
  onChange: (key: keyof EditorSettingsType, value: any) => void;
}

export const EditorSettings: React.FC<EditorSettingsProps> = ({ settings, onChange }) => {
  const fontFamilies = [
    { value: 'Fira Code', label: 'Fira Code' },
    { value: 'JetBrains Mono', label: 'JetBrains Mono' },
    { value: 'Consolas', label: 'Consolas' },
    { value: 'Monaco', label: 'Monaco' },
  ];

  const fontSizes = [
    { value: 12, label: '12px' },
    { value: 14, label: '14px' },
    { value: 16, label: '16px' },
    { value: 18, label: '18px' },
    { value: 20, label: '20px' },
  ];

  const tabSizes = [
    { value: 2, label: '2 Spaces' },
    { value: 4, label: '4 Spaces' },
    { value: 8, label: '8 Spaces' },
  ];

  return (
    <SettingsCard
      title="Editor Settings"
      description="Personalize your code editing experience."
      icon={<Code2 className="w-6 h-6" />}
    >
      <DropdownSelect
        label="Font Family"
        description="Choose the font for the code editor."
        options={fontFamilies}
        value={settings.fontFamily}
        onChange={(val) => onChange('fontFamily', val)}
      />
      <DropdownSelect
        label="Font Size"
        options={fontSizes}
        value={settings.fontSize}
        onChange={(val) => onChange('fontSize', val)}
      />
      <DropdownSelect
        label="Tab Size"
        options={tabSizes}
        value={settings.tabSize}
        onChange={(val) => onChange('tabSize', val)}
      />
      <ToggleSwitch
        label="Word Wrap"
        description="Wrap lines that exceed the editor width."
        checked={settings.wordWrap}
        onChange={(val) => onChange('wordWrap', val)}
      />
      <ToggleSwitch
        label="Auto Save"
        description="Automatically save changes as you type."
        checked={settings.autoSave}
        onChange={(val) => onChange('autoSave', val)}
      />
      <ToggleSwitch
        label="Line Numbers"
        description="Show line numbers in the editor gutter."
        checked={settings.lineNumbers}
        onChange={(val) => onChange('lineNumbers', val)}
      />
      <ToggleSwitch
        label="Minimap"
        description="Show a miniature overview of the code."
        checked={settings.minimap}
        onChange={(val) => onChange('minimap', val)}
      />
    </SettingsCard>
  );
};
