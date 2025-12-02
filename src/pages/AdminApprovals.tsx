import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export function AdminApprovals() {
  const navigate = useNavigate();
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([
    {
      id: '1',
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@company.com',
      role: 'client',
      company: 'Tech Innovations LLC',
      registeredDate: 'Nov 28, 2025',
      requestedServices: 'Web Development, SEO'
    },
    {
      id: '2',
      name: 'David Chen',
      email: 'david.chen@business.com',
      role: 'agent',
      registeredDate: 'Nov 27, 2025',
      specialization: 'Digital Marketing & Social Media'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.r@startup.io',
      role: 'client',
      company: 'Startup Ventures Inc',
      registeredDate: 'Nov 26, 2025',
      requestedServices: 'Marketing'
    },
  ]);

  const handleApprove = (user: PendingUser) => {
    toast.success(`${user.name} has been approved!`);
    setPendingUsers(pendingUsers.filter(u => u.id !== user.id));
  };

  const handleReject = (user: PendingUser) => {
    toast.error(`${user.name}'s application has been rejected`);
    setPendingUsers(pendingUsers.filter(u => u.id !== user.id));
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7FA] overflow-x-hidden">
      <Sidebar 
        role="admin" 
        activePage="/admin/approvals" 
        onNavigate={navigate}
        userName="Admin"
      />

      <div className="lg:ml-64 flex-1 pt-16 lg:pt-0 w-full min-w-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-[#0D1B2A]">User Approvals</h1>
            <p className="text-[#4A5568]">Review and approve new user registrations</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-[#4A5568] mb-2">Pending Approvals</p>
              <p className="text-3xl font-semibold text-[#F39C12]">{pendingUsers.length}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-[#4A5568] mb-2">Client Requests</p>
              <p className="text-3xl font-semibold text-[#3498DB]">{pendingUsers.filter(u => u.role === 'client').length}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-[#4A5568] mb-2">Agent Requests</p>
              <p className="text-3xl font-semibold text-[#2EC4B6]">{pendingUsers.filter(u => u.role === 'agent').length}</p>
            </div>
          </div>

          {/* Pending Users */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-[#0D1B2A]">Pending User Registrations</h3>
              <p className="text-sm text-[#4A5568] mt-1">Review applications and approve or reject access</p>
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
                  {pendingUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-[#1A202C]">{user.name}</p>
                          <div className="flex items-center gap-1 text-sm text-[#4A5568] mt-1">
                            <Mail size={14} />
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'client' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {user.role === 'client' ? (
                          <div>
                            {user.company && (
                              <div className="flex items-center gap-2 text-sm text-[#4A5568]">
                                <Building size={14} />
                                <span>{user.company}</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-[#4A5568]">{user.specialization}</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(user)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-[#2ECC71] text-white rounded-lg hover:bg-[#27ae60] transition-all text-sm font-medium"
                          >
                            <CheckCircle size={16} />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(user)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-[#E74C3C] text-white rounded-lg hover:bg-[#c0392b] transition-all text-sm font-medium"
                          >
                            <XCircle size={16} />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pendingUsers.length === 0 && (
              <div className="p-12 text-center">
                <CheckCircle className="mx-auto mb-4 text-gray-400" size={64} />
                <h3 className="mb-2 text-[#0D1B2A]">All Caught Up!</h3>
                <p className="text-[#4A5568]">No pending user approvals at this time</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}