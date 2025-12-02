import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Upload, Lock, Unlock, Download, FileText } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { ProgressCircle } from '../components/ProgressCircle';

export function ProjectCommandCenter() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const projectId = id || '1';
  
  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'vault'>('overview');

  // Mock project data
  const project = {
    name: 'Corporate Website Development',
    status: 'in-progress' as const,
    progress: 65,
    ecd: 'October 25, 2025',
    description: 'Development of a modern, responsive corporate website with CMS integration and multi-language support.',
    agent: 'Sarah Johnson',
    createdAt: 'September 15, 2025'
  };

  const credentials = [
    { label: 'Hosting Control Panel', username: 'admin@company.com', password: '••••••••' },
    { label: 'Domain Registrar', username: 'company_user', password: '••••••••' }
  ];

  const assets = [
    { name: 'Logo Files.zip', type: 'Client Asset', uploadedBy: 'You', date: 'Sep 20, 2025', size: '2.4 MB' },
    { name: 'Brand Guidelines.pdf', type: 'Client Asset', uploadedBy: 'You', date: 'Sep 20, 2025', size: '1.8 MB' }
  ];

  const deliverables = [
    { name: 'Homepage Design v2.fig', type: 'Deliverable', uploadedBy: 'Sarah Johnson', date: 'Oct 5, 2025', size: '5.2 MB' },
    { name: 'Website Wireframes.pdf', type: 'Deliverable', uploadedBy: 'Sarah Johnson', date: 'Sep 28, 2025', size: '3.1 MB' }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="bg-[#0D1B2A] text-white py-6 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-[#2EC4B6] hover:text-white mb-4 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="mb-2">{project.name}</h2>
              <p className="text-gray-400 text-sm">Project ID: #{projectId} • Started {project.createdAt}</p>
            </div>
            <StatusBadge status={project.status} />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Overview */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="mb-4 text-[#0D1B2A]">Project Overview</h3>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Assigned Agent</p>
                  <p className="text-[#0D1B2A]">{project.agent}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Start Date</p>
                  <p className="text-[#0D1B2A]">{project.createdAt}</p>
                </div>
              </div>
            </div>

            {/* Assets & Deliverables */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#0D1B2A]">Files & Deliverables</h3>
                <button className="bg-[#2EC4B6] hover:bg-[#26a599] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm">
                  <Upload size={16} />
                  Upload File
                </button>
              </div>

              {/* Client Assets */}
              <div className="mb-6">
                <h4 className="text-sm text-gray-600 mb-3">Your Uploads</h4>
                <div className="space-y-2">
                  {assets.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="text-[#3498DB]" size={20} />
                        <div>
                          <p className="text-[#0D1B2A] text-sm">{file.name}</p>
                          <p className="text-xs text-gray-600">{file.size} • {file.date}</p>
                        </div>
                      </div>
                      <button className="text-gray-600 hover:text-[#2EC4B6] transition-colors">
                        <Download size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <h4 className="text-sm text-gray-600 mb-3">Deliverables from Agent</h4>
                <div className="space-y-2">
                  {deliverables.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-[#2EC4B6]/5 rounded-lg hover:bg-[#2EC4B6]/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="text-[#2EC4B6]" size={20} />
                        <div>
                          <p className="text-[#0D1B2A] text-sm">{file.name}</p>
                          <p className="text-xs text-gray-600">{file.size} • {file.uploadedBy} • {file.date}</p>
                        </div>
                      </div>
                      <button className="text-gray-600 hover:text-[#2EC4B6] transition-colors">
                        <Download size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Vault */}
            <div className="bg-gradient-to-br from-[#0D1B2A] to-[#1B2838] rounded-xl p-6 shadow-lg text-white border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="text-[#2EC4B6]" size={24} />
                <h3 className="text-white">Technical Vault</h3>
              </div>
              <p className="text-gray-200 mb-6 text-sm">
                Credentials you've shared are encrypted and only accessible by your assigned agent.
              </p>
              
              <button
                onClick={() => setShowCredentials(!showCredentials)}
                className="w-full bg-[#2EC4B6] hover:bg-[#26a599] text-white font-medium px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors mb-4"
              >
                {showCredentials ? <Lock size={18} /> : <Unlock size={18} />}
                {showCredentials ? 'Hide Credentials' : 'Reveal Credentials'}
              </button>

              {showCredentials && (
                <div className="space-y-3 bg-white/10 rounded-lg p-4 border border-white/20">
                  {credentials.map((cred, index) => (
                    <div key={index} className="pb-3 border-b border-white/20 last:border-0 last:pb-0">
                      <p className="text-sm text-gray-300 mb-2 font-medium">{cred.label}</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-300 mb-1">Username</p>
                          <p className="text-sm text-white font-medium">{cred.username}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-300 mb-1">Password</p>
                          <p className="text-sm text-white font-medium">{cred.password}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Progress Metrics */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
              <h4 className="mb-6 text-[#0D1B2A]">Project Progress</h4>
              <div className="flex justify-center mb-6">
                <ProgressCircle percentage={project.progress} />
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Current Phase</p>
                <p className="text-[#0D1B2A]">Development & Integration</p>
              </div>
            </div>

            {/* ECD Card */}
            <div className="bg-gradient-to-br from-[#2EC4B6] to-[#26a599] rounded-xl p-6 shadow-lg text-white">
              <div className="flex items-center gap-3 mb-3">
                <Calendar size={24} />
                <h4>Estimated Completion</h4>
              </div>
              <p className="text-3xl metric">{project.ecd}</p>
              <p className="text-sm text-white/80 mt-2">8 days remaining</p>
            </div>

            {/* Remove the Milestones section */}
            
          </div>
        </div>
      </div>
    </div>
  );
}