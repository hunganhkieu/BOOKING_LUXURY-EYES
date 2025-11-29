import { Outlet } from "react-router-dom";
import HeaderClient from "./HeaderClient";

const ClientLayout = () => {
  return (
    <div>
      <HeaderClient />
      <Outlet />
    </div>
  );
};

export default ClientLayout;
