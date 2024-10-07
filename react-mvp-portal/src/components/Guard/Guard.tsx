import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContextProvider } from "../../contexts/AuthContext";

const Guard = (props: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthContextProvider();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  return <div>{props.children}</div>;
};
export default Guard;
