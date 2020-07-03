import axios from 'axios';

export default axios.create({
    // remember change baseURL each 8 hour because we used free ngrok URL
    //we will need to restart ngrok and put the new URL into the axios baseURL
    // ngrok http 3000
    baseURL: 'http://51ca0058f291.ngrok.io'
})
