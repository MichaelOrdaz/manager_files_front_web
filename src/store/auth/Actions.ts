import type {ActionTree} from 'vuex'
import {Auth} from './auth'
import {StateInterface} from '../index'

const actions: ActionTree<Auth, StateInterface> = {
    async LogIn({ commit }, payload) {
        commit('mutation', payload)
    }
}
export default actions


