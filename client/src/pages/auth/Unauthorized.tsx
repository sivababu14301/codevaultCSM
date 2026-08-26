import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export const Unauthorized: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <ShieldAlert className="h-12 w-12 text-red-600" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900">
          Access Denied
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          You don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
        </p>
        <div className="mt-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Go back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};
