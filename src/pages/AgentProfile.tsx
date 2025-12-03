import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Mail, Phone, Award, Briefcase } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function AgentProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Agent Name',
    email: user?.email || 'agent@biztech.com',
    phone: user?.phone || '+1 (555) 987-6543',
    title: 'Senior Digital Consultant',
    specialization: 'Web Development & SEO',
    experience: '5 years',
    bio: 'Experienced digital consultant specializing in web development, SEO optimization, and digital marketing strategies.',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const stats = {
    totalClients: 8,
    activeProjects: 4,
    completedProjects: 23,
    totalRevenue: '$45,600',
    avgRating: 4.8,
    responseTime: '< 2 hours'
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="mb-2 text-[#0D1B2A]">My Profile</h1>
          <p className="text-[#4A5568]">Manage your professional information and settings</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all h-[44px] border-2 border-gray-200 text-[#1A202C] hover:border-[#2EC4B6] hover:bg-[#F0FDFA]"
        >
          <Edit2 size={18} />
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card & Stats */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[#2EC4B6] to-[#26a599] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-semibold">
                {formData.fullName.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-[#0D1B2A] mb-1">{formData.fullName}</h3>
              <p className="text-sm text-[#4A5568] mb-2">{formData.title}</p>
              <div className="flex items-center justify-center gap-2">
                <Award className="text-[#F39C12]" size={16} />
                <span className="text-sm font-medium text-[#F39C12]">{stats.avgRating} Rating</span>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2EC4B6]/10 rounded-lg flex items-center justify-center">
                  <Mail className="text-[#2EC4B6]" size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#4A5568]">Email</p>
                  <p className="text-sm font-medium text-[#1A202C] truncate">{formData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#3498DB]/10 rounded-lg flex items-center justify-center">
                  <Phone className="text-[#3498DB]" size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[#4A5568]">Phone</p>
                  <p className="text-sm font-medium text-[#1A202C]">{formData.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#9B59B6]/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="text-[#9B59B6]" size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[#4A5568]">Specialization</p>
                  <p className="text-sm font-medium text-[#1A202C]">{formData.specialization}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="bg-gradient-to-br from-[#0D1B2A] to-[#1a2d42] rounded-xl p-6 text-white shadow-lg">
            <h4 className="text-white mb-4">Performance Stats</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Total Clients</span>
                <span className="font-semibold">{stats.totalClients}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Active Projects</span>
                <span className="font-semibold">{stats.activeProjects}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Completed</span>
                <span className="font-semibold">{stats.completedProjects}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-white/20">
                <span className="text-sm text-gray-300">Total Revenue</span>
                <span className="font-semibold text-[#2EC4B6]">{stats.totalRevenue}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Professional Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-[#0D1B2A] mb-6">Professional Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1A202C] mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6]"
                  disabled={!isEditing}
                />
              </div>
              {/* Add other inputs similarly... */}
            </div>
          </div>
          {/* Security Settings section remains same... */}
        </div>
      </div>
    </>
  );
}