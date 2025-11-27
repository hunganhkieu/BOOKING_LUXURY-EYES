import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Button, Drawer, Dropdown } from "antd";
import type { MenuProps } from "antd";
import {
  MenuOutlined,
  UserOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import logo from "../assets/imgs/logoEye.png";

const HeaderClient = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const menuItems: MenuProps["items"] = [
    { key: "home", label: <Link to="/">Trang chủ</Link> },
    { key: "about", label: <Link to="/about">Giới thiệu</Link> },
    { key: "services", label: <Link to="/services">Dịch vụ</Link> },
    { key: "departments", label: <Link to="/departments">Chuyên khoa</Link> },
    { key: "doctors", label: <Link to="/doctors">Bác sĩ</Link> },
    { key: "news", label: <Link to="/news">Tin tức</Link> },
    { key: "contact", label: <Link to="/contact">Liên hệ</Link> },
  ];

  const userMenuItems: MenuProps["items"] = [
    {
      key: "login",
      label: <Link to="/auth/login">Đăng nhập</Link>,
    },
    {
      key: "register",
      label: <Link to="/auth/register">Đăng ký</Link>,
    },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2 px-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center text-sm">
          <div className="flex flex-wrap gap-4">
            <span className="flex items-center gap-1">
              <PhoneOutlined /> Hotline: 024.3574.8181
            </span>
            <span className="flex items-center gap-1">
              <ClockCircleOutlined /> 24/7
            </span>
          </div>
          <div className="flex items-center gap-1">
            <EnvironmentOutlined /> Hà Nội
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="logo" className="w-28 h-auto" />
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:block flex-1 mx-8">
              <Menu
                mode="horizontal"
                className="border-0 justify-center"
                items={menuItems}
              />
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Desktop User Menu */}
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                arrow
                className="hidden md:block"
              >
                <Button icon={<UserOutlined />}>Tài khoản</Button>
              </Dropdown>

              {/* Mobile Menu Button */}
              <Button
                icon={<MenuOutlined />}
                className="lg:hidden"
                onClick={() => setDrawerVisible(true)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Menu mode="vertical" items={menuItems} className="border-0" />
        <div className="mt-4 px-4 space-y-2">
          <Link to="/login">
            <Button type="primary" block>
              Đăng nhập
            </Button>
          </Link>
          <Link to="/register">
            <Button block>Đăng ký</Button>
          </Link>
        </div>
      </Drawer>
    </>
  );
};

export default HeaderClient;
