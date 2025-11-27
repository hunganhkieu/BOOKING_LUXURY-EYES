import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const FooterClient = () => {
  return (
    <>
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <HeartOutlined className="text-2xl text-red-500" />
                <h3 className="font-bold text-lg">
                  Phòng khám chuyên khoa mắt Luxury Eyes
                </h3>
              </div>
              <p className="text-sm text-gray-300">
                Chăm sóc sức khỏe với trái tim và trách nhiệm
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liên kết nhanh</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white">
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link
                    to="/departments"
                    className="text-gray-300 hover:text-white"
                  >
                    Chuyên khoa
                  </Link>
                </li>
                <li>
                  <Link
                    to="/doctors"
                    className="text-gray-300 hover:text-white"
                  >
                    Đội ngũ bác sĩ
                  </Link>
                </li>
                <li>
                  <Link to="/news" className="text-gray-300 hover:text-white">
                    Tin tức
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Dịch vụ</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/booking"
                    className="text-gray-300 hover:text-white"
                  >
                    Đặt khám online
                  </Link>
                </li>
                <li>
                  <Link
                    to="/results"
                    className="text-gray-300 hover:text-white"
                  >
                    Tra cứu kết quả
                  </Link>
                </li>
                <li>
                  <Link
                    to="/telemedicine"
                    className="text-gray-300 hover:text-white"
                  >
                    Khám từ xa
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="text-gray-300 hover:text-white"
                  >
                    Hồ sơ bệnh án
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liên hệ</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <EnvironmentOutlined className="mt-1" />
                  <span>1 Tôn Thất Tùng, Đống Đa, Hà Nội</span>
                </li>
                <li className="flex items-center gap-2">
                  <PhoneOutlined />
                  <span>024.3574.8181</span>
                </li>
                <li className="flex items-center gap-2">
                  <ClockCircleOutlined />
                  <span>24/7</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-sm text-gray-300">
            <p>
              &copy; 2025 Phòng khám chuyên khoa mắt Luxury Eyes. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterClient;
