import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Public Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { PendingApproval } from './pages/PendingApproval';

// Client Pages
import { ClientDashboard } from './pages/ClientDashboard';
import { MyDocuments } from './pages/MyDocuments';
import { MyProfile } from './pages/MyProfile';
import { MyProjects } from './pages/MyProjects';
import { NeedsAssessment } from './pages/NeedsAssessment';
import { ProjectCommandCenter } from './pages/ProjectCommandCenter';

// Agent Pages
import { AgentDashboard } from './pages/AgentDashboard';
import { AgentClients } from './pages/AgentClients';
import { AgentProjects } from './pages/AgentProjects';
import { AgentProfile } from './pages/AgentProfile';
import { ProposalBuilder } from './pages/ProposalBuilder';
import { AgentProjectManagement } from './pages/AgentProjectManagement';

// Admin Pages
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminApprovals } from './pages/AdminApprovals';
import { AdminAgents } from './pages/AdminAgents';
import { AdminRequests } from './pages/AdminRequests';
import { AdminSettings } from './pages/AdminSettings';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen">
          <Toaster position="top-right" richColors />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/pending-approval" element={<PendingApproval />} />

            {/* Client Routes - Protected */}
            <Route 
              path="/client-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['client']}>
                  <ClientDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-documents" 
              element={
                <ProtectedRoute allowedRoles={['client']}>
                  <MyDocuments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-profile" 
              element={
                <ProtectedRoute allowedRoles={['client']}>
                  <MyProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-projects" 
              element={
                <ProtectedRoute allowedRoles={['client']}>
                  <MyProjects />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/needs-assessment" 
              element={
                <ProtectedRoute allowedRoles={['client']}>
                  <NeedsAssessment />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/project/:id" 
              element={
                <ProtectedRoute allowedRoles={['client']}>
                  <ProjectCommandCenter />
                </ProtectedRoute>
              } 
            />

            {/* Agent Routes - Protected */}
            <Route 
              path="/agent/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['agent']}>
                  <AgentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/agent/clients" 
              element={
                <ProtectedRoute allowedRoles={['agent']}>
                  <AgentClients />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/agent/projects" 
              element={
                <ProtectedRoute allowedRoles={['agent']}>
                  <AgentProjects />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/agent/profile" 
              element={
                <ProtectedRoute allowedRoles={['agent']}>
                  <AgentProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/agent/proposal-builder" 
              element={
                <ProtectedRoute allowedRoles={['agent']}>
                  <ProposalBuilder />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/agent/project-management/:id" 
              element={
                <ProtectedRoute allowedRoles={['agent']}>
                  <AgentProjectManagement />
                </ProtectedRoute>
              } 
            />

            {/* Admin Routes - Protected */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/approvals" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminApprovals />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/agents" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminAgents />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/requests" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminRequests />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/settings" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminSettings />
                </ProtectedRoute>
              } 
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}