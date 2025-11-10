import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    localStorage.setItem("lastVisitedPage", window.location.pathname);
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "Admin") {
    toast.error("Unauthorized Access");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
