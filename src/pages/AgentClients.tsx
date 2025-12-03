import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Building, ExternalLink } from 'lucide-react';
import { Client } from '../types';

export function AgentClients() {
  const navigate = useNavigate();

  const clients: Client[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      company: 'Tech Innovations Inc.',
      industry: 'Technology',
      projectsCount: 5,
      activeProjects: 2,
      totalSpent: 12500, // Changed to match interface number type
      status: 'active',
      joinedDate: 'Jan 15, 2025'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      company: 'Marketing Pro LLC',
      industry: 'Marketing',
      projectsCount: 3,
      activeProjects: 1,
      totalSpent: 8200,
      status: 'active',
      joinedDate: 'Feb 20, 2025'
    },
    {
      id: '3',
      name: 'Mike Anderson',
      email: 'mike.a@business.com',
      company: 'Retail Partners LLC',
      industry: 'Retail',
      projectsCount: 2,
      activeProjects: 0,
      totalSpent: 5500,
      status: 'inactive',
      joinedDate: 'Mar 10, 2025'
    },
  ];

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-[#0D1B2A]">Clients</h1>
        <p className="text-[#4A5568]">Manage your client relationships and track their projects</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <p className="text-sm text-[#4A5568] mb-2">Total Clients</p>
          <p className="text-3xl font-semibold text-[#2EC4B6]">{clients.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <p className="text-sm text-[#4A5568] mb-2">Active Clients</p>
          <p className="text-3xl font-semibold text-[#2ECC71]">{clients.filter(c => c.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <p className="text-sm text-[#4A5568] mb-2">Active Projects</p>
          <p className="text-3xl font-semibold text-[#F39C12]">3</p> {/* Simplified for mock */}
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <p className="text-sm text-[#4A5568] mb-2">Total Revenue</p>
          <p className="text-3xl font-semibold text-[#3498DB]">$26.2k</p>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clients.map((client) => (
          <div key={client.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2EC4B6] to-[#26a599] rounded-full flex items-center justify-center text-white font-semibold">
                  {client.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-[#0D1B2A] mb-1">{client.name}</h3>
                  <p className="text-sm text-[#4A5568]">{client.company}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                client.status === 'active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {client.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="text-[#4A5568]" size={16} />
                <span className="text-[#4A5568]">{client.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Building className="text-[#4A5568]" size={16} />
                <span className="text-[#4A5568]">{client.industry}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
              <div>
                <p className="text-xs text-[#4A5568] mb-1">Total Projects</p>
                <p className="font-semibold text-[#1A202C]">{client.projectsCount}</p>
              </div>
              <div>
                <p className="text-xs text-[#4A5568] mb-1">Active</p>
                <p className="font-semibold text-[#2EC4B6]">{client.activeProjects || 0}</p>
              </div>
              <div>
                <p className="text-xs text-[#4A5568] mb-1">Revenue</p>
                <p className="font-semibold text-[#3498DB]">${client.totalSpent?.toLocaleString()}</p>
              </div>
            </div>

            <button
              onClick={() => navigate(`/agent/client-details/${client.id}`)} // Note: Route needs creation if not exists
              className="w-full bg-[#2EC4B6] text-white px-4 py-2.5 rounded-lg hover:bg-[#26a599] transition-all font-medium flex items-center justify-center gap-2 h-[44px]"
            >
              <ExternalLink size={18} />
              View Details
            </button>
          </div>
        ))}
      </div>
    </>
  );
}