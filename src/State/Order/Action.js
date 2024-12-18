import { api } from "../../Config/ApiConfig"
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_USER_ORDER_FAILURE, GET_USER_ORDER_REQUEST, GET_USER_ORDER_SUCCESS } from "./ActionType";

export const createOrder = (reqData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const { data } = await api.post(`/api/order`, reqData.address);
        console.log(data.id)
        if (data.id) {
            reqData.navigate({ search: `step=3&order_id=${data.id}` })
        }
        console.log("Created Order :- ", data)
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: error.message
        })
    }
}

export const getOrderById = (orderId) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`/api/order/${orderId}`)
        dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message })
    }
}

export const getUserOrder = () => async (dispatch) => {
    dispatch({ type: GET_USER_ORDER_REQUEST })
    try {
        const { data } = await api.get(`/api/order/user`)
        dispatch({ type: GET_USER_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_USER_ORDER_FAILURE, payload: error.message })
    }
}