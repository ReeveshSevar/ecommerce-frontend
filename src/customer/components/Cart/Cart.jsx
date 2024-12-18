import React, { useEffect } from "react"
import CartItem from "./CartItem"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getCart } from "../../../State/Cart/Action"
import './CartEmptyMessage.css';


const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { cart } = useSelector((store) => store);

    const totalAmount = cart.cart?.totalDiscountedPrice

    const isDeliveryFree = totalAmount > 1000;
    const deliveryCharge = isDeliveryFree ? 0 : 80;

    const handleCheckout = () => {
        navigate("/checkout?step=2")
    }

    const handleEmptyCart = () => {
        navigate("/")
    }

    useEffect(() => {
        dispatch(getCart())
    }, [cart.updateCartItem, cart.deleteCartItem, cart.removed, cart.added])


    const item_cart = cart.cart?.cartItems;

    if (!item_cart || item_cart.length === 0) {
        return (
            <div className="cart-empty-message">
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added anything to your cart yet. Start shopping and add products to your cart!</p>
                <button className="shop-now-btn" onClick={handleEmptyCart}>Start Shopping</button>
            </div>
        );
    }

    return (
        <div>
            <div className="lg:grid grid-cols-3 lg:px-5 relative">
                <div className="col-span-2">
                    {cart.cart?.cartItems.map((item) => <CartItem item={item} />)}
                </div>
                <div className="px-5 py-4 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
                    <div className="border px-5">
                        <p className="uppercase font-bold opacity-60 pb-4">Price Details</p>
                        <hr />
                        <div className="space-y-3 font-semibold mb-10">
                            <div className="flex justify-between pt-3 text-black">
                                <span>Price</span>
                                <span className="line-through">₹{cart.cart?.totalPrice}</span>
                            </div>
                            <div className="flex justify-between pt-3">
                                <span>Discount</span>
                                <span className=" text-green-600">-{cart.cart?.discount}</span>
                            </div>
                            <div className="flex justify-between pt-3">
                                <span>Delivery Charge</span>
                                <span className=" text-green-600">{deliveryCharge}</span>
                            </div>
                            <div className="flex justify-between pt-3 font-bold">
                                <span>Total Amount</span>
                                <span className="text-green-600">₹{cart.cart?.totalDiscountedPrice + deliveryCharge}</span>
                            </div>
                        </div>
                        <Button onClick={handleCheckout} variant='contained' className="mt-5 w-full " sx={{ px: '2.5rem', py: '.7rem', bgcolor: '#9155fd' }}>
                            Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart