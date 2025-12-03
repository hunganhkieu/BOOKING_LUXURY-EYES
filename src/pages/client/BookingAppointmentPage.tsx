import {
  CalendarOutlined,
  CloudOutlined,
  EnvironmentOutlined,
  FileImageOutlined,
  HomeOutlined,
  IdcardOutlined,
  MailOutlined,
  MedicineBoxOutlined,
  PhoneOutlined,
  SearchOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  DatePicker,
  Input,
  Modal,
  Radio,
  Select,
} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetDoctorsQuery } from "../../app/services/doctorApi";
import type { Doctor } from "../../types/Doctor";
import type { Patient } from "../../types/Patient";
import type { Schedule } from "../../types/Schedule";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const BookingAppointmentPage = () => {
  const { data, isLoading, isFetching, isError, refetch } =
    useGetDoctorsQuery();
  const doctors: Doctor[] = data?.data ?? [];

  const [selectedPerson, setSelectedPerson] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const [symptoms, setSymptoms] = useState<string>("");
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "self",
      name: "Nguyễn Văn A",
      dateOfBirth: "01/01/1990",
      gender: "male",
      identityCard: "001234567890",
      email: "nguyenvana@email.com",
      phone: "0123456789",
      address: "Số 1, Đường ABC, Quận 1, TP.HCM",
      relation: "self",
    },
  ]);

  const [newPatient, setNewPatient] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    identityCard: "",
    email: "",
    phone: "",
    address: "",
  });

  const nav = useNavigate();

  const scheduleData = {
    dates: [
      { label: "Thứ 6", date: "28-11" },
      { label: "Thứ 7", date: "29-11" },
      { label: "Thứ 2", date: "01-12" },
      { label: "Thứ 3", date: "02-12" },
    ],
    morningSlots: [
      "06:30",
      "07:00",
      "07:30",
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
    ],
    afternoonSlots: [
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
    ],
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedSchedule(null);
  };

  const handleTimeSelect = (date: string, time: string) => {
    if (selectedDoctor) {
      setSelectedSchedule({
        date: `${time} - ${date}/2025`,
        time: time,
        location: "Trung tâm Y khoa số 1 Tôn Thất Tùng",
        room: "Phòng khám YHCT 203 - Phòng 203, Tầng 2, Nhà A5",
        service: "Khám Y học cổ truyền [PKI]",
      });
    }
  };

  const handleBackToList = () => {
    setSelectedDoctor(null);
    setSelectedSchedule(null);
  };

  const handlePatientChange = (value: string) => {
    if (value === "add-new") {
      setShowAddPatientModal(true);
    } else {
      setSelectedPerson(value);
    }
  };

  const handleAddPatient = () => {
    if (newPatient.name && newPatient.phone) {
      const patient: Patient = {
        id: `patient-${Date.now()}`,
        ...newPatient,
        relation: "family",
      };
      setPatients([...patients, patient]);
      setSelectedPerson(patient.id);
      setShowAddPatientModal(false);
      setNewPatient({
        name: "",
        dateOfBirth: "",
        gender: "",
        identityCard: "",
        email: "",
        phone: "",
        address: "",
      });
    }
  };

  if (isLoading) return <div className="text-center mt-3">Loading...</div>;
  if (isError) return <div>Error loading doctors</div>;
  return (
    <div className="min-h-screen bg-gray-50 mt-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-3">
            <Card className="shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <CalendarOutlined className="text-blue-600 text-xl" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Thông tin đặt khám
                </h2>
              </div>

              {/* Người tới khám */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Người tới khám (*)
                </label>
                <Select
                  value={selectedPerson}
                  onChange={handlePatientChange}
                  className="w-full"
                  size="large"
                  placeholder="Tìm kiếm..."
                  showSearch
                  filterOption={(input, option) => {
                    const label = option?.label;
                    if (typeof label === "string") {
                      return label.toLowerCase().includes(input.toLowerCase());
                    }
                    return false;
                  }}
                >
                  <Select.OptGroup label="Khám cho bản thân">
                    {patients
                      .filter((p) => p.relation === "self")
                      .map((patient) => (
                        <Select.Option
                          key={patient.id}
                          value={patient.id}
                          label={patient.name}
                        >
                          {patient.name}
                        </Select.Option>
                      ))}
                  </Select.OptGroup>

                  <Select.OptGroup label="Khám cho người thân">
                    {patients
                      .filter((p) => p.relation === "family")
                      .map((patient) => (
                        <Select.Option
                          key={patient.id}
                          value={patient.id}
                          label={patient.name}
                        >
                          {patient.name}
                        </Select.Option>
                      ))}
                    <Select.Option
                      value="add-new"
                      className="text-blue-600 font-semibold"
                    >
                      + Thêm mới người bệnh
                    </Select.Option>
                  </Select.OptGroup>
                </Select>
              </div>

              {/* Chọn ngày khám */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chọn ngày khám
                </label>
                <RangePicker
                  placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                  className="w-full"
                  size="large"
                />
              </div>
            </Card>
          </div>

          {/* Middle - Doctor List or Schedule */}
          <div className="lg:col-span-6">
            <Card className="shadow-sm">
              {/* Search Bar */}
              <div className="mb-4 flex gap-2">
                <Input
                  size="large"
                  placeholder="Tìm kiếm theo tên bác sĩ..."
                  prefix={<SearchOutlined className="text-gray-400" />}
                  className="flex-1"
                />
                <Button size="large" icon={<UserOutlined />}>
                  Tìm thấy <span className="font-semibold">412 bác sĩ</span> phù
                  hợp
                </Button>
              </div>

              {/* Doctor List */}
              {!selectedDoctor && (
                <div className="space-y-3">
                  {isFetching && (
                    <div className="absolute top-0 right-0 p-2 text-sm text-gray-500">
                      Updating...
                    </div>
                  )}
                  <Button
                    type="primary"
                    onClick={() => refetch()}
                    loading={isLoading}
                  >
                    Reset dữ liệu
                  </Button>
                  {doctors &&
                    doctors.map((doctor: Doctor) => (
                      <Card
                        key={doctor._id}
                        className="hover:shadow-md transition-shadow cursor-pointer"
                        style={{ padding: "16px" }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <Avatar size={48} icon={<UserOutlined />} />
                            <div>
                              <h3 className="font-semibold text-gray-800">
                                {doctor.name}
                              </h3>
                              <p className="text-sm text-blue-600">
                                Kinh nghiệm: {doctor.experience_year} năm
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="text-xs text-gray-500">Giá khám:</p>
                              <p className="text-lg font-bold text-orange-500">
                                {doctor.price} đ
                              </p>
                            </div>
                            <Button
                              type="primary"
                              size="large"
                              onClick={() => handleDoctorSelect(doctor)}
                            >
                              Chọn
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              )}

              {/* Schedule View */}
              {selectedDoctor && (
                <div>
                  {/* Doctor Info */}
                  <Card className="mb-4 bg-blue-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar size={48} icon={<UserOutlined />} />
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {selectedDoctor.name}
                          </h3>
                          <p className="text-sm text-blue-600">
                            Kinh nghiệm: {selectedDoctor.experience_year} năm
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Giá khám:</p>
                          <p className="text-lg font-bold text-orange-500">
                            {selectedDoctor.price} đ
                          </p>
                        </div>
                        <Button
                          type="primary"
                          size="large"
                          onClick={handleBackToList}
                        >
                          Ẩn lịch
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Date Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chọn ngày khám:
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {scheduleData.dates.map((day, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedDate(idx)}
                          className={`px-3 py-3 rounded-lg border-2 transition-all ${
                            selectedDate === idx
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                          }`}
                        >
                          <div className="text-center">
                            <div className="font-semibold text-sm">
                              {day.label}
                            </div>
                            <div className="text-xs mt-1">{day.date}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Location Info */}
                  <Card className="mb-4 bg-gray-50">
                    <h3 className="font-semibold mb-3">
                      Trung tâm Y khoa số 1 Tôn Thất Tùng
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <EnvironmentOutlined className="text-blue-600 mt-1" />
                        <span>
                          Địa chỉ: Số 1 Tôn Thất Tùng, Đống Đa, Hà Nội
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <HomeOutlined className="text-blue-600 mt-1" />
                        <span>Phòng: Phòng khám YHCT 203</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MedicineBoxOutlined className="text-blue-600 mt-1" />
                        <span>Dịch vụ: Khám Y học cổ truyền [PKI]</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">💰</span>
                        <span>
                          Giá khám:{" "}
                          <span className="text-orange-500 font-semibold">
                            350.000 đ
                          </span>
                        </span>
                      </div>
                    </div>
                  </Card>

                  {/* Morning Slots */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <SunOutlined className="text-yellow-500" />
                      <span className="font-semibold">Sáng</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {scheduleData.morningSlots.map((time, idx) => (
                        <Button
                          key={idx}
                          type={
                            selectedSchedule?.time === time
                              ? "primary"
                              : "default"
                          }
                          onClick={() => handleTimeSelect("28/11", time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Afternoon Slots */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CloudOutlined className="text-blue-500" />
                      <span className="font-semibold">Chiều</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {scheduleData.afternoonSlots.map((time, idx) => (
                        <Button
                          key={idx}
                          type={
                            selectedSchedule?.time === time
                              ? "primary"
                              : "default"
                          }
                          onClick={() => handleTimeSelect("28/11", time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Right Sidebar - Summary */}
          <div className="lg:col-span-3">
            <Card className="shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Tóm tắt lịch khám
              </h2>

              {selectedSchedule ? (
                <div className="space-y-4">
                  {/* Doctor Info */}
                  <div className="flex items-center gap-3 pb-4 border-b">
                    <Avatar size={48} icon={<UserOutlined />} />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {selectedDoctor?.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {selectedDoctor?.specialty}
                      </p>
                    </div>
                  </div>

                  {/* Schedule Details */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CalendarOutlined className="text-blue-600 mt-1" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Thời gian</p>
                        <p className="font-medium">{selectedSchedule.date}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <EnvironmentOutlined className="text-blue-600 mt-1" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Địa điểm</p>
                        <p className="font-medium">
                          {selectedSchedule.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <HomeOutlined className="text-blue-600 mt-1" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Phòng khám</p>
                        <p className="font-medium">{selectedSchedule.room}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MedicineBoxOutlined className="text-blue-600 mt-1" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Dịch vụ</p>
                        <p className="font-medium">
                          {selectedSchedule.service}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vấn đề sức khỏe gặp phải *
                    </label>
                    <TextArea
                      rows={4}
                      placeholder="Mô tả ngắn gọn triệu chứng..."
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                    />
                    <div className="flex items-center justify-between mt-1">
                      <Button
                        type="link"
                        size="small"
                        icon={<FileImageOutlined />}
                      >
                        Tải ảnh 3 ảnh
                      </Button>
                      <span className="text-xs text-gray-500">
                        Tối đa 3 ảnh
                      </span>
                    </div>
                  </div>

                  {/* Confirm Button */}
                  <Button
                    type="primary"
                    size="large"
                    block
                    className="bg-orange-500 hover:bg-orange-600 border-0"
                    onClick={() => nav("/lich-kham")}
                  >
                    Xác nhận đặt khám
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <CalendarOutlined className="text-6xl text-gray-300" />
                  </div>
                  <p className="text-gray-500">
                    Vui lòng chọn bác sĩ và giờ khám để xem chi tiết.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Add Patient Modal */}
      <Modal
        title="Thêm mới người bệnh"
        open={showAddPatientModal}
        onCancel={() => {
          setShowAddPatientModal(false);
          setNewPatient({
            name: "",
            dateOfBirth: "",
            gender: "",
            identityCard: "",
            email: "",
            phone: "",
            address: "",
          });
        }}
        onOk={handleAddPatient}
        okText="Thêm người bệnh"
        cancelText="Hủy"
        width={800}
      >
        <div className="space-y-4 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Họ và tên */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <Input
                size="large"
                placeholder="Nguyễn Văn A"
                prefix={<UserOutlined className="text-gray-400" />}
                value={newPatient.name}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, name: e.target.value })
                }
              />
            </div>

            {/* Ngày sinh */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày sinh
              </label>
              <DatePicker
                size="large"
                placeholder="Chọn ngày sinh"
                className="w-full"
                format="DD/MM/YYYY"
                onChange={(date, dateString) =>
                  setNewPatient({
                    ...newPatient,
                    dateOfBirth: dateString as string,
                  })
                }
              />
            </div>

            {/* Giới tính */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giới tính
              </label>
              <Radio.Group
                size="large"
                value={newPatient.gender}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, gender: e.target.value })
                }
              >
                <Radio value="male">Nam</Radio>
                <Radio value="female">Nữ</Radio>
                <Radio value="other">Khác</Radio>
              </Radio.Group>
            </div>

            {/* CCCD/CMND */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CCCD/CMND
              </label>
              <Input
                size="large"
                placeholder="Số CCCD/CMND"
                prefix={<IdcardOutlined className="text-gray-400" />}
                value={newPatient.identityCard}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, identityCard: e.target.value })
                }
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                size="large"
                placeholder="example@email.com"
                prefix={<MailOutlined className="text-gray-400" />}
                value={newPatient.email}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, email: e.target.value })
                }
              />
            </div>

            {/* Số điện thoại */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <Input
                size="large"
                placeholder="0123456789"
                prefix={<PhoneOutlined className="text-gray-400" />}
                value={newPatient.phone}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, phone: e.target.value })
                }
              />
            </div>

            {/* Địa chỉ */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa chỉ
              </label>
              <Input
                size="large"
                placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                value={newPatient.address}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, address: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookingAppointmentPage;
