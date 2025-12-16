import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  MenuOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Drawer, Dropdown, Menu, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/imgs/logoEye.png";
import { useAppDispatch } from "../app/hook";
import { logout } from "../app/features/authSlice";

const HeaderClient = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = !!user;
  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    message.success("Đăng xuất thành công!");
    navigate("/auth/login");
  };
  const menuItems: MenuProps["items"] = [
    { key: "home", label: <Link to="/">Trang chủ</Link> },
    // { key: "about", label: <Link to="/about">Giới thiệu</Link> },
    // { key: "services", label: <Link to="/services">Dịch vụ</Link> },
    // { key: "departments", label: <Link to="/departments">Chuyên khoa</Link> },
    // { key: "doctors", label: <Link to="/doctors">Bác sĩ</Link> },
    // { key: "news", label: <Link to="/news">Tin tức</Link> },
    // { key: "contact", label: <Link to="/contact">Liên hệ</Link> },
  ];

  const loggedMenu: MenuProps["items"] = [
    {
      key: "profile",
      label: <Link to="/profile">Thông tin cá nhân</Link>,
    },
    {
      key: "logout",
      label: <span style={{ color: "red" }}>Đăng xuất</span>,
      onClick: () => {
        handleLogout();
        navigate("/auth/login");
      },
    },
  ];

  const guestMenu: MenuProps["items"] = [
    { key: "login", label: <Link to="/auth/login">Đăng nhập</Link> },
    { key: "register", label: <Link to="/auth/register">Đăng ký</Link> },
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

      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="logo" className="w-28 h-auto" />
            </Link>

            <nav className="hidden lg:block flex-1 mx-8">
              <Menu
                mode="horizontal"
                className="border-0 justify-center"
                items={menuItems}
              />
            </nav>

            <div className="flex items-center gap-3">
              <Dropdown
                menu={{ items: isLoggedIn ? loggedMenu : guestMenu }}
                placement="bottomRight"
                arrow
                className="hidden md:block"
              >
                <Button icon={<UserOutlined />}>
                  {isLoggedIn ? user.fullName : "Tài khoản"}
                </Button>
              </Dropdown>

              <Button
                icon={<MenuOutlined />}
                className="lg:hidden"
                onClick={() => setDrawerVisible(true)}
              />
            </div>
          </div>
        </div>
      </header>

      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Menu mode="vertical" items={menuItems} className="border-0" />

        <div className="mt-4 px-4 space-y-2">
          {!isLoggedIn ? (
            <>
              <Link to="/auth/login">
                <Button type="primary" block>
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button block>Đăng ký</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile">
                <Button block>Thông tin cá nhân</Button>
              </Link>

              <Button
                danger
                block
                onClick={() => {
                  handleLogout();
                  navigate("/auth/login");
                }}
              >
                Đăng xuất
              </Button>
            </>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default HeaderClient;
