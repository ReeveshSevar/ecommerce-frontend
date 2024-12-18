import { Grid } from '@mui/material';
import React from 'react';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';

const OrderCard = ({ order }) => {
    const navigate = useNavigate();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    });

    // Define mapping of statuses
    const renderStatus = (status) => {
        switch (status) {
            case 'DELIVERED':
                return (
                    <div className="bg-green-100 p-2 rounded-lg shadow-sm mt-6">
                        <p className="flex items-center text-sm text-green-600">
                            <AdjustIcon sx={{ width: '14px', height: '14px' }} className="mr-2" />
                            Delivered on {formattedDate}
                        </p>
                        <p className="text-xs text-gray-600">Your item has been delivered.</p>
                    </div>
                );
            case 'SHIPPED':
                return (
                    <div className="bg-blue-100 p-2 rounded-lg shadow-sm mt-6">
                        <p className="flex items-center text-sm text-blue-600">
                            <AdjustIcon sx={{ width: '14px', height: '14px' }} className="mr-2" />
                            Shipped - On the way
                        </p>
                        <p className="text-xs text-gray-600">Your item is on the way!</p>
                    </div>
                );
            case 'PLACED':
                return (
                    <div className="bg-indigo-100 p-2 rounded-lg shadow-sm mt-6">
                        <p className="flex items-center text-sm text-indigo-600">
                            <AdjustIcon sx={{ width: '14px', height: '14px' }} className="mr-2" />
                            Order Placed
                        </p>
                        <p className="text-xs text-gray-600">Your order has been placed successfully.</p>
                    </div>
                );
            case 'CONFIRMED':
                return (
                    <div className="bg-purple-100 p-2 rounded-lg shadow-sm mt-6">
                        <p className="flex items-center text-sm text-purple-600">
                            <AdjustIcon sx={{ width: '14px', height: '14px' }} className="mr-2" />
                            Order Confirmed
                        </p>
                        <p className="text-xs text-gray-600">Your order has been confirmed and is being processed.</p>
                    </div>
                );
            case 'PENDING':
                return (
                    <div className="bg-yellow-50 p-2 rounded-lg shadow-sm">
                        <p className="text-sm text-yellow-600">Pending - Awaiting Confirmation</p>
                        <p className="text-xs text-gray-600">Please check back later for updates.</p>
                    </div>
                );
            case 'CANCELLED':
                return (
                    <div className="bg-red-100 p-2 rounded-lg shadow-sm">
                        <p className="text-sm text-red-600">Cancelled</p>
                        <p className="text-xs text-gray-600">This order has been cancelled.</p>
                    </div>
                );
            default:
                return (
                    <div className="bg-gray-100 p-2 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-600">Unknown Status</p>
                        <p className="text-xs text-gray-500">Please contact support for more details.</p>
                    </div>
                );
        }
    };

    // Determine if the order can be clicked (only if status is "DELIVERED")
    const isClickable = order.orderStatus === 'DELIVERED';

    return (
        <div
            onClick={() => isClickable && navigate(`/account/order/${order.id}`)} // Only navigate if status is 'DELIVERED'
            className={`p-3 shadow-lg hover:shadow-xl border rounded-lg transition-all duration-300 cursor-pointer bg-[#cedff5] ${!isClickable && 'cursor-not-allowed opacity-80'}`}
        >
            <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>

                {/* Left Section - Product Details */}
                <Grid item xs={6}>
                    <div className="flex items-center bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg shadow-lg">
                        <img
                            className="w-[4rem] h-[4rem] object-cover object-left-top rounded-md border-2 border-indigo-400"
                            src={`data:image/jpeg;base64,${order.items[0]?.product.image}`} 
                            alt="Product Image"
                        />
                        <div className="ml-2 space-y-1">
                            <p className="text-xs font-semibold text-indigo-600">{order.items[0]?.product.title}</p>
                            <p className="opacity-80 text-xs font-medium text-gray-700">Size: {order.items[0]?.size}</p>
                            <p className="opacity-80 text-xs font-medium text-gray-700">Color: {order.items[0]?.product.color}</p>
                            <p className="text-xs font-medium text-green-700">Price: {order.items[0]?.product.discountedPrice}</p>
                        </div>
                    </div>
                </Grid>

                {/* Right Section - Delivery Status */}
                <Grid item xs={4}>
                    {renderStatus(order.orderStatus)}
                </Grid>

            </Grid>
        </div>
    );
};

export default OrderCard;
