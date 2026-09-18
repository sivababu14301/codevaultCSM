import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { KeyRound, Lock } from 'lucide-react';

import { AuthLayout } from '../../components/auth/AuthLayout';
import { InputField } from '../../components/auth/InputField';
import { SubmitButton } from '../../components/auth/SubmitButton';
import { useToast } from '../../components/ui/Toast';
import { api } from '../../services/api';

const step1Schema = z.object({
  rememberAccessKey: z.string().min(1, 'Please enter your Remember Access key'),
});

const step2Schema = z.object({
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"]
});

type Step1FormValues = z.infer<typeof step1Schema>;
type Step2FormValues = z.infer<typeof step2Schema>;

export function ResetPasswordPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [resetAuthToken, setResetAuthToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const form1 = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema)
  });

  const form2 = useForm<Step2FormValues>({
    resolver: zodResolver(step2Schema)
  });

  const onStep1Submit = async (data: Step1FormValues) => {
    setIsLoading(true);
    try {
      const res = await api.post('/auth/verify-reset-access', {
        rememberAccessKey: data.rememberAccessKey
      });
      setResetAuthToken(res.data.resetAuthToken);
      setStep(2);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Invalid Remember Access key.';
      toast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const onStep2Submit = async (data: Step2FormValues) => {
    setIsLoading(true);
    try {
      await api.post('/auth/reset-password', {
        resetAuthToken,
        newPassword: data.newPassword
      });
      
      toast('Password reset successfully.', 'success');
      navigate('/login');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Unable to reset password. Please try again.';
      toast(message, 'error');
      
      // If token expired, force back to step 1
      if (error.response?.status === 400 && message.includes('expired')) {
        setStep(1);
        setResetAuthToken('');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title={step === 1 ? "Reset Password" : "New Password"} 
      subtitle={step === 1 ? "We'll help you get back into your account" : "Enter your new secure password"}
    >
      {step === 1 ? (
        <form onSubmit={form1.handleSubmit(onStep1Submit)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password Remember Access
            </label>
            <div className="flex gap-2 items-start">
              <div className="flex-1">
                <InputField
                  type="text"
                  placeholder="Enter your Remember Access key"
                  icon={<KeyRound className="w-5 h-5" />}
                  error={form1.formState.errors.rememberAccessKey?.message}
                  {...form1.register('rememberAccessKey')}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="h-11 px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 shrink-0"
              >
                {isLoading ? 'Checking...' : 'HIT'}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={form2.handleSubmit(onStep2Submit)} className="space-y-5">
          <InputField
            label="New Password"
            type="password"
            placeholder="•••••••••••"
            icon={<Lock className="w-5 h-5" />}
            error={form2.formState.errors.newPassword?.message}
            {...form2.register('newPassword')}
          />

          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Confirm new password"
            icon={<Lock className="w-5 h-5" />}
            error={form2.formState.errors.confirmPassword?.message}
            {...form2.register('confirmPassword')}
          />

          <SubmitButton isLoading={isLoading} className="mt-4">
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </SubmitButton>
        </form>
      )}

      <p className="mt-8 text-center text-sm font-medium text-slate-600">
        Remember your password?{' '}
        <Link to="/login" className="text-purple-600 hover:text-purple-700 font-bold transition-colors">
          Back to Login
        </Link>
      </p>
    </AuthLayout>
  );
}
