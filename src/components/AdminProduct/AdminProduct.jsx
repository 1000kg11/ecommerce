import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Select, Space} from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64, renderOptions } from '../../utils'
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'

const AdminProduct = () => {
    const  [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState(null)
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isPendingUpdate, setIsPendingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [typeSelect, setTypeSelect] = useState('')
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const [error, setError] = useState(null);


    const inittial = () =>({
      name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
        newType: '',
        discount: '',
    })
    const [stateProduct, setStateProduct] = useState(inittial())
    const [stateProductDetails, setStateProductDetails] = useState(inittial())
    const [form] = Form.useForm();
    const mutation = useMutationHooks(
        (data) => {
            const {
            name,
            price,
            description,
            rating,
            image,
            type,
            countInStock,
            discount } = data
    const res = ProductService.createProduct({
            name,
            price,
            description,
            rating,
            image,
            type,
            countInStock,
            discount
            })
            return res
        }
    )

    const mutationUpdate = useMutationHooks(
        (data) => {
            const {
            id,
            token,
            ...rests } = data
    const res = ProductService.updateProduct(
           id, 
           token,
           { ...rests})
        return res
        },
    )

    const mutationDelete = useMutationHooks(
        (data) => {
            const {
            id,
            token} = data
    const res = ProductService.deleteProduct(
           id, 
           token)
        return res
        },
    )

    const mutationDeleteMany = useMutationHooks(
      (data) => {
          const {
          token,
          ...ids
        } = data
  const res = ProductService.deleteManyProduct(
         ids, 
         token)
      return res
      },
  )

    const getAllProducts  = async() => {
        const res = await ProductService.getAllProduct()
        return res
    }

    const fetchGetDetailsProduct = async(rowSelected) =>{
        try {
            const res = await ProductService.getDetailsProduct(rowSelected);
            if (res?.data) {
                setStateProductDetails({
                    name: res?.data?.name,
                    price: res?.data?.price,
                    description: res?.data?.description,
                    rating: res?.data?.rating,
                    image: res?.data?.image,
                    type: res?.data?.type,
                    countInStock: res?.data?.countInStock,
                    discount: res?.data?.discount
                  });
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching product details.');
        }
        setIsPendingUpdate(false)
    }
    useEffect(() =>{
      if(!isModalOpen){
        form.setFieldsValue(stateProductDetails)
      } else{
        form.setFieldsValue(inittial())
      }    
    }, [form, stateProductDetails, isModalOpen])

    useEffect(() =>{
        if(rowSelected && isOpenDrawer){
            setIsPendingUpdate(true)
            fetchGetDetailsProduct(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsProduct = () =>{
        setIsOpenDrawer(true)
    }

    const handleDeleteManyProducts = (ids) =>{
      mutationDeleteMany.mutate({ids: ids, token: user?.access_token},{
        onSettled: () =>{
            queryProduct.refetch()
        }
    })
    }

    const fetchAllTypeProduct = async()=>{
      const res = await ProductService.getAllTypeProduct()
      return res
    }

    const  { data, isPending, isSuccess, isError} = mutation
    const  { data: dataUpdate, isPending: isPendingUpdated, isSuccess: isSuccessUpdate, isError: isErrorUpdate} = mutationUpdate
    const  { data: dataDelete, isPending: isPendingDeleted, isSuccess: isSuccessDelete, isError: isErrorDelete} = mutationDelete
    const  { data: dataDeleteMany, isPending: isPendingDeletedMany, isSuccess: isSuccessDeleteMany, isError: isErrorDeleteMany} = mutationDeleteMany
    
    const queryProduct = useQuery({queryKey: ['products'], queryFn: getAllProducts})
    const typeProduct = useQuery({queryKey: ['type-product'], queryFn: fetchAllTypeProduct})
    const { isPending : isPendingProducts, data: products} = queryProduct
    const renderAction = () =>{
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer'}} onClick={()=> setIsModalOpenDelete(true)}/>
                <EditOutlined style={{ color: 'blue', fontSize: '30px', cursor: 'pointer'}} onClick={handleDetailsProduct}/> 
            </div>
        )
    }
   
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
      };
      const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
      };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div
            style={{
              padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <InputComponent
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
              
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1677ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     <Highlighter
        //       highlightStyle={{
        //         backgroundColor: '#ffc069',
        //         padding: 0,
        //       }}
        //       searchWords={[searchText]}
        //       autoEscape
        //       textToHighlight={text ? text.toString() : ''}
        //     />
        //   ) : (
        //     text
        //   ),
      });

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          sorter: (a,b) => a.name.length - b.name.length,
          ...getColumnSearchProps('name')
        },
        {
          title: 'Price',
          dataIndex: 'price',
          sorter: (a,b) => a.price - b.price,
          filters: [
            {
              text: '>= 50',
              value: '>=',
            },
            {
              text: '<= 50',
              value: '<=',
            },
          ],
          onFilter: (value, record) => {
            if( value === '>='){
                return record.price >= 50
            } else {
                return record.price <= 50
            } 
          }
        },
        {
          title: 'Rating',
          dataIndex: 'rating',
          sorter: (a,b) => a.rating - b.rating,
          filters: [
            {
              text: '>= 3',
              value: '>=',
            },
            {
              text: '<= 3',
              value: '<=',
            },
          ],
          onFilter: (value, record) => {
            if( value === '>='){
                return Number(record.rating) >= 3
            } else {
                return Number(record.rating) <= 3
            } 
          }
        },
        {
          title: 'Type',
          dataIndex: 'type',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction
        },
      ];
      const dataTable = products?.data?.length && products?.data?.map((product) =>{
        return {...product, key: product._id}
      })

      

    useEffect(() =>{
        if(isSuccess && data?.status === 'OK'){
            message.success()
            handleCancel()
        } else if(isError){
            message.error()
        }
    }, [isSuccess])
    
    
    useEffect(() =>{
      if(isSuccessDeleteMany && dataDeleteMany?.status === 'OK'){
          message.success()
      } else if(isErrorDeleteMany){
          message.error()
      }
  }, [isSuccessDeleteMany])

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: '',
            discount: '',
        })
        form.resetFields()
      };

    useEffect(() =>{
        if(isSuccessUpdate && dataUpdate?.status === 'OK'){
            message.success()
            handleCloseDrawer()
        } else if(isErrorUpdate){
            message.error()
        }
    }, [isSuccessUpdate])

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateProductDetails({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: ''
        })
        form.resetFields()
      };

      useEffect(() =>{
        if(isSuccessDelete && dataDelete?.status === 'OK'){
            message.success()
            handleCancelDelete()
        } else if(isErrorDelete){
            message.error()
        }
    }, [isSuccessDelete])

      const onFinish = () =>{
        const params = {
          name: stateProduct.name,
          price: stateProduct.price,
          description: stateProduct.description,
          rating: stateProduct.rating,
          image: stateProduct.image,
          type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
          countInStock: stateProduct.countInStock,
          discount: stateProduct.discount
        }
        mutation.mutate(params, {
            onSettled: () =>{
                queryProduct.refetch()
            }
        })
    }

    const handleOnChange = (e) =>{
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }
    const handleOnChangeDetails = (e) =>{
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value
        })
    }
    const handleOnchangeAvatar = async({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
          }
          setStateProduct({
            ...stateProduct,
            image: file.preview
          })
    }
    const handleOnchangeAvatarDetails = async({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
          }
          setStateProductDetails({
            ...stateProductDetails,
            image: file.preview
          })
    }
    
    const onUpdateProduct = () => {
        mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...stateProductDetails},{
            onSettled: () =>{
                queryProduct.refetch()
            }
        } )
    }
  
    const handleCancelDelete =() =>{
        setIsModalOpenDelete(false)
      }
      const handleDeleteProduct = () =>{
        mutationDelete.mutate({id: rowSelected, token: user?.access_token},{
            onSettled: () =>{
                queryProduct.refetch()
            }
        })
      }

      const handleChangeSelect = (value) =>{
        setStateProduct({
          ...stateProduct,
          type: value
        })
      }

  return (
    <div>
      <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: '10px'}}>
            <Button style={{height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed'}} 
              onClick={() => setIsModalOpen(true)}  >
                <PlusOutlined style={{fontSize: '60px'}}/>
            </Button>
      </div>  
      <div style={{margin: '20px'}}>
        <TableComponent handleDeleteMany= {handleDeleteManyProducts} columns= {columns} isPending= {isPendingProducts} data= {dataTable} onRow= {(record, rowIndex) =>{
            return {
                onClick: event =>{
                    setRowSelected(record._id)
                } 
            };
        }}/>
      </div>
    </div>
      <ModalComponent forceRender title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Loading isPending={isPending}>
            <Form
            name="basic"
            labelCol={{
            span: 6,
            }}
            wrapperCol={{
            span: 18,
            }}
            style={{
            maxWidth: 600,
            }}
            onFinish={onFinish}
            autoComplete="on"
            form = {form}
        >
            <Form.Item
            label="Name"
            name="name"
            rules={[
                {
                required: true,
                message: 'Please input your name!',
                },
            ]}
            >
            <InputComponent value = { stateProduct.name} onChange = { handleOnChange} name = "name"/>
            </Form.Item>

            <Form.Item
            label="Type"
            name="type"
            rules={[
                {
                required: true,
                message: 'Please input your type!',
                },
            ]}
            >
            <Select 
              name ="type"
              value={stateProduct.type}
              onChange={handleChangeSelect}
              options={renderOptions(typeProduct?.data?.data)}
            />
            </Form.Item>
            {stateProduct.type === 'add_type' && (
              <Form.Item
                label='New Type'
                name= 'newType'
                rules={[{required: true, message: 'please input your type!'}]}
                >
                <InputComponent value={stateProduct.newType} onChange={handleOnChange} name="newType"/>
              </Form.Item>
            )}
            <Form.Item
            label="Count inStock"
            name="countInStock"
            rules={[
                {
                required: true,
                message: 'Please input your inStock!',
                },
            ]}
            >
            <InputComponent value = { stateProduct.countInStock} onChange = { handleOnChange} name = "countInStock"/>
            </Form.Item>
            
            <Form.Item
            label="Price"
            name="price"
            rules={[
                {
                required: true,
                message: 'Please input your price!',
                },
            ]}
            >
            <InputComponent value = { stateProduct.price} onChange = { handleOnChange} name = "price"/>
            </Form.Item>

            <Form.Item
            label="Rating"
            name="rating"
            rules={[
                {
                required: true,
                message: 'Please input your rating!',
                },
            ]}
            >
            <InputComponent value = { stateProduct.rating} onChange = { handleOnChange} name = "rating"/>
            </Form.Item>

            <Form.Item
            label="Discount"
            name="discount"
            rules={[
                {
                required: true,
                message: 'Please input your discount of product!',
                },
            ]}
            >
            <InputComponent value = { stateProduct.discount} onChange = { handleOnChange} name = "discount"/>
            </Form.Item>

            <Form.Item
            label="Description"
            name="description"
            rules={[
                {
                required: true,
                message: 'Please input your description!',
                },
            ]}
            >
            <InputComponent value = { stateProduct.description} onChange = { handleOnChange} name = "description"/>
            </Form.Item> 

            <Form.Item
            label="Image"
            name="image"
            rules={[
                {
                required: true,
                message: 'Please input your image!',
                },
            ]}
            >
            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                        <Button >Select File</Button>
                        {stateProduct?.image && (
                        <img src={stateProduct?.image} style={{
                            height: '60px',
                            width: '60px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginLeft: '15px'
                        }} alt = " avatar"/>    
                    )}
                    </WrapperUploadFile>
            </Form.Item> 
            <Form.Item
            wrapperCol={{
                offset: 18,
                span: 16,
            }}
            >
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
            </Form>
        </Loading>
      </ModalComponent>
      <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose ={() => setIsOpenDrawer(false)} width="50%">
      <Loading isPending={isPendingUpdate || isPendingUpdated} >
        <Form
        name="basic"
        labelCol={{
        span: 4,
        }}
        wrapperCol={{
        span: 22,
        }}
        style={{
        maxWidth: 600,
        }}
        onFinish={onUpdateProduct}
        autoComplete="on"
        form = {form}
    >
        <Form.Item
        label="Name"
        name="name"
        rules={[
            {
            required: true,
            message: 'Please input your name!',
            },
        ]}
        >
        <InputComponent value = { stateProductDetails.name} onChange = { handleOnChangeDetails} name = "name"/>
        </Form.Item>

        <Form.Item
        label="Type"
        name="type"
        rules={[
            {
            required: true,
            message: 'Please input your type!',
            },
        ]}
        >
        <InputComponent value = { stateProductDetails.type} onChange = { handleOnChangeDetails} name = "type"/>
        </Form.Item>

        <Form.Item
        label="Count inStock"
        name="countInStock"
        rules={[
            {
            required: true,
            message: 'Please input your inStock!',
            },
        ]}
        >
        <InputComponent value = { stateProductDetails.countInStock} onChange = { handleOnChangeDetails} name = "countInStock"/>
        </Form.Item>
        
        <Form.Item
        label="Price"
        name="price"
        rules={[
            {
            required: true,
            message: 'Please input your price!',
            },
        ]}
        >
        <InputComponent value = { stateProductDetails.price} onChange = { handleOnChangeDetails} name = "price"/>
        </Form.Item>

        <Form.Item
        label="Rating"
        name="rating"
        rules={[
            {
            required: true,
            message: 'Please input your count rating!',
            },
        ]}
        >
        <InputComponent value = { stateProductDetails.rating} onChange = { handleOnChangeDetails} name = "rating"/>
        </Form.Item>

        <Form.Item
        label="Discount"
        name="discount"
        rules={[
            {
            required: true,
            message: 'Please input your discount of product!',
            },
        ]}
        >
        <InputComponent value = { stateProductDetails.discount} onChange = { handleOnChangeDetails} name = "discount"/>
        </Form.Item>

        <Form.Item
        label="Description"
        name="description"
        rules={[
            {
            required: true,
            message: 'Please input your description!',
            },
        ]}
        >
        <InputComponent value = { stateProductDetails.description} onChange = { handleOnChangeDetails} name = "description"/>
        </Form.Item> 

        <Form.Item
        label="Image"
        name="image"
        rules={[
            {
            required: true,
            message: 'Please input your image!',
            },
        ]}
        >
        <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                    <Button >Select File</Button>
                    {stateProductDetails?.image && (
                    <img src={stateProductDetails?.image} style={{
                        height: '60px',
                        width: '60px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        marginLeft: '15px'
                    }} alt = " avatar"/>    
                )}
                </WrapperUploadFile>
        </Form.Item> 
        <Form.Item
        wrapperCol={{
            offset: 18,
            span: 16,
        }}
        >
        <Button type="primary" htmlType="submit">
            Apply
        </Button>
        </Form.Item>
        </Form>
    </Loading>
      </DrawerComponent>

      <ModalComponent forceRender title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct} >
        <Loading isPending={isPendingDeleted}>
            <div>Bạn chắc có muốn xóa sản phẩm này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  )
}

export default AdminProduct
