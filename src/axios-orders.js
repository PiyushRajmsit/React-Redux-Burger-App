import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-257d9.firebaseio.com/'
});

export default instance;