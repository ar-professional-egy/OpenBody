import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export function AuthGate({ children, requireAuth = true }: { children: React.ReactNode, requireAuth?: boolean }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [role, setRole] = useState<string | null>(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.uid)
            .single();
          
          if (!error && data) {
            setRole(data.role);
          } else {
            // Default fallback if no profile found
            setRole('client');
          }
        } catch (e) {
          console.error('Error fetching role:', e);
          setRole('client');
        }
      }
      setRoleLoading(false);
    }
    
    if (!loading && user) {
      fetchRole();
    } else if (!loading && !user) {
      setRoleLoading(false);
    }
  }, [user, loading]);

  if (loading || (requireAuth && roleLoading)) {
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
    return <Navigate to="/client" replace />;
  }

  // RBAC Routing Logic
  if (requireAuth && user && role) {
    const path = location.pathname;
    if (path.startsWith('/admin') && role !== 'admin') {
      return <Navigate to="/client" replace />;
    }
    if (path.startsWith('/workshop') && role !== 'workshop' && role !== 'admin') {
      return <Navigate to="/client" replace />;
    }
  }

  return <>{children}</>;
}
