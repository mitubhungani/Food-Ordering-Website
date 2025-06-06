import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/store/userStore";

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const { loggedInUser } = useUserStore((state) => state);
  const location = useLocation();

  if (!loggedInUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoutes;
