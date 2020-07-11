import axios from 'axios';
import {AsyncStorage} from "react-native";

const instance = axios.create({
    // remember change baseURL each 8 hour because we used free ngrok URL
    //we will need to restart ngrok and put the new URL into the axios baseURL
    // ngrok http 3000
    baseURL: 'http://a4ce4fbb4779.ngrok.io'
});

// hi axios run this function before you ever make a request to do
instance.interceptors.request.use(
    //called automatically anytime that we are about to make a request.
    async (config) =>{
        const token = await AsyncStorage.getItem('token');
        if (token) {
            // we authenticate ourselves with our backend API
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },

    //called automatically anytime that there is an error with us making request
    (err) => {
        return Promise.reject(err);
    }
)


export default instance;
