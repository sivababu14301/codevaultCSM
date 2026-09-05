import React from 'react';
import { User } from 'lucide-react';
import { ProfileCard } from '../../components/profile/ProfileCard';
import { ProfileForm } from '../../components/profile/ProfileForm';
import { ChangePasswordForm } from '../../components/profile/ChangePasswordForm';
import { AccountInfo } from '../../components/profile/AccountInfo';
import { ProfileStats } from '../../components/profile/ProfileStats';
import { useAuth } from '../../hooks/useAuth';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          Profile Settings
          <User className="h-6 w-6 text-[#6D5DF6]" />
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your account details, security, and view your activity statistics.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Main Settings */}
        <div className="flex-grow lg:w-2/3 space-y-6">
          <ProfileCard 
            title="General Information" 
            description="Update your basic profile information and how others see you."
          >
            <ProfileForm />
          </ProfileCard>

          <ProfileCard 
            title="Security" 
            description="Update your password to keep your account secure."
          >
            <ChangePasswordForm />
          </ProfileCard>
        </div>

        {/* Right Column - Stats & Info */}
        <div className="lg:w-1/3 space-y-6">
          <ProfileCard title="Activity Stats">
            <ProfileStats />
          </ProfileCard>

          <ProfileCard title="Account Info">
            <AccountInfo />
          </ProfileCard>
        </div>
      </div>
    </div>
  );
};
