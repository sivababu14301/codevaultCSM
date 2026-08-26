import React from 'react';

interface ProfileCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ title, description, children }) => {
  return (
    <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
