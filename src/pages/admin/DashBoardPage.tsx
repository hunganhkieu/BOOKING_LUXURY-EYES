import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Calendar,
  Card,
  Col,
  List,
  message,
  Progress,
  Row,
  Statistic,
  Table,
  Tag,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import api from "../../api";

/* ================== COMPONENT ================== */

const DashBoardPage: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [stats, setStats] = useState({
    todayAppointments: 0,
    newPatients: 0,
    doctors: 0,
    completedThisMonth: 0,
  });

  /* ================== FETCH DATA ================== */

  const fetchDashboard = async () => {
    try {
      const [appointmentRes, doctorRes, patientRes] = await Promise.all([
        api.get("/appointments"),
        api.get("/doctors"),
        api.get("/patients"),
      ]);

      const appointmentsData = appointmentRes.data.data || [];
      const doctorsData = doctorRes.data.data || [];
      const patientsData = patientRes.data.data || [];

      const today = dayjs().format("YYYY-MM-DD");

      // ===== STATS =====
      setStats({
        todayAppointments: appointmentsData.filter(
          (a: any) => dayjs(a.dateTime).format("YYYY-MM-DD") === today
        ).length,
        newPatients: patientsData.length,
        doctors: doctorsData.length,
        completedThisMonth: appointmentsData.filter(
          (a: any) =>
            a.status === "Completed" &&
            dayjs(a.dateTime).isSame(dayjs(), "month")
        ).length,
      });

      // ===== TABLE RECENT =====
      setAppointments(
        appointmentsData.slice(0, 5).map((a: any) => ({
          key: a._id,
          patient: a.patient?.fullName,
          doctor: a.doctor?.name,
          time: `${a.time} - ${dayjs(a.dateTime).format("DD/MM/YYYY")}`,
          department: a.doctor?.specialty,
          status: a.status,
        }))
      );

      // ===== UPCOMING =====
      setUpcoming(
        appointmentsData
          .filter((a: any) => dayjs(a.dateTime).isAfter(dayjs()))
          .slice(0, 5)
          .map((a: any) => ({
            name: a.patient?.fullName,
            time: a.time,
            doctor: a.doctor?.name,
          }))
      );
    } catch {
      message.error("Không tải được dữ liệu dashboard");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  /* ================== TABLE ================== */

  const columns = [
    {
      title: "Bệnh nhân",
      render: (_: any, r: any) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatar icon={<UserOutlined />} />
          {r.patient}
        </div>
      ),
    },
    { title: "Bác sĩ", dataIndex: "doctor" },
    { title: "Thời gian", dataIndex: "time" },
    { title: "Chuyên khoa", dataIndex: "department" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: string) => {
        const map: any = {
          Pending: { color: "orange", text: "Chờ xác nhận" },
          Confirmed: { color: "green", text: "Đã xác nhận" },
          Completed: { color: "blue", text: "Hoàn thành" },
          Cancelled: { color: "red", text: "Đã huỷ" },
        };
        return <Tag color={map[status]?.color}>{map[status]?.text}</Tag>;
      },
    },
  ];

  /* ================== CALENDAR ================== */

  const dateCellRender = (value: any) => {
    const count = appointments.filter(
      (a) => dayjs(a.time.split(" - ")[1], "DD/MM/YYYY").date() === value.date()
    ).length;

    return count ? <Badge status="success" text={`${count} lịch hẹn`} /> : null;
  };

  return (
    <>
      {/* ===== STATISTIC ===== */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12} lg={6}>
          <Card>
            <Statistic
              title="Lịch hẹn hôm nay"
              value={stats.todayAppointments}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Card>
            <Statistic
              title="Bệnh nhân"
              value={stats.newPatients}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Card>
            <Statistic
              title="Bác sĩ"
              value={stats.doctors}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Card>
            <Statistic
              title="Ca khám hoàn thành"
              value={stats.completedThisMonth}
              prefix={<CheckCircleOutlined />}
              suffix="tháng"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* ===== LEFT ===== */}
        <Col xs={24} lg={16}>
          <Card title="Lịch hẹn gần đây" style={{ marginBottom: 16 }}>
            <Table
              columns={columns}
              dataSource={appointments}
              pagination={false}
            />
          </Card>

          <Card title="Tỷ lệ hoàn thành (demo)">
            <Progress percent={90} />
            <Progress percent={85} />
            <Progress percent={78} />
          </Card>
        </Col>

        {/* ===== RIGHT ===== */}
        <Col xs={24} lg={8}>
          <Card title="Lịch hẹn sắp tới" style={{ marginBottom: 16 }}>
            <List
              dataSource={upcoming}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.name}
                    description={
                      <>
                        <div>
                          <ClockCircleOutlined /> {item.time}
                        </div>
                        <div>{item.doctor}</div>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          <Card title="Lịch tháng">
            <Calendar fullscreen={false} dateCellRender={dateCellRender} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashBoardPage;
