import React, { useEffect, useState } from 'react';
import AddressCard from "../AddressCard/AddressCard";
import OrderTracking from './OrderTracking';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../../State/Order/Action';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Rating } from '@mui/material';
import { createRating, getAllRatingByProduct, getRatingByProduct } from '../../../State/Rating/Action';
import { createReview, getAllReviewByProduct, getReviewByProduct } from '../../../State/Review/Action';

const OrderDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orderId } = useParams();
    const { order } = useSelector((store) => store);
    const { auth } = useSelector((store) => store);
    const { allRating } = useSelector((store) => store);
    const { allReview } = useSelector((store) => store);

    // Local state to manage rating and review
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [isRatingClicked, setIsRatingClicked] = useState(false); // Track if rating was clicked

    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [dispatch, orderId]);

    const myOrder = order?.order; // Safe access using optional chaining
    const address = myOrder?.shippingAddress || {}; // Safe access for shipping address
    const productId = order.order?.items && order.order.items.length > 0 ? order.order.items[0].product.id : null;

    // Fetch ratings and reviews only if productId is available
    useEffect(() => {
        if (productId) {
            dispatch(getAllRatingByProduct(productId));
            dispatch(getAllReviewByProduct(productId));
        }
    }, [dispatch, productId]);

    const userRating = allRating.ratings;
    const userReview = allReview.reviews;

    // Check if the user has already rated or reviewed the product
    const hasRated = userRating.some(rating => rating.users.userId === auth?.user?.userId && rating.product.id === productId);
    const hasReviewed = userReview.some(review => review.users.userId === auth?.user?.userId && review.product.id === productId);

    // Get the user's existing rating and review (if any)
    const existingRating = userRating.find(rating => rating.users.userId === auth?.user?.userId && rating.product.id === productId);
    const existingReview = userReview.find(review => review.users.userId === auth?.user?.userId && review.product.id === productId);

    // Check if myOrder and myOrder.items are valid before rendering
    if (!myOrder || !myOrder.items || myOrder.items.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', padding: 2 }}>
                <Typography variant="h6" color="text.primary">
                    No order details found.
                </Typography>
            </Box>
        );
    }

    const handleSubmitRatingAndReview = (rating, review) => {
        if (productId) {
            const ratingData = { productId, rating };
            const reviewData = { productId, review };
            dispatch(createRating(ratingData));
            dispatch(createReview(reviewData));
        }
        window.location.reload();
    };

    return (
        <Box className="order-details" sx={{ paddingX: { xs: 2, lg: 4 }, paddingY: 3 }}>
            {/* Order Tracking Section */}
            <Box mb={6}>
                <Typography variant="h5" fontWeight="bold" color="text.primary" gutterBottom>
                    Order Tracking
                </Typography>
                {myOrder?.orderStatus === "DELIVERED" ? <OrderTracking activeStep={4} /> : <OrderTracking activeStep={3} />}
            </Box>

            {/* Product Details Section */}
            <Box style={{ marginBottom: '24px', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <img
                        src={`data:image/jpeg;base64,${myOrder.items[0]?.product?.image}`} 
                        alt={myOrder.items[0]?.product?.title}
                        style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            objectPosition: 'top',
                            borderRadius: '8px'
                        }}
                    />
                    <div>
                        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                            {myOrder.items[0]?.product?.title
                                ? myOrder.items[0]?.product?.title.length > 20
                                    ? myOrder.items[0]?.product?.title.substring(0, 40) + '...'
                                    : myOrder.items[0]?.product?.title
                                : 'No title available'}
                        </p>
                        <p style={{ fontSize: '14px', color: '#555' }}>Size: {myOrder.items[0]?.size}</p>
                        <p style={{ fontSize: '14px', color: '#555' }}>Color: {myOrder.items[0]?.product?.color}</p>
                        <div className='flex'>
                            <p style={{ fontSize: '16px', color: '#555', fontWeight: '600' }}>
                                Price: &nbsp;
                            </p>
                            <p style={{ fontSize: '16px', fontWeight: '600', color: '#3ed646' }}>
                                ₹{myOrder.items[0]?.product?.discountedPrice}
                            </p>
                        </div>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <AddressCard address={address} />
                    </div>
                </div>

                {/* Rating Section */}
                <Box mt={4} sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', background: 'linear-gradient(135deg, #E6D7F5 30%, #F9F9FB 100%)' }}>
                    <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
                        Rate Your Product
                    </Typography>

                    {/* Display existing rating and review if available */}
                    {hasRated && existingRating && (
                        <Box sx={{  }}>
                            <Typography variant="h6" color="text.primary">
                                <strong>Your Rating:</strong>
                            </Typography>
                            <Rating value={existingRating.rating} readOnly size="medium" />
                        </Box>
                    )}
                    {hasReviewed && existingReview && (
                        <Box sx={{ mb: 2 }}>                          
                            <Typography variant="body2" color="text.secondary">
                                {existingReview.review}
                            </Typography>
                        </Box>
                    )}

                    {/* If the user has not rated yet, show the rating form */}
                    {!hasRated && !hasReviewed && (
                        <>
                            <Rating
                                name="product-rating"
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                    setIsRatingClicked(true);  // Mark that rating was clicked
                                }}
                                size="large"
                                sx={{ mb: 2 }}
                            />

                            {isRatingClicked && (
                                <>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        label="Write a Review"
                                        value={review}
                                        onChange={(event) => setReview(event.target.value)}
                                        sx={{ mb: 2 }}
                                    />
                                    <Button variant="contained" color="#b68fff" onClick={() => handleSubmitRatingAndReview(rating, review)}>
                                        Submit
                                    </Button>
                                </>
                            )}
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default OrderDetails;
