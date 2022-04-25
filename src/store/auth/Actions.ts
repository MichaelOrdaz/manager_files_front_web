import type {ActionTree} from 'vuex'
import {Auth} from './auth'
import {StateInterface} from '@/store'
import {api} from '@/Axios'
import {AuthApi} from '@/services/api/api'

const actions: ActionTree<Auth, StateInterface> = {
    async auth_request({ commit, dispatch }, {email, password}) {
        commit('AUTH_REQUEST')
        try {
            const resp = await new AuthApi().login({email, password})
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
            commit('AUTH_SET_IS_VALID_TOKEN', true)
        } catch (e) {
            commit('USER_ERROR')
            await dispatch('user_logout')
        }
    },
    user_logout({commit}){
        try {
            new AuthApi().logout()
        } finally {
            localStorage.removeItem('access_token')
            localStorage.removeItem('vuex')
            commit('AUTH_LOGOUT')
        }
    },
    async user_validate_token({commit}) {
        try {
            const resp = await new AuthApi().verifyAuth()
            commit('AUTH_SET_IS_VALID_TOKEN', resp.data.isAuth)
        } catch (e) {
            commit('AUTH_SET_IS_VALID_TOKEN', false)
        }

    }
}
export default actions


