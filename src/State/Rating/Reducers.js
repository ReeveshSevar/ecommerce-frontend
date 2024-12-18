import {
    CREATE_RATING_REQUEST,
    CREATE_RATING_SUCCESS,
    CREATE_RATING_FAILURE,
    GET_RATING_BY_PRODUCT_REQUEST,
    GET_RATING_BY_PRODUCT_SUCCESS,
    GET_RATING_BY_PRODUCT_FAILURE   
} from "./ActionType";

const initialState = {
    loading: false,
    error: null,
    ratings: [],
    singleRating: null,
    ratingCreated: false,
};

// Combined reducer to handle all rating-related actions
export const ratingReducer = (state = initialState, action) => {
    switch (action.type) {
        // Handle creating a rating
        case CREATE_RATING_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                ratingCreated: false,
            };
        case CREATE_RATING_SUCCESS:
            return {
                ...state,
                loading: false,
                ratingCreated: true,
                ratings: [...state.ratings, action.payload], // Add the new rating to the ratings array
            };
        case CREATE_RATING_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Handle getting all ratings by product
        case GET_RATING_BY_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                ratings: [], // Clear previous ratings
            };
        case GET_RATING_BY_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                ratings: action.payload, // Set new ratings
            };
        case GET_RATING_BY_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };    
        default:
            return state;
    }
};

export default ratingReducer;
