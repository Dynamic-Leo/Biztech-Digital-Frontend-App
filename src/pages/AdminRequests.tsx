import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { FileText, User, Clock, TrendingUp } from 'lucide-react';
import { ServiceRequest } from '../types';

export function AdminRequests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState<ServiceRequest[]>([
    {
      id: '1',
      client: 'John Smith',
      clientEmail: 'john.smith@example.com',
      agent: 'Faizan Akhtar',
      category: 'Web Development',
      priority: 'high',
      status: 'assigned',
      createdDate: 'Nov 28, 2025',
      description: 'Corporate website with e-commerce capabilities'
    },
    {
      id: '2',
      client: 'Sarah Johnson',
      clientEmail: 'sarah.j@company.com',
      category: 'SEO Optimization',
      priority: 'medium',
      status: 'unassigned',
      createdDate: 'Nov 27, 2025',
      description: 'Improve organic search rankings'
    },
    {
      id: '3',
      client: 'Mike Anderson',
      clientEmail: 'mike.a@business.com',
      agent: 'Faizan Akhtar',
      category: 'Social Media Marketing',
      priority: 'low',
      status: 'proposal-sent',
      createdDate: 'Nov 26, 2025',
      description: 'Social media strategy for Q1 2026'
    },
  ]);

  return (
    <div className="flex min-h-screen bg-[#F5F7FA] overflow-x-hidden">
      <Sidebar 
        role="admin" 
        activePage="/admin/requests" 
        onNavigate={navigate}
        userName="Admin"
      />

      <div className="lg:ml-64 flex-1 pt-16 lg:pt-0 w-full min-w-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-[#0D1B2A]">Service Requests</h1>
            <p className="text-[#4A5568]">Monitor and manage all service requests across the platform</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-[#4A5568] mb-2">Total Requests</p>
              <p className="text-3xl font-semibold text-[#2EC4B6]">{requests.length}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-[#4A5568] mb-2">Unassigned</p>
              <p className="text-3xl font-semibold text-[#E74C3C]">{requests.filter(r => r.status === 'unassigned').length}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-[#4A5568] mb-2">In Progress</p>
              <p className="text-3xl font-semibold text-[#F39C12]">{requests.filter(r => r.status === 'assigned').length}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-[#4A5568] mb-2">Proposals Sent</p>
              <p className="text-3xl font-semibold text-[#3498DB]">{requests.filter(r => r.status === 'proposal-sent').length}</p>
            </div>
          </div>

          {/* Requests Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <FileText className="text-[#2EC4B6]" size={24} />
                <h3 className="text-[#0D1B2A]">All Service Requests</h3>
              </div>
              <p className="text-sm text-[#4A5568] mt-1">Complete overview of all client service requests</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#4A5568]">Request ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#4A5568]">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#4A5568]">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#4A5568]">Agent</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#4A5568]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-[#4A5568]">#{request.id.padStart(4, '0')}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-[#1A202C]">{request.client}</p>
                          <p className="text-xs text-[#4A5568]">{request.clientEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#1A202C]">{request.category}</p>
                      </td>
                      <td className="px-6 py-4">
                        {request.agent ? (
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#2EC4B6] rounded-full flex items-center justify-center text-white text-xs">
                              {request.agent.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm text-[#1A202C]">{request.agent}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-[#4A5568] italic">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          request.status === 'unassigned' ? 'bg-red-100 text-red-700' :
                          request.status === 'assigned' ? 'bg-blue-100 text-blue-700' :
                          request.status === 'proposal-sent' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {request.status === 'unassigned' ? 'Unassigned' :
                           request.status === 'assigned' ? 'Assigned' :
                           request.status === 'proposal-sent' ? 'Proposal Sent' :
                           'Accepted'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-gradient-to-r from-[#2EC4B6] to-[#26a599] rounded-xl p-6 text-white">
            <h4 className="text-white mb-2">Quick Actions</h4>
            <p className="text-white/90 text-sm mb-4">Common administrative tasks</p>
            <div className="flex gap-3">
              <button className="bg-white text-[#2EC4B6] px-4 py-2 rounded-lg hover:bg-gray-100 transition-all font-medium text-sm">
                Assign Agent
              </button>
              <button className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all font-medium text-sm">
                Export Report
              </button>
              <button className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all font-medium text-sm">
                Filter Requests
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}