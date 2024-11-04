/* eslint-disable no-undef */
import axios from "axios"

const url = import.meta.env.VITE_BASE_Url

const axiosInstance = axios.create({
    baseURL:url,
    timeout:10000,
    headers:{
        "Content-Type":"application/json"
    }
})


axiosInstance.interceptors.request.use(
    (config) => {
        const accessTokin = localStorage.getItem("token")
        if(accessTokin){
            config.headers.Authorization = `Bearer ${accessTokin}`
        }
        return config
    },

    (error) => {
        return Promise.reject(error)
    }
)



export default axiosInstance