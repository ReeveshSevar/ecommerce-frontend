import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrder } from "../../../State/Order/Action";

const orderStatus = [
    { label: "On The Way", value: "shipped" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Returned", value: "returned" },
    { label: "Pending", value: "pending" }
];

const Order = () => {
    const dispatch = useDispatch();
    const order = useSelector((store) => store);
    const [selectedStatuses, setSelectedStatuses] = useState([]); // State for selected filters

    useEffect(() => {
        dispatch(getUserOrder());
    }, [dispatch]);

    const allOrders = order.order?.order || []; // Fallback to an empty array

    // Handle checkbox toggling
    const handleStatusChange = (status) => {
        setSelectedStatuses((prev) =>
            prev.includes(status)
                ? prev.filter((s) => s !== status) // Remove if already selected
                : [...prev, status] // Add if not selected
        );
    };

    // Filter orders based on selectedStatuses
    const filteredOrders = selectedStatuses.length
        ? allOrders.filter((order) => selectedStatuses.includes(order.orderStatus.toLowerCase()))
        : allOrders;

    return (
        <div className="px-5 py-3 lg:px-10 bg-[#a3a9d1]">
            <Grid container sx={{ justifyContent: "space-between" }}>
                {/* Sidebar - Filter Section */}
                <Grid item xs={2.5}>
                    <div className="h-auto shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-5 sticky top-5 rounded-lg">
                        <h1 className="font-bold text-sm text-indigo-500">Filter</h1>
                        <div className="space-y-4 mt-2">
                            <h1 className="font-semibold text-gray-700">ORDER STATUS</h1>
                            {orderStatus.map((option) => (
                                <div className="flex items-center" key={option.value}>
                                    <input
                                        value={option.value}
                                        type="checkbox"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        onChange={() => handleStatusChange(option.value)}
                                    />
                                    <label
                                        className="ml-3 text-sm text-gray-700 hover:text-indigo-600 cursor-pointer"
                                        htmlFor={option.value}
                                    >
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </Grid>

                {/* Main Content - Order Cards */}
                <Grid item xs={9}>
                    <div className="space-y-2">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((item) => <OrderCard key={item.id} order={item} />)
                        ) : (
                            <p>No orders found</p>
                        )}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default Order;
