import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, FolderOpen, TrendingUp, ArrowRight, AlertCircle, Download, Check, Menu, X } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { useAuth } from '../contexts/AuthContext';
import { ServiceRequest } from '../types';
import logoImage from 'figma:asset/8c308caf909810f493480578c4eab6aa4f6235bf.png';

export function ClientDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const requests: ServiceRequest[] = [
    { id: '1', client: user?.name || '', clientEmail: user?.email || '', category: 'Web Development', dateSubmitted: 'Nov 28, 2025', createdAt: 'Nov 28, 2025', status: 'action-required', details: 'Website redesign', proposalAmount: '$1,500' },
    { id: '2', client: user?.name || '', clientEmail: user?.email || '', category: 'SEO Optimization', dateSubmitted: 'Nov 25, 2025', createdAt: 'Nov 25, 2025', status: 'awaiting-quote', details: 'SEO audit' },
    { id: '3', client: user?.name || '', clientEmail: user?.email || '', category: 'Social Media Marketing', dateSubmitted: 'Nov 20, 2025', createdAt: 'Nov 20, 2025', status: 'pending-review', details: 'Social media campaign' },
  ];

  const hasActionRequired = requests.some(r => r.status === 'action-required');
  const actionRequiredRequest = requests.find(r => r.status === 'action-required');

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
                className="text-[#2EC4B6] border-b-2 border-[#2EC4B6] pb-1 font-medium text-sm lg:text-base"
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
                className="text-gray-600 hover:text-[#1A202C] pb-1 font-medium text-sm lg:text-base"
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
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                  className="text-left text-[#2EC4B6] font-medium py-2 px-4 bg-[#F0FDFA] rounded-lg"
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
                  className="text-left text-gray-600 font-medium py-2 px-4 hover:bg-gray-50 rounded-lg"
                >
                  My Profile
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="mb-2 text-[#0D1B2A]">Welcome, Business Owner!</h1>
          <p className="text-[#4A5568]">Request services, review proposals, and manage your projects</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Hero & Requests */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section - Request Service */}
            <div className="bg-gradient-to-br from-[#2EC4B6] to-[#26a599] rounded-xl p-8 text-white shadow-lg">
              <h2 className="mb-3 text-white">Ready to grow your business?</h2>
              <p className="mb-6 text-white/90">
                Start a new service request and receive custom proposals from our digital experts
              </p>
              <button
                onClick={() => navigate('/needs-assessment')}
                className="bg-white text-[#2EC4B6] px-8 py-3 rounded-lg hover:bg-gray-50 transition-all font-medium flex items-center gap-2 group h-[48px]"
              >
                Start New Request
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Proposal Alert - Only shows if Action Required */}
            {hasActionRequired && actionRequiredRequest && (
              <div className="bg-gradient-to-br from-[#FFF4E6] to-[#FFF9F0] border-2 border-[#F39C12] rounded-xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F39C12] rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-[#0D1B2A]">New Proposal Received!</h3>
                    <p className="text-sm text-[#4A5568] mb-4">
                      {actionRequiredRequest.category} - <span className="font-semibold text-[#0D1B2A]">{actionRequiredRequest.proposalAmount}</span>
                    </p>
                    <div className="flex gap-3">
                      <button className="bg-white border-2 border-[#0D1B2A] text-[#0D1B2A] px-6 py-2.5 rounded-lg hover:bg-[#0D1B2A] hover:text-white transition-all font-medium flex items-center gap-2 h-[44px]">
                        <Download size={18} />
                        View PDF
                      </button>
                      <button className="bg-[#2EC4B6] text-white px-6 py-2.5 rounded-lg hover:bg-[#26a599] transition-all font-medium flex items-center gap-2 h-[44px]">
                        <Check size={18} />
                        Accept Quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* My Requests Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#0D1B2A]">My Requests</h3>
                <button
                  onClick={() => navigate('/needs-assessment')}
                  className="text-[#2EC4B6] hover:text-[#26a599] text-sm font-medium flex items-center gap-1"
                >
                  <Plus size={16} />
                  New Request
                </button>
              </div>

              {/* Requests Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#4A5568]">Service Category</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#4A5568]">Date Submitted</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#4A5568]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request) => (
                      <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <span className="text-[#1A202C] font-medium">{request.category}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-[#4A5568] text-sm">{request.dateSubmitted}</span>
                        </td>
                        <td className="py-4 px-4">
                          <StatusBadge status={request.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {requests.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="text-[#4A5568] mb-4">No service requests yet</p>
                  <button
                    onClick={() => navigate('/needs-assessment')}
                    className="bg-[#2EC4B6] text-white px-6 py-2.5 rounded-lg hover:bg-[#26a599] transition-all font-medium"
                  >
                    Create Your First Request
                  </button>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                <p className="text-sm text-[#4A5568] mb-2">Total Requests</p>
                <p className="text-3xl font-semibold text-[#0D1B2A]">{requests.length}</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                <p className="text-sm text-[#4A5568] mb-2">Pending Review</p>
                <p className="text-3xl font-semibold text-[#F39C12]">
                  {requests.filter(r => r.status === 'pending-review').length}
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                <p className="text-sm text-[#4A5568] mb-2">Action Required</p>
                <p className="text-3xl font-semibold text-[#E74C3C]">
                  {requests.filter(r => r.status === 'action-required').length}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h4 className="text-[#0D1B2A] mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/needs-assessment')}
                  className="w-full text-left px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-[#2EC4B6] hover:bg-[#F0FDFA] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#2EC4B6]/10 rounded-lg flex items-center justify-center group-hover:bg-[#2EC4B6] transition-colors">
                      <Plus className="text-[#2EC4B6] group-hover:text-white" size={18} />
                    </div>
                    <p className="text-[#1A202C] text-sm font-medium">Request New Service</p>
                  </div>
                </button>
                <button
                  onClick={() => navigate('/my-documents')}
                  className="w-full text-left px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-[#2EC4B6] hover:bg-[#F0FDFA] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#2EC4B6]/10 rounded-lg flex items-center justify-center group-hover:bg-[#2EC4B6] transition-colors">
                      <FolderOpen className="text-[#2EC4B6] group-hover:text-white" size={18} />
                    </div>
                    <p className="text-[#1A202C] text-sm font-medium">My Vault</p>
                  </div>
                </button>
                <button
                  onClick={() => navigate('/my-profile')}
                  className="w-full text-left px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-[#2EC4B6] hover:bg-[#F0FDFA] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#2EC4B6]/10 rounded-lg flex items-center justify-center group-hover:bg-[#2EC4B6] transition-colors">
                      <FileText className="text-[#2EC4B6] group-hover:text-white" size={18} />
                    </div>
                    <p className="text-[#1A202C] text-sm font-medium">View My Profile</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Workflow Guide */}
            <div className="bg-gradient-to-br from-[#0D1B2A] to-[#1a2d42] rounded-xl p-6 text-white shadow-lg">
              <h4 className="text-white mb-4">How It Works</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#2EC4B6] rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Submit Request</p>
                    <p className="text-xs text-gray-300">Complete needs assessment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#2EC4B6] rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Review Proposal</p>
                    <p className="text-xs text-gray-300">Agent creates custom quote</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#2EC4B6] rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Accept & Start</p>
                    <p className="text-xs text-gray-300">Work begins on milestones</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Button */}
            <button className="w-full bg-[#2EC4B6] hover:bg-[#26a599] text-white py-4 rounded-lg transition-colors font-medium shadow-md">
              Need help? Contact your agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}