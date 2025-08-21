import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

interface PrivateRouteProps {
  component: JSX.Element;
}

export function PrivateRoute({ component }: PrivateRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{component}</>;
}
