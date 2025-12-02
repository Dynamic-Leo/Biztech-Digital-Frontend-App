import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Clock, TrendingUp, Calendar, ExternalLink } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { Project } from '../types';
import { Briefcase } from 'lucide-react';

export function AgentProjects() {
  const navigate = useNavigate();

  const projects: Project[] = [
    {
      id: '1',
      name: 'Corporate Website Development',
      client: 'Tech Solutions Inc',
      category: 'Web Development',
      status: 'in-progress',
      progress: 65,
      startDate: 'Oct 15, 2025',
      estimatedCompletion: 'Dec 25, 2025',
      budget: '$5,000',
      milestones: 4,
      completedMilestones: 2
    },
    {
      id: '2',
      name: 'E-commerce Platform',
      client: 'Retail Partners LLC',
      category: 'Web Development',
      status: 'planning',
      progress: 20,
      startDate: 'Nov 1, 2025',
      estimatedCompletion: 'Jan 15, 2026',
      budget: '$8,500',
      milestones: 5,
      completedMilestones: 1
    },
    {
      id: '3',
      name: 'SEO Campaign Q4',
      client: 'Marketing Pro LLC',
      category: 'SEO Optimization',
      status: 'in-progress',
      progress: 45,
      startDate: 'Oct 1, 2025',
      estimatedCompletion: 'Dec 31, 2025',
      budget: '$3,200',
      milestones: 3,
      completedMilestones: 1
    },
    {
      id: '4',
      name: 'Brand Identity Package',
      client: 'Startup Ventures',
      category: 'Marketing',
      status: 'review',
      progress: 90,
      startDate: 'Sep 15, 2025',
      estimatedCompletion: 'Nov 30, 2025',
      budget: '$4,500',
      milestones: 4,
      completedMilestones: 3
    },
    {
      id: '5',
      name: 'Mobile App Development',
      client: 'Tech Innovations Inc',
      category: 'Web Development',
      status: 'completed',
      progress: 100,
      startDate: 'Aug 1, 2025',
      estimatedCompletion: 'Oct 30, 2025',
      budget: '$12,000',
      milestones: 6,
      completedMilestones: 6
    },
  ];

  const [activeFilter, setActiveFilter] = React.useState<'all' | 'planning' | 'in-progress' | 'review' | 'completed'>('all');

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.status === activeFilter);

  const filterButtons = [
    { id: 'all', label: 'All Projects' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'planning', label: 'Planning' },
    { id: 'review', label: 'Review' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F7FA] overflow-x-hidden">
      <Sidebar 
        role="agent" 
        activePage="/agent/projects" 
        onNavigate={navigate}
        userName="Faizan Akhtar"
      />

      <div className="lg:ml-64 flex-1 pt-16 lg:pt-0 w-full min-w-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-[#0D1B2A]">Projects</h1>
            <p className="text-[#4A5568]">Manage and track all your client projects</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-[#4A5568] mb-2">Total Projects</p>
              <p className="text-3xl font-semibold text-[#2EC4B6]">{projects.length}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-[#4A5568] mb-2">In Progress</p>
              <p className="text-3xl font-semibold text-[#F39C12]">{projects.filter(p => p.status === 'in-progress').length}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-[#4A5568] mb-2">In Review</p>
              <p className="text-3xl font-semibold text-[#9B59B6]">{projects.filter(p => p.status === 'review').length}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <p className="text-sm text-[#4A5568] mb-2">Avg. Progress</p>
              <p className="text-3xl font-semibold text-[#3498DB]">55%</p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
            {filterButtons.map((filter) => (
              <button
                key={filter.id}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  filter.id === activeFilter
                    ? 'bg-[#2EC4B6] text-white'
                    : 'bg-white text-[#4A5568] border border-gray-200 hover:border-[#2EC4B6]'
                }`}
                onClick={() => setActiveFilter(filter.id as 'all' | 'planning' | 'in-progress' | 'review' | 'completed')}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="space-y-4">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-[#0D1B2A]">{project.name}</h3>
                      <StatusBadge status={project.status} />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#4A5568]">
                      <span>{project.client}</span>
                      <span>•</span>
                      <span>{project.category}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#4A5568] mb-1">Budget</p>
                    <p className="text-xl font-semibold text-[#2EC4B6]">{project.budget}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#4A5568]">Progress</span>
                    <span className="text-[#1A202C] font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-[#2EC4B6] to-[#26a599] h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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
                      <p className="text-xs text-[#4A5568]">Milestones</p>
                      <p className="text-sm font-medium text-[#1A202C]">{project.completedMilestones}/{project.milestones}</p>
                    </div>
                  </div>
                  <div></div>
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => navigate('/agent/project-management', { state: { projectId: project.id } })}
                      className="bg-[#2EC4B6] text-white px-6 py-2.5 rounded-lg hover:bg-[#26a599] transition-all font-medium flex items-center gap-2 h-[44px]"
                    >
                      <ExternalLink size={18} />
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            ))
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <Briefcase className="mx-auto mb-4 text-gray-400" size={64} />
                <h3 className="mb-2 text-[#0D1B2A]">No Projects Found</h3>
                <p className="text-[#4A5568]">There are no projects with status "{activeFilter === 'all' ? 'all' : activeFilter}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}