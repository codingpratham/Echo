import { useEffect, useState, type PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router";
import { api } from "./apis";
import { authState } from "../store/AuthStore";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  const { isAuthenticated, isOnBoarded } = authState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get("/api/v1/auth/profile");

        if (data?.user) {
          authState.setState({
            isAuthenticated: true,
            isOnBoarded: data.user.isOnboarding,
          });
        } else {
          authState.setState({
            isAuthenticated: false,
            isOnBoarded: false,
          });
        }
      } catch (err) {
        console.error(err);

        authState.setState({
          isAuthenticated: false,
          isOnBoarded: false,
        });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Logged in but not onboarded
  if (
    !isOnBoarded &&
    location.pathname !== "/auth/onboarding"
  ) {
    return <Navigate to="/auth/onboarding" replace />;
  }

  // Already onboarded but trying to open onboarding page
  if (
    isOnBoarded &&
    location.pathname === "/auth/onboarding"
  ) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
