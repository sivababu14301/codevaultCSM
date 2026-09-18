import React from 'react';
import { ThemeSelector } from './ThemeSelector';
import { FontSizeSelector } from './FontSizeSelector';
import { LanguageSelector } from './LanguageSelector';
import { FullscreenButton } from './FullscreenButton';
import { AutoSaveIndicator, SaveStatus } from './AutoSaveIndicator';
import { CopyButton } from './CopyButton';
import { EditorSettings } from './EditorSettings';

interface EditorToolbarProps {
  language: string;
  setLanguage: (lang: string) => void;
  availableLanguages?: string[];
  theme: string;
  setTheme: (theme: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  wordWrap: boolean;
  setWordWrap: (val: boolean) => void;
  minimap: boolean;
  setMinimap: (val: boolean) => void;
  lineNumbers: boolean;
  setLineNumbers: (val: boolean) => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  saveStatus: SaveStatus;
  getText: () => string;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = (props) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-white/80 backdrop-blur-md border-b border-slate-200 z-10 sticky top-0">
      <div className="flex flex-wrap items-center gap-3">
        <LanguageSelector language={props.language} setLanguage={props.setLanguage} availableLanguages={props.availableLanguages} />
        <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
        <ThemeSelector theme={props.theme} setTheme={props.setTheme} />
        <FontSizeSelector fontSize={props.fontSize} setFontSize={props.setFontSize} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <AutoSaveIndicator status={props.saveStatus} />
        <div className="w-px h-6 bg-slate-200 hidden sm:block mx-1"></div>
        <CopyButton getText={props.getText} />
        <EditorSettings 
          wordWrap={props.wordWrap} setWordWrap={props.setWordWrap}
          minimap={props.minimap} setMinimap={props.setMinimap}
          lineNumbers={props.lineNumbers} setLineNumbers={props.setLineNumbers}
        />
        <FullscreenButton isFullscreen={props.isFullscreen} toggleFullscreen={props.toggleFullscreen} />
      </div>
    </div>
  );
};
