import React from 'react';
import { Calendar, MailCheck, ShieldCheck } from 'lucide-react';

export const AccountInfo: React.FC = () => {
  const infoItems = [
    {
      label: 'Member Since',
      value: 'January 15, 2026',
      icon: <Calendar className="h-5 w-5 text-purple-500" />
    },
    {
      label: 'Email Status',
      value: 'Verified',
      icon: <MailCheck className="h-5 w-5 text-green-500" />
    },
    {
      label: 'User Role',
      value: 'Pro Developer',
      icon: <ShieldCheck className="h-5 w-5 text-blue-500" />
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      {infoItems.map((item, index) => (
        <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
          <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
            {item.icon}
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{item.label}</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
