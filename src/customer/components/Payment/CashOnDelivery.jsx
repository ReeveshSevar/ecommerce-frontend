import React, { useEffect, useRef } from 'react'
import { Alert, Grid, Typography, Paper } from '@mui/material';
import OrderTracking from "../Order/OrderTracking"
import AddressCard from '../AddressCard/AddressCard';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePaymentStatus } from '../../../State/Payment/Action';

const CashOnDelivery = () => {
    const { orderId } = useParams();
    const dispatch = useDispatch();    
    const { order } = useSelector((store) => store);
    
    const totalAmount = order.order?.totalDiscountedPrice;
    const isDeliveryFree = totalAmount > 1000;
    const deliveryCharge = isDeliveryFree ? 0 : 80;

    // useRef to store if payment status update is in progress
    const isPaymentStatusUpdated = useRef(false);

    useEffect(() => {
        // Check if the payment status update has already been triggered
        if (!isPaymentStatusUpdated.current) {
            dispatch(updatePaymentStatus(orderId));
            isPaymentStatusUpdated.current = true;
        }
    }, [orderId, dispatch]);

    return (
        <div className="bg-gradient-to-r from-indigo-50 via-white to-indigo-100 min-h-screen px-6 lg:px-32 py-12">
            {/* Success Alert */}
            <div className="flex flex-col justify-center items-center mb-12">
                <Alert 
                    variant="filled" 
                    severity="success" 
                    sx={{ width: 'fit-content', fontWeight: 'bold', borderRadius: '12px', boxShadow: 3 }}
                >
                    🎉 Congratulations! Your Order is Successfully Placed 🎉
                </Alert>
            </div>

            {/* Order Tracking Component */}
            <OrderTracking activeStep={1} />

            <Grid container className='space-y-5 py-5 pt-20'>
                {order.order?.items.map((item, index) => (
                    <Grid container item key={index} className='shadow-lg rounded-xl p-5 bg-white' sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                        <Grid item xs={12} sm={6} md={7}>
                            <div className='flex items-center space-x-6'>
                                <img 
                                    className='w-[5rem] h-[5rem] object-cover object-top rounded-md shadow-md' 
                                    src={`data:image/jpeg;base64,${item.product.image}`} 

                                    alt='product' 
                                />
                                <div className='ml-5 space-y-2'>
                                    <Typography variant="h6" sx={{ fontWeight: '600', color: '#333' }}>
                                    {item?.product.title?.slice(0, 60)} 
                                    </Typography>
                                    <div className='opacity-500 text-xs font-semibold space-x-5'>
                                        <span>Color: <span style={{ fontWeight: 'bold' }}>{item.color}</span></span>
                                        <span>Size: <span style={{ fontWeight: 'bold' }}>{item.size}</span></span>
                                    </div>
                                    <Typography variant="body2" sx={{ opacity: 0.7 }}>Seller: {item.product.brand}</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3cc41d' }}>₹ {order.order?.totalDiscountedPrice + deliveryCharge}</Typography>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={5}>
                            {/* Paper component with border for AddressCard */}
                            <Paper 
                                elevation={3} 
                                sx={{ 
                                    p: 2, 
                                    borderRadius: '12px', 
                                    border: '1px solid #3cc41d',  // Add a light grey border
                                    borderColor: '#3cc41d',       // Border color: Blue (can be changed)
                                    backgroundColor: '#f9f9f9'    // Slight background color for the address card
                                }}
                            >
                                <AddressCard address={order.order?.shippingAddress} />
                            </Paper>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default CashOnDelivery
