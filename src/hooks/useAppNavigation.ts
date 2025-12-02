import { useNavigate } from 'react-router-dom';

/**
 * Custom hook for app navigation
 * Provides a unified navigation interface for all components
 */
export const useAppNavigation = () => {
  const navigate = useNavigate();

  return {
    // Navigate to a path
    navigate: (path: string) => navigate(path),
    
    // Navigate with ID parameter
    navigateToProject: (id: string) => navigate(`/project/${id}`),
    navigateToAgentProject: (id: string) => navigate(`/agent/project-management/${id}`),
    
    // Go back
    goBack: () => navigate(-1),
    
    // Replace current route
    replace: (path: string) => navigate(path, { replace: true }),
  };
};
