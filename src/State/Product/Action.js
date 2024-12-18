import { api, MY_URL } from "../../Config/ApiConfig"
import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCT_FAILURE, FIND_PRODUCT_REQUEST, FIND_PRODUCT_SUCCESS, GET_ALL_PRODUCT_FAILURE, GET_ALL_PRODUCT_REQUEST, GET_ALL_PRODUCT_SUCCESS, GET_PRODUCT_BY_SEARCH_FAILURE, GET_PRODUCT_BY_SEARCH_REQUEST, GET_PRODUCT_BY_SEARCH_SUCCESS } from "./ActionType";

export const findProduct = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_REQUEST })
    const { colors, sizes, minPrice, maxPrice, minDiscount, category, stock, sort, pageNumber, pageSize } = reqData;
    try {
        const { data } = await MY_URL.get(`/sevar/products?category=${category}&colors=${colors}&sizes=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&sort=${sort}&stock=${stock}&page=${pageNumber}&pageSize=${pageSize}`)
        dispatch({ type: FIND_PRODUCT_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_FAILURE, payload: error.message })
    }
}

export const findProductById = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST })
    const { productId } = reqData;
    try {
        const { data } = await MY_URL.get(`/sevar/products/${productId}`)
        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message })
    }
}

export const getAllProducts = () => async (dispatch) => {
    dispatch({ type: GET_ALL_PRODUCT_REQUEST })
    try {
        const { data } = await MY_URL.get(`/sevar/products/all`)
        dispatch({ type: GET_ALL_PRODUCT_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_ALL_PRODUCT_FAILURE, payload: error.message })
    }
}

export const searchProduct = (category) => async (dispatch) => {
    dispatch({ type: GET_PRODUCT_BY_SEARCH_REQUEST })
    try {
        const { data } = await MY_URL.get(`/sevar/products/search?category=${category}`)    
        dispatch({ type: GET_PRODUCT_BY_SEARCH_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_PRODUCT_BY_SEARCH_FAILURE, payload: error.message })
    }
}


export const createProduct = (product) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST })
    console.log(product)
    try {
        const { data } = await api.post(`/api/admin/products/`, product)
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: product })
    } catch (error) {
        dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message })
    }
}

export const deleteProduct = (productId) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST })
    try {
        const { data } = api.delete(`/api/admin/products/${productId}/delete`)
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId })
    } catch (error) {
        dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message })
    }
}
