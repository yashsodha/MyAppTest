/* eslint-disable no-undef */
/* eslint-disable no-ex-assign */
import { BASE_URL, ORDER_URL, SERVER_KEY, FIREBASE_URL } from '../constants/Constants';


export const instance = {
    getToken: async (url, token) => {
        let headers = url ? {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        } : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Token': `Bearer ${token}`
            }


        let response, responseJson, error;
        try {
            if (url) {
                let formdata = new FormData();
                formdata.append("Token", token)
                response = await fetch(ORDER_URL, {
                    method: 'POST',
                    headers: new Headers(headers),
                    body: formdata
                });
            } else {
                let data = {
                    username: 'warehouse',
                    password: 'admin@123'
                }
                response = await fetch(BASE_URL, {
                    method: 'POST',
                    headers: new Headers(headers),
                    body: JSON.stringify(data)
                });
            }

        }
        catch (error) {
            return Promise.reject(error);
        }
        try {
            responseJson = await response.json();
        }
        catch (error) {
        }
        if (response.status === 200) {
            return responseJson;
        }
        else if (response.status === 400) {
            return Promise.reject(responseJson.errors);
        }
        else if (response.status === 401) {
            return Promise.reject('Request failed with status 401');
        }

        return Promise.reject(responseJson.error);
    },


    getOrders: async (token) => {

        let headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        let response, responseJson, error;
        try {
            response = await fetch(`${ORDER_URL}`, {
                method: 'POST',
                headers: new Headers(headers),
            });
        }
        catch (error) {
            return Promise.reject(error);
        }
        try {
            responseJson = await response.json();

        }
        catch (error) {
        }

        if (response.status === 200) {
            return JSON.parse(responseJson);
        }
        else if (response.status === 400) {
            return Promise.reject(responseJson.errors);
        }
        else if (response.status === 401) {
            return Promise.reject('Request failed with status 401');
        }

        return Promise.reject(responseJson.error);
    },


    sendFirebasePush: async (locationDetails) => {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `key=${SERVER_KEY}`
        };
        let response, responseJson, error;
        try {
            let data = {
                notification: {
                },
                priority: "high",
                "data": locationDetails,
                to: "dYSOr7y7SCSXr_FcZ3XobV:APA91bH0zsz-QP4eX-0oHysgYyktBOQfA0YuZMc8XtnHzZ7pyOApvbSE72dHrhEq-wYTtz6jftwDEHSOCDI9M2idNod0b3zgRIrvDRhHyo_AA8znzgQLUaq8uC-RsCMNAgt7w9V35zkv"
            }
            response = await fetch(`${FIREBASE_URL}`, {
                method: 'POST',
                headers: new Headers(headers),
                body: JSON.stringify(data)
            });
        }
        catch (error) {
            return Promise.reject(error);
        }
        try {
            responseJson = await response.json();

        }
        catch (error) {
        }

        if (response.status === 200) {
            return JSON.parse(responseJson);
        }
        else if (response.status === 400) {
            return Promise.reject(responseJson.errors);
        }
        else if (response.status === 401) {
            return Promise.reject('Request failed with status 401');
        }

        return Promise.reject(responseJson.error);
    },
}

