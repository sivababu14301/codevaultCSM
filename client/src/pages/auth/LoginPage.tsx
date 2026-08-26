import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock } from 'lucide-react';

import { AuthLayout } from '../../components/auth/AuthLayout';
import { InputField } from '../../components/auth/InputField';
import { SubmitButton } from '../../components/auth/SubmitButton';
import { SocialLogin } from '../../components/auth/SocialLogin';
import { useToast } from '../../components/ui/Toast';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false
    }
  });

  const { login } = useAuth();

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      const res = await api.post('/auth/login', {
        email: data.email,
        password: data.password
      });
      
      // The backend returns a user object and a JWT token. Update context
      login(res.data.token, res.data);

      toast('Successfully logged in!', 'success');
      
      if (res.data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Invalid email or password.';
      toast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Enter your credentials to access your vault."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
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

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500 transition-colors"
              {...register('rememberMe')}
            />
            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
              Remember me
            </span>
          </label>

          <Link 
            to="/forgot-password" 
            className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <SubmitButton isLoading={isLoading} className="mt-2">
          Sign In
        </SubmitButton>
      </form>

      <SocialLogin />

      <p className="mt-8 text-center text-sm font-medium text-slate-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-purple-600 hover:text-purple-700 font-bold transition-colors">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
