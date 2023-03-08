import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Image } from 'react-bootstrap';
// import mm from '../../router';
import { useNavigate } from 'react-router-dom';
import AddShoptypes from '../Admin/Shoptype/AddShoptypes';
import ItemView from '../User/ItemView';
import Main from '../../Main';
import { Button } from '@material-ui/core';
import { useAuthContext } from '../../Context/AdminContext';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Shoptypes', 'spt', <UserOutlined />, [
    getItem('AddShop', '/addshoptypes',<UserOutlined/>),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
]

const handleClick = () => {
  console.log("CLICK")
}

const Admin = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const UserMenu = (
    <Image
      src={'https://w7.pngwing.com/pngs/439/19/png-transparent-avatar-user-profile-icon-women-wear-frock-face-holidays-women-accessories-thumbnail.png'}
      alt="UserName profile image"
      roundedCircle
      style={{ width: '40px' }}
    />
  )
  
  
  return (
    <Layout className='h-screen'>
      <Sider 
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {}}
        onCollapse={(collapsed, type) => {}}
        style={{ 
          background:'#fc6400'
         }}
      >
        <div className="logo" style={{ textAlign: 'center', fontSize:'18px' }}>Smart View</div>
        <Menu 
          onClick={({key})=>{
            if(key != "singout"){
              navigate(key);
            }
          }}
          defaultSelectedKeys={[window.location.pathname]}
          style={{ background:'#fc6400' }}
          theme="light" 
          mode="inline" 
          items={items} 
        />
      </Sider>
      <Layout>
        <Header
          style={{
            
            padding: '0',
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
          
            <Main/>
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
export default Admin;







