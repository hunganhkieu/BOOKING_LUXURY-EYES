import { createBrowserRouter, RouterProvider } from "react-router-dom";
import clientRoute from "./clientRoute";
import authRoute from "./authRoute";
import adminRoute from "./adminRoute";
import NotFoundPage from "../pages/admin/NotFoundPage";

const route = createBrowserRouter([...clientRoute, ...authRoute , ...adminRoute,
  {path:"*",Component:NotFoundPage}]
);

const AppRoute = () => {
  return <RouterProvider router={route} />;
};

export default AppRoute;