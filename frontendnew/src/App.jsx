import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import NewProducts from './pages/NewProducts'
import BestDeal from './pages/BestDeal'
import Blog from './pages/Blog'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Demo from './components/Demo'
import Checkout from './components/Checkout'
import { Routes, Route } from 'react-router-dom'
import ProductDetail from './components/ProductDetail'
import { useLocation } from 'react-router-dom'
import CartPage from './components/CartPage'
import PlaceOrderPage from './components/PlaceOrderPage'
import { useCart } from './context/CartContext'
import WishlistPage from "./pages/WishlistPage";
import Login from './components/Login'
import ProductsPage from './pages/ProductsPage';
import AddProduct from './pages/AddProduct';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import OrderSuccess from './components/OrderSuccess'
import MyOrders from './components/MyOrders'



// A JSX file is basically a JavaScript file, but it allows you to write HTML inside JavaScript.
function App() {
  const location = useLocation()

  const hideLayoutPages = ["/checkout", "/login"];
  const hideNavbarFooter = hideLayoutPages.includes(location.pathname);

  const { isCartOpen } = useCart();
  return (
    <div className="overflow-x-hidden">
      {/* importing navbar->because App.jsx is the main component that displays everything on the screen, so importing Navbar.jsx makes the navbar appear in your actual UI. */}
      {!hideNavbarFooter && <Navbar />}

      {/* routing */}

      <Routes>

        {/* home page */}

        <Route path='/' element={<Home />} />

        {/* shop page */}

        <Route path='/shop' element={<Shop />} />
        <Route path='/products' element={<ProductsPage />} />


        <Route path='/product/:id' element={<ProductDetail />} />

        <Route path="/" element={<Demo />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* new products */}

        <Route path='/newproducts' element={<NewProducts />} />


        <Route path='/bestdeals' element={<BestDeal />} />

        <Route path='/blog' element={<Blog />} />

        <Route path='/about' element={<AboutUs />} />

        <Route path='/contacts' element={<ContactUs />} />

        <Route path='/cart' element={<CartPage />} />

        <Route path='/place-order' element={<PlaceOrderPage />} />

        <Route path="/wishlist" element={<WishlistPage />} />

        <Route path='/login' element={<Login />} />

        <Route path="/add-product" element={<AddProduct />} />

      <Route path="/order-success/:id" element={<OrderSuccess />} />

      <Route path='/my-order' element={<MyOrders/>}/>
      

      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />

     {!hideNavbarFooter && <Footer />}

    </div>
  )
}

export default App