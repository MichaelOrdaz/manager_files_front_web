import axios from 'axios'

const api = axios.create({baseURL: `${import.meta.env.VITE_API_URL}api/v1`})
const token = localStorage.getItem('access_token') ?? ''
api.defaults.headers.common.Authorization = `Bearer ${token}`

export {api}

