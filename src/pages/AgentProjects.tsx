import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, TrendingUp, Calendar, ExternalLink, Briefcase } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { Project } from '../types';

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
      milestones: [],
      deliverables: []
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
      milestones: [],
      deliverables: []
    }
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
    <>
      <div className="mb-8">
        <h1 className="mb-2 text-[#0D1B2A]">Projects</h1>
        <p className="text-[#4A5568]">Manage and track all your client projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <p className="text-sm text-[#4A5568] mb-2">Total Projects</p>
          <p className="text-3xl font-semibold text-[#2EC4B6]">{projects.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <p className="text-sm text-[#4A5568] mb-2">In Progress</p>
          <p className="text-3xl font-semibold text-[#F39C12]">{projects.filter(p => p.status === 'in-progress').length}</p>
        </div>
        {/* Add more stats as needed */}
      </div>

      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {filterButtons.map((filter) => (
          <button
            key={filter.id}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              filter.id === activeFilter
                ? 'bg-[#2EC4B6] text-white'
                : 'bg-white text-[#4A5568] border border-gray-200 hover:border-[#2EC4B6]'
            }`}
            onClick={() => setActiveFilter(filter.id as any)}
          >
            {filter.label}
          </button>
        ))}
      </div>

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
          ))
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Briefcase className="mx-auto mb-4 text-gray-400" size={64} />
            <h3 className="mb-2 text-[#0D1B2A]">No Projects Found</h3>
          </div>
        )}
      </div>
    </>
  );
}