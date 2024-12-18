import { GET_ALL_USERS_FAILURE, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"

const initialState = {
    user: null,
    isLoading: false,
    users: [],
    error: null,
    jwt: null
}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return { ...state, isLoading: true, error: null }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, error: null, jwt: action.payload }
        case GET_USER_SUCCESS:
            return { ...state, isLoading: false, error: null, user: action.payload }
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload }
        case GET_ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true, // Set loading to true when the request is made
            };
        case GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false, // Set loading to false when the request is successful
                users: action.payload, // Store the fetched user data in the users array
                error: null, // Reset any previous errors
            };
        case GET_ALL_USERS_FAILURE:
            return {
                ...state,
                loading: false, // Set loading to false when the request fails
                error: action.payload, // Store the error message in error
            };
        case LOGOUT:
            return { ...state, user: null, jwt: null, loading: false };

        default:
            return state
    }
}