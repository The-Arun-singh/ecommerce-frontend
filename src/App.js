// importing all the required modules

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';


import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import AllProducts from './pages/products/AllProducts';
import ContactUs from './pages/ContactUs';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Cart from './pages/cart/Cart';
import Product from './pages/products/Product';
import Shipping from './pages/cart/Shipping';
import Payment from './pages/cart/Payment';
import PlaceOrder from './pages/cart/PlaceOrder';
import MyProfile from './pages/users/MyProfile';
import ManageUsers from './pages/users/ManageUsers';
import OrderHistory from './pages/orders/OrderHistory';
import ManageOrders from './pages/orders/ManageOrders';
import ManageProducts from './pages/products/ManageProducts';
import ProductCategory from './pages/products/ProductCategory';
import CategoryAllProducts from './pages/products/CategoryAllProducts';
import EditProduct from './components/EditProduct';
import { ToastContainer, toast } from 'react-toastify';
import Order from './pages/orders/Order';


// using functions from react-router-dom for the routing
function App() {

  const DynamicRouter = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      // const authToken = JSON.stringify(localStorage.getItem('token'));
      const authToken = localStorage.getItem('token');
      // console.log(localStorage.getItem('token'));

      if (authToken !== null && authToken !== undefined) {
        const userData = JSON.parse(localStorage.getItem('user'));
        dispatch({ type: 'LOGIN', payload: userData });
        navigate('/');
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: 'LOGOUT' });
        navigate("/login");
        toast.error("User logged out");
      }
    }, [])

    return (<>
      <Routes>
        <Route path={'/'} element={<Home />} />

        <Route path={'/allproducts'} element={<AllProducts />} />
        <Route path={'/products/:for'} element={<CategoryAllProducts />} />
        <Route path={'/products/:for/:type'} element={<ProductCategory />} />
        <Route path={'/product/:id'} element={<Product />} />

        <Route path={'/contactus'} element={<ContactUs />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/signup'} element={<Signup />} />
        <Route path={'/cart'} element={<Cart />} />
        <Route path={'/shipping'} element={<Shipping />} />
        <Route path={'/payment'} element={<Payment />} />
        <Route path={'/placeorder/:paymentmethod'} element={<PlaceOrder />} />

        <Route path={'/order/:id'} element={<Order />} />
        <Route path={'/orderhistory'} element={<OrderHistory />} />
        <Route path={'/manageorders'} element={<ManageOrders />} />
        <Route path={'/myprofile'} element={<MyProfile />} />
        <Route path={'/manageusers'} element={<ManageUsers />} />
        <Route path={'/manageproducts'} element={<ManageProducts />} />
        <Route path={'/editproduct/:id'} element={<EditProduct />} />
      </Routes>
    </>)
  };



  return (
    <div className=" App">
      <Router>
        <ToastContainer />
        <Header />
        <DynamicRouter />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
