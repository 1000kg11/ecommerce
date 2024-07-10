import AdminPage from "../pages/AdminPage/AdminPage";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
import HomePage from "../pages/HomePage/HomePage";
import MyOrderPage from "../pages/MyOrder/MyOrder";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProfilePage from "../pages/Profile/Profile";
import SingInPage from "../pages/SingInPage/SingInPage";
import SingUpPage from "../pages/SingUpPage/SingUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";

export const routes =[
    {
        path:'/'  ,
        page: HomePage,
        isShowHeader: true
    },
    {
        path:'/order'  ,
        page: OrderPage,
        isShowHeader: true
    },
    {
        path:'/details-order/:id'  ,
        page: DetailsOrderPage,
        isShowHeader: true
    },
    {
        path:'/my-order'  ,
        page: MyOrderPage,
        isShowHeader: true
    },
    {
        path:'/payment'  ,
        page: PaymentPage,
        isShowHeader: true
    },
    {
        path:'/orderSuccess'  ,
        page: OrderSuccess,
        isShowHeader: true
    },
    {
        path:'/products'  ,
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path:'product/:type'  ,
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path:'/sign-in',
        page: SingInPage,
        isShowHeader: false
    },
    {
        path:'/sign-up',
        page: SingUpPage,
        isShowHeader: false
    },
    {
        path:'/product-details/:id',
        page: ProductDetailsPage,
        isShowHeader: true
    },
    {
        path:'/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path:'/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },

    {
        path: '*',
        page: NotFoundPage
    }

]