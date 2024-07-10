// import React, { useEffect, useMemo, useState } from 'react'
// import { WrapperContainer, WrapperCountOrder, WrapperFooterItem, WrapperHeaderItem, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperPriceDiscount, WrapperRight, WrapperStatus, WrapperStyleHeader, WrapperStyleHeaderDelivery, WrapperTotal } from './style';
// import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
// import imag from '../../assets/images/test.jpg'
// import { useDispatch, useSelector } from 'react-redux';
// import { convertPrice } from '../../utils';
// import Loading from '../../components/LoadingComponent/Loading';
// import { useQuery } from '@tanstack/react-query';
// import * as OrderService from '../../services/OrderService';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useMutationHooks } from '../../hooks/useMutationHook'
// import { message } from 'antd';

// const MyOrderPage = () => {
//   const location = useLocation()
//   const {state} = location
//   const navigate = useNavigate()
//   const fetchMyOrder = async() => {
//     const res = await OrderService.getOrderbyUserId(state?.id, state?.token)
//     console.log('res', res)
//     return res.data
//   }
//   // const { isPending, data, error } = useQuery({
//   //   queryKey: ['users'],
//   //   queryFn: fetchMyOrder,
//   //   enabled: !!state?.id && !!state?.token,
//   // })
// const queryOrder = useQuery({
//     queryKey: ['users'],
//     queryFn: fetchMyOrder,
//     enabled: !!state?.id && !!state?.token,
//   })
//   const { isPending, data } = queryOrder

//   // const queryOrder = useQuery({queryKey: ['users'], queryFn: fetchMyOrder,
//   //   enabled: !!state?.id && !!state?.token
//   // })
//   // const [isPending, data] = queryOrder

//   const handleDetailsOrder = (id) =>{
//     navigate(`/details-order/${id}`, {
//       state: {
//         token: state?.token
//       }
//     })
//   }

//    const mutation = useMutationHooks(
//     (data) =>{
//       const {id, token} = data
//       const res = OrderService.cancelOrder(id, token)
//       return res
//     }
//    )

//   const handleCancelOrder = (id) =>{
//     mutation.mutate({id, token: state?.token}, {
//       onSuccess: {
//         queryOrder.refetch()
//       }
//     })
//   }

//   const {isPending: isPendingCancel, isSuccess: isSuccessCancel, isError: isErrorCancel, data: datacCancel} = mutation

//   useEffect(() =>{
//     if(isSuccessCancel && datacCancel?.status === 'OK'){
//       message.success()
//     } else if(isErrorCancel){
//       message.error()
//     }
//   }, [isSuccessCancel, isErrorCancel])
//   const renderProduct = (data) =>{
//    return data?.map((order) =>{
//       return (
//         <Loading isPending={isPending || isPendingCancel}>
//         <WrapperHeaderItem>
//                     <img src = {order?.image}
//                     style={{
//                       width: '70px',
//                       height: '70px',
//                       objectFit: 'cover',
//                       border: '1px solod rgb(238, 238, 238)',
//                       padding: '2px'
//                     }}
//                     />
//                     <div style={{
//                       width:260,
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       whiteSpace: 'nowrap', 
//                       marginLeft: '10px'
//                     }}>{order?.name}</div>
//                     <sapn style={{fontSize: '13px', color: '#242424', marginLeft: 'auto'}}>{convertPrice(order?.price)}</sapn>
//         </WrapperHeaderItem>
//         </Loading>
//       )
//     })
//   }
//   return (
//     <Loading isPending={isPending}>
//       <WrapperContainer>
//         <div style={{height: '100vh', width: '1270px', margin: '0 auto'}}>
//           <h4>Đơn hàng của tôi</h4>
//           <WrapperListOrder>
//             {data?.map((order) =>{
//               return (
//                 <WrapperItemOrder key={order?._id}>
//                   <WrapperStatus>
//                     <span style={{fontSize: '14px', fontWeight: 'bold'}}>Trạng thái </span>
//                     <div><sapn style={{color:'rgb(255,66, 78)'}}>Giao hàng: </sapn>{`${order.isDelivered ? 'đã giao hàng' : 'chưa giao hàng'}`}</div>
//                     <div><sapn style={{color:'rgb(255,66, 78)'}}>Thanh toán: </sapn>{`${order.isPad ? 'đã thanh toán' : 'chưa thanh toán'}`}</div>
//                   </WrapperStatus>
//                   {renderProduct(order?.orderItems)}
//                   <WrapperFooterItem>
//                     <div>
//                       <sapn style={{color: 'rgb(255, 66, 78'}}>Tổng tiền: </sapn>
//                       <span
//                         style={{fontSize: '13px', color: 'rgb(56, 56, 61', fontWeight:'700'}}
//                       >{convertPrice(order?.totalPrice)}</span>
//                     </div>
//                     <div style={{display: 'flex', gap: '10px'}}>
//                     <ButtonComponent
//                       onClick={() => handleCancelOrder(order?._id)}
//                       size={40}
//                       styleButton={{
//                         height: '36px',
//                         border: '1px solid rgb(11, 116, 229)',
//                         borderRadius: '4px'
//                       }}
//                       textButton={'Hủy đơn hàng'}
//                       styleTextButton={{color: 'rgb(11, 116, 229)', fontSize:'14px'}}
//                     ></ButtonComponent>
//                     <ButtonComponent
//                       onClick={() => handleDetailsOrder(order?._id)}
//                       size={40}
//                       styleButton={{
//                         height: '36px',
//                         border: '1px solid rgb(11, 116, 229)',
//                         borderRadius: '4px'
//                       }}
//                       textButton={'Xem chi tiết'}
//                       styleTextButton={{color: 'rgb(11, 116, 229)', fontSize:'14px'}}
//                     ></ButtonComponent>
//                     </div>
//                   </WrapperFooterItem>
//                 </WrapperItemOrder>
//               )
//             })}
//           </WrapperListOrder>
//         </div>
//       </WrapperContainer>
    
//     </Loading>
//   )
// }
// export default MyOrderPage

import React, { useEffect } from 'react';
import { WrapperContainer, WrapperCountOrder, WrapperFooterItem, WrapperHeaderItem, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperPriceDiscount, WrapperRight, WrapperStatus, WrapperStyleHeader, WrapperStyleHeaderDelivery, WrapperTotal } from './style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import imag from '../../assets/images/test.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { convertPrice } from '../../utils';
import Loading from '../../components/LoadingComponent/Loading';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as OrderService from '../../services/OrderService';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { message } from 'antd';

const MyOrderPage = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderbyUserId(state?.id, state?.token);
    console.log('res', res);
    return res.data;
  };

  const { isPending, data, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchMyOrder,
    enabled: !!state?.id && !!state?.token,
  });

  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        token: state?.token,
      },
    });
  };

  const mutation = useMutationHooks(
    (data) => {
      const { id, token, orderItems } = data;
      return OrderService.cancelOrder(id, token, orderItems);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    }
  );

  const handleCancelOrder = (order) => {
    mutation.mutate({ id: order._id, token: state?.token, orderItems: order?.orderItems });
  };

  const { isPending: isPendingCancel, isSuccess: isSuccessCancel, isError: isErrorCancel, data: dataCancel } = mutation;

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === 'OK') {
      message.success('Order cancelled successfully');
    } else if (isErrorCancel) {
      message.error('Failed to cancel order');
    }
  }, [isSuccessCancel, isErrorCancel, dataCancel]);

  const renderProduct = (data) => {
    return data?.map((order) => {
      return (
        <Loading key={order?._id} isPending={isPending || isPendingCancel}>
          <WrapperHeaderItem key={order?._id}>
            <img
              src={order?.image}
              style={{
                width: '70px',
                height: '70px',
                objectFit: 'cover',
                border: '1px solid rgb(238, 238, 238)',
                padding: '2px',
              }}
            />
            <div
              style={{
                width: 260,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                marginLeft: '10px',
              }}
            >
              {order?.name}
            </div>
            <span style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
          </WrapperHeaderItem>
        </Loading>
      );
    });
  };

  return (
    <Loading isPending={isPending || isPendingCancel}>
      <WrapperContainer>
        <div style={{ height: '100vh', width: '1270px', margin: '0 auto' }}>
          <h4>Đơn hàng của tôi</h4>
          <WrapperListOrder>
            {data?.map((order) => {
              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Trạng thái </span>
                    <div>
                      <span style={{ color: 'rgb(255,66, 78)' }}>Giao hàng: </span>
                      {`${order.isDelivered ? 'đã giao hàng' : 'chưa giao hàng'}`}
                    </div>
                    <div>
                      <span style={{ color: 'rgb(255,66, 78)' }}>Thanh toán: </span>
                      {`${order.isPaid ? 'đã thanh toán' : 'chưa thanh toán'}`}
                    </div>
                  </WrapperStatus>
                  {renderProduct(order?.orderItems)}
                  <WrapperFooterItem>
                    <div>
                      <span style={{ color: 'rgb(255, 66, 78)' }}>Tổng tiền: </span>
                      <span style={{ fontSize: '13px', color: 'rgb(56, 56, 61)', fontWeight: '700' }}>{convertPrice(order?.totalPrice)}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <ButtonComponent
                        onClick={() => handleCancelOrder(order)}
                        size={40}
                        styleButton={{
                          height: '36px',
                          border: '1px solid rgb(11, 116, 229)',
                          borderRadius: '4px',
                        }}
                        textButton={'Hủy đơn hàng'}
                        styleTextButton={{ color: 'rgb(11, 116, 229)', fontSize: '14px' }}
                      ></ButtonComponent>
                      <ButtonComponent
                        onClick={() => handleDetailsOrder(order?._id)}
                        size={40}
                        styleButton={{
                          height: '36px',
                          border: '1px solid rgb(11, 116, 229)',
                          borderRadius: '4px',
                        }}
                        textButton={'Xem chi tiết'}
                        styleTextButton={{ color: 'rgb(11, 116, 229)', fontSize: '14px' }}
                      ></ButtonComponent>
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              );
            })}
          </WrapperListOrder>
        </div>
      </WrapperContainer>
    </Loading>
  );
};

export default MyOrderPage;

