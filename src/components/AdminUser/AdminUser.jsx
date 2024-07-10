import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Space } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import ModalComponent from '../ModalComponent/ModalComponent'
import Loading from '../LoadingComponent/Loading'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as message from '../../components/Message/Message'
import * as UserService from '../../services/UserService'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { getBase64 } from '../../utils'
const AdminUser = () => {
    const [rowSelected, setRowSelected] = useState(null)
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isPendingUpdate, setIsPendingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [error, setError] = useState(null);
    
    const [stateUserDetails, setStateUserDetails] = useState({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,
      avatar: '',
      address: ''
    })
    const [form] = Form.useForm();
    

    const mutationUpdate = useMutationHooks(
        (data) => {
            const {
            id,
            token,
            ...rests } = data
    const res = UserService.updateUser(
           id, 
           { ...rests},
           token,
           )
        return res
        },
    )

    const mutationDelete = useMutationHooks(
        (data) => {
            const {
            id,
            token} = data
    const res =  UserService.deleteUser(
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
  const res = UserService.deleteManyUser(
         ids, 
         token)
      return res
      },
  )

  const handleDeleteManyUsers = (ids) =>{
    mutationDeleteMany.mutate({ids: ids, token: user?.access_token},{
      onSettled: () =>{
          queryUser.refetch()
      }
  })
  }
    const getAllUsers  = async() => {
        const res = await UserService.getAllUser(user?.access_token)
        return res
    }

    const fetchGetDetailsUser = async(rowSelected) =>{
        try {
            const res = await UserService.getDetailsUser(rowSelected);
            if (res?.data) {
                setStateUserDetails({
                    name: res?.data?.name,
                    email: res?.data?.email,
                    phone: res?.data?.phone,
                    isAdmin: res?.data?.isAdmin,
                    address: res?.data?.address,
                    avatar: res?.data?.avatar
                });
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching product details.');
        }
        setIsPendingUpdate(false)
    }
    useEffect(() =>{
        form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails])

    useEffect(() =>{
        if(rowSelected && isOpenDrawer){
            setIsPendingUpdate(true)
            fetchGetDetailsUser(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsProduct = () =>{
        setIsOpenDrawer(true)
    }


    const  { data: dataUpdate, isPending: isPendingUpdated, isSuccess: isSuccessUpdate, isError: isErrorUpdate} = mutationUpdate
    const  { data: dataDelete, isPending: isPendingDeleted, isSuccess: isSuccessDelete, isError: isErrorDelete} = mutationDelete
    const  { data: dataDeleteMany, isPending: isPendingDeletedMany, isSuccess: isSuccessDeleteMany, isError: isErrorDeleteMany} = mutationDeleteMany

    const queryUser = useQuery({queryKey: ['users'], queryFn: getAllUsers})
    const { isPending : isPendingUsers, data: users} = queryUser
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
          title: 'Email',
          dataIndex: 'email',
          sorter: (a,b) => a.email.length - b.email.length,
          ...getColumnSearchProps('email')
        },
        {
          title: 'Address',
          dataIndex: 'address',
          sorter: (a,b) => a.address.length - b.address.length,
          ...getColumnSearchProps('address')
        },
        {
          title: 'Admin',
          dataIndex: 'isAdmin',
          filters: [
            {
              text: 'True',
              value: 'true',
            },
            {
              text: 'False',
              value: 'false',
            },
          ],
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          sorter: (a,b) => a.phone - b.phone,
          ...getColumnSearchProps('phone')
        },
        
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction
        },
      ];
      const dataTable = users?.data?.length && users?.data?.map((user) =>{
        return {...user, key: user._id, isAdmin: user.isAdmin ? 'True' : 'False'}
      })

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
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            isAdmin: false, 
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


    const handleOnChangeDetails = (e) =>{
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() =>{
      if(isSuccessDeleteMany && dataDeleteMany?.status === 'OK'){
          message.success()
      } else if(isErrorDeleteMany){
          message.error()
      }
  }, [isSuccessDeleteMany])


    const handleOnchangeAvatarDetails = async({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
          }
          setStateUserDetails({
            ...stateUserDetails,
            avatar: file.preview
          })
    }
    
    const onUpdateUser = () => {
        mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...stateUserDetails},{
            onSettled: () =>{
                queryUser.refetch()
            }
        } )
    }

    const handleCancelDelete =() =>{
        setIsModalOpenDelete(false)
      }
      const handleDeleteUser = () =>{
        mutationDelete.mutate({id: rowSelected, token: user?.access_token},{
            onSettled: () =>{
                queryUser.refetch()
            }
        })
      }

  return (
    <div>
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader> 
      <div style={{margin: '20px'}}>
        <TableComponent handleDeleteMany= {handleDeleteManyUsers} columns= {columns} isPending= {isPendingUsers} data= {dataTable} onRow= {(record, rowIndex) =>{
            return {
                onClick: event =>{
                    setRowSelected(record._id)
                } 
            };
        }}/>
      </div>
    </div>

      <DrawerComponent title='Thông tin người dùng' isOpen={isOpenDrawer} onClose ={() => setIsOpenDrawer(false)} width="50%">
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
        onFinish={onUpdateUser}
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
        <InputComponent value = { stateUserDetails.name} onChange = { handleOnChangeDetails} name = "name"/>
        </Form.Item>

        <Form.Item
        label="Email"
        name="email"
        rules={[
            {
            required: true,
            message: 'Please input your email!',
            },
        ]}
        >
        <InputComponent value = { stateUserDetails.email} onChange = { handleOnChangeDetails} name = "email"/>
        </Form.Item>

        <Form.Item
        label="Phone"
        name="phone"
        rules={[
            {
            required: true,
            message: 'Please input your phone!',
            },
        ]}
        >
        <InputComponent value = { stateUserDetails.phone} onChange = { handleOnChangeDetails} name = "phone"/>
        </Form.Item>

        <Form.Item
        label="Address"
        name="address"
        rules={[
            {
            required: true,
            message: 'Please input your address!',
            },
        ]}
        >
        <InputComponent value = { stateUserDetails.address} onChange = { handleOnChangeDetails} name = "address"/>
        </Form.Item>

        <Form.Item
        label="Avatar"
        name="avatar"
        rules={[
            {
            required: true,
            message: 'Please input your image!',
            },
        ]}
        >
        <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                    <Button >Select File</Button>
                    {stateUserDetails?.avatar && (
                    <img src={stateUserDetails?.avatar} style={{
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

      <ModalComponent forceRender title="Xóa người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser} >
        <Loading isPending={isPendingDeleted}>
            <div>Bạn chắc có muốn xóa tài khoản này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  )
}

export default AdminUser
