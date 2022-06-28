
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import apiCollection from './api-collection';


/**
 * 
 * 
the Axios interceptor is a function that gets called by Axios to update/transform each request before forwarding it &
check/filter the response before returning it. In short, you can intercept the requests or responses before they are handled by then or catch.
 */
controller = new AbortController();
const CancelToken = axios.CancelToken;
source = CancelToken.source();
client = axios.create({
    baseURL: apiCollection.getPosts,
});



//Axios Interceptors
client.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('@token');
        config.headers = {
            Accept: 'application/json',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
        };

        config.params = config.params || {};
        config.cancelToken = source.token || {};
        let parsedToken = JSON.parse(token)
        if (parsedToken) {
            config.headers['Authorization'] =
                `Bearer ` + parsedToken.access_token;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    },
);

client.interceptors.response.use(
    response => {
        console.log('RESPONSE INTERCPTOR : ', response?.status);
        return response;
    },
    async function (error) {
        console.log('INTERCEPTOR ERROR RESPONSE : ', error?.response?.status);
        console.log('INTERCEPTOR ERROR RESPONSE CONFIG: ', error?.config);
        const token = await AsyncStorage.getItem('@token');
        const originalRequest = error.config;
        if (error?.response?.status === undefined && error?.config === undefined) {
            return Promise.reject(error);
        } else if (error?.response?.status === 401) {
            originalRequest._retry = true;
        }
        return Promise.reject(error);
    },
);
