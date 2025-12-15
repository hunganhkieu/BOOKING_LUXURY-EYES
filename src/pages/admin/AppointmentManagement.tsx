import React, { useEffect, useState } from "react";
import { Table, Tag, Select, message } from "antd";
import api from "../../api";

const STATUS_MAP: Record<string, { text: string; color: string }> = {
  Pending: { text: "Chờ xác nhận", color: "orange" },
  Confirmed: { text: "Đã xác nhận", color: "green" },
  Completed: { text: "Hoàn thành", color: "blue" },
  Cancelled: { text: "Đã huỷ", color: "red" },
};

const STATUS_FLOW: Record<string, string[]> = {
  Pending: ["Confirmed", "Cancelled"],
  Confirmed: ["Completed", "Cancelled"],
  Completed: [],
  Cancelled: [],
};

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/appointments");
      setAppointments(res.data.data);
    } catch {
      message.error("Không thể tải lịch hẹn");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/appointments/${id}`, { status });
      message.success("Cập nhật trạng thái thành công");
      fetchAppointments();
    } catch {
      message.error("Cập nhật thất bại");
    }
  };

  const columns = [
    {
      title: "Bệnh nhân",
      render: (_: any, record: any) => record.patient?.fullName,
    },
    {
      title: "Bác sĩ",
      render: (_: any, record: any) => record.doctor?.name,
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
      render: (_: any, record: any) => record.room?.name,
    },
    {
      title: "Thanh toán",
      render: (_: any, record: any) => (
        <Tag color={record.payment?.paymentStatus === "PAID" ? "green" : "red"}>
          {record.payment?.paymentStatus}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: string) => {
        const s = STATUS_MAP[status];
        return <Tag color={s?.color}>{s?.text}</Tag>;
      },
    },
    {
      title: "Thao tác",
      render: (_: any, record: any) => {
        const allowedStatus = STATUS_FLOW[record.status] || [];

        if (allowedStatus.length === 0) return null;

        return (
          <Select
            placeholder="Đổi trạng thái"
            style={{ width: 160 }}
            onChange={(value) => updateStatus(record._id, value)}
          >
            {allowedStatus.map((s) => (
              <Select.Option key={s} value={s}>
                {STATUS_MAP[s].text}
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
