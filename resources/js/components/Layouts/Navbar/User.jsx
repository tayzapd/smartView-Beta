import './User.css'
import { useUserContext } from '../../../Context/UserContext';
import React,{ useEffect,useState } from 'react';
import { AudioOutlined,FilterFilled } from '@ant-design/icons';
import { Grid, Input, Space } from 'antd';
import { List } from '@material-ui/icons';
import { GridOn } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import { Dropdown,Form } from 'react-bootstrap';
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      {/* &#x25bc; */}
    </a>
  ));
  
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [search, setSearch] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !search || child.props.children.toLowerCase().startsWith(search),
            )}
          </ul>
        </div>
      );
    },
  );

  
const  UserNavbar = () => {
    const {shop,grid,setGrid,setItems,setCategories,categories} = useUserContext();
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

    const getCategories = async () => {
        const { data } = await axios.post('/api/user/categories/showAll',{shop_id:id});
        setCategories(data.categories);
    }

    const getItems = async (cateId) => { 
        const form = {
            cate_id:cateId,
            id:id
        }
        const { data } = await axios.post('/api/user/items/search-category',form);
        setItems(data.items)
    } 

    useEffect(() => {
        getCategories();
    },[]);


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
            <nav style={{background:"rgba(0,0,0,0.1)"}} className="navbar navbar-sm shadow-md sticky-top px-2 col-12 ">
                <div className="container-fluid">
                    <div className="col-4"></div>
                    <div className="col-4"></div>
                    <div className='col-4'>
                    <Dropdown style={{float:"right"}} size='sm'>
                        <Dropdown.Toggle as={CustomToggle} size='sm' variant="primary" id="dropdown-basic">
                            <FilterFilled />
                        </Dropdown.Toggle>

                        <Dropdown.Menu as={CustomMenu}>
                            {categories.map((cate,index) => {
                                return (
                                    <Dropdown.Item onClick={() => {getItems(cate.id)}} key={index}>{cate.name}</Dropdown.Item>
                                )
                            })}
                        </Dropdown.Menu>
                    </Dropdown>

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