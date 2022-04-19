import type {ActionTree} from 'vuex'
import {Auth} from './auth'
import {StateInterface} from '@/store'
import {api} from '@/Api'

const actions: ActionTree<Auth, StateInterface> = {
    async auth_request({ commit, dispatch }, {email, password}) {
        try {
            const resp = await api.post('/login', { email, password })
            const token = resp.data.data.token
            const user = resp.data.data.user
            api.defaults.headers.common.Authorization = `Bearer ${token}`
            commit('AUTH_SUCCESS', {token, user})
        } catch (e) {
            console.log(e)
        }
    }
}
export default actions


