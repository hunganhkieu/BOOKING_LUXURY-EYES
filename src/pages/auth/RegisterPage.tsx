import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Card, DatePicker, Radio } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl my-8">
        {/* Logo & Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Đăng ký tài khoản
          </h1>
          <p className="text-gray-500 mt-1">Tạo tài khoản để sử dụng dịch vụ</p>
        </div>

        {/* Register Form */}
        <Form
          name="register"
          layout="vertical"
          requiredMark={false}
          scrollToFirstError
        >
          <div className="grid md:grid-cols-2 gap-4">
            {/* Họ và tên */}
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Nguyễn Văn A"
                size="large"
              />
            </Form.Item>

            {/* Ngày sinh */}
            <Form.Item
              label="Ngày sinh"
              name="dateOfBirth"
              rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
            >
              <DatePicker
                placeholder="Chọn ngày sinh"
                size="large"
                className="w-full"
                format="DD/MM/YYYY"
              />
            </Form.Item>

            {/* Giới tính */}
            <Form.Item
              label="Giới tính"
              name="gender"
              rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
            >
              <Radio.Group size="large">
                <Radio value="male">Nam</Radio>
                <Radio value="female">Nữ</Radio>
                <Radio value="other">Khác</Radio>
              </Radio.Group>
            </Form.Item>

            {/* CCCD/CMND */}
            <Form.Item
              label="CCCD/CMND"
              name="identityCard"
              rules={[
                { required: true, message: "Vui lòng nhập số CCCD/CMND!" },
                {
                  pattern: /^[0-9]{9,12}$/,
                  message: "Số CCCD/CMND không hợp lệ!",
                },
              ]}
            >
              <Input
                prefix={<IdcardOutlined className="text-gray-400" />}
                placeholder="Số CCCD/CMND"
                size="large"
              />
            </Form.Item>

            {/* Email */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="example@email.com"
                size="large"
              />
            </Form.Item>

            {/* Số điện thoại */}
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Số điện thoại không hợp lệ!",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined className="text-gray-400" />}
                placeholder="0123456789"
                size="large"
              />
            </Form.Item>

            {/* Địa chỉ */}
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
              className="md:col-span-2"
            >
              <Input
                placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                size="large"
              />
            </Form.Item>

            {/* Mật khẩu */}
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Mật khẩu (tối thiểu 6 ký tự)"
                size="large"
              />
            </Form.Item>

            {/* Xác nhận mật khẩu */}
            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Nhập lại mật khẩu"
                size="large"
              />
            </Form.Item>
          </div>

          {/* Terms & Conditions */}
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Vui lòng đồng ý với điều khoản!")
                      ),
              },
            ]}
          >
            <div className="flex items-start gap-2">
              <input type="checkbox" id="agreement" className="mt-1" />
              <label htmlFor="agreement" className="text-sm text-gray-600">
                Tôi đồng ý với{" "}
                <Link to="/terms" className="text-blue-600 hover:text-blue-700">
                  Điều khoản sử dụng
                </Link>{" "}
                và{" "}
                <Link
                  to="/privacy"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Chính sách bảo mật
                </Link>
              </label>
            </div>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>

        {/* Login Link */}
        <div className="text-center">
          <span className="text-gray-600">Đã có tài khoản? </span>
          <Link
            to="/auth/login"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Đăng nhập ngay
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
            ← Quay về trang chủ
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
