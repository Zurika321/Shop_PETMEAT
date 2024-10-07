// ProtectedRoute.tsx
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, NameUser } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else {
    if (NameUser === "admin") {
      return <>{children}</>;
    } else {
      return <Navigate to="/#" />;
    }
  }
};

export default ProtectedRoute;
