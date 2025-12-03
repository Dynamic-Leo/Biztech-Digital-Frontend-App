import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Mail, Phone } from 'lucide-react';
import { Agent } from '../types';
import { toast } from 'sonner';
import api from '../lib/api';

export function AdminAgents() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [showAddAgent, setShowAddAgent] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [newAgent, setNewAgent] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await api.get('/admin/agents');
      const mappedAgents = res.data.map((u: any) => ({
        id: u.id,
        name: u.fullName,
        email: u.email,
        phone: u.mobile,
        status: u.status.toLowerCase(),
        joinedDate: new Date(u.createdAt).toLocaleDateString()
      }));
      setAgents(mappedAgents);
    } catch (error) {
      toast.error("Failed to load agents");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAgent = async () => {
    if (!newAgent.fullName || !newAgent.email || !newAgent.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await api.post('/admin/agents', {
        fullName: newAgent.fullName,
        email: newAgent.email,
        mobile: newAgent.phone,
        password: newAgent.password
      });
      
      toast.success(`Agent ${newAgent.fullName} created successfully!`);
      setShowAddAgent(false);
      setNewAgent({ fullName: '', email: '', phone: '', password: '' });
      fetchAgents();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create agent");
    }
  };

  return (
    <>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="mb-2 text-[#0D1B2A]">Agent Management</h1>
          <p className="text-[#4A5568]">Create and manage agent accounts</p>
        </div>
        <button
          onClick={() => setShowAddAgent(true)}
          className="flex items-center gap-2 bg-[#2EC4B6] text-white px-6 py-2.5 rounded-lg hover:bg-[#26a599] transition-all font-medium"
        >
          <Plus size={20} /> Add New Agent
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <p className="col-span-full text-center py-8 text-[#4A5568]">Loading agents...</p>
        ) : agents.length === 0 ? (
          <p className="col-span-full text-center py-8 text-[#4A5568]">No agents found.</p>
        ) : (
          agents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2EC4B6] to-[#26a599] rounded-full flex items-center justify-center text-white font-semibold">
                    {agent.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0D1B2A]">{agent.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      agent.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-[#4A5568]">
                  <Mail size={14} /> <span className="truncate">{agent.email}</span>
                </div>
                {agent.phone && (
                  <div className="flex items-center gap-2 text-sm text-[#4A5568]">
                    <Phone size={14} /> <span>{agent.phone}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Agent Modal */}
      {showAddAgent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#0D1B2A]">Add New Agent</h2>
              <button onClick={() => setShowAddAgent(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  value={newAgent.fullName}
                  onChange={(e) => setNewAgent({ ...newAgent, fullName: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  value={newAgent.email}
                  onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  value={newAgent.phone}
                  onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password *</label>
                <input
                  type="password"
                  value={newAgent.password}
                  onChange={(e) => setNewAgent({ ...newAgent, password: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              
              <button onClick={handleAddAgent} className="w-full bg-[#2EC4B6] text-white py-3 rounded-lg hover:bg-[#26a599] font-medium">
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}