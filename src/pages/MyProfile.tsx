import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Save, X, Menu, X as CloseIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ProfileFormData } from '../types';
import logoImage from 'figma:asset/8c308caf909810f493480578c4eab6aa4f6235bf.png';

export function MyProfile() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: user?.fullName || 'John Smith',
    email: user?.email || 'john.smith@example.com',
    phone: user?.phone || '+1 (555) 123-4567',
    companyName: user?.companyName || 'Tech Innovations Inc.',
    industry: user?.industry || 'Technology',
    companySize: user?.companySize || '10-50 employees',
    address: user?.address || '123 Business St, San Francisco, CA 94105',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSave = () => {
    setIsEditing(false);
    // Add save logic here
    updateUser(formData);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 z-10">
              <img src={logoImage} alt="BizTech" className="h-7 sm:h-8" />
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-4 lg:gap-6">
              <button
                onClick={() => navigate('/client-dashboard')}
                className="text-gray-600 hover:text-[#1A202C] pb-1 font-medium text-sm lg:text-base"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/my-projects')}
                className="text-gray-600 hover:text-[#1A202C] pb-1 font-medium text-sm lg:text-base"
              >
                My Projects
              </button>
              <button
                onClick={() => navigate('/my-profile')}
                className="text-[#2EC4B6] border-b-2 border-[#2EC4B6] pb-1 font-medium text-sm lg:text-base"
              >
                My Profile
              </button>
            </nav>

            {/* Mobile Menu Button & Avatar */}
            <div className="flex items-center gap-3 z-10">
              <div className="w-8 h-8 bg-[#0D1B2A] rounded-full"></div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-[#0D1B2A] p-1"
              >
                {mobileMenuOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    navigate('/client-dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-600 font-medium py-2 px-4 hover:bg-gray-50 rounded-lg"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => {
                    navigate('/my-projects');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-600 font-medium py-2 px-4 hover:bg-gray-50 rounded-lg"
                >
                  My Projects
                </button>
                <button 
                  onClick={() => {
                    navigate('/my-profile');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-[#2EC4B6] font-medium py-2 px-4 bg-[#F0FDFA] rounded-lg"
                >
                  My Profile
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Page Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="mb-2 text-[#0D1B2A]">My Profile</h1>
            <p className="text-[#4A5568]">Manage your account information and preferences</p>
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
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[#2EC4B6] to-[#26a599] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-semibold">
                  {formData.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-[#0D1B2A] mb-1">{formData.fullName}</h3>
                <p className="text-sm text-[#4A5568]">{formData.companyName}</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2EC4B6]/10 rounded-lg flex items-center justify-center">
                    <Mail className="text-[#2EC4B6]" size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#4A5568]">Email</p>
                    <p className="text-sm font-medium text-[#1A202C] truncate">{formData.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#3498DB]/10 rounded-lg flex items-center justify-center">
                    <Building className="text-[#3498DB]" size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#4A5568]">Industry</p>
                    <p className="text-sm font-medium text-[#1A202C]">{formData.industry}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F39C12]/10 rounded-lg flex items-center justify-center">
                    <User className="text-[#F39C12]" size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#4A5568]">Company Size</p>
                    <p className="text-sm font-medium text-[#1A202C]">{formData.companySize}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Stats */}
            <div className="bg-gradient-to-br from-[#0D1B2A] to-[#1a2d42] rounded-xl p-6 text-white shadow-lg mt-6">
              <h4 className="text-white mb-4">Account Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Projects Completed</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Active Requests</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Member Since</span>
                  <span className="font-semibold">Jan 2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-[#0D1B2A] mb-6">Personal Information</h3>
              
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
                  <label className="block text-sm font-medium text-[#1A202C] mb-2">Industry</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                    />
                  ) : (
                    <p className="text-[#4A5568] bg-gray-50 px-4 py-2.5 rounded-lg">{formData.industry}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-[#0D1B2A] mb-6">Business Information</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#1A202C] mb-2">Company Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                    />
                  ) : (
                    <p className="text-[#4A5568] bg-gray-50 px-4 py-2.5 rounded-lg">{formData.companyName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A202C] mb-2">Company Size</label>
                  {isEditing ? (
                    <select
                      value={formData.companySize}
                      onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                    >
                      <option>1-10 employees</option>
                      <option>10-50 employees</option>
                      <option>50-200 employees</option>
                      <option>200+ employees</option>
                    </select>
                  ) : (
                    <p className="text-[#4A5568] bg-gray-50 px-4 py-2.5 rounded-lg">{formData.companySize}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A202C] mb-2">Business Address</label>
                  {isEditing ? (
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20"
                    />
                  ) : (
                    <p className="text-[#4A5568] bg-gray-50 px-4 py-2.5 rounded-lg">{formData.address}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="text-[#2EC4B6]" size={24} />
                <h3 className="text-[#0D1B2A]">Security Settings</h3>
              </div>
              
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
                  onClick={handleSave}
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
  );
}