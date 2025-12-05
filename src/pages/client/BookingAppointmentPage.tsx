import {
  CalendarOutlined,
  EnvironmentOutlined,
  FileImageOutlined,
  HomeOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, DatePicker, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetDoctorsQuery } from "../../app/services/doctorApi";
import { useGetScheduleDoctorIdQuery } from "../../app/services/scheduleApi";
import DoctorList from "../../components/DoctorList";
import TimeSlotPicker from "../../components/TimeSlotPicker";
import type { Doctor } from "../../types/Doctor";
import type { Patient } from "../../types/Patient";
import type { DoctorSchedule, Schedule } from "../../types/Schedule";
import AddPatientModal from "../../components/AddPatientModal";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const BookingAppointmentPage = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [delaySearch, setDelaySearch] = useState("");
  const { data, isLoading, isFetching, isError, refetch } =
    useGetDoctorsQuery(delaySearch);
  const doctors: Doctor[] = data?.data ?? [];

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const { data: schedule } = useGetScheduleDoctorIdQuery(
    selectedDoctor?._id as string,
    {
      skip: !selectedDoctor?._id,
    }
  );
  const scheduleDoctorId: DoctorSchedule[] = schedule?.data ?? [];
  const scheduleItem = scheduleDoctorId[0];

  const [selectedPerson, setSelectedPerson] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
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

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedSchedule(null);
  };

  const handleTimeSelect = (date: string, time: string) => {
    if (selectedDoctor) {
      const formattedDate = formatDate(date);
      setSelectedSchedule({
        date: `${time} - ${formattedDate}`,
        time: time,
        location: "Trung tâm Y khoa số 1 Tôn Thất Tùng",
        room: scheduleItem?.roomName,
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

  // delay tìm kiếm
  useEffect(() => {
    const timeout = setTimeout(() => setDelaySearch(inputSearch), 300);
    return () => clearTimeout(timeout);
  }, [inputSearch]);

  // reset bộ lọc
  const handleReset = () => {
    setInputSearch("");
  };

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (isLoading) return <div className="text-center mt-3">Loading...</div>;
  if (isError)
    return <div className="text-center mt-3">Error loading doctors</div>;
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
              <div className="mb-4">
                <Input
                  size="large"
                  placeholder="Tìm kiếm theo tên bác sĩ..."
                  prefix={<SearchOutlined className="text-gray-400" />}
                  className="flex-1"
                  maxLength={100}
                  value={inputSearch}
                  onChange={(e) => setInputSearch(e.target.value)}
                />
                <div className=" my-2 flex justify-start gap-2">
                  <Button size="large" icon={<UserOutlined />}>
                    Tìm thấy
                    <span className="font-semibold">
                      {doctors.length} bác sĩ
                    </span>{" "}
                    phù hợp
                  </Button>

                  <Button size="large" onClick={handleReset}>
                    Xóa bộ lọc
                  </Button>
                </div>

                <Button
                  type="primary"
                  onClick={() => refetch()}
                  loading={isLoading}
                >
                  Reset dữ liệu
                </Button>
              </div>

              {/* Doctor List */}
              {!selectedDoctor && (
                <DoctorList
                  doctors={doctors}
                  isFetching={isFetching}
                  handleDoctorSelect={handleDoctorSelect}
                />
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

                  {/* Location Info */}
                  <Card className="mb-4 bg-gray-50">
                    <h3 className="font-semibold mb-3">
                      Phòng khám chuyên khoa mắt Luxury Eyes
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <EnvironmentOutlined className="text-blue-600 mt-1" />
                        <span>Địa chỉ: Vân Canh - Hoài Đức</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <HomeOutlined className="text-blue-600 mt-1" />
                        <span>
                          Phòng khám:{" "}
                          {scheduleItem ? scheduleItem.roomName : "Chưa rõ"}
                        </span>
                      </div>
                      {/* <div className="flex items-start gap-2">
                        <MedicineBoxOutlined className="text-blue-600 mt-1" />
                        <span>Dịch vụ: Khám Y học cổ truyền [PKI]</span>
                      </div> */}
                      <div className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">💰</span>
                        <span>
                          Giá khám:{" "}
                          <span className="text-orange-500 font-semibold">
                            {selectedDoctor.price} đ
                          </span>
                        </span>
                      </div>
                    </div>
                  </Card>

                  {/* Morning Slots */}
                  {/* Afternoon Slots */}
                  <TimeSlotPicker
                    scheduleItem={scheduleItem}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    selectedSchedule={selectedSchedule}
                    handleTimeSelect={handleTimeSelect}
                  />
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
      <AddPatientModal
        visible={showAddPatientModal}
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
        onSubmit={handleAddPatient}
        newPatient={newPatient}
        setNewPatient={setNewPatient}
      />
    </div>
  );
};

export default BookingAppointmentPage;
