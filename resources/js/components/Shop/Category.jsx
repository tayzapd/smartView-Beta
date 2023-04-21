import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {useShopContext} from '../../Context/ShopContext';
import { 
  Divider, List, Skeleton,
  Input,Button,Modal,
} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import './css/category.css';
const { TextArea } = Input;

const Categories =  () => {
    // assets 
    const {id} = useParams();
    const {axios,setDialog} = useShopContext();

    // states 

    // General State
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [categories,setCategories] = useState([]);

    // Create Category State 
    const [name,setName] = useState('');
    const [remark,setRemark] = useState('');
    const [create,setCreate] = useState(false);


    // Edit Category State 
    const [edit,setEdit] = useState(false);
    const [shopId,setShopId] = useState(0);
    const [cateId,setCateId] = useState(0);


    // Methods 
    const getCategories = async () => {
        const res = await axios.get(`/api/shop/category/show?page=${page}`);
        const newData = res.data.categories.data;
        setHasMore(res.data.categories.next_page_url !== null);
        setCategories((preCate) => [...preCate,...newData]);

    }


    const editCategory = async () => {
      const { data } = await axios.post(`/api/shop/category/update`,{
        name,remark,shop_id:shopId,id:cateId
      });
      if(data.status == true){
        setCategories(data.categories)
      }
    }


    const createCategory = async  () => {
      const { data } = axios.post(`/api/shop/category/create`,{
                              name:name,
                              remark:remark
                            }); 
      if(data.status == true){
        setCategories(data.categories)
      }
      
      
    }

    const showDeleteModal = () => {
      Modal.warning({
        title: 'Are You Sure To Delete This Category ',
        content: 'if you deleted you can`t recover this...',
        onOk:() => {
          deleteCategory();
        }
      });
    }
    const deleteCategory = async () => {
      const { data } = await axios.post(`/api/shop/category/delete`,{
                          id:cateId,shop_id:shopId
                        });
      if(data.status == true){
        setCategories(data.categories)
      }
    }
    const loadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };


    useEffect(() => {
        getCategories();
        console.log(categories)
    },[page])
    return (
      
        <>
        <div className="container d-flex flex-row my-3 ">
          <button onClick={() => {
            setCreate(true);
            setDialog(true)
          }} className="btn rounded-0  btn-primary px-3">
            CREATE + 
          </button>

          <Modal
                width={1000}
                title={
                  <h3 className="mx-4 ">
                    CATEGORY CREATE + 
                  </h3>
                }
                open={create}
                okButtonProps={{}}
                onOk={() => {
                  createCategory()
                  setCreate(false);
                  setDialog(false);

                }}
                onCancel={() => {setCreate(false);setDialog(false)}}

            >
                <div className="category-create h-100 " style={{
                    padding:"7px"
                }}>

                    <Input name="name" onChange={(e) => {setName(e.target.value)}} className="my-2 " allowClear placeholder="Name" />
                    
                    <TextArea name="remark" onChange={(e) => {setRemark(e.target.value)}} className="my-2 " style={{resize:'none'}} allowClear rows={4} placeholder="Remark" maxLength={250} />
                        
                </div>
            </Modal>
        </div>
        <Modal
                width={1000}
                title={
                  <h3 className="mx-4 ">
                    EDIT CATEGORY 
                  </h3>
                }
                open={edit}
                okButtonProps={{}}
                onOk={() => {
                  editCategory()
                  setEdit(false);
                  setDialog(false);

                }}
                onCancel={() => {setEdit(false);setDialog(false)}}
                >
                <div className="category-create h-100 " style={{
                    padding:"7px"
                }}>

                    <Input value={name} name="name" onChange={(e) => {setName(e.target.value)}} className="my-2 " allowClear placeholder="Name" />
                    
                    <TextArea value={remark} name="remark" onChange={(e) => {setRemark(e.target.value)}} className="my-2 " style={{resize:'none'}} allowClear rows={4} placeholder="Remark" maxLength={250} />
                        
                </div>
            </Modal>
        <div
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: 'auto',
            padding: '0 16px',
            boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
          }}
        >
            <InfiniteScroll
            dataLength={categories.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
            >
  

                  <List
                    header={<h3>Categories</h3>}
                    dataSource={categories}
                    renderItem={(item,index) => (
                      <List.Item
                      actions={[
                                <button 
                                    onClick={() => {
                                      setEdit(true);
                                      setDialog(true)
                                      setCateId(item.id);
                                      setShopId(item.shop_id);
                                      setName(item.name);
                                      setRemark(item.remark)
                                    }}
                                    className="rounded-0 btn btn-sm btn-primary">
                                      Edit
                                </button>, 
                                <button 
                                  onClick={() => {
                                    setShopId(item.shop_id);
                                    setCateId(item.id);
                                    setDialog(true);
                                    showDeleteModal();
                                    
                                  }}
                                    className="rounded-0 btn btn-sm btn-danger">
                                      Delete
                                </button>
                              ]}
                      key={index}>
                        <List.Item.Meta
                          title={item.name}
                        />
            
                      </List.Item>
                    )}
                  />
            </InfiniteScroll>
      </div>
        </>
    )
}

export default Categories;