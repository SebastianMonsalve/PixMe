import { Outlet, Navigate } from "react-router-dom";
import { contextProvider } from "./ContextApi";
const ProtectedRoutesRecovery = () => {
  const { codeValidation } = contextProvider();
  if (!codeValidation) {
    return <Navigate to={"/recoveryaccount"} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutesRecovery;
