// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function ProtectedRoute({ children, adminOnly = false }) {
  const { token, user } = useAuthStore();

  // Si no hay token → no logueado → mandamos a login
  if (!token) return <Navigate to="/login" replace />;

  // Si la ruta es solo admin y el user no es admin
  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

