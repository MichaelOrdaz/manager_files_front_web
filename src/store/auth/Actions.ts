import type {ActionTree} from 'vuex'
import {Auth} from './auth'
import {StateInterface} from '@/store'
import {api} from '@/Axios'

const actions: ActionTree<Auth, StateInterface> = {
    async auth_request({ commit, dispatch }, {email, password}) {
        commit('AUTH_REQUEST')
        try {
            const resp = await api.post('/login', { email, password })
            const token = resp.data.data.token
            localStorage.setItem('access_token', token)
            api.defaults.headers.common.Authorization = `Bearer ${token}`
            commit('AUTH_SUCCESS', {token})
            await dispatch('user_request')
        } catch (e) {
            commit('USER_ERROR')
        }
    },
    async user_request({commit, dispatch}) {
        try {
            const resp = await api.get('/account')
            commit('USER_SUCCESS', resp.data.data)
        } catch (e) {
            commit('USER_ERROR')
            await dispatch('user_logout')
        }
    },
    async user_logout({commit}){
        try {
            await api.post('/logout')
            localStorage.removeItem('access_token')
            localStorage.removeItem('vuex')
            api.defaults.headers.common.Authorization = ''
            commit('AUTH_LOGOUT')
        } catch (e) {
            commit('AUTH_LOGOUT')
        }
    }
}
export default actions


