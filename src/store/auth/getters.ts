import type {GetterTree} from 'vuex'
import {Auth} from './auth'
import {StateInterface} from '../index'

const getters: GetterTree<Auth, StateInterface> = {
    getterExample(state){
        return state.access_token
    },
}

export default getters
