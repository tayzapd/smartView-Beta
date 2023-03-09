import './User.css'
import { useUserContext } from '../../../Context/UserContext';
import { useEffect } from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';


const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
const  UserNavbar = () => {
    const {shop} = useUserContext();
    useEffect(() => {
    })
    const onSearch = (value) => console.log(value);
    return (
        <> 
            <script src="https://cdn.jsdelivr.net/npm/@mdi/font@7.1.96/scripts/verify.min.js"></script>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@7.1.96/css/materialdesignicons.min.css" />
            <nav className="navbar navbar-dark shadow-md bg-orange sticky-top"> 
            
                <div className="container-fluid">
                <span className="navbar-brand mb-0 h1 navbar-title">
                    
                    {
                        shop != null ? 
                        <span>
                            {shop.shop_name ? 
                                <>
                                <span className='navbar-title-index-0'>
                                {shop.shop_name[0]}
        
                                </span>
                                <span className='navbar-title-index-other'>
                                {shop.shop_name.substring(1)}
                                </span>
                                </>
                            : 
                            <span></span>
                            }
                        </span>
                        :
                        <span></span>
                    }
                    
                </span>
                <div className="text-white  search ">
                    <div className="input-group">
                    <div id="search-autocomplete" className="form-outline">
                    <Search placeholder="Search...." type='search' enterButton size='small' onSearch={onSearch} id='form1' className='form-control-sm rounded-pill px-md-3 ' />
                    </div>

                    </div>
                </div>
                
                </div>
                
            </nav>

            <style>
                {`
                    .ant-input-search-button {

                    }
                `}
            </style>
            
        </>
    )
}

export default UserNavbar;