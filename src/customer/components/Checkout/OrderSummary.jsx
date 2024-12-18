import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography, Box, Paper } from '@mui/material';
import CartItem from "../Cart/CartItem";
import AddressCard from '../AddressCard/AddressCard';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrderById } from "../../../State/Order/Action";
import { createPayment } from '../../../State/Payment/Action';

const OrderSummary = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [paymentMethod, setPaymentMethod] = useState('online'); // Default to 'online'
    const { order } = useSelector((store) => store);
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get("order_id");

    const totalAmount = order.order?.totalDiscountedPrice || 0;
    const isDeliveryFree = totalAmount > 1000;
    const deliveryCharge = isDeliveryFree ? 0 : 80;

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value); // Update payment method based on selection
    };

    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [orderId, dispatch]);

    const handleCheckout = () => {
        if (paymentMethod === 'cod') {
            navigate(`/cash-on-delivery/${orderId}`);
        } else {
            dispatch(createPayment(orderId));
        }
    };

    return (
        <div className="p-4 mx-auto">
            <Paper elevation={3} sx={{ padding: 2, borderRadius: 3, backgroundColor: '#f7f7f7' }}>
                <AddressCard address={order.order?.shippingAddress} />
            </Paper>

            <div className="lg:grid grid-cols-3 gap-4 mt-4">
                <div className="col-span-2">
                    {order.order?.items.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>

                <Paper elevation={3} sx={{
                    backgroundColor: '#ffffff', // Light background color
                    color: 'black', // Dark text for contrast
                    padding: 3,
                    marginTop: 2,
                    borderRadius: 2,
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: '1.25rem', color: '#333' }}>
                        Price Details
                    </Typography>
                    <Box sx={{ borderBottom: 2, borderColor: '#ddd', opacity: 0.4, marginBottom: 2 }} />

                    <div className="space-y-4 font-semibold">
                        <div className="flex justify-between pt-2 text-gray-700">
                            <span>Price</span>
                            <span className="line-through text-gray-400">₹{order.order?.totalPrice}</span>
                        </div>
                        <div className="flex justify-between pt-2 text-green-500">
                            <span>Discount</span>
                            <span>-₹{order.order?.discount}</span>
                        </div>
                        <div className="flex justify-between pt-2 text-gray-700">
                            <span>Delivery Charge</span>
                            <span>{deliveryCharge ? `₹${deliveryCharge}` : 'Free'}</span>
                        </div>
                        <div className="flex justify-between pt-2 font-bold text-xl text-gray-900">
                            <span>Total Amount</span>
                            <span>₹{totalAmount + deliveryCharge}</span>
                        </div>
                    </div>

                    <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2 }}>
                        <InputLabel id="payment-method-label" sx={{ fontWeight: 'bold' }}>Payment Method</InputLabel>
                        <Select
                            labelId="payment-method-label"
                            value={paymentMethod}
                            onChange={handlePaymentMethodChange}
                            label="Payment Method"
                            sx={{
                                backgroundColor: '#fafafa', // Lighter background for the select dropdown
                                color: 'black',
                                borderRadius: 2,
                                '& .MuiSelect-icon': {
                                    color: 'black',
                                },
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1,
                                },
                            }}
                        >
                            <MenuItem value="online">Online Payment</MenuItem>
                            <MenuItem value="cod">Cash on Delivery</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        className="w-full mt-6 py-3"
                        sx={{
                            backgroundColor: '#FF5722', // Button color remains orange
                            '&:hover': { backgroundColor: '#FF784E' },
                            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
                            borderRadius: '8px',
                            transition: 'transform 0.2s ease-in-out',
                            '&:active': { transform: 'scale(0.98)' },
                        }}
                        onClick={handleCheckout}
                    >
                        {paymentMethod === 'cod' ? 'Confirm Order' : 'Proceed to Payment'}
                    </Button>
                </Paper>
            </div>
        </div>
    );
};

export default OrderSummary;
