import { Navigate } from "react-router-dom";
import { clearSession } from "../lib/api";

export default function ProtectedRoute({ children }) {
  if (!localStorage.getItem("accessToken")) {
    clearSession();
    return <Navigate to="/login" replace />;
  }

  return children;
}