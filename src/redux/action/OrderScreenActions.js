import { instance } from '../../util/fetch';

export const getOrdersToken = () => ({
    type: types.GET_ORDERS_TOKEN,
    payload: new Promise(async (resolve, reject) => {
        try {
            let response;
            const token = await instance.post();
            if (token) {
                response = await instance.post(true, token);
            }
            return resolve(response);
        } catch (error) {
            return reject(error);
        }
    }),
});




