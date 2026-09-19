import React, { useState, useEffect } from 'react';
import { Bell, Send, CheckCircle, Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import { api } from '../../services/api';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface NotificationHistory {
  _id: string;
  title: string;
  message: string;
  recipientData: 'ALL' | User;
  createdAt: string;
  readBy: string[];
}

export const AdminNotificationsPage: React.FC = () => {
  const { toast } = useToast();
  
  // Form State
  const [recipient, setRecipient] = useState<string>('ALL');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  // Data State
  const [users, setUsers] = useState<User[]>([]);
  const [history, setHistory] = useState<NotificationHistory[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchHistory();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (error) {
      toast('Failed to fetch users', 'error');
    }
  };

  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const res = await api.get('/notifications/admin/all');
      setHistory(res.data);
    } catch (error) {
      toast('Failed to fetch notification history', 'error');
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      toast('Please enter both title and message', 'error');
      return;
    }

    setIsSending(true);
    try {
      await api.post('/notifications', {
        recipient,
        title,
        message
      });
      
      toast('Notification sent successfully', 'success');
      
      // Reset form
      setTitle('');
      setMessage('');
      
      // Refresh history
      fetchHistory();
    } catch (error) {
      toast('Failed to send notification', 'error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full pb-12">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Bell className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          Notifications
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Send notifications to CodeVault users.
        </p>
      </div>

      <Card className="p-6 mb-8 border border-slate-200 dark:border-[#1F2937] bg-white dark:bg-[#111827] shadow-sm rounded-2xl">
        <form onSubmit={handleSendNotification} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Recipient
            </label>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-[#1F2937] rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="ALL">All Users</option>
              {users.map(u => (
                <option key={u._id} value={u._id}>
                  {u.name} - {u.email}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Notification Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter notification title"
              required
              className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-[#1F2937] rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your notification message..."
              required
              rows={4}
              className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-[#1F2937] rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={isSending}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-6 py-2.5 shadow-md shadow-purple-500/25 transition-all flex items-center gap-2"
            >
              {isSending ? (
                <>Sending...</>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Notification
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>

      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-slate-400" />
          Notification History
        </h2>
        
        <Card className="border border-slate-200 dark:border-[#1F2937] bg-white dark:bg-[#111827] shadow-sm rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 dark:bg-[#0B1120] text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-[#1F2937]">
                <tr>
                  <th className="px-6 py-3 font-semibold">Recipient</th>
                  <th className="px-6 py-3 font-semibold">Title</th>
                  <th className="px-6 py-3 font-semibold">Message</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-[#1F2937]">
                {isLoadingHistory ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      Loading history...
                    </td>
                  </tr>
                ) : history.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      No notifications sent yet.
                    </td>
                  </tr>
                ) : (
                  history.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        {item.recipientData === 'ALL' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            All Users
                          </span>
                        ) : (
                          <div className="font-medium text-slate-900 dark:text-white">
                            {(item.recipientData as User).name}
                            <div className="text-xs text-slate-500 font-normal">
                              {(item.recipientData as User).email}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white max-w-[200px] truncate">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 max-w-[300px] truncate">
                        {item.message}
                      </td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                          <CheckCircle className="w-3.5 h-3.5" /> Sent
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};
