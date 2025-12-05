import React from "react";
import { Modal, Input, DatePicker, Radio } from "antd";
import {
  UserOutlined,
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

// Kiểu dữ liệu của form thêm bệnh nhân
export interface PatientInput {
  name: string;
  dateOfBirth: string;
  gender: string;
  identityCard: string;
  email: string;
  phone: string;
  address: string;
}

// Props của AddPatientModal
interface AddPatientModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  newPatient: PatientInput;
  setNewPatient: React.Dispatch<React.SetStateAction<PatientInput>>;
}

const AddPatientModal: React.FC<AddPatientModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  newPatient,
  setNewPatient,
}) => {
  return (
    <div>
      <Modal
        title="Thêm mới người bệnh"
        open={visible}
        onCancel={onCancel}
        onOk={onSubmit}
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
                prefix={<UserOutlined />}
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
                className="w-full"
                format="DD/MM/YYYY"
                onChange={(_, dateString) =>
                  setNewPatient({
                    ...newPatient,
                    dateOfBirth: Array.isArray(dateString)
                      ? dateString[0]
                      : dateString || "",
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
                prefix={<IdcardOutlined />}
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
                prefix={<MailOutlined />}
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
                prefix={<PhoneOutlined />}
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

export default AddPatientModal;
