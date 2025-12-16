import {
  CalendarOutlined,
  MedicineBoxOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Card, Carousel } from "antd";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hook";

/* ================= TYPES ================= */

interface ServiceItem {
  icon: ReactNode;
  title: string;
  desc: string;
  link: string;
}

interface NewsItem {
  title: string;
  date: string;
  img: string;
  link: string;
}

/* ================= COMPONENT ================= */

const HomePage: React.FC = () => {
  const isAuth = useAppSelector(
    (state) => state.auth.isAuthenticated
  );

  const services: ServiceItem[] = [
    {
      icon: <CalendarOutlined className="text-3xl text-blue-600" />,
      title: "Đặt khám online",
      desc: "Đặt lịch nhanh chóng",
      link: "/dat-lich-kham",
    },
    {
      icon: <MedicineBoxOutlined className="text-3xl text-red-600" />,
      title: "Lịch khám",
      desc: "Quản lý lịch khám đã đặt",
      link: "/lich-kham",
    },
    {
      icon: <UserOutlined className="text-3xl text-purple-600" />,
      title: "Hồ sơ sức khỏe",
      desc: "Quản lý sức khỏe",
      link: "/profile",
    },
  ];

  const news: NewsItem[] = [
    {
      title: "Thông báo lịch làm việc Tết Nguyên đán 2025",
      date: "15/11/2024",
      img: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=250&fit=crop",
      link: "/news/1",
    },
    {
      title: "Chương trình khám sức khỏe tổng quát cuối năm",
      date: "10/11/2024",
      img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop",
      link: "/news/2",
    },
    {
      title: "Hội thảo chăm sóc sức khỏe tim mạch",
      date: "05/11/2024",
      img: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=400&h=250&fit=crop",
      link: "/news/3",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      <Carousel autoplay className="bg-blue-50">
        <div>
          <div className="h-96 flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div className="text-center px-4">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Chăm sóc sức khỏe toàn diện
              </h2>
              <p className="text-xl mb-6">
                Đội ngũ bác sĩ giàu kinh nghiệm, trang thiết bị hiện đại
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="h-96 flex items-center justify-center bg-gradient-to-r from-green-600 to-teal-700 text-white">
            <div className="text-center px-4">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Khám chữa bệnh 24/7
              </h2>
              <p className="text-xl mb-6">
                Luôn sẵn sàng phục vụ mọi lúc, mọi nơi
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="h-96 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-700 text-white">
            <div className="text-center px-4">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Công nghệ y tế tiên tiến
              </h2>
              <p className="text-xl mb-6">
                Trang thiết bị hiện đại, chính xác cao
              </p>
            </div>
          </div>
        </div>
      </Carousel>

      {/* Quick Services */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((service, idx) => (
            <Link
              to={isAuth ? service.link : "/auth/login"}
              key={idx}
            >
              <Card
                hoverable
                className="text-center shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              >
                <div className="mb-2">{service.icon}</div>
                <h3 className="font-semibold text-gray-800">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {service.desc}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Badge.Ribbon text="Uy tín - Chất lượng" color="blue">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop"
                alt="Hospital"
                className="rounded-lg shadow-lg w-full"
              />
            </Badge.Ribbon>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Phòng khám chuyên khoa mắt Luxury Eyes
            </h2>
            <p className="text-gray-600 mb-4">
              Phòng khám chuyên khoa mắt Luxury Eyes là cơ sở y tế
              hàng đầu với hơn 5 năm kinh nghiệm trong việc chăm
              sóc sức khỏe cộng đồng.
            </p>

            <ul className="space-y-2 mb-6">
              {[
                "Đội ngũ bác sĩ chuyên môn cao",
                "Trang thiết bị y tế hiện đại",
                "Dịch vụ chăm sóc 24/7",
                "Quy trình khám chữa bệnh chuyên nghiệp",
              ].map((text, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <RightOutlined className="text-blue-600" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* News */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Tin tức & Sự kiện
          </h2>
          <p className="text-gray-600">
            Cập nhật thông tin mới nhất từ bệnh viện
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item, idx) => (
            <Link to={item.link} key={idx}>
              <Card
                hoverable
                cover={
                  <img
                    alt={item.title}
                    src={item.img}
                    className="h-48 object-cover"
                  />
                }
              >
                <div className="text-xs text-gray-500 mb-2">
                  {item.date}
                </div>
                <h3 className="font-semibold text-gray-800 hover:text-blue-600">
                  {item.title}
                </h3>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
