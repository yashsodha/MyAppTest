/* eslint-disable no-undef */
/* eslint-disable no-ex-assign */
import { BASE_URL, ORDER_URL } from '../constants/Constants';



export const instance = {


    post: async (url, token) => {
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
                console.log("call url")

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
        console.log("response", response)

        try {
            responseJson = await response.json();
            console.log("response", responseJson)
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
}
    ;
