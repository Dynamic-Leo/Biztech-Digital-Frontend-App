import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, TrendingUp, ExternalLink, Menu, X } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { ProgressCircle } from '../components/ProgressCircle';
import { Project } from '../types';
import logoImage from 'figma:asset/8c308caf909810f493480578c4eab6aa4f6235bf.png';

export function MyProjects() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const projects: Project[] = [
    {
      id: '1',
      name: 'Corporate Website Development',
      category: 'Web Development',
      status: 'in-progress',
      progress: 65,
      startDate: 'Oct 15, 2025',
      estimatedCompletion: 'Dec 25, 2025',
      agent: 'Faizan Ahmed',
      budget: '$5,000',
      milestones: [
        { id: '1', name: 'Design Mockups', status: 'completed', dueDate: 'Oct 20, 2025' },
        { id: '2', name: 'Frontend Development', status: 'in-progress', dueDate: 'Nov 15, 2025' },
        { id: '3', name: 'Backend Integration', status: 'pending', dueDate: 'Dec 10, 2025' },
        { id: '4', name: 'Testing & Launch', status: 'pending', dueDate: 'Dec 25, 2025' },
      ],
    },
    {
      id: '2',
      name: 'SEO Campaign - Q4 2025',
      category: 'SEO Optimization',
      status: 'in-progress',
      progress: 30,
      startDate: 'Nov 1, 2025',
      estimatedCompletion: 'Jan 15, 2026',
      agent: 'Sarah Johnson',
      budget: '$2,500',
      milestones: [
        { id: '1', name: 'Keyword Research', status: 'completed', dueDate: 'Nov 5, 2025' },
        { id: '2', name: 'On-Page Optimization', status: 'in-progress', dueDate: 'Nov 20, 2025' },
        { id: '3', name: 'Link Building', status: 'pending', dueDate: 'Dec 15, 2025' },
      ],
    },
  ];

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
                className="text-[#2EC4B6] border-b-2 border-[#2EC4B6] pb-1 font-medium text-sm lg:text-base"
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
                  className="text-left text-gray-600 font-medium py-2 px-4 hover:bg-gray-50 rounded-lg"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => {
                    navigate('/my-projects');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-[#2EC4B6] font-medium py-2 px-4 bg-[#F0FDFA] rounded-lg"
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-[#0D1B2A]">My Projects</h1>
          <p className="text-[#4A5568]">Track progress and manage your active projects</p>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-[#4A5568] mb-2">Active Projects</p>
            <p className="text-3xl font-semibold text-[#2EC4B6]">{projects.filter(p => p.status === 'in-progress').length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-[#4A5568] mb-2">Completed</p>
            <p className="text-3xl font-semibold text-[#2ECC71]">{projects.filter(p => p.status === 'delivered').length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-[#4A5568] mb-2">Total Budget</p>
            <p className="text-3xl font-semibold text-[#0D1B2A]">$7,500</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-[#4A5568] mb-2">Avg. Progress</p>
            <p className="text-3xl font-semibold text-[#3498DB]">48%</p>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              {/* Project Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-[#0D1B2A]">{project.name}</h3>
                    <StatusBadge status={project.status} />
                  </div>
                  <p className="text-sm text-[#4A5568]">{project.category}</p>
                </div>
                <div className="flex items-center gap-4">
                  <ProgressCircle progress={project.progress} size={64} />
                </div>
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2EC4B6]/10 rounded-lg flex items-center justify-center">
                    <Calendar className="text-[#2EC4B6]" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-[#4A5568]">Start Date</p>
                    <p className="text-sm font-medium text-[#1A202C]">{project.startDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#3498DB]/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-[#3498DB]" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-[#4A5568]">Budget</p>
                    <p className="text-sm font-medium text-[#1A202C]">{project.budget}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="text-xs text-[#4A5568]">Assigned Agent</p>
                    <p className="text-sm font-medium text-[#1A202C]">{project.agent}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => navigate('/project-command-center', project.id)}
                  className="w-full bg-[#2EC4B6] text-white px-6 py-2.5 rounded-lg hover:bg-[#26a599] transition-all font-medium flex items-center justify-center gap-2 h-[44px]"
                >
                  <ExternalLink size={18} />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <TrendingUp className="mx-auto mb-4 text-gray-400" size={64} />
            <h3 className="mb-2 text-[#0D1B2A]">No Active Projects</h3>
            <p className="text-[#4A5568] mb-6">Start by requesting a service to begin your first project</p>
            <button
              onClick={() => navigate('/needs-assessment')}
              className="bg-[#2EC4B6] text-white px-8 py-3 rounded-lg hover:bg-[#26a599] transition-all font-medium h-[48px]"
            >
              Request Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
}