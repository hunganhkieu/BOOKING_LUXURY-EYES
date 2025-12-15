import { Outlet } from "react-router-dom";
import FooterClient from "./FooterClient";
import HeaderClient from "./HeaderClient";

const ClientLayout = () => {
  return (
    <div>
      <HeaderClient />
      <Outlet />
      <FooterClient />
    </div>
  );
};

export default ClientLayout;
