import axios, {AxiosInstance} from 'axios'
import {Loading} from 'quasar'

const api = axios.create({baseURL: `${import.meta.env.VITE_API_URL}api/v1`})
const token = localStorage.getItem('access_token') ?? ''
api.defaults.headers.common.Authorization = `Bearer ${token}`

api.interceptors.request.use(function (config) {
    Loading.show()
    return config
}, function (error) {

    return Promise.reject(error)
})
api.interceptors.response.use(function (response) {
    Loading.hide()
    return response
}, function (error) {
    return Promise.reject(error)
})
export {api, AxiosInstance}

