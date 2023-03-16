import './User.css'
import { useUserContext } from '../../../Context/UserContext';
import { useEffect } from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Grid, Input, Space } from 'antd';
import { List } from '@material-ui/icons';
import { GridOn } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
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
    const {shop,grid,setGrid,setItems} = useUserContext();
    const {id} = useParams();
    const items = [
        {
          label: <a href="https://www.antgroup.com">1st menu item</a>,
          key: '0',
        },
        {
          label: <a href="https://www.aliyun.com">2nd menu item</a>,
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: '3rd menu item',
          key: '3',
        },
      ];
    useEffect(() => {
    })
    const onSearch = async (value) => {
        const form = {
            shop_id:id,
            name:value,

        }
        const { data } = await axios.post(`/api/user/items/search-name`,form);
        setItems(data.items)
    };
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
                <div className='row'>
                <div className="text-white  search col-8 col-md-10">
                        <div className="input-group">
                        <div id="search-autocomplete" className="form-outline">
                        <Search placeholder="Search...." type='search' enterButton size='md' onSearch={onSearch} id='form1' className='rounded-pill px-md-3 ' />
                        </div>

                        </div>
                        
                    </div>
                    <button  onClick={() => {setGrid(!grid)}} className="col-1 btn btn-primary rounded-3  btn-sm p-0  ">
                        {grid == true ? <GridOn /> : <List />  }
                    </button>
                </div>
                
                </div>
                
                
            </nav>
            <nav style={{background:"rgba(0,0,0,0.1)"}} className="navbar navbar-dark shadow-md sticky-top px-2 ">
                <div className="container-fluid">

                </div>
                <button className="btn btn-sm btn-primary" style={{float:"right"}}>
                    Filter
                </button>
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