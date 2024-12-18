import { api } from "../../Config/ApiConfig"
import { CREATE_REVIEW_FAILURE, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, GET_REVIEW_BY_PRODUCT_FAILURE, GET_REVIEW_BY_PRODUCT_REQUEST, GET_REVIEW_BY_PRODUCT_SUCCESS, GET_SINGLE_REVIEW_BY_PRODUCT_FAILURE, GET_SINGLE_REVIEW_BY_PRODUCT_REQUEST, GET_SINGLE_REVIEW_BY_PRODUCT_SUCCESS } from "./ActionType"

export const createReview = (reviewData) => async (dispatch) => {
    dispatch({ type: CREATE_REVIEW_REQUEST })
    try {
        const { data } = await api.post(`/api/reviews/`, reviewData)
        dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CREATE_REVIEW_FAILURE, payload: error.message })
    }
}

export const getAllReviewByProduct = (productId) => async (dispatch) => {
    dispatch({ type: GET_REVIEW_BY_PRODUCT_REQUEST })
    try {
        const { data } = await api.get(`/api/reviews/product/${productId}`)
        console.log(data)
        dispatch({ type: GET_REVIEW_BY_PRODUCT_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_REVIEW_BY_PRODUCT_FAILURE, payload: error.message })
    }
}
