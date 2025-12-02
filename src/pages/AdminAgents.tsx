import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Agent } from '../types';
import { toast } from 'sonner';

export function AdminAgents() {
  const navigate = useNavigate();
  const [showAddAgent, setShowAddAgent] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    password: ''
  });

  const agents: Agent[] = [
    {
      id: '1',
      name: 'Faizan Akhtar',
      email: 'faizan.akhtar@biztech.com',
      phone: '+1 (555) 987-6543',
      specialization: 'Web Development & SEO',
      status: 'active',
      totalClients: 8,
      activeProjects: 4,
      completedProjects: 23,
      rating: 4.8,
      joinedDate: 'Jan 15, 2025'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@biztech.com',
      phone: '+1 (555) 234-5678',
      specialization: 'Digital Marketing',
      status: 'active',
      totalClients: 6,
      activeProjects: 3,
      completedProjects: 18,
      rating: 4.9,
      joinedDate: 'Feb 10, 2025'
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike.c@biztech.com',
      phone: '+1 (555) 345-6789',
      specialization: 'SEO & Content Strategy',
      status: 'active',
      totalClients: 5,
      activeProjects: 2,
      completedProjects: 15,
      rating: 4.7,
      joinedDate: 'Mar 5, 2025'
    },
  ];

  const handleAddAgent = () => {
    if (!newAgent.name || !newAgent.email || !newAgent.specialization) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success(`Agent ${newAgent.name} has been added successfully!`);
    setShowAddAgent(false);
    setNewAgent({ name: '', email: '', phone: '', specialization: '', password: '' });
  };

  const handleDeleteAgent = (agent: Agent) => {
    toast.success(`Agent ${agent.name} has been removed`);
  };

  const handleToggleStatus = (agent: Agent) => {
    const newStatus = agent.status === 'active' ? 'inactive' : 'active';
    toast.success(`Agent ${agent.name} status changed to ${newStatus}`);
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7FA] overflow-x-hidden">
      <Sidebar 
        role="admin" 
        activePage="/admin/agents" 
        onNavigate={navigate}
        userName="Admin"
      />

      <div className="lg:ml-64 flex-1 pt-16 lg:pt-0 w-full min-w-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
          {/* Page Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="mb-2 text-[#0D1B2A]">Agent Management</h1>
              <p className="text-[#4A5568]">Create and manage agent accounts</p>
            </div>
            <button
              onClick={() => setShowAddAgent(true)}
              className="flex items-center gap-2 bg-[#2EC4B6] text-white px-6 py-2.5 rounded-lg hover:bg-[#26a599] transition-all font-medium h-[44px]"
            >
              <Plus size={20} />
              Add New Agent
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-[#4A5568] mb-2">Total Agents</p>
              <p className="text-3xl font-semibold text-[#2EC4B6]">{agents.length}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-[#4A5568] mb-2">Active Agents</p>
              <p className="text-3xl font-semibold text-[#2ECC71]">{agents.filter(a => a.status === 'active').length}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-[#4A5568] mb-2">Total Projects</p>
              <p className="text-3xl font-semibold text-[#F39C12]">{agents.reduce((sum, a) => sum + a.activeProjects, 0)}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-[#4A5568] mb-2">Avg. Rating</p>
              <p className="text-3xl font-semibold text-[#3498DB]">4.8</p>
            </div>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#2EC4B6] to-[#26a599] rounded-full flex items-center justify-center text-white font-semibold">
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0D1B2A]">{agent.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Award className="text-[#F39C12]" size={14} />
                        <span className="text-sm font-medium text-[#F39C12]">{agent.rating}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    agent.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {agent.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[#4A5568]">
                    <Mail size={14} />
                    <span className="truncate">{agent.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#4A5568]">
                    <Briefcase size={14} />
                    <span>{agent.specialization}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 py-3 border-t border-gray-200 mb-4">
                  <div>
                    <p className="text-xs text-[#4A5568] mb-1">Clients</p>
                    <p className="font-semibold text-[#1A202C]">{agent.totalClients}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#4A5568] mb-1">Active</p>
                    <p className="font-semibold text-[#2EC4B6]">{agent.activeProjects}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#4A5568] mb-1">Done</p>
                    <p className="font-semibold text-[#2ECC71]">{agent.completedProjects}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleStatus(agent)}
                    className="flex-1 bg-[#2EC4B6] text-white px-4 py-2 rounded-lg hover:bg-[#26a599] transition-all font-medium text-sm flex items-center justify-center gap-2"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAgent(agent)}
                    className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-all font-medium text-sm flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Agent Modal */}
      {showAddAgent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#2EC4B6] to-[#26a599] p-6 rounded-t-2xl text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-2">Add New Agent</h2>
                  <p className="text-white/90">Create a new agent account</p>
                </div>
                <button
                  onClick={() => setShowAddAgent(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A202C] mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={newAgent.name}
                    onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                    placeholder="Enter agent's full name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A202C] mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={newAgent.email}
                    onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
                    placeholder="agent@biztech.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A202C] mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={newAgent.phone}
                    onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A202C] mb-2">Specialization *</label>
                  <select
                    value={newAgent.specialization}
                    onChange={(e) => setNewAgent({ ...newAgent, specialization: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                  >
                    <option value="">Select specialization</option>
                    <option value="Web Development">Web Development</option>
                    <option value="SEO Optimization">SEO Optimization</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Social Media Marketing">Social Media Marketing</option>
                    <option value="Content Strategy">Content Strategy</option>
                    <option value="Full Stack">Full Stack (All Services)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A202C] mb-2">Temporary Password *</label>
                  <input
                    type="password"
                    value={newAgent.password}
                    onChange={(e) => setNewAgent({ ...newAgent, password: e.target.value })}
                    placeholder="Enter temporary password"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                  />
                  <p className="text-xs text-[#4A5568] mt-1">Agent will be prompted to change this on first login</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-2xl">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddAgent(false)}
                  className="flex-1 bg-white border-2 border-gray-300 text-[#1A202C] px-6 py-3 rounded-lg hover:bg-gray-50 transition-all font-medium h-[48px]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAgent}
                  className="flex-1 bg-gradient-to-r from-[#2EC4B6] to-[#26a599] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium h-[48px]"
                >
                  Create Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}