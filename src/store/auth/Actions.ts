import type {ActionTree} from 'vuex'
import {Auth} from './auth'
import {StateInterface} from '@/store'
import {api} from '@/Axios'
import {AuthApi} from '@/services/api/api'

const actions: ActionTree<Auth, StateInterface> = {
    auth_request({ commit, dispatch }, {email, password}) {
        return new Promise<Auth>((resolve, reject) => {
            new AuthApi().login({email, password})
                .then(resp => {
                    const token = resp.data.data.token
                    localStorage.setItem('access_token', token)
                    api.defaults.headers.common.Authorization = `Bearer ${token}`
                    commit('AUTH_SUCCESS', {token})
                    dispatch('user_request').then(() => {resolve(resp.data.data)})
                }).catch(err => {
                    commit('USER_ERROR')
                    localStorage.removeItem('access_token')
                    reject(err)
                })
        })
    },
    user_request({commit, dispatch}) {
        return new Promise((resolve, reject) => {
            api.get('/account')
                .then(resp => {
                    commit('USER_SUCCESS', resp.data.data)
                    commit('AUTH_SET_IS_VALID_TOKEN')
                    resolve(resp)
                })
                .catch((err) => {
                    commit('USER_ERROR')
                    dispatch('user_logout')
                    reject(err)
                })
        })
    },
    user_logout({commit}){
        return new Promise((resolve, reject) => {
            new AuthApi().logout()
                .then((resp) => resolve(resp))
                .catch((err) => reject(err))
                .finally(() => {
                    localStorage.removeItem('access_token')
                    localStorage.removeItem('vuex')
                    commit('AUTH_LOGOUT')
                })
        })
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


