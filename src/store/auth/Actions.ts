/* eslint-disable */
import {ActionTree} from 'vuex'
import {Auth} from './auth'
import {StateInterface} from '../index'

const actions: ActionTree<Auth, StateInterface> = {
    LogIn({ commit }, cargaUtil) {
        console.log('Funciona')
    }
}
export default actions


