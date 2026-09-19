import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Shield, Mail, User as UserIcon, Calendar } from 'lucide-react';
import { Card } from '../../components/ui/Card';

export function AdminProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Profile</h1>
        <p className="text-slate-600 dark:text-slate-400">View your administrator account details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-2">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
              <Shield className="w-12 h-12" />
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {user?.name || 'Administrator'}
                </h2>
                <p className="text-amber-600 dark:text-amber-500 font-medium flex items-center gap-1">
                  <Shield className="w-4 h-4" /> CodeVault Admin
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="space-y-1">
                  <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <UserIcon className="w-4 h-4" /> Username
                  </span>
                  <p className="font-medium text-slate-900 dark:text-white">{user?.username}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Mail className="w-4 h-4" /> Email
                  </span>
                  <p className="font-medium text-slate-900 dark:text-white">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Account Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="font-medium text-slate-900 dark:text-white">Active</span>
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400">Status</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Full Access</span>
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400">Permissions</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
