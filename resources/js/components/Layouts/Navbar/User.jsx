import './User.css'
import { useUserContext } from '../../../Context/UserContext';
import React,{ useEffect,useState } from 'react';
import { AudioOutlined,FilterFilled } from '@ant-design/icons';
import { Grid, Input, Space } from 'antd';
import { List } from '@material-ui/icons';
import { GridOn } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import { Dropdown,Form } from 'react-bootstrap';

import { ArrowDropDownCircle } from '@material-ui/icons';

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
        <div style={{background:"#fcffa3",paddingTop:'20px'}} > 
            <script src="https://cdn.jsdelivr.net/npm/@mdi/font@7.1.96/scripts/verify.min.js"></script>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@7.1.96/css/materialdesignicons.min.css" />
            

            <div className="sticky-top">
              <nav className="navbar navbar-sm shadow-md  navbar-white rounded-4 mx-2 px-3   ">
                <a class="navbar-brand" style={{fontWeight:'900'}}>
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

                </a>

                <div style={{float:"right"}}>
                  {grid == true ? 
                    <GridOn 
                      className="col-1 rounded-2 mx-2  "
                      style={{color:"black"}}  
                      onClick={() => {setGrid(!grid)}} /> : 
                    <List 
                      className="col-1 rounded-2 mx-2  "
                      style={{color:"black"}}  
                      onClick={() => {setGrid(!grid)}} />  
                  }
                      <Dropdown style={{float:"right"}} size='sm'>
                          <Dropdown.Toggle as={CustomToggle} size='sm' variant="black" id="dropdown-basic">
                              <FilterFilled style={{color:'black'}} />
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

              </nav>

              <nav className="navbar navbar-sm shadow-md  navbar-white rounded-4 mx-2 px-3 mt-3  ">
                
                <div className="col-12 text-center ">
                  All

                  <div style={{float:'right'}}> 
                    <ArrowDropDownCircle /> 
                  </div> 
                </div>
                
              </nav>
            </div>
        
            <style>
                {`
                    .ant-input-search-button {

                    }
                `}
            </style>
            
        </div>
    )
}

export default UserNavbar;