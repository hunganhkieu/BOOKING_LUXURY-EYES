import { createBrowserRouter, RouterProvider } from "react-router-dom";
import clientRoute from "./clientRoute";
import authRoute from "./authRoute";

const route = createBrowserRouter([...clientRoute, ...authRoute]);

const AppRoute = () => {
  return <RouterProvider router={route} />;
};

export default AppRoute;
