import React, { useRef, useState } from 'react';
import { Camera, Trash2 } from 'lucide-react';
import { DeleteAvatarModal } from './DeleteAvatarModal';

interface AvatarUploadProps {
  currentAvatar?: string;
  name: string;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({ currentAvatar, name }) => {
  const [avatar, setAvatar] = useState<string | null>(currentAvatar || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
      <div className="relative group">
        <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-[#6D5DF6] flex items-center justify-center">
          {avatar ? (
            <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl font-bold text-white">{getInitials(name)}</span>
          )}
        </div>
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-100 text-gray-600 hover:text-[#6D5DF6] transition-colors"
        >
          <Camera className="w-4 h-4" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
        <h3 className="text-lg font-bold text-gray-900">Profile Picture</h3>
        <p className="text-sm text-gray-500 mb-4 max-w-xs">
          Upload a high-res picture. Recommended size: 256x256px.
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
          >
            Change Picture
          </button>
          {avatar && (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              title="Remove Picture"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <DeleteAvatarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setAvatar(null);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};
