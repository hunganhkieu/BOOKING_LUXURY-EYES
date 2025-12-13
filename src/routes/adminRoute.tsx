import AdminLayout from "../layouts/AdminLayout";
import DashBoardPage from "../pages/admin/DashBoardPage";

const adminRoute = [
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", Component: DashBoardPage },
    ],
  },
];

export default adminRoute;
