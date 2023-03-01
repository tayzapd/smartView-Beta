import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React from 'react';
const { Header, Content, Footer, Sider } = Layout;
const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const page = ['Admins','Users','Shops','Categories']
  return (
    <Layout className='h-screen'>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {}}
        onCollapse={(collapsed, type) => {}}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
            (icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: page[index],
            }),
          )}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
            
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            content
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Admin Desgin ©2023 Created by XyberPlanet Developement Team 
        </Footer>
      </Layout>
      <style>
        {`
            .logo {
                height: 32px;
                margin: 16px;
                background: rgba(255, 255, 255, 0.2);
              }

            .h-screen {
                height:665px;
            }
        `}
      </style>
    </Layout>
  );
};
export default App;

