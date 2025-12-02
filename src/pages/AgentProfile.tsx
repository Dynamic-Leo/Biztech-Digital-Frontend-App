import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Edit2, User, Mail, Phone, Award, Briefcase, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function AgentProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || 'Faizan Akhtar',
    email: user?.email || 'faizan.akhtar@biztech.com',
    phone: user?.phone || '+1 (555) 987-6543',
    title: user?.title || 'Senior Digital Consultant',
    specialization: user?.specialization || 'Web Development & SEO',
    experience: user?.experience || '5 years',
    bio: user?.bio || 'Experienced digital consultant specializing in web development, SEO optimization, and digital marketing strategies. Passionate about helping businesses grow their online presence.',
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
    <div className="flex min-h-screen bg-[#F5F7FA] overflow-x-hidden">
      <Sidebar 
        role="agent" 
        activePage="/agent/profile" 
        onNavigate={navigate}
        userName="Faizan Akhtar"
      />

      <div className="lg:ml-64 flex-1 pt-16 lg:pt-0 w-full min-w-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
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
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Response Time</span>
                    <span className="font-semibold text-[#2ECC71]">{stats.responseTime}</span>
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
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                      />
                    ) : (
                      <p className="text-[#4A5568] bg-gray-50 px-4 py-2.5 rounded-lg">{formData.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1A202C] mb-2">Job Title</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                      />
                    ) : (
                      <p className="text-[#4A5568] bg-gray-50 px-4 py-2.5 rounded-lg">{formData.title}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1A202C] mb-2">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                      />
                    ) : (
                      <p className="text-[#4A5568] bg-gray-50 px-4 py-2.5 rounded-lg">{formData.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1A202C] mb-2">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                      />
                    ) : (
                      <p className="text-[#4A5568] bg-gray-50 px-4 py-2.5 rounded-lg">{formData.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1A202C] mb-2">Specialization</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.specialization}
                        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                      />
                    ) : (
                      <p className="text-[#4A5568] bg-gray-50 px-4 py-2.5 rounded-lg">{formData.specialization}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1A202C] mb-2">Experience</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                      />
                    ) : (
                      <p className="text-[#4A5568] bg-gray-50 px-4 py-2.5 rounded-lg">{formData.experience}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-[#1A202C] mb-2">Bio</label>
                  {isEditing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                    />
                  ) : (
                    <p className="text-[#4A5568] bg-gray-50 px-4 py-2.5 rounded-lg">{formData.bio}</p>
                  )}
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-[#0D1B2A] mb-6">Security Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1A202C] mb-2">Current Password</label>
                    <input
                      type="password"
                      placeholder="Enter current password"
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1A202C] mb-2">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1A202C] mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                    />
                  </div>

                  <button className="w-full bg-gradient-to-r from-[#718096] to-[#4A5568] hover:from-[#4A5568] hover:to-[#2D3748] text-white py-3 rounded-lg transition-all font-medium mt-4 h-[48px]">
                    Update Password
                  </button>
                </div>
              </div>

              {/* Save Changes */}
              {isEditing && (
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-[#2EC4B6] hover:bg-[#26a599] text-white py-3 rounded-lg transition-all font-medium h-[48px]"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-white border-2 border-gray-300 text-[#1A202C] py-3 rounded-lg hover:bg-gray-50 transition-all font-medium h-[48px]"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}