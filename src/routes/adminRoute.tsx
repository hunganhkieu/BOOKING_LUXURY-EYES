import AdminLayout from "../layouts/AdminLayout";
import AppointmentManagement from "../pages/admin/AppointmentManagement";
import DashBoardPage from "../pages/admin/DashBoardPage";
import DoctorManagement from "../pages/admin/Doctor-management";
import ScheduleManagement from "../pages/admin/ScheduleManagement";

const adminRoute = [
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", Component: DashBoardPage },
      { path: "doctors", Component: DoctorManagement },
      { path: "appointments", Component: AppointmentManagement },
      { path: "schedule", Component: ScheduleManagement },

    ],
  },
];

export default adminRoute;
