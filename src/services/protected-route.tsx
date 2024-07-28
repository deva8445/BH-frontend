import React, { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthUser } from "./auth-user";

interface IRoute {
  children: ReactNode;
}

const ProtectedRoute: FC<IRoute> = ({ children }) => {
  const { token } = AuthUser();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
