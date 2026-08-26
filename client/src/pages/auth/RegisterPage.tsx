import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, User } from 'lucide-react';

import { AuthLayout } from '../../components/auth/AuthLayout';
import { InputField } from '../../components/auth/InputField';
import { SubmitButton } from '../../components/auth/SubmitButton';
import { SocialLogin } from '../../components/auth/SocialLogin';
import { useToast } from '../../components/ui/Toast';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

// Form Validation Schema
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema)
  });

  const { } = useAuth();
  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      await api.post('/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password
      });
      
      toast('Account created successfully. Please log in.', 'success');
      navigate('/login');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create account.';
      toast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Start organizing your code snippets today."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <InputField
          label="Full Name"
          type="text"
          placeholder="John Doe"
          icon={<User className="w-5 h-5" />}
          error={errors.name?.message}
          {...register('name')}
        />

        <InputField
          label="Email address"
          type="email"
          placeholder="you@example.com"
          icon={<Mail className="w-5 h-5" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="w-5 h-5" />}
          error={errors.password?.message}
          {...register('password')}
        />

        <InputField
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="w-5 h-5" />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <SubmitButton isLoading={isLoading} className="mt-4">
          Create Account
        </SubmitButton>
      </form>

      <SocialLogin />

      <p className="mt-8 text-center text-sm font-medium text-slate-600">
        Already have an account?{' '}
        <Link to="/login" className="text-purple-600 hover:text-purple-700 font-bold transition-colors">
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}
