import { instance } from '../../util/fetch';
import * as types from '../../redux/action/actionTypes';

export const getOrdersToken = () => ({
    type: types.GET_ORDERS,
    payload: new Promise(async (resolve, reject) => {
        try {
            let response;
            const token = await instance.getToken();
            if (token) {
                response = await instance.getOrders(token);
            }
            return resolve(response);
        } catch (error) {
            return reject(error);
        }
    }),
});



export const sendNotification = (locationDetails) => ({
    type: types.SEND_PUSH_NOTIFICATION,
    payload: new Promise(async (resolve, reject) => {
        try {
            let response;
          
                response = await instance.sendFirebasePush(locationDetails);
        
            return resolve(response);
        } catch (error) {
            return reject(error);
        }
    }),
});





