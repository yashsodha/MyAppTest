/* eslint-disable no-ex-assign */
import AsyncStorage from '@react-native-community/async-storage';
import * as types from './actionTypes';

export const login = (user) => ({
    type: types.LOGIN,
    payload: new Promise(async (resolve, reject) => {
        try {
            if(user){
                return resolve(user);
            }
        }
        catch (error) {
            return reject(error);
        }
    }),
});

export const setLogged = (user) =>
    ({
        type: types.SET_LOGIN,
        payload: new Promise(async (resolve, reject) => {
            if (user) {
                return resolve(user);
            }
            return reject('data unavailable!');
        }),
    });

export const logout = () => ({
    type: types.LOGOUT,
    payload: new Promise(async (resolve, reject) => {
        await AsyncStorage.removeItem('user');
        resolve();
    }),
});

export default login;
