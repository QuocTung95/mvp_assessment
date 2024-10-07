import { Menu, Popover } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContextProvider } from "../../contexts/AuthContext";
import { deleteAllCookies } from "../../helpers/cookie";

const Navigate = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, userInfo } = useAuthContextProvider();
  const user = userInfo && JSON.parse(userInfo);

  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
    },
    ...(location.pathname !== "/login"
      ? [
          {
            label: !isAuthenticated ? (
              <Link to="/login">login</Link>
            ) : (
              <div>
                <Popover
                  content={
                    <span
                      className="cursor-pointer text-blue-600"
                      onClick={() => {
                        deleteAllCookies();
                        localStorage.clear();
                        navigate("/login");
                      }}
                    >
                      log out
                    </span>
                  }
                >
                  {user?.username}
                </Popover>
              </div>
            ),
            key: "login",
          },
        ]
      : []),
  ];
  return (
    <Menu className="flex justify-between" mode="horizontal" items={items} />
  );
};

export default Navigate;
