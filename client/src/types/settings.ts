export type ThemeOption = 'light' | 'dark';
export type LanguageOption = 'en' | 'ta' | 'hi' | 'es';

export interface EditorSettings {
  fontSize: number;
  fontFamily: string;
  tabSize: number;
  wordWrap: boolean;
  autoSave: boolean;
  lineNumbers: boolean;
  minimap: boolean;
}

export interface PreferenceSettings {
  defaultLanguage: string;
  emailNotifications: boolean;
  soundEffects: boolean;
  animations: boolean;
}

export interface UserSettings {
  theme: ThemeOption;
  language: LanguageOption;
  editor: EditorSettings;
  preferences: PreferenceSettings;
}
