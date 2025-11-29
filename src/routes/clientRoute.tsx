import ClientLayout from "../layouts/ClientLayout";
import AppointmentHistoryPage from "../pages/client/AppointmentHistoryPage";
import BookingAppointmentPage from "../pages/client/BookingAppointmentPage";
import HomePage from "../pages/client/HomePage";

const clientRoute = [
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { index: true, Component: HomePage },
      { path: "dat-lich-kham", Component: BookingAppointmentPage },
      { path: "lich-kham", Component: AppointmentHistoryPage },
    ],
  },
];

export default clientRoute;
