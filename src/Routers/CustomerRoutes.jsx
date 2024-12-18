import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "../customer/page/homepage/Home"
import Cart from "../customer/components/Cart/Cart"
import Navigation from '../customer/components/navigation/Navigation'
import Footer from '../customer/components/Footer/Footer'
import Product from "../customer/components/Product/Product"
import Checkout from "../customer/components/Checkout/Checkout"
import ProductDetails from "../customer/components/ProductDetails/ProductDetails"
import OrderDetails from '../customer/components/Order/OrderDetails'
import Order from "../customer/components/Order/Order"
import PaymentSuccess from '../customer/components/Payment/PaymentSuccess'
import CashOnDelivery from '../customer/components/Payment/CashOnDelivery'
import Profile from '../customer/Auth/Profile'
import CompanyDetails from '../customer/components/navigation/CompanyDetails'
import SearchData from '../customer/components/navigation/SearchData'

const CustomerRoutes = () => {
    return (
        <div>
            <div>
                <Navigation />
            </div>
            <Routes>
                <Route path='/login' element={<Home/>}/>
                <Route path='/register' element={<Home/>} />
                <Route path='/account/profile' element={<Profile/>}/>
                <Route path="/" element={<Home />}></Route>
                <Route path="/company" element={<CompanyDetails />}></Route>
                <Route path="/search-data" element={<SearchData />} />
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/:levelOne/:levelTwo/:levelThree" element={<Product/>}/>
                <Route path='/product/:productId' element={<ProductDetails/>}/>
                <Route path='/checkout' element={<Checkout/>}/>                
                <Route path='/account/order' element={<Order/>}/>
                <Route path='/account/order/:orderId' element={<OrderDetails/>}/>            
                <Route path='/payment/:orderId' element={<PaymentSuccess/>} />
                <Route path='/cash-on-delivery/:orderId' element={<CashOnDelivery/>} />
            </Routes>                       
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default CustomerRoutes
