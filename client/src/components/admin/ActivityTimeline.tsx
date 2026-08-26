import React from 'react';
import { UserPlus, Code2, AlertTriangle, AlertCircle, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { ActivityEvent } from '../../types/admin';
import { useAdminAnalytics } from '../../context/AdminAnalyticsContext';

export const ActivityTimeline: React.FC = () => {
  const { data, isLoading } = useAdminAnalytics();
  
  if (isLoading || !data) return <div className="p-4">Loading...</div>;

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'user_joined': return <UserPlus className="w-4 h-4 text-emerald-500" />;
      case 'snippet_created': return <Code2 className="w-4 h-4 text-blue-500" />;
      case 'report_filed': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'system_alert': return <AlertCircle className="w-4 h-4 text-rose-500" />;
      default: return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Activity Timeline
        </h3>
        <button className="text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400">
          View All
        </button>
      </div>

      <div className="flex-1 relative border-l-2 border-slate-100 dark:border-[#1F2937] ml-3 pl-5 space-y-6">
        {data.activityTimeline.map((event: ActivityEvent, index: number) => (
          <div key={event.id} className="relative">
            <div className="absolute -left-[29px] top-1 w-6 h-6 rounded-full bg-white dark:bg-[#111827] flex items-center justify-center border border-slate-200 dark:border-[#1F2937] shadow-sm">
              {getEventIcon(event.type)}
            </div>
            <div>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {event.message}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {formatTime(event.timestamp)}
                </span>
                {event.user && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                    <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                      {event.user}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
