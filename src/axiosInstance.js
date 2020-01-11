import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8989/',
    timeout: 10000
})

export default axiosInstance;