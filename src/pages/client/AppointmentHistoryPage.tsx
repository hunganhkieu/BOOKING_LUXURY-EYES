import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Tag,
  Avatar,
  Tabs,
  Modal,
  Select,
  DatePicker,
} from "antd";
import {
  SearchOutlined,
  UserOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  FilterOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

type AppointmentStatus =
  | "Pending"
  | "Confirmed"
  | "Checkin"
  | "Done"
  | "Canceled";

interface Appointment {
  id: string;
  code: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  room: string;
  status: AppointmentStatus;
  price: string;
  patientName: string;
  phone: string;
  reason?: string;
}

const AppointmentHistoryPage = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchText, setSearchText] = useState<string>("");
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState<string>("");

  const appointments: Appointment[] = [
    {
      id: "1",
      code: "BV2024112801",
      doctorName: "TS Vũ Việt Hằng",
      specialty: "Y học cổ truyền",
      date: "28/11/2024",
      time: "08:30",
      location: "Trung tâm Y khoa số 1 Tôn Thất Tùng",
      room: "Phòng 203, Tầng 2, Nhà A5",
      status: "Pending",
      price: "350.000",
      patientName: "Nguyễn Văn A",
      phone: "0123456789",
      reason: "Đau đầu, mệt mỏi",
    },
    {
      id: "2",
      code: "BV2024112701",
      doctorName: "ThsBS Vũ Văn Tiến",
      specialty: "Tai mũi họng",
      date: "27/11/2024",
      time: "14:00",
      location: "Trung tâm Y khoa số 1 Tôn Thất Tùng",
      room: "Phòng 105, Tầng 1, Nhà B3",
      status: "Confirmed",
      price: "350.000",
      patientName: "Nguyễn Văn A",
      phone: "0123456789",
      reason: "Viêm amidan",
    },
    {
      id: "3",
      code: "BV2024112601",
      doctorName: "ThsBSNT Vũ Trung Hải",
      specialty: "Ngoại Thần kinh - Cột sống",
      date: "26/11/2024",
      time: "09:00",
      location: "Trung tâm Y khoa số 1 Tôn Thất Tùng",
      room: "Phòng 301, Tầng 3, Nhà C1",
      status: "Checkin",
      price: "120.000",
      patientName: "Nguyễn Văn A",
      phone: "0123456789",
      reason: "Đau lưng",
    },
    {
      id: "4",
      code: "BV2024112501",
      doctorName: "ThsBS Vũ Trọng Tùng",
      specialty: "Bác sỹ gia đình",
      date: "25/11/2024",
      time: "10:30",
      location: "Trung tâm Y khoa số 1 Tôn Thất Tùng",
      room: "Phòng 102, Tầng 1, Nhà A5",
      status: "Done",
      price: "120.000",
      patientName: "Nguyễn Văn A",
      phone: "0123456789",
      reason: "Khám sức khỏe định kỳ",
    },
    {
      id: "5",
      code: "BV2024112401",
      doctorName: "BSCKII Vũ Thu Phương",
      specialty: "Da liễu",
      date: "24/11/2024",
      time: "15:30",
      location: "Trung tâm Y khoa số 1 Tôn Thất Tùng",
      room: "Phòng 205, Tầng 2, Nhà B3",
      status: "Canceled",
      price: "350.000",
      patientName: "Nguyễn Văn A",
      phone: "0123456789",
      reason: "Dị ứng da",
    },
  ];

  const getStatusConfig = (status: AppointmentStatus) => {
    const configs = {
      Pending: {
        color: "orange",
        text: "Chờ xác nhận",
        icon: <ClockCircleOutlined />,
        bgColor: "bg-orange-50",
        textColor: "text-orange-600",
      },
      Confirmed: {
        color: "blue",
        text: "Đã xác nhận",
        icon: <CheckCircleOutlined />,
        bgColor: "bg-blue-50",
        textColor: "text-blue-600",
      },
      Checkin: {
        color: "purple",
        text: "Đã check-in",
        icon: <SyncOutlined />,
        bgColor: "bg-purple-50",
        textColor: "text-purple-600",
      },
      Done: {
        color: "green",
        text: "Hoàn thành",
        icon: <CheckCircleOutlined />,
        bgColor: "bg-green-50",
        textColor: "text-green-600",
      },
      Canceled: {
        color: "red",
        text: "Đã hủy",
        icon: <CloseCircleOutlined />,
        bgColor: "bg-red-50",
        textColor: "text-red-600",
      },
    };
    return configs[status];
  };

  const filterAppointments = (status?: AppointmentStatus) => {
    let filtered = appointments;

    if (status) {
      filtered = filtered.filter((apt) => apt.status === status);
    }

    if (searchText) {
      filtered = filtered.filter(
        (apt) =>
          apt.code.toLowerCase().includes(searchText.toLowerCase()) ||
          apt.doctorName.toLowerCase().includes(searchText.toLowerCase()) ||
          apt.specialty.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filtered;
  };

  const handleViewDetail = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setDetailModalVisible(true);
  };

  const handleCancelAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setCancelModalVisible(true);
  };

  const confirmCancel = () => {
    console.log(
      "Cancel appointment:",
      selectedAppointment?.id,
      "Reason:",
      cancelReason
    );
    setCancelModalVisible(false);
    setCancelReason("");
  };

  const tabItems = [
    {
      key: "all",
      label: `Tất cả (${appointments.length})`,
    },
    {
      key: "Pending",
      label: `Chờ xác nhận (${
        appointments.filter((a) => a.status === "Pending").length
      })`,
    },
    {
      key: "Confirmed",
      label: `Đã xác nhận (${
        appointments.filter((a) => a.status === "Confirmed").length
      })`,
    },
    {
      key: "Checkin",
      label: `Đã check-in (${
        appointments.filter((a) => a.status === "Checkin").length
      })`,
    },
    {
      key: "Done",
      label: `Hoàn thành (${
        appointments.filter((a) => a.status === "Done").length
      })`,
    },
    {
      key: "Canceled",
      label: `Đã hủy (${
        appointments.filter((a) => a.status === "Canceled").length
      })`,
    },
  ];

  const getFilteredAppointments = () => {
    if (activeTab === "all") {
      return filterAppointments();
    }
    return filterAppointments(activeTab as AppointmentStatus);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 mt-4">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Lịch khám của tôi
          </h1>
          <p className="text-gray-600">
            Quản lý và theo dõi lịch hẹn khám bệnh
          </p>
        </div>

        {/* Search & Filter */}
        <Card className="mb-6 shadow-sm">
          <div className="flex flex-wrap gap-4">
            <Input
              size="large"
              placeholder="Tìm kiếm theo mã phiếu, tên bác sĩ, chuyên khoa..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1 min-w-[300px]"
            />
            <Button size="large" icon={<FilterOutlined />}>
              Lọc nâng cao
            </Button>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          className="mb-4"
        />

        {/* Appointment List */}
        <div className="space-y-4">
          {getFilteredAppointments().length === 0 ? (
            <Card className="text-center py-12">
              <CalendarOutlined className="text-6xl text-gray-300 mb-4" />
              <p className="text-gray-500">Không có lịch khám nào</p>
            </Card>
          ) : (
            getFilteredAppointments().map((appointment) => {
              const statusConfig = getStatusConfig(appointment.status);
              return (
                <Card
                  key={appointment.id}
                  className="shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Left - Doctor Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <Avatar size={64} icon={<UserOutlined />} />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">
                                {appointment.doctorName}
                              </h3>
                              <p className="text-sm text-blue-600">
                                {appointment.specialty}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Mã phiếu:{" "}
                                <span className="font-semibold">
                                  {appointment.code}
                                </span>
                              </p>
                            </div>
                            <Tag
                              color={statusConfig.color}
                              icon={statusConfig.icon}
                              className="text-sm px-3 py-1"
                            >
                              {statusConfig.text}
                            </Tag>
                          </div>

                          <div className="grid md:grid-cols-2 gap-2 mt-3">
                            <div className="flex items-center gap-2 text-sm">
                              <CalendarOutlined className="text-gray-400" />
                              <span>
                                {appointment.date} - {appointment.time}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <EnvironmentOutlined className="text-gray-400" />
                              <span className="truncate">
                                {appointment.location}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <UserOutlined className="text-gray-400" />
                              <span>{appointment.patientName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-gray-400">💰</span>
                              <span className="font-semibold text-orange-600">
                                {appointment.price} đ
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right - Actions */}
                    <div className="flex lg:flex-col gap-2 lg:w-40">
                      <Button
                        type="primary"
                        icon={<FileTextOutlined />}
                        onClick={() => handleViewDetail(appointment)}
                        block
                      >
                        Chi tiết
                      </Button>
                      {(appointment.status === "Pending" ||
                        appointment.status === "Confirmed") && (
                        <Button
                          danger
                          icon={<CloseCircleOutlined />}
                          onClick={() => handleCancelAppointment(appointment)}
                          block
                        >
                          Hủy lịch
                        </Button>
                      )}
                      {appointment.status === "Done" && (
                        <Button icon={<FileTextOutlined />} block>
                          Xem kết quả
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <Modal
        title="Chi tiết lịch khám"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            Đóng
          </Button>,
        ]}
        width={600}
      >
        {selectedAppointment && (
          <div className="space-y-4">
            <div
              className={`p-4 rounded-lg ${
                getStatusConfig(selectedAppointment.status).bgColor
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">Trạng thái:</span>
                <Tag
                  color={getStatusConfig(selectedAppointment.status).color}
                  icon={getStatusConfig(selectedAppointment.status).icon}
                  className="text-sm px-3 py-1"
                >
                  {getStatusConfig(selectedAppointment.status).text}
                </Tag>
              </div>
            </div>

            <div className="border-b pb-3">
              <h4 className="font-semibold text-gray-700 mb-2">
                Thông tin bệnh nhân
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Họ và tên:</span>
                  <span className="font-medium">
                    {selectedAppointment.patientName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Số điện thoại:</span>
                  <span className="font-medium">
                    {selectedAppointment.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mã phiếu:</span>
                  <span className="font-medium">
                    {selectedAppointment.code}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-b pb-3">
              <h4 className="font-semibold text-gray-700 mb-2">
                Thông tin khám
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bác sĩ:</span>
                  <span className="font-medium">
                    {selectedAppointment.doctorName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Chuyên khoa:</span>
                  <span className="font-medium">
                    {selectedAppointment.specialty}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thời gian:</span>
                  <span className="font-medium">
                    {selectedAppointment.time} - {selectedAppointment.date}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Địa điểm:</span>
                  <span className="font-medium text-right">
                    {selectedAppointment.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phòng khám:</span>
                  <span className="font-medium">
                    {selectedAppointment.room}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-b pb-3">
              <h4 className="font-semibold text-gray-700 mb-2">Lý do khám</h4>
              <p className="text-sm text-gray-600">
                {selectedAppointment.reason}
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">
                  Tổng chi phí:
                </span>
                <span className="text-xl font-bold text-orange-600">
                  {selectedAppointment.price} đ
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Cancel Modal */}
      <Modal
        title="Hủy lịch khám"
        open={cancelModalVisible}
        onOk={confirmCancel}
        onCancel={() => {
          setCancelModalVisible(false);
          setCancelReason("");
        }}
        okText="Xác nhận hủy"
        cancelText="Đóng"
        okButtonProps={{ danger: true }}
      >
        {selectedAppointment && (
          <div className="space-y-4">
            <div className="bg-red-50 p-3 rounded-lg flex items-start gap-2">
              <InfoCircleOutlined className="text-red-500 mt-1" />
              <div className="flex-1 text-sm">
                <p className="font-semibold text-red-800 mb-1">Lưu ý:</p>
                <p className="text-red-600">
                  Bạn có chắc chắn muốn hủy lịch khám với{" "}
                  <strong>{selectedAppointment.doctorName}</strong> vào lúc{" "}
                  <strong>
                    {selectedAppointment.time} - {selectedAppointment.date}
                  </strong>
                  ?
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lý do hủy lịch <span className="text-red-500">*</span>
              </label>
              <Select
                value={cancelReason}
                onChange={setCancelReason}
                placeholder="Chọn lý do hủy lịch"
                className="w-full"
                size="large"
              >
                <Select.Option value="busy">Bận việc đột xuất</Select.Option>
                <Select.Option value="health">
                  Sức khỏe không cho phép
                </Select.Option>
                <Select.Option value="rescheduled">
                  Muốn đổi lịch khác
                </Select.Option>
                <Select.Option value="other">Lý do khác</Select.Option>
              </Select>
            </div>

            {cancelReason === "other" && (
              <TextArea
                rows={3}
                placeholder="Nhập lý do hủy lịch..."
                className="w-full"
              />
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AppointmentHistoryPage;
