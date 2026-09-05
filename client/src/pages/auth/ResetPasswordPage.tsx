import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Trigger Vite HMR
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock } from 'lucide-react';

import { AuthLayout } from '../../components/auth/AuthLayout';
import { InputField } from '../../components/auth/InputField';
import { SubmitButton } from '../../components/auth/SubmitButton';
import { useToast } from '../../components/ui/Toast';
import { api } from '../../services/api';

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema)
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setIsLoading(true);
    try {
      if (!token) {
        toast('Invalid password reset link.', 'error');
        return;
      }
      
      await api.put(`/auth/reset-password/${token}`, { password: data.password });
      
      console.log('Password reset for token:', token);
      toast('Password has been reset successfully!', 'success');
      navigate('/login');
    } catch (error: any) {
      toast(error.response?.data?.message || 'Failed to reset password. The link might be expired.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Set new password" 
      subtitle="Please enter your new password below."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <InputField
          label="New Password"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="w-5 h-5" />}
          error={errors.password?.message}
          {...register('password')}
        />

        <InputField
          label="Confirm New Password"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="w-5 h-5" />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <SubmitButton isLoading={isLoading} className="mt-4">
          Reset Password
        </SubmitButton>
      </form>
    </AuthLayout>
  );
}
