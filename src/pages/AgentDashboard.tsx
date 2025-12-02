import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Users, TrendingUp, Clock, Plus, Edit, FolderOpen, Send, DollarSign, FileText } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { ProposalGenerator } from '../components/ProposalGenerator';
import { StatusBadge } from '../components/StatusBadge';
import { ServiceRequest, Project } from '../types';
import { toast } from 'sonner';

export function AgentDashboard() {
  const navigate = useNavigate();
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);

  const requests: ServiceRequest[] = [
    {
      id: '1',
      client: 'John Smith',
      clientEmail: 'john.smith@example.com',
      category: 'Web Development',
      priority: 'high',
      createdAt: 'Nov 28, 2025',
      dateSubmitted: 'Nov 28, 2025',
      details: 'Need a corporate website with e-commerce capabilities for B2B clients.',
      status: 'new'
    },
    {
      id: '2',
      client: 'Sarah Johnson',
      clientEmail: 'sarah.j@company.com',
      category: 'SEO Optimization',
      priority: 'medium',
      createdAt: 'Nov 27, 2025',
      dateSubmitted: 'Nov 27, 2025',
      details: 'Looking to improve organic search rankings for our main product pages.',
      status: 'new'
    },
    {
      id: '3',
      client: 'Mike Anderson',
      clientEmail: 'mike.a@business.com',
      category: 'Social Media Marketing',
      priority: 'low',
      createdAt: 'Nov 26, 2025',
      dateSubmitted: 'Nov 26, 2025',
      details: 'Need social media strategy and content creation for Q1 2026.',
      status: 'proposal-sent'
    },
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
    },
  ];

  const pendingDocuments = [];
  const expiringDocuments = [];

  return (
    <div className="flex min-h-screen bg-[#F5F7FA] overflow-x-hidden">
      <Sidebar 
        role="agent" 
        activePage="/agent/dashboard" 
        onNavigate={navigate}
        userName="Faizan Akhtar"
      />

      {/* Main Content */}
      <div className="lg:ml-64 flex-1 pt-16 lg:pt-0 w-full min-w-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
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

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm text-[#4A5568]">Proposals Sent</p>
                <div className="w-8 h-8 bg-[#3498DB]/10 rounded-lg flex items-center justify-center">
                  <Send className="text-[#3498DB]" size={20} />
                </div>
              </div>
              <p className="text-3xl text-[#3498DB]">{requests.filter(r => r.status === 'proposal-sent').length}</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm text-[#4A5568]">Total Revenue</p>
                <div className="w-8 h-8 bg-[#2ECC71]/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="text-[#2ECC71]" size={20} />
                </div>
              </div>
              <p className="text-3xl text-[#2ECC71]">$12.5k</p>
            </div>
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

            {/* Desktop Table View */}
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
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-sm text-[#4A5568]">
                        No service requests at the moment.
                      </td>
                    </tr>
                  ) : (
                    requests.map((request) => (
                      <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-[#1A202C]">{request.client}</p>
                            <p className="text-xs text-[#4A5568]">{request.clientEmail}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#1A202C]">{request.category}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            request.priority === 'high' ? 'bg-red-100 text-red-700' :
                            request.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {request.priority ? request.priority.charAt(0).toUpperCase() + request.priority.slice(1) : 'Medium'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#4A5568]">{request.createdAt}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            request.status === 'new' ? 'bg-blue-100 text-blue-700' :
                            request.status === 'proposal-sent' ? 'bg-purple-100 text-purple-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {request.status === 'new' ? 'New' :
                             request.status === 'proposal-sent' ? 'Proposal Sent' :
                             'Accepted'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedRequest(request);
                                setShowProposalModal(true);
                              }}
                              className="text-[#2EC4B6] hover:text-[#26a599] text-sm font-medium"
                            >
                              {request.status === 'new' ? 'Create Proposal' : 'View Proposal'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-200">
              {requests.length === 0 ? (
                <div className="p-8 text-center text-sm text-[#4A5568]">
                  No service requests at the moment.
                </div>
              ) : (
                requests.map((request) => (
                  <div key={request.id} className="p-4 space-y-3">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#1A202C]">{request.client}</p>
                          <p className="text-xs text-[#4A5568] truncate">{request.clientEmail}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ml-2 whitespace-nowrap ${
                          request.status === 'new' ? 'bg-blue-100 text-blue-700' :
                          request.status === 'proposal-sent' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {request.status === 'new' ? 'New' :
                           request.status === 'proposal-sent' ? 'Proposal Sent' :
                           'Accepted'}
                        </span>
                      </div>
                      <p className="text-sm text-[#1A202C] mb-2">{request.category}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          request.priority === 'high' ? 'bg-red-100 text-red-700' :
                          request.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {request.priority ? request.priority.charAt(0).toUpperCase() + request.priority.slice(1) : 'Medium'}
                        </span>
                        <span className="text-xs text-[#4A5568]">{request.createdAt}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowProposalModal(true);
                      }}
                      className="w-full bg-[#2EC4B6] text-white px-4 py-2 rounded-lg hover:bg-[#26a599] text-sm font-medium"
                    >
                      {request.status === 'new' ? 'Create Proposal' : 'View Proposal'}
                    </button>
                  </div>
                ))
              )}
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
              <button
                onClick={() => navigate('/agent/projects')}
                className="text-[#2EC4B6] hover:text-[#26a599] text-sm font-medium"
              >
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
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#4A5568]">Progress</span>
                      <span className="text-[#1A202C] font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#2EC4B6] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
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

          {/* Pending Document Reviews */}
          <div className="bg-white rounded-lg border border-gray-200 mb-6">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="text-[#2EC4B6]" size={20} />
                <h3 className="text-[#1A202C]">Pending Document Reviews</h3>
              </div>
              <p className="text-sm text-[#4A5568]">Documents uploaded by clients that need your approval.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs text-[#4A5568] font-semibold">Client</th>
                    <th className="px-6 py-3 text-left text-xs text-[#4A5568] font-semibold">Company</th>
                    <th className="px-6 py-3 text-left text-xs text-[#4A5568] font-semibold">Document Type</th>
                    <th className="px-6 py-3 text-left text-xs text-[#4A5568] font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-xs text-[#4A5568] font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingDocuments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-sm text-[#4A5568]">
                        No documents are currently pending review.
                      </td>
                    </tr>
                  ) : (
                    pendingDocuments.map((doc: any) => (
                      <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-[#1A202C]">{doc.client}</td>
                        <td className="px-6 py-4 text-sm text-[#4A5568]">{doc.company}</td>
                        <td className="px-6 py-4 text-sm text-[#4A5568]">{doc.type}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-2 py-1 bg-[#F39C12]/10 text-[#F39C12] rounded text-xs">
                            Pending
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-[#2EC4B6] hover:text-[#26a599] text-sm">
                            Review
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
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
    </div>
  );
}