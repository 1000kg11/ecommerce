import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
// import { useEffect } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { isJsonString } from './utils'
import * as UserService from './services/UserService'
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from './redux/slides/userSlide'
import Loading from './components/LoadingComponent/Loading'

 function App() {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false)
  const user = useSelector((state) => state.user)
  useEffect (() =>{
  setIsPending(true)
    const {storageData, decoded} = handleDecoded()
        if(decoded?.id){
          handleGetDetailsUser(decoded?.id, storageData)
      }
      setIsPending(false);
  }, [])

  const handleDecoded = () =>{
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData)){
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
      return {decoded, storageData}
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    // Do something before request is sent
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    if ( decoded?.exp < currentTime.getTime() / 1000){
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  },  (err) => {
    return Promise.reject(err);
  })
  
  const handleGetDetailsUser = async(id, token) =>{
    try {
      const res = await UserService.getDetailsUser(id, token);
      dispatch(updateUser({ ...res?.data, access_token: token }));

    } catch (error) {
      console.error('Error fetching user details:', error);

    }
  }

  // useEffect(() =>{
  //   fetchApi()
  // }, [])
  console.log('process.env.REACT_API_URL_BACKEND', process.env.REACT_API_URL_BACKEND)
  const fetchApi = async () =>{
    const res = await axios.get(`http://localhost:3000/api/product/get-all`)
    return res.data
  }

  const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  return (
    <div style={{height: '100vh', width: '100%'}}>
      <Loading isPending= {isPending}>
      <Router>
        <Routes>
          {routes.map((route)=>{
            const Page = route.page
            const isCheckAuth = !route.isPrivate || (user && user.isAdmin);
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            if (!isCheckAuth) {
              // Skip rendering this route if not authorized
              return null;
            }
            return(
              <Route key={route.path} path={  route.path} element={
              <Layout>
                <Page/>
              </Layout>
              }/>
            )
          })}
        </Routes>
      </Router>
      </Loading>
    </div>
  )
}

export default App