import React, { useState, useMemo, useEffect } from 'react';
import { Users, UserCheck, UserX, Shield } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { AdminUser } from '../../types/admin';
import { api } from '../../services/api';
import { useToast } from '../../components/ui/Toast';

import { UserCard } from '../../components/admin/users/UserCard';
import { UserSearch } from '../../components/admin/users/UserSearch';
import { UserFilter } from '../../components/admin/users/UserFilter';
import { UserTable } from '../../components/admin/users/UserTable';

import { UserDetailsModal } from '../../components/admin/users/UserDetailsModal';
import { BlockUserModal } from '../../components/admin/users/BlockUserModal';
import { DeleteUserModal } from '../../components/admin/users/DeleteUserModal';

export const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      const mappedUsers: AdminUser[] = res.data.map((u: any) => ({
        id: u._id,
        name: u.name,
        email: u.email,
        role: u.role,
        status: u.status,
        joinedAt: u.createdAt,
        avatar: u.avatarUrl,
        snippets: 0
      }));
      setUsers(mappedUsers);
    } catch (error) {
      toast('Failed to fetch users', 'error');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals state
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Derived Stats
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const blockedUsers = users.filter(u => u.status === 'suspended').length;
  const adminUsers = users.filter(u => u.role === 'admin').length;

  // Filter and Search Logic
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  // Actions
  const handleBlockToggle = async (userToToggle: AdminUser) => {
    try {
      await api.put(`/admin/users/${userToToggle.id}/block`);
      setUsers(prev => prev.map(u => {
        if (u.id === userToToggle.id) {
          return { ...u, status: u.status === 'suspended' ? 'active' : 'suspended' };
        }
        return u;
      }));
      toast(`User ${userToToggle.status === 'suspended' ? 'unblocked' : 'blocked'} successfully`, 'success');
      setIsBlockModalOpen(false);
    } catch (error: any) {
      toast(error.response?.data?.message || 'Failed to toggle block status', 'error');
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers(prev => prev.filter(u => u.id !== userId));
      toast('User deleted successfully', 'success');
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      toast(error.response?.data?.message || 'Failed to delete user', 'error');
    }
  };

  const openViewModal = (user: AdminUser) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const openBlockModal = (user: AdminUser) => {
    setSelectedUser(user);
    setIsBlockModalOpen(true);
  };

  const openDeleteModal = (user: AdminUser) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto w-full pb-12">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          User Management
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          View, search, and manage all accounts on CodeVault.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <UserCard title="Total Users" value={totalUsers} icon={Users} colorClass="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" />
        <UserCard title="Active Users" value={activeUsers} icon={UserCheck} colorClass="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" />
        <UserCard title="Blocked Users" value={blockedUsers} icon={UserX} colorClass="bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400" />
        <UserCard title="Admin Users" value={adminUsers} icon={Shield} colorClass="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" />
      </div>

      <Card className="flex flex-col border border-slate-100 dark:border-[#1F2937]">
        {/* Header / Controls */}
        <div className="p-6 border-b border-slate-100 dark:border-[#1F2937] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#111827] rounded-t-2xl z-10 sticky top-0">
          <UserSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <UserFilter 
            roleFilter={roleFilter} 
            statusFilter={statusFilter} 
            onRoleChange={setRoleFilter} 
            onStatusChange={setStatusFilter} 
          />
        </div>

        {/* Data Table */}
        <UserTable 
          users={filteredUsers} 
          onView={openViewModal} 
          onBlock={openBlockModal} 
          onDelete={openDeleteModal} 
        />
        
        {/* Pagination placeholder (dummy) */}
        {filteredUsers.length > 0 && (
          <div className="p-4 border-t border-slate-100 dark:border-[#1F2937] flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>Showing 1 to {filteredUsers.length} of {filteredUsers.length} entries</span>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1F2937] disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 bg-purple-600 text-white rounded-lg">1</button>
              <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1F2937] disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        )}
      </Card>

      {/* Modals */}
      <UserDetailsModal 
        user={selectedUser} 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
      />
      <BlockUserModal 
        user={selectedUser} 
        isOpen={isBlockModalOpen} 
        onClose={() => setIsBlockModalOpen(false)} 
        onConfirm={handleBlockToggle} 
      />
      <DeleteUserModal 
        user={selectedUser} 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={handleDelete} 
      />
    </div>
  );
};
