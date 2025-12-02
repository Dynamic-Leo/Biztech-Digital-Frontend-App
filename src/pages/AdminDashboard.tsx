import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Users, Briefcase, TrendingUp, Clock, DollarSign, UserCheck, CheckCircle, XCircle } from 'lucide-react';

// Define local interfaces for the mock data
interface PendingUser {
  id: string;
  name: string;
  email: string;
  company: string;
  registeredAt: string;
}

interface PendingRequest {
  id: string;
  client: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
}

export function AdminDashboard() {
  const navigate = useNavigate();

  const pendingUsers: PendingUser[] = [
    {
      id: '1',
      name: 'Ahmed Hassan',
      email: 'ahmed@newcompany.ae',
      company: 'New Company LLC',
      registeredAt: 'Nov 30, 2025'
    },
    {
      id: '2',
      name: 'Sarah Al-Mansoori',
      email: 'sarah@startupdubai.ae',
      company: 'Startup Dubai',
      registeredAt: 'Nov 29, 2025'
    }
  ];

  const pendingRequests: PendingRequest[] = [
    {
      id: '1',
      client: 'ABC Trading LLC',
      category: 'Web Development',
      priority: 'high',
      createdAt: 'Nov 28, 2025'
    },
    {
      id: '2',
      client: 'XYZ Consulting',
      category: 'SEO Services',
      priority: 'medium',
      createdAt: 'Nov 27, 2025'
    }
  ];

  const agents = ['Sarah Johnson', 'Mike Chen', 'Emma Wilson', 'David Kumar'];

  return (
    <div className="flex min-h-screen bg-[#F5F7FA] overflow-x-hidden">
      <Sidebar 
        role="admin" 
        activePage="/admin/dashboard" 
        onNavigate={navigate}
        userName="Admin User"
      />

      {/* Main Content */}
      <div className="lg:ml-64 flex-1 pt-16 lg:pt-0 w-full min-w-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
          {/* Page Title */}
          <div className="mb-6">
            <p className="text-sm text-[#4A5568] mb-2">Admin Dashboard</p>
          </div>

          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="mb-1 text-[#1A202C]">Welcome back! 👋</h1>
            <p className="text-[#4A5568]">Here's what needs your attention today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm text-[#4A5568]">Pending Approvals</p>
                <div className="w-8 h-8 bg-[#F39C12]/10 rounded-lg flex items-center justify-center">
                  <UserCheck size={20} className="text-[#F39C12]" />
                </div>
              </div>
              <p className="text-3xl text-[#1A202C]">{pendingUsers.length}</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm text-[#4A5568]">Unassigned Requests</p>
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Briefcase size={20} className="text-[#4A5568]" />
                </div>
              </div>
              <p className="text-3xl text-[#1A202C]">{pendingRequests.length}</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm text-[#4A5568]">Active Agents</p>
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users size={20} className="text-[#4A5568]" />
                </div>
              </div>
              <p className="text-3xl text-[#1A202C]">{agents.length}</p>
            </div>
          </div>

          {/* Pending User Approvals */}
          <div className="bg-white rounded-lg border border-gray-200 mb-6">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <UserCheck size={20} className="text-[#F39C12]" />
                <h3 className="text-[#1A202C]">Pending User Approvals</h3>
              </div>
              <p className="text-sm text-[#4A5568]">New user registrations awaiting approval</p>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs text-[#4A5568]">Name</th>
                    <th className="px-6 py-3 text-left text-xs text-[#4A5568]">Email</th>
                    <th className="px-6 py-3 text-left text-xs text-[#4A5568]">Company</th>
                    <th className="px-6 py-3 text-left text-xs text-[#4A5568]">Registered</th>
                    <th className="px-6 py-3 text-left text-xs text-[#4A5568]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-[#1A202C]">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-[#4A5568]">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-[#4A5568]">{user.company}</td>
                      <td className="px-6 py-4 text-sm text-[#4A5568]">{user.registeredAt}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="text-[#2ECC71] hover:text-[#27ae60] text-sm flex items-center gap-1">
                            <CheckCircle size={14} />
                            Approve
                          </button>
                          <button className="text-[#E74C3C] hover:text-[#c0392b] text-sm flex items-center gap-1">
                            <XCircle size={14} />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-200">
              {pendingUsers.map((user) => (
                <div key={user.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1A202C] mb-1">{user.name}</p>
                      <p className="text-xs text-[#4A5568] truncate mb-1">{user.email}</p>
                      <p className="text-xs text-[#4A5568]">{user.company}</p>
                    </div>
                    <span className="text-xs text-[#4A5568] ml-2 whitespace-nowrap">{user.registeredAt}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 text-[#2ECC71] hover:text-[#27ae60] text-sm flex items-center justify-center gap-1 py-2 border border-[#2ECC71] rounded-lg">
                      <CheckCircle size={14} />
                      Approve
                    </button>
                    <button className="flex-1 text-[#E74C3C] hover:text-[#c0392b] text-sm flex items-center justify-center gap-1 py-2 border border-[#E74C3C] rounded-lg">
                      <XCircle size={14} />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Request Triage */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <Briefcase size={20} className="text-[#E74C3C]" />
                <h3 className="text-[#1A202C]">Unassigned Requests</h3>
              </div>
              <p className="text-sm text-[#4A5568]">Client requests that need to be assigned to agents</p>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs text-[#4A5568]">Client</th>
                    <th className="px-6 py-3 text-left text-xs text-[#4A5568]">Category</th>
                    <th className="px-6 py-3 text-left text-xs text-[#4A5568]">Priority</th>
                    <th className="px-6 py-3 text-left text-xs text-[#4A5568]">Received</th>
                    <th className="px-6 py-3 text-left text-xs text-[#4A5568]">Assign To</th>
                    <th className="px-6 py-3 text-left text-xs text-[#4A5568]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map((request) => (
                    <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-[#1A202C]">{request.client}</td>
                      <td className="px-6 py-4 text-sm text-[#4A5568]">{request.category}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            request.priority === 'high'
                              ? 'bg-[#E74C3C]/10 text-[#E74C3C]'
                              : request.priority === 'medium'
                              ? 'bg-[#F39C12]/10 text-[#F39C12]'
                              : 'bg-[#3498DB]/10 text-[#3498DB]'
                          }`}
                        >
                          {request.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#4A5568]">{request.createdAt}</td>
                      <td className="px-6 py-4">
                        <select className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2EC4B6]">
                          <option value="">Select agent...</option>
                          {agents.map((agent) => (
                            <option key={agent} value={agent}>
                              {agent}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-[#2EC4B6] hover:text-[#26a599] text-sm">
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-200">
              {pendingRequests.map((request) => (
                <div key={request.id} className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-[#1A202C] mb-1">{request.client}</p>
                      <p className="text-xs text-[#4A5568] mb-2">{request.category}</p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            request.priority === 'high'
                              ? 'bg-[#E74C3C]/10 text-[#E74C3C]'
                              : request.priority === 'medium'
                              ? 'bg-[#F39C12]/10 text-[#F39C12]'
                              : 'bg-[#3498DB]/10 text-[#3498DB]'
                          }`}
                        >
                          {request.priority.toUpperCase()}
                        </span>
                        <span className="text-xs text-[#4A5568]">{request.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#2EC4B6]">
                      <option value="">Select agent...</option>
                      {agents.map((agent) => (
                        <option key={agent} value={agent}>
                          {agent}
                        </option>
                      ))}
                    </select>
                    <button className="w-full bg-[#2EC4B6] text-white px-4 py-2 rounded-lg hover:bg-[#26a599] text-sm font-medium">
                      Assign Request
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}