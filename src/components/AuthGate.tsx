import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export function AuthGate({ children, requireAuth = true }: { children: React.ReactNode, requireAuth?: boolean }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!requireAuth && user) {
    // If the route doesn't require auth (e.g. login page) but the user is logged in, redirect them
    const from = location.state?.from?.pathname || '/client';
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
}
