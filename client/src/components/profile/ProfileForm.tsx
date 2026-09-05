import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SaveButton } from './SaveButton';

import { AvatarUpload } from './AvatarUpload';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  bio: z.string().max(160, 'Bio must be less than 160 characters').optional(),
  location: z.string().optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  skills: z.string().optional(),
  avatarUrl: z.string().nullable().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

export const ProfileForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { user, updateUser } = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty }, reset, watch, setValue } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.name || '',
      username: user?.username || '',
      email: user?.email || '',
      bio: user?.bio || '',
      location: user?.location || '',
      website: user?.website || '',
      skills: user?.skills ? user.skills.join(', ') : '',
      avatarUrl: user?.avatarUrl || null,
    }
  });

  const avatarUrl = watch('avatarUrl');

  // Re-initialize form when user data finishes loading from API
  React.useEffect(() => {
    if (user) {
      reset({
        fullName: user.name || '',
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        skills: user.skills ? user.skills.join(', ') : '',
        avatarUrl: user.avatarUrl || null,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    setApiError(null);
    try {
      const payload = {
        name: data.fullName,
        username: data.username,
        email: data.email,
        bio: data.bio,
        location: data.location,
        website: data.website,
        skills: data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
        avatarUrl: data.avatarUrl,
      };
      
      const res = await api.put('/auth/profile', payload);
      
      // Update local context
      updateUser(res.data);
      
      // Reset form to update isDirty state
      reset(data);
      
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error: any) {
      setApiError('Failed to update profile. Please try again.');
      console.error(error);
    }
  };

  const inputClasses = "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#6D5DF6] focus:ring-1 focus:ring-[#6D5DF6] transition-all bg-gray-50 focus:bg-white text-sm";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="relative">
      {isSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50 animate-bounce">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span className="font-medium">Profile updated successfully.</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <AvatarUpload 
          name={watch('fullName') || user?.name || "Developer"} 
          currentAvatar={avatarUrl} 
          onAvatarChange={(newAvatar) => {
            setValue('avatarUrl', newAvatar, { shouldDirty: true });
          }} 
        />
        {apiError && (
        <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm">
          {apiError}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClasses}>Full Name</label>
          <input
            {...register('fullName')}
            className={inputClasses}
            placeholder="John Doe"
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
        </div>

        <div>
          <label className={labelClasses}>Username</label>
          <input
            {...register('username')}
            className={inputClasses}
            placeholder="johndoe"
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClasses}>Email Address</label>
        <input
          {...register('email')}
          className={inputClasses}
          placeholder="john@example.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className={labelClasses}>Bio</label>
        <textarea
          {...register('bio')}
          rows={3}
          className={`${inputClasses} resize-none`}
          placeholder="Tell us a little about yourself"
        />
        <div className="flex justify-between mt-1">
          {errors.bio ? (
            <p className="text-red-500 text-xs">{errors.bio.message}</p>
          ) : (
            <p className="text-gray-400 text-xs">Maximum 160 characters</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClasses}>Location</label>
          <input
            {...register('location')}
            className={inputClasses}
            placeholder="City, Country"
          />
        </div>

        <div>
          <label className={labelClasses}>Website</label>
          <input
            {...register('website')}
            className={inputClasses}
            placeholder="https://yourwebsite.com"
          />
          {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClasses}>Skills / Programming Languages</label>
        <input
          {...register('skills')}
          className={inputClasses}
          placeholder="e.g. JavaScript, React, Node.js"
        />
        <p className="text-gray-400 text-xs mt-1">Separate skills with commas</p>
      </div>

      <div className="pt-4 flex justify-end">
        <SaveButton isSubmitting={isSubmitting} isSuccess={isSuccess} disabled={!isDirty} />
      </div>
      </form>
    </div>
  );
};
