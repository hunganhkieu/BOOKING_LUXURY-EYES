import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  message,
  Space,
  Popconfirm,
  Card,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import api from "../../api";

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [form] = Form.useForm();

  /* ================= FETCH ================= */
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await api.get("/doctors");
      setDoctors(res.data.data || []);
    } catch (err) {
      message.error("Không thể tải danh sách bác sĩ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  /* ================= CREATE / UPDATE ================= */
  const handleSubmit = async (values) => {
    try {
      if (editingDoctor) {
        await api.put(`/doctors/${editingDoctor._id}`, values);
        message.success("Cập nhật bác sĩ thành công");
      } else {
        await api.post("/doctors", values);
        message.success("Thêm bác sĩ thành công");
      }

      setOpenModal(false);
      setEditingDoctor(null);
      form.resetFields();
      fetchDoctors();
    } catch {
      message.error("Thao tác thất bại");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    try {
      await api.delete(`/doctors/${id}`);
      message.success("Xoá bác sĩ thành công");
      fetchDoctors();
    } catch {
      message.error("Xoá thất bại");
    }
  };

  /* ================= TABLE ================= */
  const columns = [
    {
      title: "Tên bác sĩ",
      dataIndex: "name",
    },
    {
      title: "Chuyên khoa",
      dataIndex: "specialty",
      render: (text) => text || "—",
    },
    {
      title: "Giá khám",
      dataIndex: "price",
      render: (price) => `${price?.toLocaleString()} đ`,
    },
    {
      title: "Kinh nghiệm",
      dataIndex: "experience_year",
      render: (year) => `${year} năm`,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      ellipsis: true,
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditingDoctor(record);
              form.setFieldsValue(record);
              setOpenModal(true);
            }}
          >
            Sửa
          </Button>

          <Popconfirm
            title="Bạn chắc chắn muốn xoá?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type="link" danger>
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Quản lý bác sĩ"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setOpenModal(true);
            setEditingDoctor(null);
            form.resetFields();
          }}
        >
          Thêm bác sĩ
        </Button>
      }
    >
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={doctors}
      />

      {/* MODAL */}
      <Modal
        open={openModal}
        title={editingDoctor ? "Cập nhật bác sĩ" : "Thêm bác sĩ"}
        onCancel={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Lưu"
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Tên bác sĩ"
            name="name"
            rules={[{ required: true, message: "Nhập tên bác sĩ" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Avatar" name="avatar">
            <Input placeholder="https://example.com/avatar.jpg" />
          </Form.Item>

          <Form.Item
            label="Chuyên khoa"
            name="specialty"
            rules={[{ required: true, message: "Nhập chuyên khoa" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá khám"
            name="price"
            rules={[{ required: true, message: "Nhập giá khám" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Số năm kinh nghiệm"
            name="experience_year"
            rules={[{ required: true, message: "Nhập số năm kinh nghiệm" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default DoctorManagement;
