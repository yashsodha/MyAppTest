import * as types from '../action/actionTypes';
const initialState = {
    finalAnswere: "hello",
    token: null,
    isLoadingVideo: false,
    loadMoreVideo: false,
}

export default (state = initialState, action) => {
    switch (action.type) {

        case `${types.GET_ORDERS_TOKEN}_PENDING`:
            return {
                ...state,
                videos: [],
                isLoadingVideo: true
            }
        case `${types.GET_ORDERS_TOKEN}_FULFILLED`:
            console.log("yes",action)
            return {
                ...state,
                token: action.payload,
                isLoadingVideo: false
            }
        case `${types.GET_ORDERS_TOKEN}_REJECTED`:
            return {
                ...state,
                isLoadingVideo: false
            }


            case `${types.GET_ORDERS}_PENDING`:
                return {
                    ...state,
                    isLoadingVideo: true
                }
            case `${types.GET_ORDERS}_FULFILLED`:
                console.log("yes",action)
                return {
                    ...state,
                    isLoadingVideo: false
                }
            case `${types.GET_ORDERS}_REJECTED`:
                return {
                    ...state,
                }



    
        default:
            return state;
    }

}