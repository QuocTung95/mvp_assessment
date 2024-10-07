import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../services/auth";

const Register = (): JSX.Element => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      await register(values);
      toast.success("Create account successfully!");
      navigate("/login", {
        state: {
          ...values,
        },
      });
    } catch (error) {}
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="max-w-[500px] m-auto mt-[100px]">
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" labelCol={{ span: 4 }}>
        <Form.Item
          label="Name"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your name!",
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
            Register
          </Button>
          <Button className="cursor-pointer text-blue-600 ml-5" onClick={() => navigate("/login")}>
            Login here!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
