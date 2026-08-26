import React from 'react';
import { FileText, FileJson, FileType2 } from 'lucide-react';

export type ExportFormat = 'pdf' | 'txt' | 'json';

interface ExportOptionsProps {
  format: ExportFormat;
  setFormat: (format: ExportFormat) => void;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({ format, setFormat }) => {
  const formats: { value: ExportFormat; label: string; description: string; icon: React.ReactNode }[] = [
    {
      value: 'pdf',
      label: 'PDF Document',
      description: 'Best for sharing and printing.',
      icon: <FileType2 className="h-6 w-6" />
    },
    {
      value: 'txt',
      label: 'Text File',
      description: 'Simple, raw text format.',
      icon: <FileText className="h-6 w-6" />
    },
    {
      value: 'json',
      label: 'JSON Data',
      description: 'Great for backups and parsing.',
      icon: <FileJson className="h-6 w-6" />
    }
  ];

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">Export Format</label>
      <div className="grid grid-cols-3 gap-3">
        {formats.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFormat(f.value)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
              format === f.value
                ? 'border-[#6D5DF6] bg-[#6D5DF6]/5 text-[#6D5DF6]'
                : 'border-gray-200 hover:border-gray-300 text-gray-500 hover:bg-gray-50'
            }`}
          >
            <div className={`mb-2 ${format === f.value ? 'text-[#6D5DF6]' : 'text-gray-400'}`}>
              {f.icon}
            </div>
            <span className="font-semibold text-xs md:text-sm">{f.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
