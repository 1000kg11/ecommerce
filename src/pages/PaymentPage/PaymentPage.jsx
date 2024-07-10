// import React, { useEffect, useMemo, useState } from 'react'
// import { Lable, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperPriceDiscount, WrapperRadio, WrapperRight, WrapperStyleHeader, WrapperTotal } from './style';
// import { Button, Checkbox, Form, Radio } from 'antd';
// import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
// import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style';
// import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
// import imag from '../../assets/images/test.jpg'
// import { useDispatch, useSelector } from 'react-redux';
// import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slides/orderSlide';
// import { convertPrice } from '../../utils';
// import ModalComponent from '../../components/ModalComponent/ModalComponent'
// import { WrapperUploadFile } from '../../components/AdminUser/style';
// import InputComponent from '../../components/InputComponent/InputComponent';
// import { useMutationHooks } from '../../hooks/useMutationHook';
// import * as UserService from '../../services/UserService'
// import Loading from '../../components/LoadingComponent/Loading';
// import * as message from '../../components/Message/Message'
// import { updateUser } from '../../redux/slides/userSlide';
// import * as OrderService from '../../services/OrderService'
// const PaymentPage = () => {
//   const order = useSelector((state) => state.order)
//   const user = useSelector((state) => state.user)

//   const [payment, setPayment] = useState('later_money')
//   const [delivery, setDelivery] = useState('fast')

//   // const [listChecked, setListChecked] = useState([])
//   const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
//   const [stateUserDetails, setStateUserDetails] = useState({
//     name: '',
//     phone: '',
//     city: '',
//     address: ''
//   })
//   const [form] = Form.useForm();
//   const dispatch = useDispatch()
//   // const onChange = (e) =>{
//   //   console.log(`checked = ${e.target.value}`);
//   //   if(listChecked.includes(e.target.value)){
//   //     const newListChecked = listChecked.filter((item) => item !== e.target.value)
//   //     setListChecked(newListChecked)
//   //   }else{
//   //     setListChecked([...listChecked, e.target.value])
//   //   }
//   // };

// useEffect(() =>{
//   form.setFieldsValue(stateUserDetails)
// }, [form, stateUserDetails])

// useEffect(() =>{
//   if(isOpenModalUpdateInfo){
//     setStateUserDetails({
//       city: user?.city,
//       name: user?.name,
//       address: user?.address,
//       phone: user?.phone
//     })

//   }
// }, [isOpenModalUpdateInfo])

// const handleChangeAddress =() =>{
//   setIsOpenModalUpdateInfo(true)
// }

// const priceMemo = useMemo(() =>{
//   const result = order?.orderItemsSelected?.reduce((total, cur) => {
//     return total + ((cur.price * cur.amount))
//   }, 0)
//   return result
// }, [order])

// const priceDiscountMemo = useMemo(() =>{
//   const result = order?.orderItemsSelected?.reduce((total, cur) => {
//     return total + ((cur.discount * cur.amount))
//   }, 0)
//   if(Number(result)){
//     return result
//   } 
//   return 0
// }, [order])

// const deliveryPriceMemo = useMemo(() =>{
//   if(priceMemo > 200000){
//     return 10000
//   } else if( priceMemo === 0){
//     return 0
//   }else{
//     return 20000
//   }
// }, [priceMemo])

// const totalPriceMemo = useMemo(() =>{
//   return Number(priceMemo) - Number(priceDiscountMemo) + Number(deliveryPriceMemo)
// }, [priceMemo, priceDiscountMemo, deliveryPriceMemo])

// const handleAddOrder = () =>{ 
//   if(user?.access_token && order?.orderItemsSelected && user?.name 
//     && user?.address && user?.phone && user?.city && user?.priceMemo && user?.id) {
//     mutationAddOrder.mutate(
//       {
//         token: user?.access_token,
//         orderItems: order?.orderItemsSelected,
//         fullName: user?.name,
//         address: user?.address,
//         phone: user?.phone,
//         city: user?.city,
//         paymentMethod: payment,
//         itemsPrice: priceMemo,
//         shippingPrice: deliveryPriceMemo,
//         totalPrice: totalPriceMemo,
//         user: user?.id
//       }
//     )
//   }
  
// }

// const mutationUpdate = useMutationHooks(
//   (data) => {
//       const {
//       id,
//       token,
//       ...rests } = data
// const res = UserService.updateUser(
//      id, 
//      { ...rests},
//      token,
//      )
//   return res
//   },
// )

// const mutationAddOrder = useMutationHooks(
//   (data) => {
//       const {
//       token,
//       ...rests } = data
// const res = OrderService.createOrder(
//      { ...rests},
//      token,
//      )
//   return res
//   },
// )
// const {isPending, data} = mutationUpdate

// const {data: dataAdd, isPending: isPendingAddOrder, isSuccess, isError} = mutationAddOrder
// console.log('dataAdd', dataAdd)


// const handleCancelUpdate = () =>{
//   setStateUserDetails({
//     name: '',
//     phone: '',
//     email: '',
//     isAdmin: false,
    
//   })
//   form.resetFields()
//   setIsOpenModalUpdateInfo(false)
// }

// useEffect(() =>{
//   if(isSuccess && dataAdd?.status === 'OK'){
//     message.success('Đặt hàng thành công')
//   } else if(isError){
//     message.error()
//   }
// }, [isSuccess, isError])

// const handleUpdateInfoUser = () =>{
//   const { name, address, city, phone} = stateUserDetails
//   if(name && address && city && phone ) {
//     mutationUpdate.mutate({id: user?.id, token: user?.access_token, ...stateUserDetails}, {
//       onSuccess: () =>{
//         dispatch(updateUser({name, address, phone, city}))
//         setIsOpenModalUpdateInfo(false)
//       }
//     })
//   }
// }

// const handleOnChangeDetails = (e) =>{
//   setStateUserDetails({
//       ...stateUserDetails,
//       [e.target.name]: e.target.value
//   })
// }

// const handleDelivery = (e) =>{
//   setDelivery(e.target.value)
// }

// const handlePayment =(e) =>{
//   setPayment(e.target.value)
// }

//   return (
//     <div style={{background: '#f5f5f5', width: '100%', height: '100vh'}}>
//       <Loading isPending={isPendingAddOrder}>
//        <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
//         <h3>Thanh toán</h3>
//         <div style={{display: 'flex', justifyContent: 'center'}}>
//           <WrapperLeft>
//             <WrapperInfo>
//               <div>
//                 <Lable>chọn phương thức giao hàng</Lable>
//                 <WrapperRadio onChange={handleDelivery} value={delivery}>
//                   <Radio value="fast"><span style={{color: '#ea8500', fontWeight: 'bold'}}>Fast</span>Giao hàng tiết kiệm</Radio>
//                   <Radio value="gojek"><span style={{color: '#ea8500', fontWeight: 'bold'}}>Go_JEk</span>Giao hàng tiết kiệm</Radio>
//                 </WrapperRadio>
//               </div>
//             </WrapperInfo>
//             <WrapperInfo>
//               <div>
//                 <Lable>Chọn phương thức thanh toán</Lable>
//                 <WrapperRadio onChange={handlePayment} value= {payment}>
//                   <Radio value="later_money">Thanh toán tiền mặt khi nhận tiền </Radio>
//                 </WrapperRadio>
//               </div>
//             </WrapperInfo>
//           </WrapperLeft>
//           <WrapperRight>
//             <div style={{width: '100%'}}>
//               <WrapperInfo>
//                 <div>
//                   <span>Địa chỉ: </span>
//                   <span style= {{color: '#000'}}>{`${user?.address} ${user?.city}`}</span>
//                   <span onClick={handleChangeAddress} style= {{color: 'blue', cursor: 'pointer'}}> Thay đổi</span>
//                 </div>
//               </WrapperInfo>
//               <WrapperInfo>
//                 <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
//                   <span>Tạm tính</span>
//                   <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(priceMemo)}</span>
//                 </div>
//                 <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
//                   <span>giảm giá</span>
//                   <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{`${priceDiscountMemo} %`}</span>
//                   </div>
//                 <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
//                   <span>Phí giao hàng</span>
//                   <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(deliveryPriceMemo)}</span>
//                 </div>
//               </WrapperInfo>
//               <WrapperTotal>
//                 <span>Tổng tiền</span>
//                 <span style={{display: 'flex', flexDirection: 'column'}}>
//                   <span style={{color: 'rgb(254, 56, 52', fontSize: '24px', fontWeight: 'bold'}}>{convertPrice(totalPriceMemo)}</span>
//                   <span style={{color: '#000', fontSize: '11px'}}>(Đã bao gồm  VAT nếu có)</span>
//                 </span>
//               </WrapperTotal>
//             </div>
//             <ButtonComponent 
//               onClick={() => handleAddOrder()}
//               size={40}
//               styleButton={{
//                 background: 'rgb(255, 57, 69',
//                 height: '48px',
//                 width: '320px',
//                 border: 'none',
//                 borderRadius: '4px'
//               }}
//               textButton={'Đặt hàng'}
//               styleTextButton={{color: '#fff', fontSize: '15px', fontWeight: '15px'}}
//             >
//             </ButtonComponent>
//           </WrapperRight>
//         </div>
//        </div>
       
//        <ModalComponent title = 'Cập nhật thông tin giao hàng' open={isOpenModalUpdateInfo} onCancel = {handleCancelUpdate} onOk ={handleUpdateInfoUser}>
//        <Loading isPending={isPending}>
//        <Form
//         name="basic"
//         labelCol={{
//         span: 4,
//         }}
//         wrapperCol={{
//         span: 20,
//         }}
//         style={{
//         maxWidth: 600,
//         }}
//         // onFinish={onUpdateUser}
//         autoComplete="on"
//         form = {form}
//     >
//         <Form.Item
//         label="Name"
//         name="name"
//         rules={[
//             {
//             required: true,
//             message: 'Please input your name!',
//             },
//         ]}
//         >
//         <InputComponent value = { stateUserDetails.name} onChange = { handleOnChangeDetails} name = "name"/>
//         </Form.Item>

//         <Form.Item
//         label="Phone"
//         name="phone"
//         rules={[
//             {
//             required: true,
//             message: 'Please input your phone!',
//             },
//         ]}
//         >
//         <InputComponent value = { stateUserDetails.phone} onChange = { handleOnChangeDetails} name = "phone"/>
//         </Form.Item>

//         <Form.Item
//         label="City"
//         name="city"
//         rules={[
//             {
//             required: true,
//             message: 'Please input your city!',
//             },
//         ]}
//         >
//         <InputComponent value = { stateUserDetails.city} onChange = { handleOnChangeDetails} name = "city"/>
//         </Form.Item>

//         <Form.Item
//         label="Address"
//         name="address"
//         rules={[
//             {
//             required: true,
//             message: 'Please input your address!',
//             },
//         ]}
//         >
//         <InputComponent value = { stateUserDetails.address} onChange = { handleOnChangeDetails} name = "address"/>
//         </Form.Item>

//         </Form>
//         </Loading>
//         </ModalComponent>
//         </Loading>
//     </div>
//   )
// }
// export default PaymentPage
import React, { useEffect, useMemo, useState } from 'react';
import { Lable, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperPriceDiscount, WrapperRadio, WrapperRight, WrapperStyleHeader, WrapperTotal } from './style';
import { Button, Checkbox, Form, Radio } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import imag from '../../assets/images/test.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import { WrapperUploadFile } from '../../components/AdminUser/style';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message';
import { updateUser } from '../../redux/slides/userSlide';
import * as OrderService from '../../services/OrderService';
import { useNavigate } from 'react-router-dom';
import { PayPalButton } from "react-paypal-button-v2";
import * as PaymentService from '../../services/PaymentService'

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate()
  const [payment, setPayment] = useState('later_money');
  const [delivery, setDelivery] = useState('fast');
  const [sdkReady, setSdkReady] = useState(false)

  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    city: '',
    address: ''
  });
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone
      });
    }
  }, [isOpenModalUpdateInfo, user]);

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + (cur.price * cur.amount);
    }, 0);
    return result;
  }, [order]);

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + (cur.discount * cur.amount);
    }, 0);
    if (Number(result)) {
      return result;
    }
    return 0;
  }, [order]);

  const deliveryPriceMemo = useMemo(() => {
    if (priceMemo > 200000) {
      return 10000;
    } else if (priceMemo === 0) {
      return 0;
    } else {
      return 20000;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(priceDiscountMemo) + Number(deliveryPriceMemo);
  }, [priceMemo, priceDiscountMemo, deliveryPriceMemo]);

 
  const handleAddOrder = () => {
    if (user?.access_token && order?.orderItemsSelected && user?.name && user?.address && user?.phone && user?.city) {
        const orderData = {
            token: user?.access_token,
            orderItems: order?.orderItemsSelected,
            fullName: user?.name,
            address: user?.address,
            phone: user?.phone,
            city: user?.city,
            paymentMethod: payment,
            itemsPrice: priceMemo,
            shippingPrice: deliveryPriceMemo,
            totalPrice: totalPriceMemo,
            user: user?.id,
            email: user?.email
        };

        mutationAddOrder.mutate(orderData);
    }
};

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    const res = OrderService.createOrder({ ...rests }, token);
    return res;
  });

  const { isPending, data } = mutationUpdate;

  const { data: dataAdd, isPending: isPendingAddOrder, isSuccess, isError } = mutationAddOrder;


  const handleCancelUpdate = () => {
    setStateUserDetails({
      name: '',
      phone: '',
      email: '',
      isAdmin: false,
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false);
  };

  useEffect(() => {
    if (isSuccess && dataAdd?.status === 'OK') {
      const arrayOrdered = []
      order?.orderItemsSelected?.forEach(element =>{
        arrayOrdered.push(element.product)
      });
      dispatch(removeAllOrderProduct({listChecked: arrayOrdered}))
      message.success('Đặt hàng thành công')
      navigate('/orderSuccess', {
        state: {
          totalPriceMemo: totalPriceMemo ,
          delivery,
          payment,
          orders: order?.orderItemsSelected,
          
        }
      })
    } else if (isError) {
      message.error('Đặt hàng thất bại');
    }
  }, [isSuccess, isError, dataAdd]);

  const handleUpdateInfoUser = () => {
    const { name, address, city, phone } = stateUserDetails;
    if (name && address && city && phone) {
      mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
        onSuccess: () => {
          dispatch(updateUser({ name, address, phone, city }));
          setIsOpenModalUpdateInfo(false);
        }
      });
    }
  };

  const onSuccessPaypal =(details, data)=>{
    const orderDataa = {
      token: user?.access_token,
      orderItems: order?.orderItemsSelected,
      fullName: user?.name,
      address: user?.address,
      phone: user?.phone,
      city: user?.city,
      paymentMethod: payment,
      itemsPrice: priceMemo,
      shippingPrice: deliveryPriceMemo,
      totalPrice: totalPriceMemo,
      user: user?.id,
      isPaid: true,
      paidAt: details.update_time,
      email: user?.email
  };

  mutationAddOrder.mutate(orderDataa);
  }

  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleDelivery = (e) => {
    setDelivery(e.target.value);
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

const addPaypalScript = async () =>{
  const {data} = await PaymentService.getConfig()
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
  script.async = true;
  script.onload = () =>{
    setSdkReady(true)
  }
  document.body.appendChild(script)
}

useEffect(()=>{
  if(!window.paypal){
    addPaypalScript()
  } else{
    setSdkReady(true)
  }
  
},[]) 

  return (
    <div style={{ background: '#f5f5f5', width: '100%', height: '100vh' }}>
      <Loading isPending={isPendingAddOrder}>
        <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
          <h3>Thanh toán</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WrapperLeft>
              <WrapperInfo>
                <div>
                  <Lable>chọn phương thức giao hàng</Lable>
                  <WrapperRadio onChange={handleDelivery} value={delivery}>
                    <Radio value="fast"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>Fast</span>Giao hàng tiết kiệm</Radio>
                    <Radio value="gojek"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>Go_JEk</span>Giao hàng tiết kiệm</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Chọn phương thức thanh toán</Lable>
                  <WrapperRadio onChange={handlePayment} value={payment}>
                    <Radio value="later_money">Thanh toán tiền mặt khi nhận hàng </Radio>
                    <Radio value="paypal">Thanh toán bằng paypal </Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
            </WrapperLeft>
            <WrapperRight>
              <div style={{ width: '100%' }}>
                <WrapperInfo>
                  <div>
                    <span>Địa chỉ: </span>
                    <span style={{ color: '#000' }}>{`${user?.address} ${user?.city}`}</span>
                    <span onClick={handleChangeAddress} style={{ color: 'blue', cursor: 'pointer' }}> Thay đổi</span>
                  </div>
                </WrapperInfo>
                <WrapperInfo>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Tạm tính</span>
                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>giảm giá</span>
                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{`${priceDiscountMemo} %`}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Phí giao hàng</span>
                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(deliveryPriceMemo)}</span>
                  </div>
                </WrapperInfo>
                <WrapperTotal>
                  <span>Tổng tiền</span>
                  <span style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPriceMemo)}</span>
                    <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                  </span>
                </WrapperTotal>
              </div>
              {payment === 'paypal' && sdkReady ? ( 
                <div style={{width: '320px'}}>
                  <PayPalButton
                  amount={Math.round(totalPriceMemo / 30000)}
                  // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                  // onSuccess={(details, data) => {
                  //   alert("Transaction completed by " + details.payer.name.given_name);
          
                  //   // OPTIONAL: Call your server to save the transaction
                  //   return fetch("/paypal-transaction-complete", {
                  //     method: "post",
                  //     body: JSON.stringify({
                  //       orderID: data.orderID
                  //     })
                  //   });
                  // }}
                  onSuccess={onSuccessPaypal}
                  onError={() =>{
                    alert('Error')
                  }}
                />
                </div>
                  
              ) : (
                <ButtonComponent
                  onClick={() => handleAddOrder()}
                  size={40}
                  styleButton={{
                    background: 'rgb(255, 57, 69)',
                    height: '48px',
                    width: '320px',
                    border: 'none',
                    borderRadius: '4px'
                  }}
                  textButton={'Đặt hàng'}
                  styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '15px' }}
                />
              )}
              
            </WrapperRight>
          </div>
        </div>

        <ModalComponent title='Cập nhật thông tin giao hàng' open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInfoUser}>
          <Loading isPending={isPending}>
            <Form
              name="basic"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
              style={{
                maxWidth: 600,
              }}
              autoComplete="on"
              form={form}
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
                <InputComponent value={stateUserDetails.name} onChange={handleOnChangeDetails} name="name" />
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
                <InputComponent value={stateUserDetails.phone} onChange={handleOnChangeDetails} name="phone" />
              </Form.Item>

              <Form.Item
                label="City"
                name="city"
                rules={[
                  {
                    required: true,
                    message: 'Please input your city!',
                  },
                ]}
              >
                <InputComponent value={stateUserDetails.city} onChange={handleOnChangeDetails} name="city" />
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
                <InputComponent value={stateUserDetails.address} onChange={handleOnChangeDetails} name="address" />
              </Form.Item>
            </Form>
          </Loading>
        </ModalComponent>
      </Loading>
    </div>
  );
};
export default PaymentPage;
