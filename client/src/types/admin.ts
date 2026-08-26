export interface AdminStat {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: any; // Lucide icon
  color: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  snippets: number;
  status: 'active' | 'pending' | 'suspended';
  avatar?: string;
  joinedAt: string;
}

export interface AdminSnippet {
  id: string;
  title: string;
  language: string;
  category: string;
  author: string;
  authorEmail?: string;
  description?: string;
  code?: string;
  tags?: string[];
  views: number;
  likes: number;
  createdAt: string;
  status: 'public' | 'private' | 'flagged' | 'hidden' | 'approved';
}

export interface CategoryStat {
  name: string;
  count: number;
  color: string;
}

export interface ReportStat {
  id: string;
  type: 'spam' | 'inappropriate' | 'copyright';
  targetType: 'snippet' | 'user' | 'comment';
  targetId: string;
  reportedBy: string;
  createdAt: string;
  status: 'open' | 'resolved' | 'dismissed';
}

export interface ActivityEvent {
  id: string;
  type: 'user_joined' | 'snippet_created' | 'report_filed' | 'system_alert';
  message: string;
  timestamp: string;
  user?: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  description: string;
  totalSnippets: number;
  status: 'active' | 'inactive';
  isDefault?: boolean;
  createdAt: string;
}

export interface MostSharedStat {
  title: string;
  shares: number;
}

export interface MostViewedStat {
  title: string;
  views: number;
}

export interface ReportSummaryStat {
  title: string;
  value: string | number;
  trend?: string;
  isPositive?: boolean;
}
