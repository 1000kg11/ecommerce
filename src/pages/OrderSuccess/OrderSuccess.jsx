import React, { useEffect, useMemo, useState } from 'react';
import { Lable, WrapperContainer, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperItemOrderInfo, WrapperValue } from './style';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/LoadingComponent/Loading';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';


const OrderSuccess = () => {
  
  const location = useLocation()
  const {state} = location



  return (
    <div style={{ background: '#f5f5f5', width: '100%', height: '100vh' }}>
      <Loading isPending={false}>
        <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
          <h3>Đơn hàng đặt thành công</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WrapperContainer>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức giao hàng</Lable>
                    <WrapperValue>
                    <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderContant.delivery[state?.delivery]} </span>Giao hàng tiết kiệm
                    </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức thanh toán</Lable>
                  <WrapperValue>
                  {orderContant.payment[state?.payment]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperItemOrderInfo>
                {state?.orders?.map((order) =>{
                  return (
                    <WrapperItemOrder key={order?.name}>
                              <div style={{width: '500px', display: 'flex', alignItems: 'center'}}>
                                <img src={order.image} style={{width: '77px', height: '79px',objectFit: 'cover'}}/>
                                <div style={{
                                  width: '260px',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}>{order?.name} </div>
                              </div>
                              <div style={{flex: 1, display: 'flex', alignItems: 'center', gap:'20px'}}>
                                <span>
                                  <span style={{fontSize: '13px', color: '#242424'}}>Giá tiền: {convertPrice(order?.price)}</span>
                                </span>
                                <span>
                                  <span style={{fontSize: '13px', color: '#242424'}}>Số lượng: {convertPrice(order?.amount)}</span>
                                </span>
                              </div>
                  </WrapperItemOrder>
                  )
                })}
              </WrapperItemOrderInfo>
              <div>
                  <span style={{fontSize: '16px', color: 'red'}}>Tổng tiền: {convertPrice(state?.totalPriceMemo)}</span>
              </div>
            </WrapperContainer>
          </div>
        </div>
      </Loading>
    </div>
  );
};
export default OrderSuccess;
