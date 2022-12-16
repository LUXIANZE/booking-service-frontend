import axios from "axios";

export let AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    timeout: 5000,
})

export const setBearerToken = (bearerToken: string) => {
    AxiosInstance = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        timeout: 5000,
        headers: {
            'Authorization' : `BearerToken ${bearerToken}`
        }
    })
}