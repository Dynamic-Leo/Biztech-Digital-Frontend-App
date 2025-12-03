import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, FolderOpen, Send, DollarSign, Clock, FileText } from 'lucide-react';
import { ProposalGenerator } from '../components/ProposalGenerator';
import { StatusBadge } from '../components/StatusBadge';
import { ServiceRequest, Project } from '../types';
// Note: Assuming we will add API integration for Agent Dashboard next, 
// but for now I'm just fixing the Layout UI issue with the existing static/mock data structure
// or if you want it connected I can do that too, but focusing on UI fix here.

export function AgentDashboard() {
  const navigate = useNavigate();
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);

  // Mock Data (Replace with API later if needed, or keep if just fixing UI)
  const requests: any[] = [
    {
      id: '1',
      client: 'John Smith',
      clientEmail: 'john.smith@example.com',
      category: 'Web Development',
      priority: 'high',
      createdAt: 'Nov 28, 2025',
      status: 'new'
    },
    {
      id: '2',
      client: 'Sarah Johnson',
      clientEmail: 'sarah.j@company.com',
      category: 'SEO Optimization',
      priority: 'medium',
      createdAt: 'Nov 27, 2025',
      status: 'new'
    }
  ];

  const projects: Project[] = [
    {
      id: '1',
      name: 'Corporate Website',
      client: 'Tech Solutions Inc',
      status: 'in-progress',
      progress: 65,
      ecd: 'Dec 15, 2025',
      category: 'Web Development'
    },
    {
      id: '2',
      name: 'E-commerce Platform',
      client: 'Retail Partners LLC',
      status: 'planning',
      progress: 20,
      ecd: 'Jan 10, 2026',
      category: 'Web Development'
    }
  ];

  return (
    <>
      {/* Page Title */}
      <div className="mb-6">
        <p className="text-sm text-[#4A5568] mb-2">Agent Dashboard</p>
      </div>

      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="mb-1 text-[#1A202C]">Welcome back! 👋</h1>
        <p className="text-[#4A5568]">Here's what needs your attention today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <p className="text-sm text-[#4A5568]">New Requests</p>
            <div className="w-8 h-8 bg-[#2EC4B6]/10 rounded-lg flex items-center justify-center">
              <Briefcase className="text-[#2EC4B6]" size={20} />
            </div>
          </div>
          <p className="text-3xl text-[#2EC4B6]">{requests.filter(r => r.status === 'new').length}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <p className="text-sm text-[#4A5568]">Active Projects</p>
            <div className="w-8 h-8 bg-[#F39C12]/10 rounded-lg flex items-center justify-center">
              <FolderOpen className="text-[#F39C12]" size={20} />
            </div>
          </div>
          <p className="text-3xl text-[#F39C12]">{projects.length}</p>
        </div>

        {/* ... other stats ... */}
      </div>

      {/* Service Requests */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="text-[#2EC4B6]" size={20} />
            <h3 className="text-[#1A202C]">Service Requests</h3>
          </div>
          <p className="text-sm text-[#4A5568]">Review client requests and create proposals.</p>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs text-[#4A5568] font-semibold">Client</th>
                <th className="px-6 py-3 text-left text-xs text-[#4A5568] font-semibold">Service Category</th>
                <th className="px-6 py-3 text-left text-xs text-[#4A5568] font-semibold">Priority</th>
                <th className="px-6 py-3 text-left text-xs text-[#4A5568] font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-xs text-[#4A5568] font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-xs text-[#4A5568] font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-[#1A202C]">{request.client}</p>
                      <p className="text-xs text-[#4A5568]">{request.clientEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#1A202C]">{request.category}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-700">
                      {request.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#4A5568]">{request.createdAt}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      New
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowProposalModal(true);
                      }}
                      className="text-[#2EC4B6] hover:text-[#26a599] text-sm font-medium"
                    >
                      Create Proposal
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Projects */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FolderOpen className="text-[#F39C12]" size={20} />
              <h3 className="text-[#1A202C]">Active Projects</h3>
            </div>
            <p className="text-sm text-[#4A5568]">Manage ongoing client projects</p>
          </div>
          <button onClick={() => navigate('/agent/projects')} className="text-[#2EC4B6] hover:text-[#26a599] text-sm font-medium">
            View All
          </button>
        </div>

        <div className="p-6 space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#2EC4B6] transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-[#1A202C] mb-1">{project.name}</h4>
                  <p className="text-sm text-[#4A5568]">{project.client}</p>
                </div>
                <StatusBadge status={project.status} />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs text-[#4A5568]">
                  <Clock size={14} />
                  <span>ECD: {project.ecd}</span>
                </div>
                <button
                  onClick={() => navigate('/agent/project-management/' + project.id)}
                  className="text-[#2EC4B6] hover:text-[#26a599] text-sm font-medium"
                >
                  Manage →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proposal Generator Modal */}
      {showProposalModal && selectedRequest && (
        <ProposalGenerator
          requestId={selectedRequest.id}
          clientEmail={selectedRequest.clientEmail}
          clientName={selectedRequest.client}
          serviceCategory={selectedRequest.category}
          onClose={() => {
            setShowProposalModal(false);
            setSelectedRequest(null);
          }}
        />
      )}
    </>
  );
}