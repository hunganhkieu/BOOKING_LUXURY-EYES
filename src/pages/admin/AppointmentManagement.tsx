import React, { useEffect, useState } from "react";
import { Table, Tag, Select, message } from "antd";
import api from "../../api";
import type { AppointmentStatus } from "../../types/Booking";


const STATUS_MAP: Record<
  AppointmentStatus,
  { text: string; color: string }
> = {
  PENDING: { text: "Chờ xác nhận", color: "orange" },
  CONFIRM: { text: "Đã xác nhận", color: "green" },
  CHECKIN: { text: "Đã check-in", color: "blue" },
  DONE: { text: "Hoàn thành", color: "cyan" },
  CANCELED: { text: "Đã huỷ", color: "red" },
  "REQUEST-CANCELED": { text: "Yêu cầu huỷ", color: "volcano" },
};

/* ================== STATUS FLOW ================== */

const STATUS_FLOW: Record<AppointmentStatus, AppointmentStatus[]> = {
  PENDING: ["CONFIRM", "CANCELED"],
  CONFIRM: ["CHECKIN", "CANCELED"],
  CHECKIN: ["DONE"],
  DONE: [],
  CANCELED: [],
  "REQUEST-CANCELED": ["CANCELED"],
};

/* ================== COMPONENT ================== */

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/appointments");
      setAppointments(res.data.data);
    } catch (error) {
      message.error("Không thể tải lịch hẹn");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (
    id: string,
    status: AppointmentStatus
  ) => {
    try {
      await api.put(`/appointments/${id}`, { status });
      message.success("Cập nhật trạng thái thành công");
      fetchAppointments();
    } catch {
      message.error("Cập nhật thất bại");
    }
  };

  /* ================== TABLE COLUMNS ================== */

  const columns = [
    {
      title: "Bệnh nhân",
      render: (_: any, record: any) => record.patient?.fullName || "---",
    },
    {
      title: "Bác sĩ",
      render: (_: any, record: any) => record.doctor?.name || "---",
    },
    {
      title: "Ngày khám",
      render: (_: any, record: any) =>
        new Date(record.dateTime).toLocaleDateString("vi-VN"),
    },
    {
      title: "Giờ",
      dataIndex: "time",
    },
    {
      title: "Phòng",
      render: (_: any, record: any) => record.room?.name || "---",
    },
    {
      title: "Thanh toán",
      render: (_: any, record: any) => (
        <Tag
          color={
            record.payment?.paymentStatus === "PAID"
              ? "green"
              : "red"
          }
        >
          {record.payment?.paymentStatus || "UNPAID"}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: AppointmentStatus) => {
        const s = STATUS_MAP[status];
        return <Tag color={s.color}>{s.text}</Tag>;
      },
    },
    {
      title: "Thao tác",
      render: (_: any, record: any) => {
        const allowedStatus: AppointmentStatus[] =
          STATUS_FLOW[record.status] || [];

        if (allowedStatus.length === 0) return null;

        return (
          <Select
            placeholder="Đổi trạng thái"
            style={{ width: 180 }}
            onChange={(value: AppointmentStatus) =>
              updateStatus(record._id, value)
            }
          >
            {allowedStatus.map((status) => (
              <Select.Option key={status} value={status}>
                {STATUS_MAP[status].text}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
  ];

  return (
    <Table
      rowKey="_id"
      loading={loading}
      columns={columns}
      dataSource={appointments}
    />
  );
};

export default AppointmentManagement;
