import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  SyncOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Input,
  message,
  Modal,
  Select,
  Tabs,
  Tag,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useCancelAppointmentConfirmMutation,
  useCancelAppointmentMutation,
  useGetAppointmentsQuery,
} from "../../app/services/appointmentApi";
import type { Appointment } from "../../types/Booking";
import { useAppSelector } from "../../app/hook";
import { skipToken } from "@reduxjs/toolkit/query";

const { TextArea } = Input;

export type AppointmentStatus =
  | "PENDING"
  | "CONFIRM"
  | "CHECKIN"
  | "DONE"
  | "CANCELED"
  | "REQUEST-CANCELED";

const AppointmentHistoryPage = () => {
  const [activeTab, setActiveTab] = useState<string>("all"); // tab đang được chọn
  // const [searchText, setSearchText] = useState<string>(""); // tìm kiếm
  // bấm xem chi tiết, hủy lịch
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  // quản lý modal
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState<string>("");
  const [otherReason, setOtherReason] = useState<string>("");

  const user = useAppSelector((state) => state.auth.user);
  const { data, isLoading, isError } = useGetAppointmentsQuery(
    user?._id ?? skipToken
  );
  const getAppointments: Appointment[] = data?.data ?? [];

  const [cancelAppointment, { isLoading: isCancelling }] =
    useCancelAppointmentMutation();
  const [cancelAppointmentConfirm] = useCancelAppointmentConfirmMutation();
  // màu tag, icon, text hiển thị
  const appointmentStatus = {
    PENDING: {
      color: "orange",
      bgColor: "bg-orange-50",
      text: "Chờ xác nhận",
      icon: <ClockCircleOutlined />,
    },
    CONFIRM: {
      color: "blue",
      bgColor: "bg-blue-50",
      text: "Đã xác nhận",
      icon: <CheckCircleOutlined />,
    },
    CHECKIN: {
      color: "purple",
      bgColor: "bg-purple-50",
      text: "Đã check-in",
      icon: <SyncOutlined />,
    },
    DONE: {
      color: "green",
      bgColor: "bg-green-50",
      text: "Hoàn thành",
      icon: <CheckCircleOutlined />,
    },
    CANCELED: {
      color: "red",
      bgColor: "bg-red-50",
      text: "Đã hủy",
      icon: <CloseCircleOutlined />,
    },
    "REQUEST-CANCELED": {
      color: "yellow",
      bgColor: "bg-yellow-50",
      text: "Đang yêu cầu hủy",
      icon: <ClockCircleOutlined />,
    },
  } as const;

  const getStatusConfig = (status: AppointmentStatus) => {
    return appointmentStatus[status];
  };

  // lọc danh sách
  const filterAppointments = (status?: AppointmentStatus) => {
    let filtered = getAppointments;

    // lọc theo trạng thái
    if (status) {
      filtered = filtered.filter((apt) => apt.status === status);
    }

    // lọc theo ô tìm kiếm
    // if (searchText) {
    //   filtered = filtered.filter(
    //     (apt) =>
    //       apt._id.toLowerCase().includes(searchText.toLowerCase()) ||
    //       apt.doctor.name.toLowerCase().includes(searchText.toLowerCase())
    //   );
    // }

    return filtered;
  };

  // xem chi tiết lịch hẹn
  const handleViewDetail = (appointment: Appointment) => {
    setSelectedAppointment(appointment);

    setDetailModalVisible(true);
  };

  // đóng chi tiết lịch hẹn
  const handleCancelAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setCancelModalVisible(true);
  };

  // hủy lịch
  const confirmCancel = async () => {
    if (!cancelReason) {
      message.error("Bạn phải chọn lý do hủy lịch");
      return;
    }

    if (cancelReason === "other" && !otherReason.trim()) {
      message.error("Vui lòng nhâp lý do hủy lịch");
      return;
    }

    if (!selectedAppointment?._id) {
      message.error("Lịch hẹn không hợp lệ, không thể hủy");
      return;
    }

    const reason = cancelReason === "other" ? otherReason : cancelReason;

    const now = dayjs();
    const cancelCountThisMount = getAppointments.filter(
      (apm) =>
        (apm.status === "CANCELED" || apm.status === "REQUEST-CANCELED") &&
        dayjs(apm.updatedAt).isSame(now, "month")
    ).length;

    if (cancelCountThisMount >= 4) {
      message.error("Bạn đã đạt giới hạn 4 lượt hủy trong tháng này");
      return;
    }
    try {
      if (selectedAppointment.status === "PENDING") {
        await cancelAppointment({
          id: selectedAppointment._id,
          reason,
          scheduleId: selectedAppointment.scheduleId,
        }).unwrap();
        message.success("Hủy lịch thành công");
      }

      if (selectedAppointment.status === "CONFIRM") {
        await cancelAppointmentConfirm({
          id: selectedAppointment._id,
          reason,
          scheduleId: selectedAppointment.scheduleId,
        }).unwrap();
        message.success("Gửi yêu cầu hủy lịch thành công");
      }
    } catch (error) {
      console.log(error);
    }
    setCancelModalVisible(false);
    setCancelReason("");
    setOtherReason("");
    setSelectedAppointment(null);
  };
  // lọc theo trạng thái
  const tabItems = [
    {
      key: "all",
      label: `Tất cả (${getAppointments.length})`,
    },
    {
      key: "PENDING",
      label: `Chờ xác nhận (${
        getAppointments.filter((a) => a.status === "PENDING").length
      })`,
    },
    {
      key: "CONFIRM",
      label: `Đã xác nhận (${
        getAppointments.filter((a) => a.status === "CONFIRM").length
      })`,
    },
    {
      key: "CHECKIN",
      label: `Đã check-in (${
        getAppointments.filter((a) => a.status === "CHECKIN").length
      })`,
    },
    {
      key: "DONE",
      label: `Hoàn thành (${
        getAppointments.filter((a) => a.status === "DONE").length
      })`,
    },
    {
      key: "CANCELED",
      label: `Đã hủy (${
        getAppointments.filter((a) => a.status === "CANCELED").length
      })`,
    },
    {
      key: "REQUEST-CANCELED",
      label: `Đang yêu cầu hủy (${
        getAppointments.filter((a) => a.status === "REQUEST-CANCELED").length
      })`,
    },
  ];

  // tab tất cả chỉ search --- tab khác lọc status + search
  const getFilteredAppointments = () => {
    if (activeTab === "all") {
      return filterAppointments();
    }
    return filterAppointments(activeTab as AppointmentStatus);
  };

  if (isLoading) return <div className="text-center mt-3">Loading...</div>;
  if (isError)
    return <div className="text-center mt-3">Error loading doctors</div>;

  return (
    <div className="min-h-screen bg-gray-50 my-4">
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
        {/* <Card className="mb-6 shadow-sm">
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
        </Card> */}

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
              <Link to={"/dat-lich-kham"}>
                <Button icon={<CalendarOutlined />} block>
                  Đặt lịch khám mới
                </Button>
              </Link>
            </Card>
          ) : (
            getFilteredAppointments()?.map((appointment: Appointment) => {
              const statusConfig = getStatusConfig(appointment.status);
              return (
                <Card
                  key={appointment._id}
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
                                {appointment.doctor.name}
                              </h3>
                              <p className="text-sm text-blue-600">
                                {appointment.room.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Mã phiếu:{" "}
                                <span className="font-semibold">
                                  {appointment._id?.slice(-6).toUpperCase()}
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
                                {dayjs(appointment.dateTime).format(
                                  "YYYY-MM-DD"
                                )}{" "}
                                - {appointment.time}
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
                              <span>{appointment.patient.fullName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-gray-400">💰</span>
                              <span className="font-semibold text-orange-600">
                                {appointment.payment.totalAmount} đ
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
                      {(appointment.status === "PENDING" ||
                        appointment.status === "CONFIRM") && (
                        <Button
                          danger
                          icon={<CloseCircleOutlined />}
                          onClick={() => handleCancelAppointment(appointment)}
                          block
                        >
                          Hủy lịch
                        </Button>
                      )}
                      {appointment.status === "DONE" && (
                        <Link to={"/dat-lich-kham"}>
                          <Button icon={<CalendarOutlined />} block>
                            Đặt lịch khám mới
                          </Button>
                        </Link>
                      )}
                      {appointment.status === "CANCELED" && (
                        <Link to={"/dat-lich-kham"}>
                          <Button icon={<CalendarOutlined />} block>
                            Đặt lại
                          </Button>
                        </Link>
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
              <h4 className="font-semibold text-gray-700 mb-2">Thanh toán</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Phương thức thanh toán:</span>
                  <span className="font-medium">
                    {selectedAppointment.payment.paymentMethod ===
                    "PAY_AT_CLINIC"
                      ? "Thanh toán sau tại phòng khám"
                      : selectedAppointment.payment.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Trạng thái thanh toán:</span>
                  <span className="font-medium">
                    {selectedAppointment.payment.paymentStatus === "UNPAID"
                      ? "Chưa thanh toán"
                      : selectedAppointment.payment.paymentStatus}
                  </span>
                </div>
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
                    {selectedAppointment.patient.fullName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Số điện thoại:</span>
                  <span className="font-medium">
                    {selectedAppointment.patient.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mã phiếu:</span>
                  <span className="font-medium">
                    {`${selectedAppointment._id?.slice(
                      -4
                    )}-${selectedAppointment.scheduleId.slice(-2)}`}
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
                    {selectedAppointment.doctor.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kinh nghiệm:</span>
                  <span className="font-medium">
                    {selectedAppointment.doctor.experience_year} năm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thời gian:</span>
                  <span className="font-medium">
                    {selectedAppointment.time} -{" "}
                    {dayjs(selectedAppointment.dateTime).format("YYYY-MM-DD")}
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
                    {selectedAppointment.room.name}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-between border-b pb-3">
              <h4 className="font-semibold text-gray-700 mb-2">
                {selectedAppointment.status === "CANCELED"
                  ? "Lý do hủy"
                  : "Lý do khám"}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-3">
                {selectedAppointment?.status === "CANCELED"
                  ? selectedAppointment.reason || "Không có lý do hủy"
                  : selectedAppointment?.symptoms || "Không có"}
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">
                  Tổng chi phí:
                </span>
                <span className="text-xl font-bold text-orange-600">
                  {selectedAppointment.payment.totalAmount} đ
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
        okButtonProps={{
          danger: true,
          disabled:
            !cancelReason || (cancelReason === "other" && !otherReason.trim()),
        }}
        loading={isCancelling}
        cancelText="Đóng"
      >
        {selectedAppointment && (
          <div className="space-y-4">
            <div className="bg-red-50 p-3 rounded-lg flex items-start gap-2">
              <InfoCircleOutlined className="text-red-500 mt-1" />
              <div className="flex-1 text-sm">
                <p className="font-semibold text-red-800 mb-1">Lưu ý:</p>
                <p className="text-red-600">
                  Bạn có chắc chắn muốn hủy lịch khám với bác sĩ{" "}
                  <strong> {selectedAppointment.doctor.name}</strong> vào lúc{" "}
                  <strong>
                    {selectedAppointment.time} -{" "}
                    {dayjs(selectedAppointment.dateTime).format("YYYY-MM-DD")}
                  </strong>
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
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
              />
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AppointmentHistoryPage;
