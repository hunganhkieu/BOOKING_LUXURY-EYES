import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Select,
  Input,
  InputNumber,
  DatePicker,
  TimePicker,
  Tag,
  message,
  Card,
  Space,
  Popconfirm,
} from "antd";
import dayjs from "dayjs";
import api from "../../api";

const ScheduleManagement = () => {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // ================= FETCH =================
  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data.data || []);
    } catch {
      message.error("Không tải được danh sách bác sĩ");
    }
  };

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const res = await api.get("/schedules");
      setSchedules(res.data.data || []);
    } catch {
      message.error("Không tải được lịch làm việc");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchSchedules();
  }, []);

  // ================= CREATE =================
  const handleCreate = async (values: any) => {
    const payload = {
      doctorId: values.doctorId,
      roomId: values.roomId,
      roomName: values.roomName,
      price: values.price,
      timeSlots: [
        {
          date: values.date.startOf("day").toISOString(),
          time: values.time.format("HH:mm"),
          status: "AVAILABLE",
          capacity: values.capacity,
          blockTime: values.blockTime,
        },
      ],
    };

    try {
      await api.post("/schedules", payload);
      message.success("Tạo lịch thành công");
      setOpen(false);
      form.resetFields();
      fetchSchedules();
    } catch {
      message.error("Tạo lịch thất bại");
    }
  };

  
  // ================= TABLE =================
  const columns = [
    {
      title: "Bác sĩ",
      render: (_: any, r: any) => (
        <Space direction="vertical" size={0}>
          <strong>{r.doctor?.name || "—"}</strong>
          <span style={{ fontSize: 12, color: "#888" }}>
            {r.doctor?.specialty || "—"}
          </span>
        </Space>
      ),
    },
    {
      title: "Phòng",
      render: (_: any, r: any) => (
        <Space direction="vertical" size={0}>
          <strong>{r.roomName}</strong>
          <span style={{ fontSize: 12, color: "#888" }}>
            ID: {r.roomId}
          </span>
        </Space>
      ),
    },
    {
      title: "Giá khám",
      dataIndex: "price",
      render: (v: number) => (
        <Tag color="blue">{v?.toLocaleString()}đ</Tag>
      ),
    },
    {
      title: "Ngày & Giờ",
      render: (_: any, r: any) =>
        r.timeSlots?.map((s: any) => (
          <Tag
            key={s.scheduleSlotId}
            color={s.status === "AVAILABLE" ? "green" : "red"}
          >
            {dayjs(s.date).format("DD/MM/YYYY")} – {s.time}
          </Tag>
        )),
    },

  ];

  return (
    <Card
      title="Quản lý lịch làm việc bác sĩ"
      extra={
        <Button type="primary" onClick={() => setOpen(true)}>
          Tạo lịch
        </Button>
      }
    >
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={schedules}
        size="middle"
      />

      {/* MODAL CREATE */}
      <Modal
        open={open}
        title="Tạo lịch làm việc"
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        okText="Lưu"
        destroyOnClose
      >
        <Form layout="vertical" form={form} onFinish={handleCreate}>
          <Form.Item
            name="doctorId"
            label="Bác sĩ"
            rules={[{ required: true, message: "Vui lòng chọn bác sĩ" }]}
          >
            <Select placeholder="Chọn bác sĩ">
              {doctors.map((d) => (
                <Select.Option key={d._id} value={d._id}>
                  {d.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="roomId" label="Mã phòng" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="roomName"
            label="Tên phòng"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="price" label="Giá khám" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="date" label="Ngày" rules={[{ required: true }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="time" label="Giờ" rules={[{ required: true }]}>
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="capacity"
            label="Số bệnh nhân"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="blockTime"
            label="Thời gian khám (phút)"
            rules={[{ required: true }]}
          >
            <InputNumber min={10} step={5} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ScheduleManagement;
