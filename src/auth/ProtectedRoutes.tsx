import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = () => {
  const { isSignedIn } = useUser(); // Check if user is logged in

  return isSignedIn ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
