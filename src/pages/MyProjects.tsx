import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, TrendingUp, ExternalLink, Menu, X, Loader2, Briefcase, LogOut, User as UserIcon } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { ProgressCircle } from '../components/ProgressCircle';
import { Project } from '../types';
import api from '../lib/api';
import { toast } from 'sonner';


export function MyProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper to map backend status to frontend badge style
  const mapStatus = (status: string) => {
    const lower = status?.toLowerCase() || 'pending';
    if (lower === 'pending') return 'pending';
    if (lower === 'in progress') return 'in-progress';
    if (lower === 'delivered') return 'delivered';
    if (lower === 'completed') return 'approved';
    return 'pending';
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        
        // Map backend response to frontend Project interface
        const mappedProjects: Project[] = response.data.map((p: any) => ({
          id: p.id.toString(),
          name: `Project #${p.id} - ${p.Request?.Category?.name || 'Service'}`,
          client: p.Client?.companyName || 'My Company',
          category: p.Request?.Category?.name || 'General Service',
          status: mapStatus(p.globalStatus),
          progress: p.progressPercent || 0,
          startDate: new Date(p.createdAt).toLocaleDateString(),
          estimatedCompletion: p.ecd ? new Date(p.ecd).toLocaleDateString() : 'TBD',
          agent: p.Agent?.fullName || 'Unassigned',
          budget: p.Request?.budget ? `$${p.Request.budget}` : 'N/A',
          milestones: [], 
        }));

        setProjects(mappedProjects);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        toast.error('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#2EC4B6] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">


      {/* Rest of the component ... */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-[#0D1B2A]">My Projects</h1>
          <p className="text-[#4A5568]">Track progress and manage your active projects</p>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-[#4A5568] mb-2">Active Projects</p>
            <p className="text-3xl font-semibold text-[#2EC4B6]">
              {projects.filter(p => p.status === 'in-progress' || p.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-[#4A5568] mb-2">Completed</p>
            <p className="text-3xl font-semibold text-[#2ECC71]">
              {projects.filter(p => p.status === 'delivered' || p.status === 'approved').length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-[#4A5568] mb-2">Total Projects</p>
            <p className="text-3xl font-semibold text-[#0D1B2A]">{projects.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-[#4A5568] mb-2">Avg. Progress</p>
            <p className="text-3xl font-semibold text-[#3498DB]">
              {projects.length > 0 
                ? Math.round(projects.reduce((acc, curr) => acc + curr.progress, 0) / projects.length) 
                : 0}%
            </p>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-[#0D1B2A] text-lg font-semibold">{project.name}</h3>
                    <StatusBadge status={project.status} />
                  </div>
                  <p className="text-sm text-[#4A5568]">{project.category}</p>
                </div>
                <div className="flex items-center gap-4">
                  <ProgressCircle progress={project.progress} size={64} />
                </div>
              </div>

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
                    <p className="text-xs text-[#4A5568]">Est. Completion</p>
                    <p className="text-sm font-medium text-[#1A202C]">{project.estimatedCompletion}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                    {(project.agent || 'U').charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs text-[#4A5568]">Assigned Agent</p>
                    <p className="text-sm font-medium text-[#1A202C]">{project.agent || 'Unassigned'}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => navigate(`/project/${project.id}`)}
                  className="w-full bg-[#2EC4B6] text-white px-6 py-2.5 rounded-lg hover:bg-[#26a599] transition-all font-medium flex items-center justify-center gap-2 h-[44px]"
                >
                  <ExternalLink size={18} />
                  View Details & Files
                </button>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Briefcase className="mx-auto mb-4 text-gray-400" size={64} />
            <h3 className="mb-2 text-[#0D1B2A]">No Active Projects</h3>
            <p className="text-[#4A5568] mb-6">Start by requesting a service to begin your first project</p>
            <button onClick={() => navigate('/needs-assessment')} className="bg-[#2EC4B6] text-white px-8 py-3 rounded-lg hover:bg-[#26a599] transition-all font-medium h-[48px]">
              Request Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
}