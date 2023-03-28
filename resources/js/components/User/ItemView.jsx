
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card,Button,Carousel } from "antd";
import { Modal } from "react-bootstrap";
import { useUserContext } from "../../Context/UserContext";
const { Meta } = Card;
import { ArrowDownOutlined } from "@ant-design/icons";
import './css/itemView.css'
const ItemView = () => {
    const {setDialog,grid,items,setItems} = useUserContext()
    const {id} = useParams();
    const [shop,setShop] = useState([]);
    const [loading,setLoading]  = useState(true);
    const [showItem,setShowItem] = useState(false);
    const [currentImage, setCurrentImage] = useState('https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-376464.jpg&fm=jpg');

    const [viewItem,setViewItem]  = useState({
        name:"",
        price:"",
        is_available:"",
        privacy:"",
        tag:"",
        images:[],
        time_limited:"",
        special_range:"",
        description:"",
        remark:"",
        created_at:"",
        updated_at:"",
        category:{name:''},
    });


    const stopLoading = () => {
        setLoading(false)
    }
    
    const getItems = () => {
        axios.post('/api/user/shop/items/',{id:id}).then((res) => {
            setItems(res.data.items);
        })
    }

    const getShopInfo = () => {
        axios.post('/api/user/shop/info/',{id:id}).then((res) => {
            setShop(res.data.shop);
        })
    }

    const ShowOneItem  = (index)  => {
        setShowItem(true);
        let item = items[index];
        setViewItem(item);
        setDialog(true);
        console.log(viewItem)
    }

    const handleClick = (newImage) => {
        setCurrentImage(newImage);
    }

    useEffect(() => {
        getItems();
        getShopInfo();
        setTimeout(stopLoading,3000);
    
    },[])

    return (
        <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.7.55/css/materialdesignicons.min.css" />
        <div className="container-fluid py-3 " style={{
            background:"#fcffa3",
            overflow:"hidden"
        }}>
            
            <style>
                {`
                .card-img {
                    height: 250;
                    width: 300;
                    border:0;
                    object-fit: cover;
                  }
                  
                  @media (max-width: 767px) {
                    .card-img {
                      height: 250;
                      width: 300;
                      object-fit: cover;
                    }
                  }
                  
                `}
            </style>

            {/* ITEM ONE PAGE VIEW   */}
            <Modal show={showItem} onHide={() => {} } fullscreen>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body >
                    <div className="slider-container">
                    <img src={currentImage} className="main-image rounded-4 " />
                    <div className="d-flex flex-row justify-content-center align-item-center  mt-3">
                            <img 
                                onClick={() => handleClick('https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')} 
                                src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                                className="small-image rounded-4"  />
                            <img 
                                onClick={() => handleClick('https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-376464.jpg&fm=jpg')} 
                                src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-376464.jpg&fm=jpg" 
                                className="small-image rounded-4"  />
                            <img 
                                onClick={() => handleClick('https://evoke.ie/wp-content/uploads/2023/03/332748275_873194020580069_1419245163461513321_n.jpg')} 
                                src="https://evoke.ie/wp-content/uploads/2023/03/332748275_873194020580069_1419245163461513321_n.jpg" 
                                className="small-image rounded-4"  />
                        </div>
                    </div>
                

                    <div className="container mt-3 d-flex flex-column justify-content-center align-item-center text-center " >
                        <b>
                            <h2 className="font-weight-bold" style={{fontWeight:"900"}}>{viewItem.name}  </h2> 
                        </b>

                        <b>
                            <h2 className="font-weight-bold text-muted" style={{fontWeight:"900"}}>{viewItem.category.name}  </h2> 
                        </b>

                        <b>
                            <h2 className="font-weight-bold text-warning" style={{fontWeight:"900"}}>{viewItem.price} MMK </h2> 
                        </b>

                    </div>


                    <div className="container-fluid mt-3 d-flex flex-column justify-content-startt align-item-start text-start text-muted"  style={{fontWeight:"900"}} >
                        <b>
                        <h2 className="font-weight-bold" >Description </h2> 
                        </b>

                        
                        <br />

                        <div className="w-100"></div>
                        <p style={{marginLeft:'12px'}}>
                            {viewItem.description}
                        </p>

                        <b>
                        <h2 className="font-weight-bold" >Tags </h2> 

                        <div style={{marginleft:'12px'}} >
                            <span className="rounded-2 px-2 py-1 mx-2" style={{background:'#d4fcff'}}>Fish</span>
                            <span className="rounded-2 px-2 py-1 mx-2" style={{background:'#d4fcff'}}>Rice Noodle</span>
                            <span className="rounded-2 px-2 py-1 mx-2" style={{background:'#d4fcff'}}>Spicy</span>
                        </div>

                        </b>


                    </div>
                    
                </Modal.Body>
                {/* <Modal.Footer>
                <Button variant="secondary" onClick={() => {}}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {}}>
                    Save Changes
                </Button>
                </Modal.Footer> */}
            </Modal>
            <style>
                {`
                .shop-name {
                    color:black;
                    font-weght:900;
                }
                .slider-container {
                    width: 100%;
                    margin: 0 auto ;
                  }
                  
                  .slider-images {
                    position: relative;
                    height: 500px;
                    overflow: hidden;
                  }
                  
                  .main-image {
                    width: 100%;
                    height: auto;
                    transition: opacity 1s;
                  }
                  
                  .small-images {
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  
                  .small-image {
                    width: 120px;
                    height: 80px;
                    margin: 0 10px;
                    cursor: pointer;
                  }
                  
                  .small-image:hover {
                    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
                  }
                `}
            </style>
            {/* 
            <Modal
                width={1000}
                open={showItem}
                okButtonProps={{}}
                onOk={() => {
                  console.log(viewItem)
                  setShowItem(false);
                  setViewItem({});
                  setDialog(false)
                }}
                type
                onCancel={() => {setShowItem(false);setDialog(false)}}

            >

                <div className="shadow-sm  d-flex flex-row h-auto" style={{background:'#ffffff'}}>
                    <div id="d-sm-none" className="col-md-4 h-auto"></div>
                    <div className="col-12 col-md-5 d-block h-100 h-auto">
                        {
                            viewItem.images ?
                                <Carousel
                                    autoplay={true}>
                                    {viewItem.images.map((img,index) => (
                                        <div key={index}>
                                            <img
                                                className="img-thumbnail rounded-0 border-0"
                                                src={`/images/shop/item/`+img}
                                                alt={img} />
                                        </div>
                                    ))}
                                </Carousel>
                                :
                                <span className='col-12 col-md-5'></span>
                        }
                    </div>
                    <div id="d-sm-none" className="col col-md-3 h-auto"></div>
                </div>
   

                <div className="col row d-block  " id="item-content">
                    <div className="col-12 pt-2 font-weight-bold" style={{fontSize:'20px',fontWeight:'bold'}}>
                        {viewItem.name}
                    </div>
                    <div className="text-muted col-12">
                        {
                            viewItem.category ?
                            <span style={{
                                background:'rgba(0,0,0,0.1)',
                                marginTop:'5px',
                                marginLeft:'15px',
                                borderRadius:'20px',
                                padding:'5px'
                            }}>
                               #{viewItem.category.name}
                            </span>
                            :
                            <span>
                                Not Have
                            </span>
                        }

                    <span style={{fontWeight:'bold'}} className='text-warning mx-3'>
                        {viewItem.price} Kyats
                    </span>

                    <span className="text-muted">
                        {viewItem.view} views 
                    </span>
                   </div>


                </div>
                <div className="mt-3 px-3 py-3 ">
                    {
                        viewItem.is_available == 1 ? 
                        <span 
                        style={{
                            background:"yellowgreen"
                        }}
                        className="rounded-pill py-1 px-2 " >Available</span>
                        :
                        <span className="rounded-pill bg-danger py-1 px-2 ">Not Available </span>
                    }
                    <span className="mx-3 ">
                    {viewItem.tag}
                    </span>
                </div>

                <div>
                    <h4>Description</h4>
                    <p>
                        {viewItem.description}
                    </p>
                </div>


            </Modal> */}
            <div className="row mx-md-5 mx-1  ">
                {items.map((item,id) => {
                    if(grid == true){
                        return <div key={id} 
                            className="card mx-0 mx-lg-3 mb-sm-3 col-12 col-md-3 my-3 rounded-4 " 
                            onClick={() => {
                                ShowOneItem(id)
                            }}>
                                <div className="row no-gutters">
                                    <div className="col-6 px-2 py-2">
                                        <img style={{height:'175px'}} className="card-img rounded-4 col-12 " src={`/images/shop/item/`+item.images[0]} />
                                    </div>
                                    <div className="col-6">
                                        <div className="card-body py-2 px-2 mr-2 ">
                                            <h6 style={{fontSize:"20px",fontWeight:'900'}} className="col-12 mt-2 ">{item.name}</h6>
                                            <p className="card-title ">{item.category.name}</p>

                                            <div className="text-warning" style={{marginTop:'60px'}}>
                                                {item.price} MMK 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    } else {
                        return <Card
                                    key={id}
                                    className="mx-lg-3 mb-sm-3 col-md-3 my-3 col-12 "
                                    hoverable
                                    loading={loading}
                                    onClick={() => {
                                        ShowOneItem(id)
                                    }}
                                    cover={<img style={{height:200,margin:0,padding:0}} alt="card image" src={`/images/shop/item/`+item.images[0]} />}
                                    style={{ width: 300 ,margin:20,padding:0}}
                                    >
                                        <Meta title={item.name} description={`${item.description}`} />
                                        <p>${item.price}</p>
                                    
                                </Card>
                    }
                })}
                
            </div>
            </div>
            
        </>
    )
}


export default ItemView;