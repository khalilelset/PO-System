import { useNavigate } from "react-router-dom";
import * as React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedAuthorizer: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem("access");
    const role = localStorage.getItem("role");

    if (!isAuthenticated || role != 'Authorizer') {   
      navigate("/");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedAuthorizer;
