import ClientLayout from "../layouts/ClientLayout";
import HomePage from "../pages/HomePage";

const clientRoute = [
  {
    path: "/",
    element: <ClientLayout />,
    children: [{ index: true, Component: HomePage }],
  },
];

export default clientRoute;
