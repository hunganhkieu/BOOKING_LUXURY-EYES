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
      <footer className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div>
              <div className="flex items-start gap-3 mb-4">
                <HeartOutlined className="text-3xl text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg leading-tight">
                    Phòng khám chuyên khoa mắt
                  </h3>
                  <h3 className="font-bold text-lg">Luxury Eyes</h3>
                </div>
              </div>
              <p className="text-sm text-gray-300">
                Chăm sóc sức khỏe với trái tim và trách nhiệm
              </p>
            </div>

            {/* Services Section */}
            <div>
              <h4 className="font-bold text-base mb-6 border-b-2 border-blue-400 pb-2 inline-block">
                Dịch vụ
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    to="/dat-lich-kham"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Đặt khám online
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/results"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Tra cứu kết quả
                  </Link>
                </li>
                <li>
                  <Link
                    to="/telemedicine"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Khám từ xa
                  </Link>
                </li> */}
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h4 className="font-bold text-base mb-6 border-b-2 border-blue-400 pb-2 inline-block">
                Liên hệ
              </h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <EnvironmentOutlined className="mt-1 flex-shrink-0" />
                  <span>Vân Canh - Hoài Đức, Hà Nội</span>
                </li>
                <li className="flex items-center gap-3">
                  <PhoneOutlined className="flex-shrink-0" />
                  <span>024.3574.8181</span>
                </li>
                <li className="flex items-center gap-3">
                  <ClockCircleOutlined className="flex-shrink-0" />
                  <span>Mở cửa 24/7</span>
                </li>
              </ul>
            </div>

            {/* Info/CTA Section */}
            <div>
              <h4 className="font-bold text-base mb-6 border-b-2 border-blue-400 pb-2 inline-block">
                Thông tin
              </h4>
              <p className="text-sm text-gray-300 mb-4">
                Đặt lịch khám ngay để được tư vấn và chăm sóc bởi đội ngũ chuyên
                gia
              </p>
              <Link
                to="/dat-lich-kham"
                className="inline-block bg-white text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Đặt lịch khám ngay
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-blue-700 pt-8 text-center text-sm text-gray-400">
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
