import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const withAuthRoute =
  (WrappedComponent: any) =>
  ({ ...props }) => {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.user) {
      return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return <WrappedComponent {...props} />;
  };
