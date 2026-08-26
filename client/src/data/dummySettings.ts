import { UserSettings } from '../types/settings';

export const defaultSettings: UserSettings = {
  theme: 'light',
  language: 'en',
  editor: {
    fontSize: 14,
    fontFamily: 'Fira Code',
    tabSize: 2,
    wordWrap: true,
    autoSave: true,
    lineNumbers: true,
    minimap: false,
  },
  preferences: {
    defaultLanguage: 'javascript',
    emailNotifications: true,
    soundEffects: false,
    animations: true,
  },
};

export const dummySettings: UserSettings = { ...defaultSettings };
