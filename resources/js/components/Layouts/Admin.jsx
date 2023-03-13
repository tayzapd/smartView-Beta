import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Image } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import AddShoptypes from '../Admin/Shoptype/AddShoptypes';
import ItemView from '../User/ItemView';
import Main from '../../Main';
import { Button } from '@material-ui/core';
import { useAdminContext, useAuthContext } from '../../Context/AdminContext';

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
  getItem('Shoptypes','/admin/shoptypes',<UserOutlined/>),
  getItem('Divisions','/admin/divisions',<UserOutlined/>),
  getItem('Cities','/admin/cities',<UserOutlined/>),
  getItem('Townships','/admin/townships',<UserOutlined/>),
  getItem('Shops','/admin/shops',<UserOutlined/>),
  getItem('Categories','/admin/categories',<UserOutlined/>),
  getItem('Items','/admin/items',<UserOutlined/>),
]


const Admin = () => {
  const {token} = useAdminContext();
  const navigate = useNavigate();
  const  router = useLocation()
  const UserMenu = (
    <Image
      src={'https://w7.pngwing.com/pngs/439/19/png-transparent-avatar-user-profile-icon-women-wear-frock-face-holidays-women-accessories-thumbnail.png'}
      alt="UserName profile image"
      roundedCircle
      style={{ width: '40px' }}
    />
  )

  useEffect(() => {
    console.log(token)
    if(token == null){
      return navigate('/admin/login');
    }
  },[])
  
  
  return (
    <>
    {
      router.pathname.includes('login') != true ? 
      <Layout className='h-screen'>
      <Sider 
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {}}
        onCollapse={(collapsed, type) => {}}
        style={{ 
          backgroundImage: 'linear-gradient(to left bottom, #f26d00, #f16103, #ef5407, #ed460d, #eb3612)'
        }}
      >
        <div className="logo" style={{ textAlign: 'center', fontSize:'20px', backgroundColor:'transparent'}}>Smart View</div>
        <Menu 
          onClick={({key})=>{
            if(key != "singout"){
              navigate(key);
            }
          }}
          defaultSelectedKeys={[window.location.pathname]}
          style={{ 
            backgroundColor:'transparent'
          }}
          theme="light" 
          mode="inline" 
          items={items} 
        />
      </Sider>
      <Layout>
        {/* <Header
          style={{
            
            padding: '0',
            
           
          }}

        >
          
      
          
        </Header> */}
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
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

            .ant-menu-light .ant-menu-item-selected{
              background-color:transparent;
              color:#ffffff;
            }
            
        `}
      </style>
    </Layout> 
            : <Main />
    }
    </>
  );
};
export default Admin;







