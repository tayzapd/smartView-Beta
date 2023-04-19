import {  UserOutlined,UsergroupAddOutlined,QrcodeOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, { useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Main from '../../Main';
import { useAdminContext } from '../../Context/AdminContext';
import { ApartmentOutlined } from '@material-ui/icons';
import { StorefrontOutlined } from '@material-ui/icons';
import { LaunchOutlined } from '@material-ui/icons';
import { RestaurantRounded } from '@material-ui/icons';
import { MapSharp } from '@material-ui/icons';
import { Shop } from '@material-ui/icons';
import { LocalCafeOutlined } from '@material-ui/icons';
import { CasinoOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import '../Admin/admin.css';

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
  getItem('Shop Types','/admin/shoptypes',<Shop />),
  getItem('Divisions','/admin/divisions',<MapSharp/>),
  getItem('Cities','/admin/cities',<ApartmentOutlined/>),
  getItem('Townships','/admin/townships',<CasinoOutlined/>),
  getItem('Shops','/admin/shops',<StorefrontOutlined/>),
  getItem('Categories','/admin/categories',<RestaurantRounded/>),
  getItem('Items','/admin/items',<LocalCafeOutlined/>),
  getItem('Qr Code ','/admin/qrcode',<QrcodeOutlined />),
  getItem('Users','/admin/users',<UsergroupAddOutlined />),
  getItem('Admins','/admin/admins',<UserOutlined/>),
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
    if(token == null){
      return navigate('/admin/login');
    }else {
      axios.get('/api/user').then(({ data }) => {
        if(data.shop_id != 1 ){
          return navigate('/admin/login')
        }
      }); 
      
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
        <div className="logo" style={{ textAlign: 'center', fontSize:'20px', backgroundColor:'transparent', color:'#ffffff'}}>Smart View</div>
        <Menu 
          onClick={({key})=>{
            if(key != "singout"){
              navigate(key);
            }
          }}
          defaultSelectedKeys={[window.location.pathname]}
          style={{ 
            backgroundColor:'transparent',
            color:'#ffffff'
          }}
          theme="light" 
          mode="inline" 
          items={items} 
        />
      </Sider>
      <Layout
      >

        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              // minHeight: 360,
            }}
          >
          
            <Main/>
          </div>
        </Content>
          
      </Layout>
        <style>
          {`
              .logo {
                  margin: 16px;
                  background-color:transparent;
                  text-align:center;
                  font-size:20px;
                  color:#ffffff;
                  transition:all 0.8s;

                }
              
              .logo:hover{
                color:#faee02;
              }
              .h-screen {
                  height:1000px;
              }

              .ant-menu-light .ant-menu-item-selected{
                background-color:transparent;
                color:#faee02;
              }
              
              .ant-menu-title-content:hover{
                color:#faee02;
              }
              
              .ant-layout .ant-layout-sider-zero-width-trigger{
                background-color:#fc6400;
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







