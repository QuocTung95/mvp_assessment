import { Button, Checkbox, Table, TableProps, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IDeclarations } from "../../contants/delaration";
import { useAuthContextProvider } from "../../contexts/AuthContext";
import { getDeclarations } from "../../services/declaration";

const { Title } = Typography;

const Home = (): JSX.Element => {
  const { isAuthenticated } = useAuthContextProvider();
  const navigate = useNavigate();
  const [listDeclaration, setListDeclaration] = useState<IDeclarations[]>([]);

  useEffect(() => {
    isAuthenticated && onGetList();
  }, [isAuthenticated]);

  const onGetList = async () => {
    try {
      const resDeclaration: IDeclarations[] = await getDeclarations();
      setListDeclaration(resDeclaration);
    } catch (error) {}
  };

  const columns: TableProps<IDeclarations>["columns"] = [
    {
      title: "Symptoms",
      key: "symptoms",
      dataIndex: "symptoms",
      render: (_, { symptoms }) => (
        <>
          {symptoms.map((item) => {
            return (
              <Tag color={"volcano"} key={item}>
                {item}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Has Contact",
      dataIndex: "has_contact",
      key: "has_contact",
      render: (_) => <Checkbox defaultChecked={_} disabled />,
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (_) => new Date(_).toISOString().split("T")[0],
    },
    {
      title: "Updated Date",
      dataIndex: "updatedDate",
      key: "updatedDate",
      render: (_) => new Date(_).toISOString().split("T")[0],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <Button onClick={() => navigate(`/form?id=${record.id}`)}>Edit</Button>,
    },
  ];

  return (
    <div className="mt-10">
      {isAuthenticated && <Button onClick={() => navigate("/form")}>Create New Declaration</Button>}
      <div className="mt-10">
        {!isAuthenticated ? (
          <Title>You need to login to declare your health.</Title>
        ) : (
          <Table columns={columns} dataSource={listDeclaration} />
        )}
      </div>
    </div>
  );
};

export default Home;
