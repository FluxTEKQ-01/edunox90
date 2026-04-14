import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading: authLoading } = useAuth();

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile", user?.uid],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.uid)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (authLoading || profileLoading) {
    return <div className="h-screen flex items-center justify-center text-muted-foreground animate-pulse">Loading authorization...</div>;
  }

  if (!user || (profile?.role !== "admin" && profile?.role !== "super_admin")) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
