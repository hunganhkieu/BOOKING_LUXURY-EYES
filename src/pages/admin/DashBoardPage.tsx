import React, { useState } from 'react';
import { Layout, Menu, Card, Row, Col, Statistic, Table, Tag, Avatar, Calendar, Badge, Progress, List } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  DashboardOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  EyeOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const DashBoardPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('1');

  // Dữ liệu mẫu cho lịch hẹn — chuyên khoa mắt
  const appointments = [
    {
      key: '1',
      patient: 'Nguyễn Minh An',
      doctor: 'BS. Trần Hữu Tầm',
      time: '09:00 - 29/11/2025',
      department: 'Khúc xạ',
      status: 'confirmed',
    },
    {
      key: '2',
      patient: 'Lê Thị Hoa',
      doctor: 'BS. Nguyễn Bích Ngọc',
      time: '10:30 - 29/11/2025',
      department: 'Nhãn nhi',
      status: 'pending',
    },
    {
      key: '3',
      patient: 'Trần Quốc Phong',
      doctor: 'BS. Phạm Minh Đức',
      time: '14:00 - 29/11/2025',
      department: 'Đáy mắt',
      status: 'completed',
    },
    {
      key: '4',
      patient: 'Phạm Thu Uyên',
      doctor: 'BS. Lâm Khánh Vy',
      time: '15:30 - 29/11/2025',
      department: 'Glaucoma',
      status: 'cancelled',
    },
  ];

  const columns = [
    {
      title: 'Bệnh nhân',
      dataIndex: 'patient',
      key: 'patient',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar icon={<UserOutlined />} />
          <span>{text}</span>
        </div>
      ),
    },
    { title: 'Bác sĩ', dataIndex: 'doctor', key: 'doctor' },
    { title: 'Thời gian', dataIndex: 'time', key: 'time' },
    { title: 'Chuyên khoa', dataIndex: 'department', key: 'department' },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        const statusConfig = {
          confirmed: { color: 'green', text: 'Đã xác nhận' },
          pending: { color: 'orange', text: 'Chờ xác nhận' },
          completed: { color: 'blue', text: 'Hoàn thành' },
          cancelled: { color: 'red', text: 'Đã hủy' },
        };
        return <Tag color={statusConfig[status].color}>{statusConfig[status].text}</Tag>;
      },
    },
  ];

  const upcomingAppointments = [
    { name: 'Nguyễn Minh An', time: '09:00', doctor: 'BS. Trần Hữu Tầm' },
    { name: 'Lê Thị Hoa', time: '10:30', doctor: 'BS. Nguyễn Bích Ngọc' },
    { name: 'Trần Quốc Phong', time: '14:00', doctor: 'BS. Phạm Minh Đức' },
  ];

  const getListData = (value) => {
    const date = value.date();
    if (date === 29 || date === 30) {
      return [
        { type: 'success', content: `${date === 29 ? '5' : '3'} lịch hẹn` },
      ];
    }
    return [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      
      {/* SIDEBAR */}
      <Sider 
        breakpoint="lg"
        collapsedWidth="0"
        style={{ background: '#0EA5E9' }}
      >
        <div style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '20px',
          fontWeight: 'bold',
        }}>
          <EyeOutlined style={{ fontSize: '26px', marginRight: '8px' }} />
          VisionCare
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenu]}
          onClick={({ key }) => setSelectedMenu(key)}
          style={{ background: '#0284C7' }}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: 'Tổng quan',
            },
            {
              key: '2',
              icon: <CalendarOutlined />,
              label: 'Lịch hẹn',
            },
            {
              key: '3',
              icon: <UserOutlined />,
              label: 'Bệnh nhân',
            },
            {
              key: '4',
              icon: <TeamOutlined />,
              label: 'Bác sĩ',
            },
          ]}
        />
      </Sider>

      {/* MAIN */}
      <Layout>
        
        {/* HEADER */}
        <Header style={{
          padding: '0 24px',
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <h2 style={{ margin: 0, color: '#0369A1' }}>Dashboard Phòng Khám Mắt</h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <ClockCircleOutlined style={{ fontSize: '16px' }} />
            <span>Hôm nay: 29/11/2025</span>
          </div>
        </Header>

        <Content style={{ margin: '24px 16px', padding: 24, background: '#f0f2f5' }}>
          
          {/* THỐNG KÊ */}
          <Row gutter={16} style={{ marginBottom: '24px' }}>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic title="Lịch hẹn hôm nay" value={12} prefix={<CalendarOutlined />} />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic title="Bệnh nhân mới" value={8} prefix={<UserOutlined />} />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic title="Bác sĩ mắt" value={12} prefix={<TeamOutlined />} />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic title="Ca khám hoàn thành" value={156} prefix={<CheckCircleOutlined />} suffix="tháng này" />
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            {/* BẢNG LỊCH HẸN */}
            <Col xs={24} lg={16}>
              <Card title="Lịch hẹn gần đây" style={{ marginBottom: '16px' }}>
                <Table
                  columns={columns}
                  dataSource={appointments}
                  pagination={{ pageSize: 5 }}
                />
              </Card>

              {/* TỶ LỆ */}
              <Card title="Tỷ lệ hoàn thành theo chuyên khoa">
                <Row gutter={16}>
                  <Col span={12}>
                    <div style={{ marginBottom: '12px' }}>
                      <div>Khúc xạ</div>
                      <Progress percent={90} status="active" />
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: '12px' }}>
                      <div>Đáy mắt</div>
                      <Progress percent={85} status="active" />
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: '12px' }}>
                      <div>Nhãn nhi</div>
                      <Progress percent={78} />
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: '12px' }}>
                      <div>Glaucoma</div>
                      <Progress percent={88} />
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* LỊCH SẮP TỚI + CALENDAR */}
            <Col xs={24} lg={8}>
              <Card title="Lịch hẹn sắp tới" style={{ marginBottom: '16px' }}>
                <List
                  itemLayout="horizontal"
                  dataSource={upcomingAppointments}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={item.name}
                        description={
                          <>
                            <div><ClockCircleOutlined /> {item.time}</div>
                            <div>{item.doctor}</div>
                          </>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>

              <Card title="Lịch tháng này">
                <Calendar fullscreen={false} dateCellRender={dateCellRender} />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashBoardPage;
