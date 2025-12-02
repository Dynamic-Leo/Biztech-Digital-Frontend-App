import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, Calendar, Settings } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { ProgressCircle } from '../components/ProgressCircle';

export function AgentProjectManagement() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const projectId = id || '1';
  
  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'files'>('overview');
  
  const [progress, setProgress] = useState(65);
  const [ecd, setEcd] = useState('2025-10-25');

  const project = {
    name: 'Corporate Website Development',
    client: 'Global Tech LLC',
    status: 'in-progress' as const
  };

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
              <p className="text-gray-400 text-sm">Client: {project.client}</p>
            </div>
            <StatusBadge status={project.status} />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Control */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="text-[#2EC4B6]" size={24} />
                <h3 className="text-[#0D1B2A]">Update Project Status</h3>
              </div>

              <div className="mb-6">
                <label className="block mb-3 text-sm text-gray-700">Progress Percentage</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => setProgress(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #2EC4B6 0%, #2EC4B6 ${progress}%, #E5E7EB ${progress}%, #E5E7EB 100%)`
                    }}
                  />
                  <div className="w-20 text-center">
                    <span className="metric text-2xl text-[#2EC4B6]">{progress}%</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-3 text-sm text-gray-700">Estimated Completion Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="date"
                    value={ecd}
                    onChange={(e) => setEcd(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2EC4B6]"
                  />
                </div>
              </div>

              <button className="w-full bg-[#2EC4B6] hover:bg-[#26a599] text-white px-4 py-3 rounded-lg transition-colors">
                Save Changes
              </button>
            </div>

            {/* Upload Deliverables */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <Upload className="text-[#2EC4B6]" size={24} />
                <h3 className="text-[#0D1B2A]">Upload Deliverables</h3>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-[#2EC4B6] transition-colors cursor-pointer">
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-700 mb-2">Drag & drop files here</p>
                <p className="text-sm text-gray-500 mb-4">or click to browse</p>
                <button className="bg-[#2EC4B6] hover:bg-[#26a599] text-white px-6 py-2 rounded-lg transition-colors text-sm">
                  Choose Files
                </button>
              </div>

              <div className="mt-4 bg-[#2EC4B6]/5 border border-[#2EC4B6]/20 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  💡 Upload designs, reports, code files, or any deliverables for the client to review
                </p>
              </div>
            </div>

            {/* Client Assets Access */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="mb-4 text-[#0D1B2A]">Client Assets</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-[#0D1B2A] text-sm">Logo Files.zip</p>
                    <p className="text-xs text-gray-600">2.4 MB</p>
                  </div>
                  <button className="text-[#2EC4B6] hover:text-[#26a599] text-sm transition-colors">
                    Download
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-[#0D1B2A] text-sm">Brand Guidelines.pdf</p>
                    <p className="text-xs text-gray-600">1.8 MB</p>
                  </div>
                  <button className="text-[#2EC4B6] hover:text-[#26a599] text-sm transition-colors">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            {/* Current Progress Display */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h4 className="mb-6 text-[#0D1B2A] text-center">Current Progress</h4>
              <div className="flex justify-center mb-4">
                <ProgressCircle percentage={progress} />
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Client View</p>
                <p className="text-xs text-gray-500">This is what the client sees</p>
              </div>
            </div>

            {/* ECD Preview */}
            <div className="bg-gradient-to-br from-[#2EC4B6] to-[#26a599] rounded-xl p-6 shadow-lg text-white">
              <div className="flex items-center gap-3 mb-3">
                <Calendar size={24} />
                <h4>ECD Preview</h4>
              </div>
              <p className="text-3xl metric">
                {new Date(ecd).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </p>
              <p className="text-sm text-white/80 mt-2">
                {Math.ceil((new Date(ecd).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
              </p>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h4 className="mb-4 text-[#0D1B2A]">Project Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Files Uploaded</span>
                  <span className="metric text-lg text-[#0D1B2A]">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Client Assets</span>
                  <span className="metric text-lg text-[#0D1B2A]">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Days Active</span>
                  <span className="metric text-lg text-[#0D1B2A]">28</span>
                </div>
              </div>
            </div>

            {/* Credentials Access */}
            <div className="bg-gradient-to-br from-[#0D1B2A] to-[#1B2838] rounded-xl p-6 shadow-lg text-white border border-gray-700">
              <h4 className="mb-3 text-white">Client Credentials</h4>
              <p className="text-sm text-gray-200 mb-4">Access shared credentials</p>
              <button className="w-full bg-[#2EC4B6] hover:bg-[#26a599] text-white font-medium px-4 py-3 rounded-lg transition-colors">
                View Vault
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}