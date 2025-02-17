import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = () => {
  const { isLoaded, isSignedIn } = useUser(); 

  if (!isLoaded) return null; // Prevents redirecting before authentication is checked

  return isSignedIn ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
