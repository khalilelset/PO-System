import { useNavigate } from "react-router-dom";
import * as React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedAdmin: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem("access");
    const role = localStorage.getItem("role");

    if (!isAuthenticated || role != 'Admin') {   
      navigate("/");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedAdmin;
