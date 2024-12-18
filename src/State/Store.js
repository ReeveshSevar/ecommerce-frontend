import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { AuthReducer } from "./Auth/Reducer";
import { customerProductReducer } from "./Product/Reducers";
import { cartReducer } from "./Cart/Reducer";
import adminOrderReducer from "./Admin/Order/Reducers"
import { orderReducer } from "./Order/Reducer";
import { ratingReducer } from "./Rating/Reducers";
import { reviewReducer } from "./Review/Reducers";

const rootReducers = combineReducers({
    auth: AuthReducer,
    products: customerProductReducer,
    cart: cartReducer,
    order: orderReducer,
    adminOrder: adminOrderReducer,
    allRating: ratingReducer,
    allReview: reviewReducer

})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))
