import { Button, Form, Input, InputNumber, Radio, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DeclarationSymptoms, IDeclarations } from "../../contants/delaration";
import { useAuthContextProvider } from "../../contexts/AuthContext";
import { createDeclaration, editDeclaration, getDeclarationById } from "../../services/declaration";

const { Title } = Typography;

const FormCreate = (): JSX.Element => {
  const [form] = Form.useForm();
  const { userInfo } = useAuthContextProvider();
  const navigate = useNavigate();

  let [searchParams] = useSearchParams();
  let id = searchParams.get("id");

  const [isErr, setIsErr] = useState(false);

  useEffect(() => {
    id &&
      getDeclarationById(id)
        .then((res) => {
          form.setFieldsValue(res);
        })
        .catch(() => {
          setIsErr(true);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onFinish = async (values: IDeclarations) => {
    !id ? handleCreateDeclaration(values) : handleEditDeclaration(values, id);
  };

  const handleCreateDeclaration = async (values: IDeclarations) => {
    try {
      await createDeclaration(values);
      toast.success("Create success!");
      navigate("/");
    } catch (error) {}
  };

  const handleEditDeclaration = async (values: IDeclarations, id: string) => {
    try {
      await editDeclaration(values, id);
      toast.success("Edit success!");
      navigate("/");
    } catch (error) {}
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  if (isErr) {
    return <Title className="mt-10">Something went wrong, can not get declaration</Title>;
  }

  return (
    <div className="mt-10">
      <Form
        form={form}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelCol={{ span: 4 }}
        className="p-20"
        initialValues={{
          name: (userInfo && JSON.parse(userInfo).username) || "",
        }}
      >
        <Form.Item label="User Name" name="name">
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Temperature"
          name="temperature"
          rules={[
            {
              required: true,
              message: "Please input",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item label="Symptoms" name="symptoms">
          <Select
            mode="tags"
            placeholder="please select your symptoms"
            options={[
              { value: DeclarationSymptoms.COUGH, label: "Cough" },
              { value: DeclarationSymptoms.SMELL, label: "Smell" },
              { value: DeclarationSymptoms.FEVER, label: "Fever" },
              {
                value: DeclarationSymptoms.BREATHING_DIFFICULTIES,
                label: "Breathing difficulties",
              },
              { value: DeclarationSymptoms.BODY_ACHES, label: "Body aches" },
              { value: DeclarationSymptoms.HEADACHES, label: "Headaches" },
              { value: DeclarationSymptoms.FATIGUE, label: "Fatigue" },
              { value: DeclarationSymptoms.SORE_THROAT, label: "Sore throat" },
              {
                value: DeclarationSymptoms.RUNNY_NOISE,
                label: "Runny noise (even if your symptoms are mild)",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Have you been in contact with anyone who is suspected to have/ has been diagnosed with Covid-19 within the last 14 days?"
          name="has_contact"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Please select",
            },
          ]}
        >
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormCreate;
