import axios from "axios"
import { api, API_BASE_URL } from "../../Config/ApiConfig"
import { GET_ALL_USERS_FAILURE, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"

const token = localStorage.getItem("jwt")
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest());
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register-user`, userData);
        const user = response.data;
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt);
        }
        dispatch(registerSccess(user.jwt));
    } catch (error) {
        dispatch(registerFailure(error.message));
    }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
    dispatch(loginRequest())
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, userData)
        const user = response.data;
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt);  // Store the jwt
        }
        dispatch(loginSccess(user.jwt));
        dispatch(getUser(user.jwt));  // Fetch user information here
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
}

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt) => async (dispatch) => {
    dispatch(getUserRequest())
    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })
        const user = response.data
        dispatch(getUserSuccess(user))
    } catch (error) {
        dispatch(getUserFailure(error.message))
    }
}

export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: GET_ALL_USERS_REQUEST })
    try {
        const { data } = await api.get(`/api/users/all`)
        console.log(data)
        dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ TYPE: GET_ALL_USERS_FAILURE, payload: error })
    }
}


export const logout = () => (dispatch) => {
    console.log('Before logout', localStorage.getItem('jwt'));
    localStorage.removeItem('jwt'); // Explicitly clear jwt from localStorage
    console.log('After logout', localStorage.getItem('jwt'));

    dispatch({ type: LOGOUT, payload: null });
    dispatch({ type: GET_USER_FAILURE, payload: null }); // Optional: Clear any user-specific state
};

