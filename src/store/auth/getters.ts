import type {GetterTree} from 'vuex'
import {Auth, UserData} from './auth'
import {StateInterface} from '../index'

const getters: GetterTree<Auth, StateInterface> = {
    getToken(state){
        return state.access_token
    },
    initialPage(state): string {
        return `${state.initialPage[state.roles[0]]}`
    },
    canRenderView(state) {
        return (perm) => Object.prototype.hasOwnProperty.call(state.views, perm)
    },
    isRol(state) {
        return (rol: string) => state.roles.includes(rol)
    },
    isValidToken(state) :boolean {
        return state.isValidToken
    },
    getRol(state: Auth): string {
        return state.roles[0] ?? ''
    },
    getUserData(state: Auth): Auth {
        return state
    }
}

export default getters
