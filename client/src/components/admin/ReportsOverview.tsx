import React from 'react';
import { ShieldAlert, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { ReportStat } from '../../types/admin';
import { useAdminAnalytics } from '../../context/AdminAnalyticsContext';
import { Badge } from '../ui/Badge';

export const ReportsOverview: React.FC = () => {
  const { data, isLoading } = useAdminAnalytics();
  if (isLoading || !data) return <div className="p-4">Loading...</div>;

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'spam': return <ShieldAlert className="w-5 h-5 text-rose-500" />;
      case 'inappropriate': return <MessageSquare className="w-5 h-5 text-amber-500" />;
      case 'copyright': return <AlertCircle className="w-5 h-5 text-purple-500" />;
      default: return <ShieldAlert className="w-5 h-5 text-slate-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open': return <Badge variant="danger">Open</Badge>;
      case 'resolved': return <Badge variant="success">Resolved</Badge>;
      case 'dismissed': return <Badge variant="secondary">Dismissed</Badge>;
      default: return null;
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Recent Reports
        </h3>
        <button className="text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400">
          View All
        </button>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {data.reports.map((report) => (
          <div 
            key={report.id}
            className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#0B1120] border border-slate-100 dark:border-[#1F2937] hover:border-purple-200 dark:hover:border-purple-800 transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-white dark:bg-[#111827] flex items-center justify-center border border-slate-200 dark:border-[#1F2937] shrink-0">
              {getReportIcon(report.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-semibold text-sm text-slate-900 dark:text-white capitalize truncate">
                  {report.type} Report
                </span>
                {getStatusBadge(report.status)}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                Target: {report.targetType} ({report.targetId})
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Reported by {report.reportedBy}
              </p>
            </div>
          </div>
        ))}

        {data.reports.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-3" />
            <p className="text-slate-900 dark:text-white font-medium">All clear!</p>
            <p className="text-sm text-slate-500">No pending reports to review.</p>
          </div>
        )}
      </div>
    </Card>
  );
};
