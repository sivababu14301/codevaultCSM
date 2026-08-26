import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Code, FolderKanban, Bookmark, Star, Search, Settings, Shield, User, Share2, DownloadCloud, Copy, X, Globe } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { AnimatePresence, motion } from 'framer-motion';

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const { user } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Community', path: '/community', icon: Globe },
    { name: 'All Snippets', path: '/snippets', icon: Code },
    { name: 'Categories', path: '/categories', icon: FolderKanban },
    { name: 'Collections', path: '/collections', icon: Bookmark },
    { name: 'Favorites', path: '/favorites', icon: Star },
    { name: 'Share', path: '/share', icon: Share2 },
    { name: 'Export', path: '/export', icon: DownloadCloud },
    { name: 'Copy Code', path: '/copy', icon: Copy },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings }
  ];

  if (user?.role === 'admin') {
    navItems.push({ name: 'Admin Panel', path: '/admin', icon: Shield });
  }

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-[#111827] border-r border-slate-200 dark:border-[#1F2937]">
      <div className="flex items-center justify-between p-4 lg:hidden border-b border-slate-200 dark:border-[#1F2937]">
        <span className="font-bold text-slate-900 dark:text-white">Menu</span>
        <button onClick={onClose} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 hide-scrollbar">
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 hidden md:block lg:block">
          Navigation
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose?.()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                    isActive
                      ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 font-semibold border border-purple-100/50 dark:border-purple-800/30 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`
                }
                title={item.name}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="md:hidden lg:block">{item.name}</span>
                {/* Tooltip for tablet view */}
                <div className="hidden md:block lg:hidden absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  {item.name}
                </div>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-72 z-50 lg:hidden shadow-2xl"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop & Tablet Static Sidebar */}
      <aside className="hidden lg:block w-64 min-h-[calc(100vh-4rem)] flex-shrink-0 transition-all duration-300">
        {sidebarContent}
      </aside>
      <aside className="hidden md:block lg:hidden w-20 min-h-[calc(100vh-4rem)] flex-shrink-0 transition-all duration-300">
        {sidebarContent}
      </aside>
    </>
  );
};
