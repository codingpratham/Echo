import { Navigate } from "react-router";
import { authState } from "../store/AuthStore";

export const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const { isAuthenticated } = authState();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }



  return children;
};

export const OnboardingRoute = ({ children }: React.PropsWithChildren) => {
  const { isAuthenticated, isOnBoarded } = authState();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (isOnBoarded) {
    return <Navigate to="/" replace />;
  }

  return children;
};