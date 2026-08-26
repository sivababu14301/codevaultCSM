import React from 'react';
import { ExportFormat } from './ExportOptions';

interface FileNameInputProps {
  fileName: string;
  setFileName: (name: string) => void;
  format: ExportFormat;
}

export const FileNameInput: React.FC<FileNameInputProps> = ({ fileName, setFileName, format }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">File Name</label>
      <div className="flex items-stretch shadow-sm rounded-xl overflow-hidden border border-gray-200 focus-within:border-[#6D5DF6] focus-within:ring-1 focus-within:ring-[#6D5DF6] transition-all">
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="snippet-export"
          className="flex-grow bg-white border-none focus:ring-0 focus:outline-none px-4 py-2.5 text-sm text-gray-900"
        />
        <div className="bg-gray-50 px-4 py-2.5 border-l border-gray-200 flex items-center justify-center text-sm font-medium text-gray-500">
          .{format}
        </div>
      </div>
    </div>
  );
};
