import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Mail, Building } from 'lucide-react';
import { toast } from 'sonner';
import api from '../lib/api';
import { User } from '../types';

export function AdminApprovals() {
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await api.get('/admin/users/pending');
        setPendingUsers(response.data);
      } catch (error) {
        toast.error("Failed to fetch pending users");
      } finally {
        setLoading(false);
      }
    };
    fetchPendingUsers();
  }, []);

  const handleStatusChange = async (userId: string, status: 'Active' | 'Rejected') => {
    try {
      await api.patch(`/admin/users/${userId}/status`, { status });
      toast.success(`User ${status} successfully`);
      setPendingUsers(prev => prev.filter(u => u.id !== userId));
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  return (
    <>
      <div className="mb-8 mt-15 md:mt-0">
        <h1 className="mb-2 text-[#0D1B2A]">User Approvals</h1>
        <p className="text-[#4A5568]">Review and approve new user registrations</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-[#0D1B2A]">Pending User Registrations</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#4A5568]">User</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#4A5568]">Role</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#4A5568]">Details</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#4A5568]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-[#4A5568]">Loading...</td></tr>
              ) : pendingUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center">
                    <CheckCircle className="mx-auto mb-4 text-gray-400" size={64} />
                    <h3 className="mb-2 text-[#0D1B2A]">All Caught Up!</h3>
                    <p className="text-[#4A5568]">No pending user approvals at this time</p>
                  </td>
                </tr>
              ) : (
                pendingUsers.map((user: any) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-[#1A202C]">{user.fullName}</p>
                        <div className="flex items-center gap-1 text-sm text-[#4A5568] mt-1">
                          <Mail size={14} />
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'Client' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.ClientProfile?.companyName && (
                        <div className="flex items-center gap-2 text-sm text-[#4A5568]">
                          <Building size={14} />
                          <span>{user.ClientProfile.companyName}</span>
                        </div>
                      )}
                      <p className="text-xs text-[#4A5568]">{user.mobile}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusChange(user.id, 'Active')}
                          className="flex items-center gap-1 px-3 py-1.5 bg-[#2ECC71] text-white rounded-lg hover:bg-[#27ae60] transition-all text-sm font-medium hover:cursor-pointer"
                        >
                          <CheckCircle size={16} /> Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(user.id, 'Rejected')}
                          className="flex items-center gap-1 px-3 py-1.5 bg-[#E74C3C] text-white rounded-lg hover:bg-[#c0392b] transition-all text-sm font-medium hover:cursor-pointer"
                        >
                          <XCircle size={16} /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}