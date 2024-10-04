import { Amplify } from "aws-amplify";
import { amplifyConfig } from "./config/amplifyConfig";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./globalStyles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/signin";
import Admin from "./pages/admin";
import Authorizer from "./pages/authorizer"; // Use capitalized component name
import AdminUsers from "./pages/AdminUsers";
import OrderForm from "./pages/OrderForm";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ConfirmationPage from "./pages/confirmation";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedAdmin from "./ProtectedRoutes/ProtectedAdmin";
import ProtectedEmployee from "./ProtectedRoutes/ProtectedEmployee";
import ProtectedAuthorizer from "./ProtectedRoutes/ProtectedAuthorizer";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  Amplify.configure(amplifyConfig);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/OrderForm"
            element={
              <ProtectedEmployee>
                <OrderForm />
              </ProtectedEmployee>
            }
          />
          <Route
            path="/EmployeeDashboard"
            element={
              <ProtectedEmployee>
                <EmployeeDashboard />
              </ProtectedEmployee>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedAdmin>
                <Admin />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/authorizer"
            element={
              <ProtectedAuthorizer>
                <Authorizer />
              </ProtectedAuthorizer>
            }
          />{" "}
          {/* Use capitalized component name */}
          <Route
            path="/admin/users"
            element={
              <ProtectedAdmin>
                <AdminUsers />
              </ProtectedAdmin>
            }
          />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/" element={<SignInPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
