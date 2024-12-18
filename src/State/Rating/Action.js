import { CREATE_RATING_FAILURE, CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS, GET_RATING_BY_PRODUCT_FAILURE, GET_RATING_BY_PRODUCT_REQUEST, GET_RATING_BY_PRODUCT_SUCCESS, GET_SINGLE_RATING_BY_PRODUCT_FAILURE, GET_SINGLE_RATING_BY_PRODUCT_REQUEST, GET_SINGLE_RATING_BY_PRODUCT_SUCCESS } from "./ActionType"
import { api } from "../../Config/ApiConfig"

export const createRating = (ratingData) => async (dispatch) => {
    dispatch({ type: CREATE_RATING_REQUEST })
    try {
        const { data } = await api.post(`/api/ratings`, ratingData)
        dispatch({ type: CREATE_RATING_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CREATE_RATING_FAILURE, payload: error.message })
    }
}

export const getAllRatingByProduct = (productId) => async (dispatch) => {
    dispatch({ type: GET_RATING_BY_PRODUCT_REQUEST })
    try {
        const { data } = await api.get(`/api/ratings/product/${productId}`)
        console.log(data)
        dispatch({ type: GET_RATING_BY_PRODUCT_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_RATING_BY_PRODUCT_FAILURE, payload: error.message })
    }
}
