import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { AuthLayout } from '../../components/auth/AuthLayout';
import { InputField } from '../../components/auth/InputField';
import { SubmitButton } from '../../components/auth/SubmitButton';
import { useToast } from '../../components/ui/Toast';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Password reset requested for:', data.email);
      setIsSubmitted(true);
      toast('Reset link sent to your email.', 'success');
    } catch (error) {
      toast('Failed to send reset link.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Enter your email to receive a password reset link."
    >
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleSubmit(onSubmit)} 
            className="space-y-6"
          >
            <InputField
              label="Email address"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="w-5 h-5" />}
              error={errors.email?.message}
              {...register('email')}
            />

            <SubmitButton isLoading={isLoading} className="mt-4">
              Send Reset Link
            </SubmitButton>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-purple-50 border border-purple-100 p-6 rounded-2xl flex flex-col items-center text-center space-y-4"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <Send className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Check your inbox</h3>
            <p className="text-sm text-slate-600">
              We've sent a password reset link to your email address. Please click the link to reset your password.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="text-purple-600 hover:text-purple-700 font-semibold text-sm mt-2"
            >
              Try another email address
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex justify-center">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>
      </div>
    </AuthLayout>
  );
}
