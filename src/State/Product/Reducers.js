import {
    DELETE_PRODUCT_SUCCESS,
    FIND_PRODUCT_BY_ID_FAILURE,
    FIND_PRODUCT_BY_ID_REQUEST,
    FIND_PRODUCT_BY_ID_SUCCESS,
    FIND_PRODUCT_FAILURE,
    FIND_PRODUCT_REQUEST,
    FIND_PRODUCT_SUCCESS,
    GET_ALL_PRODUCT_FAILURE,
    GET_ALL_PRODUCT_REQUEST,
    GET_ALL_PRODUCT_SUCCESS,
    GET_PRODUCT_BY_SEARCH_REQUEST,
    GET_PRODUCT_BY_SEARCH_SUCCESS,
    GET_PRODUCT_BY_SEARCH_FAILURE
} from "./ActionType";

const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
    searchResults: []  // New state for search results
};

export const customerProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_PRODUCT_REQUEST:
        case FIND_PRODUCT_BY_ID_REQUEST:
        case GET_ALL_PRODUCT_REQUEST:
        case GET_PRODUCT_BY_SEARCH_REQUEST:
            return { ...state, loading: true, error: null };

        case FIND_PRODUCT_SUCCESS:
            return { ...state, loading: false, error: null, products: action.payload };

        case FIND_PRODUCT_BY_ID_SUCCESS:
            return { ...state, loading: false, error: null, product: action.payload };

        case DELETE_PRODUCT_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                error: null, 
                deletedProduct: action.payload 
            };

        case GET_ALL_PRODUCT_SUCCESS:
            return { ...state, loading: false, error: null, products: action.payload };

        case GET_PRODUCT_BY_SEARCH_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                error: null, 
                searchResults: action.payload // Save the search results to state
            };

        case FIND_PRODUCT_FAILURE:
        case FIND_PRODUCT_BY_ID_FAILURE:
        case GET_ALL_PRODUCT_FAILURE:
        case GET_PRODUCT_BY_SEARCH_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
