import * as types from '../action/actionTypes';
const initialState = {
    token: null,
    pendingOrders: [],
    isLoadingOrders: false
}

export default (state = initialState, action) => {
    switch (action.type) {

        case `${types.GET_ORDERS}_PENDING`:
            return {
                ...state,
                pendingOrders: [],
                isLoadingOrders: true
            }
        case `${types.GET_ORDERS}_FULFILLED`:
            console.log("yes", action)
            return {
                ...state,
                pendingOrders: action.payload.data,
                isLoadingOrders: false
            }
        case `${types.GET_ORDERS}_REJECTED`:
            return {
                ...state,
                isLoadingOrders: false
            }

        default:
            return state;
    }

}