import { ReactNode } from "react";
import Header from "../../components/Header/Header";
const Layout = (props: { children: ReactNode }): JSX.Element => {
  return (
    <div>
      <Header></Header>
      {props.children}
    </div>
  );
};

export default Layout;
