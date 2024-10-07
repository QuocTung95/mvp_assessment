import { Button, Form, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { COOKIE_USER_TOKEN, LOCAL_STOGRATE_USER_INFOR } from "../../contants";
import { IUser } from "../../contants/user";
import { setCookie } from "../../helpers/cookie";
import { getUser, login } from "../../services/auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const resLogin = await login(values);
      setCookie(COOKIE_USER_TOKEN, resLogin.accessToken, 1);
      const resUser: IUser = await getUser();
      localStorage.setItem(
        LOCAL_STOGRATE_USER_INFOR,
        JSON.stringify({
          username: resUser.username,
        })
      );
      window.location.href = "/";
    } catch (error: any) {}
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="max-w-[500px] m-auto mt-[100px]">
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelCol={{ span: 4 }}
        initialValues={{
          username: location?.state?.username,
          password: location?.state?.password,
        }}
      >
        <Form.Item
          label="User Name"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your user name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <Button className="cursor-pointer text-blue-600 ml-5" onClick={() => navigate("/register")}>
            Register here!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

Login.propTypes = {};

export default Login;
