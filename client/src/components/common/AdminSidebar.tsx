import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Code, FolderKanban, FileText, Settings, ArrowLeft, X, Bell } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen = false, onClose }) => {
  const adminNavItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'User Management', path: '/admin/users', icon: Users, exact: false },
    { name: 'Snippet Management', path: '/admin/snippets', icon: Code, exact: false },
    { name: 'Category Management', path: '/admin/categories', icon: FolderKanban, exact: false },
    { name: 'Reports', path: '/admin/reports', icon: FileText, exact: false },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell, exact: false },
    { name: 'Settings', path: '/admin/settings', icon: Settings, exact: false },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-[#111827] border-r border-slate-200 dark:border-[#1F2937]">
      <div className="flex items-center justify-between p-4 lg:hidden border-b border-slate-200 dark:border-[#1F2937]">
        <span className="font-bold text-slate-900 dark:text-white">Admin Menu</span>
        <button onClick={onClose} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-6 flex-1 overflow-y-auto hide-scrollbar">
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 hidden md:block lg:block">
          Admin Panel
        </div>
        <nav className="flex flex-col gap-2">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
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

      <div className="p-4 border-t border-slate-200 dark:border-[#1F2937]">
        <NavLink
          to="/dashboard"
          onClick={() => onClose?.()}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 group"
          title="Exit Admin Panel"
        >
          <ArrowLeft className="w-5 h-5 flex-shrink-0" />
          <span className="md:hidden lg:block">Exit Admin Panel</span>
          <div className="hidden md:block lg:hidden absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
            Exit Admin Panel
          </div>
        </NavLink>
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
