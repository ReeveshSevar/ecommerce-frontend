import React, { useEffect, useState } from 'react';
import AddressCard from "../AddressCard/AddressCard";
import OrderTracking from './OrderTracking';
import { Box, Typography, IconButton, TextField, Button, Card, CardContent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../../State/Order/Action';
import { useParams } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';  // Import StarIcon for filled stars
import { deepPurple, teal, green, grey, blue } from '@mui/material/colors';
import { createRating, getRatingByProduct } from '../../../State/Rating/Action';
import { createReview, getReviewByProduct } from '../../../State/Review/Action';

const OrderDetails = () => {
    const dispatch = useDispatch();
    const { orderId } = useParams();
    const { order } = useSelector((store) => store);
    const { allRating } = useSelector((store) => store);
    const { allReview } = useSelector((store) => store);

    const [rating, setRating] = useState(0);  // Rating state
    const [review, setReview] = useState('');  // Review text state
    const [isReviewed, setIsReviewed] = useState(false);  // Flag to check if review is submitted
    const [showReviewField, setShowReviewField] = useState(false);  // State for toggling the visibility of the review text field

    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [dispatch, orderId]);

    const address = order.order?.shippingAddress || [];
    const productId = order.order?.items && order.order.items.length > 0 ? order.order.items[0].product.id : null;

    const handleRating = (star) => {
        if (!isReviewed) {
            setRating(star);  // Set the selected rating
        }
    };

    const handleReviewChange = (e) => {
        setReview(e.target.value);  // Update the review text
    };

    // Add a useEffect to handle API calls when productId is available
    useEffect(() => {
        if (productId) {
            dispatch(getRatingByProduct(productId));
            dispatch(getReviewByProduct(productId));
        }
    }, [dispatch, productId]);

    // Log the data to check if it's being populated correctly
    useEffect(() => {
        console.log('allRating:', allRating);
        console.log('allReview:', allReview);
    }, [allRating, allReview]);

    const allReviews = allReview?.review || [];
    const allRatings = allRating?.rating || [];

    console.log('allReviews:', allReviews);
    console.log('allRatings:', allRatings);

    // Check if the user has already rated or reviewed
    const userRating = allRatings.find((rating) => rating.product.id === productId);
    const userReview = allReviews.find((review) => review.product.id === productId);

    console.log('userRating:', userRating);
    console.log('userReview:', userReview);

    useEffect(() => {
        if (userRating) {
            setRating(userRating.rating);  // Set the rating if already exists
            setIsReviewed(true);  // Mark as reviewed
        }

        if (userReview) {
            setReview(userReview.review);  // Set the review if already exists
            setIsReviewed(true);  // Mark as reviewed
        }
    }, [userRating, userReview]);

    const handleSubmitReview = () => {
        console.log('Rating:', rating, 'Review:', review);

        if (rating === 0 || review === '') {
            alert('Please provide a valid rating and review.');
            return;
        }

        setIsReviewed(true);  // Mark as reviewed
        const reviewData = { productId: productId, review: review };
        const ratingData = { productId: productId, rating: rating };

        dispatch(createRating(ratingData));
        dispatch(createReview(reviewData));
    };

    const handleTextFieldToggle = () => {
        if (!isReviewed) {  // Ensure that the review cannot be edited after submission
            setShowReviewField(true);  // Open the text field when clicking the "Write Review" button
        }
    };

    return (
        <Box className="order-details" sx={{ paddingX: { xs: 3, lg: 5 }, paddingY: 4, backgroundColor: grey[50] }}>
            {/* Order Tracking Section */}
            <Box mb={6}>
                <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
                    Order Tracking
                </Typography>
                {order.order?.orderStatus === "DELIVERED" ? <OrderTracking activeStep={4} /> : <OrderTracking activeStep={3} />}
            </Box>

            {/* Flex Container for Address and Review Sections */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    gap: 4,
                    justifyContent: 'center',
                    padding: { xs: 1, lg: 2 },
                }}
            >
                {/* Delivery Address Section */}
                <Card sx={{ flex: 1, padding: 3, backgroundColor: '#ffffff', borderRadius: 2, boxShadow: 4 }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight="bold" color={teal[600]} gutterBottom>
                            Delivery Address
                        </Typography>
                        <AddressCard address={address} />
                    </CardContent>
                </Card>

                {/* Review Section */}
                <Card sx={{ flex: 1, padding: 3, backgroundColor: teal[50], borderRadius: 2, boxShadow: 4 }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6" fontWeight="bold" color={teal[600]} gutterBottom>
                            Rate Your Experience
                        </Typography>

                        {/* Rating Section */}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <IconButton
                                    key={star}
                                    sx={{
                                        fontSize: 36,
                                    }}
                                    onClick={() => handleRating(star)}  // Correct function call
                                    disabled={isReviewed}  // Disable rating after review is submitted
                                >
                                    {/* Use filled StarIcon for selected stars, and StarBorderIcon for unselected */}
                                    {star <= rating ? (
                                        <StarIcon sx={{ color: 'yellow' }} />  // Yellow for filled stars
                                    ) : (
                                        <StarBorderIcon sx={{ color: grey[400] }} />  // Light gray for unfilled stars
                                    )}
                                </IconButton>
                            ))}
                        </Box>

                        {/* Review Field */}
                        {!isReviewed && showReviewField && (
                            <TextField
                                label="Write Your Review"
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                value={review}
                                onChange={handleReviewChange}
                                disabled={isReviewed}  // Disable the review input after submission
                                sx={{
                                    mt: 2,
                                    borderRadius: 2,
                                    backgroundColor: 'white',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: teal[500],
                                        },
                                    },
                                }}
                            />
                        )}

                        {/* Show the "Write Your Review" button */}
                        {!showReviewField && !isReviewed && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleTextFieldToggle}
                                sx={{
                                    mt: 2,
                                    borderRadius: 5,
                                    backgroundColor: blue[500],
                                    '&:hover': { backgroundColor: blue[700] },
                                }}
                            >
                                Write Your Review
                            </Button>
                        )}

                        {/* Submit Button */}
                        {!isReviewed && showReviewField && (
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleSubmitReview}
                                sx={{
                                    mt: 2,
                                    borderRadius: 5,
                                    backgroundColor: green[500],
                                    '&:hover': { backgroundColor: green[700] },
                                }}
                            >
                                Submit Review
                            </Button>
                        )}

                        {isReviewed && (
                            <Typography variant="body2" color="green" sx={{ mt: 2 }}>
                                Thank you for your feedback!
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default OrderDetails;