import { createContext, useState, ReactNode, useContext } from "react";
import { COOKIE_USER_TOKEN, LOCAL_STOGRATE_USER_INFOR } from "../contants";
import { getCookie } from "../helpers/cookie";

interface IAuthContext {
  isAuthenticated: string;
  userInfo?: string | null;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: "",
  userInfo: "",
});

export const useAuthContextProvider = (): IAuthContext =>
  useContext(AuthContext);

const AuthContextProvider = (props: { children?: ReactNode }): JSX.Element => {
  const isAuthenticated = getCookie(COOKIE_USER_TOKEN);
  const userInfo = localStorage.getItem(LOCAL_STOGRATE_USER_INFOR);
  const [authContext] = useState({
    isAuthenticated,
    userInfo,
  });

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
