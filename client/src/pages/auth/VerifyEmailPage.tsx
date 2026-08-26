import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

import { AuthLayout } from '../../components/auth/AuthLayout';

export function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    // Simulate verification API call
    const verifyToken = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Mock success if token exists
        if (token) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (err) {
        setStatus('error');
      }
    };

    verifyToken();
  }, [token]);

  return (
    <AuthLayout 
      title="Email Verification" 
      subtitle="Verifying your email address."
    >
      <div className="flex flex-col items-center justify-center text-center py-8">
        {status === 'loading' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4 text-slate-500"
          >
            <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
            <p>Please wait while we verify your email address...</p>
          </motion.div>
        )}

        {status === 'success' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Email Verified!</h3>
            <p className="text-slate-500 max-w-sm mb-4">
              Your email address has been successfully verified. You can now access all features of CodeVault.
            </p>
            <Link 
              to="/login"
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              Continue to Login
            </Link>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Verification Failed</h3>
            <p className="text-slate-500 max-w-sm mb-4">
              The verification link is invalid or has expired. Please request a new verification email.
            </p>
            <Link 
              to="/register"
              className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
            >
              Back to Registration
            </Link>
          </motion.div>
        )}
      </div>
    </AuthLayout>
  );
}
