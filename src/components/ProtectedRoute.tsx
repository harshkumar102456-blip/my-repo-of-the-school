import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  authKey: string; // The localStorage key to check for authentication
  redirectTo: string; // Where to redirect if not authenticated
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  authKey, 
  redirectTo 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem(authKey);
      setIsAuthenticated(authStatus === "true");
    };

    checkAuth();

    // Listen for storage changes (in case user logs out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === authKey) {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [authKey]);

  // Retry authentication check if it failed initially (handles temporary issues)
  useEffect(() => {
    if (isAuthenticated === false && retryCount < 3) {
      const retryTimer = setTimeout(() => {
        const authStatus = localStorage.getItem(authKey);
        if (authStatus === "true") {
          setIsAuthenticated(true);
        } else {
          setRetryCount(prev => prev + 1);
        }
      }, 500);
      
      return () => clearTimeout(retryTimer);
    }
  }, [isAuthenticated, retryCount, authKey]);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Render protected content if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;