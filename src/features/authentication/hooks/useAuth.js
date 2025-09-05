import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import session from "utils/session";

function useAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!session.isAuthTokenPresent()) {
      navigate("/sign_in");
    }
  }, [navigate]);

  return {};
}

export default useAuth;
