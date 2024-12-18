import {
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAILURE,
    GET_REVIEW_BY_PRODUCT_REQUEST,
    GET_REVIEW_BY_PRODUCT_SUCCESS,
    GET_REVIEW_BY_PRODUCT_FAILURE,
    GET_SINGLE_REVIEW_BY_PRODUCT_REQUEST,
    GET_SINGLE_REVIEW_BY_PRODUCT_SUCCESS,
    GET_SINGLE_REVIEW_BY_PRODUCT_FAILURE
} from "./ActionType";

const initialState = {
    loading: false,
    error: null,
    reviews: [],
    singleReview: null,
    reviewCreated: false,
};

// Combined reducer to handle all review-related actions
export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        // Handle creating a review
        case CREATE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                reviewCreated: false,
            };
        case CREATE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                reviewCreated: true,
                reviews: [...state.reviews, action.payload], // Add the new review to the reviews array
            };
        case CREATE_REVIEW_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Handle getting all reviews by product
        case GET_REVIEW_BY_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                reviews: [], // Clear previous reviews
            };
        case GET_REVIEW_BY_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: action.payload, // Set new reviews
            };
        case GET_REVIEW_BY_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default reviewReducer;
