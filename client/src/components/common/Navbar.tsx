import React from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Search, Plus, User as UserIcon, LogOut, Shield, Bell, Menu } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { Button } from '../ui/Button';
import { NotificationBadge } from '../notifications/NotificationBadge';

export { SaaSNavbar } from './SaaSNavbar';
export type { SaaSNavbarProps, NavItem } from './SaaSNavbar';

export interface NavbarProps {
  onMenuToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState(searchParams.get('q') || '');

  React.useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = encodeURIComponent(searchQuery.trim());
    if (isAdminRoute) {
      navigate(searchQuery.trim() ? `/admin/snippets?q=${q}` : '/admin/snippets');
    } else {
      navigate(searchQuery.trim() ? `/search?q=${q}` : '/search');
    }
  };
  
  const [unreadCount, setUnreadCount] = React.useState(0);

  React.useEffect(() => {
    if (isAuthenticated) {
      api.get('/notifications').then((res) => {
        const unread = res.data.filter((n: any) => !n.isRead).length;
        setUnreadCount(unread);
      }).catch(console.error);
    }
  }, [isAuthenticated, location.pathname]); // Refresh on navigation

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-[#1F2937] bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {onMenuToggle && (
            <button 
              onClick={onMenuToggle}
              className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-md shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-shadow duration-300">
            <span className="font-mono font-bold text-lg tracking-tighter leading-none select-none">
              &lt;/&gt;
            </span>
          </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white hidden sm:block transition-colors duration-200">
              Code<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Vault</span>
            </span>
          </Link>
        </div>

        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author or user ID..."
              className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-[#1F2937] rounded-full pl-10 pr-4 py-2 text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
            />
          </form>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate(user?.role === 'admin' ? '/admin/notifications' : '/notifications')}
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-full transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <NotificationBadge count={unreadCount} />
              </button>

              <button
                onClick={() => navigate(user?.role === 'admin' ? '/admin/snippets' : '/snippets/new')}
                className="hidden sm:flex px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 rounded-xl shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 transition-all duration-200 items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{user?.role === 'admin' ? 'Manage Snippets' : 'New Snippet'}</span>
              </button>

              <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-[#1F2937]">
                <Link to={user?.role === 'admin' ? '/admin/profile' : '/profile'} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition">
                  {(user as any)?.avatar ? (
                    <img src={(user as any).avatar} alt={user?.username} className="w-8 h-8 rounded-full border border-purple-200 object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                      <UserIcon className="w-4 h-4" />
                    </div>
                  )}
                  <span className="font-medium hidden lg:inline">{user?.username}</span>
                </Link>

                {user?.role === 'admin' && (
                  <Link to="/admin/dashboard" className="p-2 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition" title="Admin Panel">
                    <Shield className="w-5 h-5" />
                  </Link>
                )}

                <button
                  onClick={() => { logout(); navigate('/login'); }}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 rounded-xl shadow-md shadow-purple-500/25 transition-all duration-200">
                  Get Started
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

