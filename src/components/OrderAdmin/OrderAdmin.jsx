import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import ModalComponent from '../ModalComponent/ModalComponent'
import Loading from '../LoadingComponent/Loading'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as message from '../Message/Message'
import * as OrderService from '../../services/OrderService'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { convertPrice, getBase64 } from '../../utils'
import { orderContant } from '../../contant';
import PieChartComponent from './PieChart'
const OrderAdmin = () => {
    const [rowSelected, setRowSelected] = useState(null)
    const user = useSelector((state) => state?.user)
    
    const getAllOrder  = async() => {
        const res = await OrderService.getAllOrder(user?.access_token)
        return res
    }

    const queryOrder = useQuery({queryKey: ['orders'], queryFn: getAllOrder})
    const { isPending : isPendingOrder, data: orders} = queryOrder
  
   
    
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div
            style={{
              padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <InputComponent
              // ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                // onClick={() => clearFilters && handleReset(clearFilters)}
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
            // setTimeout(() => searchInput.current?.select(), 100);
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
          title: 'User Name',
          dataIndex: 'userName',
          sorter: (a,b) => a.userName.length - b.userName.length,
          ...getColumnSearchProps('userName')
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          sorter: (a,b) => a.phone - b.phone,
          ...getColumnSearchProps('phone')
        },
        {
          title: 'Address',
          dataIndex: 'address',
          sorter: (a,b) => a.address.length - b.address.length,
          ...getColumnSearchProps('address')
        },
        {
          title: 'Paided',
          dataIndex: 'isPaid',
          sorter: (a,b) => a.isPaid.length - b.isPaid.length,
          ...getColumnSearchProps('isPaid')
        },
        {
          title: 'Shipped',
          dataIndex: 'isDelivered',
          sorter: (a,b) => a.isDelivered.length - b.isDelivered.length,
          ...getColumnSearchProps('isDelivered')
        },
        {
          title: 'Payment method',
          dataIndex: 'paymentMethod',
          sorter: (a,b) => a.paymentMethod.length - b.paymentMethod.length,
          ...getColumnSearchProps('paymentMethod')
        },
        {
          title: 'Total Price',
          dataIndex: 'totalPrice',
          sorter: (a,b) => a.totalPrice.length - b.totalPrice.length,
          ...getColumnSearchProps('totalPrice')
        },
        
      ];
      const dataTable = orders?.data?.length && orders?.data?.map((order) =>{
         console.log('useras', order)
        return {...user, key: order._id, userName: order?.shippingAddress?.fullName, phone: order?.shippingAddress?.phone,
           address: order?.shippingAddress?.address, paymentMethod: orderContant.payment[order?.paymentMethod], isPaid: order?.isPaid ? 'TRUE' : 'FALSE',
           isDelivered: order?.isDelivered ? 'TRUE' : 'FALSE', totalPrice: convertPrice(order?.totalPrice)
          }
      })

  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader> 
      {/* <div style={{height: '200px', width: '300px'}}>
      <PieChartComponent data={orders?.data} />
      </div> */}
      
      <div style={{margin: '20px'}}>
        <TableComponent  columns= {columns} isPending= {isPendingOrder} data= {dataTable} />
      </div>
    </div>  
  )
}

export default OrderAdmin
