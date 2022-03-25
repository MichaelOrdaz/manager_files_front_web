/* eslint-disable */
import {GetterTree} from 'vuex'
import {Auth} from './auth'
import {StateInterface} from '../index'

const getters: GetterTree<Auth, StateInterface> = {
    getterSencillo(state){
        return state.access_token
    },
}

export default getters
