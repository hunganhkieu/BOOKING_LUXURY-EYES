import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        {/* Logo & Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Đăng nhập</h1>
          <p className="text-gray-500 mt-1">Chào mừng bạn trở lại</p>
        </div>

        {/* Login Form */}
        <Form name="login" layout="vertical" requiredMark={false}>
          <Form.Item
            label="Email hoặc Số điện thoại"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email hoặc số điện thoại!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="example@email.com hoặc 0123456789"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Nhập mật khẩu"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-between items-center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:text-blue-700"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Hoặc</span>
          </div>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <span className="text-gray-600">Chưa có tài khoản? </span>
          <Link
            to="/auth/register"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Đăng ký ngay
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

export default LoginPage;
