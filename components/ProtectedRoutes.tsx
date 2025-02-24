'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, setIsAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check token on mount and whenever authentication state changes
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      if (token) {
        setIsAuthenticated(true);
        console.log(isAuthenticated);
      } else if (!isLoading && !isAuthenticated) {
        router.push('/');
      }
    };

    checkAuth();
  }, [isAuthenticated, isLoading, router, setIsAuthenticated]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00843D]"></div>
      </div>
    );
  }

  // Only render children if authenticated
  return isAuthenticated ? <>{children}</> : null;
}