import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../contexts/AuthContext';

/**
 * Layout for Clients (Dashboard, Profile, Projects)
 * Includes the Top Navigation Header
 */
export const ClientLayout = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header />
      {/* Outlet renders the child route (the specific page) */}
      <Outlet />
    </div>
  );
};

/**
 * Layout for Agents and Admins
 * Includes the Sidebar and the main content area wrapper
 */
interface SidebarLayoutProps {
  role: 'agent' | 'admin';
}

export const SidebarLayout = ({ role }: SidebarLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-[#F5F7FA] overflow-x-hidden">
      <Sidebar 
        role={role} 
        activePage={location.pathname} 
        onNavigate={(path) => navigate(path)}
        userName={user?.name || 'User'}
      />

      {/* Main Content Area - Handles the margin for the fixed sidebar */}
      <div className="lg:ml-64 flex-1 pt-16 lg:pt-0 w-full min-w-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};